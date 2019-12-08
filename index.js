const CryptoJS = require('crypto-js')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');

const myFunctions = require('./public/functions')

const server = express();

const PORT = 3000;

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
})

server.engine('hbs', hbs.engine);
server.set('view engine' , 'hbs');
server.set('views','views')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({extended : true}))



server.get('/', (req,res)=>{
    res.status(200)
    res.render('main', {
        title: "Главная страница"
    })
})

server.post('/encrypt', (req,res)=>{
    res.status(200)
    let message = req.body.message;
    let key = myFunctions.keyGet(message , myFunctions.lengthCheck(message))
    let cryptoMessageAndAlgoritm = myFunctions.ecnryptedMessageGet(message, key)
    let cryptoAlgoritm = cryptoMessageAndAlgoritm[1]
    let cryptoMessageWithoutKey = cryptoMessageAndAlgoritm[0]
    let cryptoMessageWithKey = myFunctions.ecnryptedMessageGetWithKey(cryptoMessageWithoutKey ,key)
    let messageWithKey = myFunctions.getKeyFromEcnryptedMessageGetWithKey(cryptoMessageWithKey)
    let decrypt = myFunctions.decrypt(messageWithKey)
    res.render('encrypt', {
        title: "Зашифрованное сообщение",
        message,
        key,
        cryptoAlgoritm,
        cryptoMessageWithoutKey, 
        cryptoMessageWithKey : cryptoMessageWithKey[0],
        messageWithKey,
        decrypt

 
    })
})


server.listen(PORT, ()=>{
    console.log('Сервер запущен на порте ' + PORT)
})

