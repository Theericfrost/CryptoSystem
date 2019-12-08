const message = 'Test Message TesT'; // исходный текст
let index = null;
let key = null;


index = myFunctions.lengthCheck(message); // проверка на четность

key = myFunctions.keyGet(message,index) // ключ

const encryptedMessage = myFunctions.ecnryptedMessageGet(message,key) // Зашифрованное сообщение

// encryptedMessage[1]  метод шифрования

const messageWithKey = myFunctions.ecnryptedMessageGetWithKey(encryptedMessage[0],key) // Смешанное Зашифрованное сообщение с ключем

let messageAndKeyArr = myFunctions.getKeyFromEcnryptedMessageGetWithKey(messageWithKey) // Из смешенного сбщ масив с зашифрованным сбщ и ключем

let decryptedText = myFunctions.decrypt(messageAndKeyArr) // Расшифрованное сообщение
console.log(decryptedText, "Расшифровка")