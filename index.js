const express = require('express');
const app = express();
const fs= require('fs');
const path = require('path');

app.use(express.json());

app.post('/POST/addUser', (req, res) => {
    // console.log(req.body);
    
  const { name, age, email } = req.body;
//   console.log("Hello from addUser route")
//   console.log(path.join(path.resolve(), '/data.json'));
  fs.readFileSync(path.join(path.resolve(), '/data.json'), 'utf-8', (err, data) => {
    console.log("started reading file");
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }
    const users = JSON.parse(data);
    if(users.find(user=> user.email === email)){
        res.status(400).send('User already exists')
    } else{
        users.push({ name, age, email });
        res.status(201).send('User Added successfully')
    }
   
    fs.writeFileSync(path.join(path.join(path.resolve(), 'data.json'), 'data.json'), JSON.stringify(users), 'utf-8', (err) => {
    console.log("started writing file");

      if (err) {
        console.error(err);
        return res.status(500).send('Error writing file');
      }
      res.status(200).send('User added successfully');
    });
  });
//   console.log(name, age, email);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});