// ==UserScript==
// @name         3DES_ECB
// @namespace    https://github.com/PepsUDP/Tarea3Cripto/blob/main/3DES_ECB.js
// @version      2.2
// @description  Probando github pages
// @author       José Durán
// @downloadURL  https://github.com/PepsUDP/Tarea3Cripto/blob/main/3DES_ECB.js
// @match        https://pepsudp.github.io/Tarea3Cripto/3DES_ECB.html
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/tripledes.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/mode-ecb.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js
// ==/UserScript==

//Función para pasar de hexadecimal a ASCII
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
};

(function() {
    'use strict';
    //Al igual que en la aplicación de 3DES modo ECB en python, las únicas variables a utilizar en el cifrado y descifrado
    //de esta tarea serán los datos a manipular y el modo, pero al ser este último constante y el mensaje depende de lo que
    //se pase a través de python no existen variables modificables (obligatorias) para el funcionamiento de este cifrado.

    //Se agarra el mensaje cifrado, se convierte a arreglo para que sea manejable por CryptoJS, se obtiene el padding,
    //y por último la llave para luego pasarla a base64, nuevamente para mejor manejo por parte de CryptoJS
    var encrypted = document.getElementsByClassName("3DES")["0"].getAttribute("id");
    var ObjectArray = CryptoJS.enc.Base64.parse(encrypted);
    var padding = document.getElementsByClassName("pad")["0"].getAttribute("id");
    var key = document.getElementsByClassName("key")["0"].getAttribute("id");
    var keyArray = CryptoJS.enc.Base64.parse(key);

    //Código solamente relevante para cuando el mensaje cifrado es "password", el objetivo es que para el ejemplo principal
    //se logre observar que el mensaje a decifrar es correcto.
    var testencrypt = CryptoJS.TripleDES.encrypt("password", keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    var testdecrypt = CryptoJS.TripleDES.decrypt(testencrypt, keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    //se aplica la desencriptación del mensaje cifrado con el modo ECB y el padding Pkcs7 (default para Pycryptodome),
    //luego se pasan ambos mensajes de cifrados a ASCII / texto plano.
    var decrypted = CryptoJS.TripleDES.decrypt(encrypted, keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    var decryptA = hex2a(decrypted);
    var testdecryptA = hex2a(testdecrypt);

    //Se inserta el mensaje en texto plano descifrado dentro del div 3DES.
    document.getElementsByClassName("3DES")["0"].innerText = decryptA;
    //Distintos console.logs() para observar el proceso de transformación de la información.
    console.log("Encriptado:",encrypted);
    console.log("EncriptadoArreglo:",ObjectArray);
    console.log("Desencriptado:",decrypted);
    console.log("DesencriptadoASCII:",decryptA);
    console.log("Llave:",key);
    console.log("LlaveArreglo:",keyArray);
    console.log("EncriptadoTest:",testencrypt);
    console.log("DesencriptadoTest:",testdecrypt);
    console.log("DesencriptadoTestASCII:",decryptA);
})();
