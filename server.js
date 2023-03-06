require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT || 80 ;

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.set('view engine','ejs');
app.use( express.static( "static" ) );

app.use("",require("./routes/routes.js"))

app.listen(PORT ,() => {
    console.log(`Server started at http://localhost:${PORT}`)
});


