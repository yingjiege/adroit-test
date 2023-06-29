const express = require('express');

const app = express();
//middlewares
// app.use('/posts', () =>{
//     console.log('This is a middleware running');
// })


//ROUTES
app.get('/', (req,res) =>{
    res.send('We are at home');
});

app.get('/posts', (req,res) =>{
    res.send('We are at post');
});

app.listen(3000);
