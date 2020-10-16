// ==UserScript==
// @name         3DES_ECB
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  try to take over the world!
// @author       José Durán
// @match        https://htmlpreview.github.io/?https://github.com/PepsUDP/Tarea3Cripto/blob/main/3DES_ECB.html
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/tripledes.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/mode-ecb.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js
// @grant        none
// ==/UserScript==

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
};

(function() {
    'use strict';
    var encrypted = document.getElementsByClassName("3DES")["0"].getAttribute("id");
    var ObjectArray = CryptoJS.enc.Base64.parse(encrypted);
    var padding = document.getElementsByClassName("pad")["0"].getAttribute("id");
    var key = document.getElementsByClassName("key")["0"].getAttribute("id");
    var keyArray = CryptoJS.enc.Base64.parse(key);
    var testencrypt = CryptoJS.TripleDES.encrypt("password", keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    var decrypted = CryptoJS.TripleDES.decrypt(encrypted, keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    var decryptA = hex2a(decrypted);
    var testdecrypt = CryptoJS.TripleDES.decrypt(testencrypt, keyArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    var testdecryptA = hex2a(testdecrypt);

    document.getElementsByClassName("3DES")["0"].innerText = decryptA;
    console.log("Encriptado:",encrypted);
    console.log("EncriptadoArreglo:",ObjectArray);
    console.log("Desencriptado:",decrypted);
    console.log("DesencriptadoASCII:",decryptA);
    //console.log("Padding:",padding);
    console.log("Llave:",key);
    console.log("LlaveArreglo:",keyArray);
    console.log("EncriptadoTest:",testencrypt);
    console.log("DesencriptadoTest:",testdecrypt);
    console.log("DesencriptadoTestASCII:",decryptA);
    //Test
})();

//CryptoJS.enc.Base64.parse
//decrypt.toString()
