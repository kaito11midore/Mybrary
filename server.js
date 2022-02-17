if(process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views', './view')
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true} )
const db = mongoose.connection
db.on('error', (err)=>{
    console.log('Error : ' + err )
} )
db.once('open',()=>{
    console.log(" Sucessfully connected to database ")
})


app.use('/',indexRouter)

app.listen(process.env.PORT || 3000 ,()=>{
    console.log("running at port 3000")
    console.log(process.env.NODE_ENV)
})