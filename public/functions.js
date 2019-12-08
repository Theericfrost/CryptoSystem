const CryptoJS = require('crypto-js')
module.exports = {

    /*
        Проверка длины текста на четность. Если четная длина возвращается 0. Если нет -1.
    */
    lengthCheck : (someText)=>{
        const binaryCheck  = someText.length % 2;
        if (binaryCheck === 0){
            return 0 // четная
        } 
        return -1; // нечетная
    },
    /* 
        Передаем сообщение и индекс проверки на четность. Получаем ключ. Если длина четная то берем четные
        Элементы сообщения, если нет то нечетные
    */
     keyGet : (message,index)=>{
        const messageArray = message.split('')
        const keyToReturn = messageArray.filter((el,i)=>{
            if(index===0){
                return (i%2)
            }
            return !(i%2)
            
        })
        return keyToReturn.join('')
    },
    /*
        Выбираем из алгоритмов шиффрования путем ( Длина ключа mod Кол-во Алгоритмов(4)) и шифруем собщение
    */
    ecnryptedMessageGet : (message, key) =>{
        const encryptAlgoritms = ['DES','AES','TripleDES','Rabbit']
        const algoritm = encryptAlgoritms[key.length % 4];
        const ecnrypted = eval( 
           `CryptoJS.${algoritm}.encrypt(message,key)`
        )
        return [ecnrypted.toString(), algoritm]
    },
    /* 
        Получаем новое сообщения путем смешивания ключа и сообщения
    */
    ecnryptedMessageGetWithKey : (encryptedMessage,key) =>{
        let ourMessage = encryptedMessage;
        let left = ourMessage.substring(0,encryptedMessage.length/2); // изначальное левое значение
        let right = ourMessage.substring(encryptedMessage.length/2, encryptedMessage.length) // изначальное правое значение
        let iterationNumber = key.length;
        let counter = 0;
        let keyArr = key.split('')
        // Условие для четного ключа 
        if (key.length%2 === 0){
            while( iterationNumber !== 0 ){
               
                if(counter%2 === 0){
                    left = keyArr[key.length-1-counter] + left;
                    ++counter;
                    --iterationNumber;
                } else {
                    right = keyArr[key.length-1-counter] + right;
                    ++counter;
                    --iterationNumber;
                }
            }
            // console.log(right+left , "четный вариант")
            return([right+left, key.length])
        } else { // Условие для нечетного ключа
            while( iterationNumber !== 0 ){
                if(counter%2 === 0){
                    left = keyArr[key.length-1-counter] + left;
                    ++counter
                    --iterationNumber                
                } else {
                    right = keyArr[key.length-1-counter] + right;
                    ++counter
                    --iterationNumber
                }
            }
            // console.log(right+left , "нечетный вариант")
            return([right+left, key.length])
        }
    },
    /*
        Функция возвращает массив [ключ, зашифрованное сообщение]
    */

    getKeyFromEcnryptedMessageGetWithKey : (messageWithKey)=> {
        let left = messageWithKey[0].substring(0, messageWithKey[0].length/2)
        let right = messageWithKey[0].substring(messageWithKey[0].length/2,messageWithKey[0].length)
        let keyArr = [];
        if(messageWithKey[1]%2 === 0 ){ // Вариант когда длина сообщения четная
            for(let i=0; i<messageWithKey[1];i++){
                if(i%2 ===0) {
                    keyArr.push(left.substring(0,1));
                    left = left.substring(1, left.length)
                    
                } else {
                    keyArr.push(right.substring(0,1));
                    right = right.substring(1,right.length)
                }
            }
            console.log(keyArr.join('') , right+left)
            return [keyArr.join('') , right+left]
        } else { // Когда нечетная длина
            for(let i=0; i<messageWithKey[1];i++){ 
                if(i%2 ===0) {
                    keyArr.push(right.substring(0,1));
                    right = right.substring(1,right.length) 
                } else {
                    keyArr.push(left.substring(0,1));
                    left = left.substring(1, left.length)
                }
            }
            return [keyArr.join('') , right+left]
        }
    },
    /*
        Функция принимает массив [ключ, зашифрованное сообщение] и возвращает расшифрованное сообщение
    */
    decrypt : (messageAndKeyArr) => {
        const encryptAlgoritms = ['DES', 'AES' , 'TripleDES' , 'Rabbit' ]
        const algoritm = encryptAlgoritms[messageAndKeyArr[0].length % 4];
        const decrypted = eval(
            `CryptoJS.${algoritm}.decrypt('${messageAndKeyArr[1]}', '${messageAndKeyArr[0]}')`
        )
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}