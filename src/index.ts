import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', Router);
/** Rules of our API */
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

 if (req.method == 'OPTIONS') {
     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json({});
 }

 next();
});

/** Error handling */
app.use((req, res, next) => {
 const error = new Error('Not found');

 res.status(404).json({
     message: error.message
 });
});


app.listen(`Server is running :${PORT}`);
