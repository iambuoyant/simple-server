const express = require('express')
const app = express()
const port = 3000

let db = [
 {id:131231, name:"fesho", age: 18, gender:"male"},
 {id:231231, name:"naeem", age: 22, gender:"male"},
 {id:331231, name:"inam", age: 25, gender:"male"},
 {id:431231, name:"azaz", age: 29, gender:"male"},
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/users', (req, res) => {
 for(i=0; i < db.length ;i++){
  console.log(`user name: ${db[i].name}`);
 }
 res.send(`${db}`);
})


app.post('/dashboard/:id', (req, res) => {
 console.log("req>>>", req.params);
 let uniqueIQ = req.params.id;
 let user = db.filter(function(item){
  return item.id == uniqueIQ
 }
 );
 console.log("user >>", user);
 // let name = "fesho";
 res.send(`user data ${user[0].name}, ${user[0].gender}, ${user[0].age}!`);
})

app.listen(port, () => {
  console.log(`my url http://localhost:${port}`)
})