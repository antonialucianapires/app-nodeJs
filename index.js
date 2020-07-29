const express = require('express');
const app = express();

//primeira rota
app.get('/', (req, res) => {
    
    return res.send('Hello, JS!')
})

app.listen(3001)