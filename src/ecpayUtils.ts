console.clear();
import CryptoJS from 'crypto-js';

// var key = CryptoJS.enc.Utf8.parse('A123456789012345');
// var iv = CryptoJS.enc.Utf8.parse('B123456789012345');

var key = CryptoJS.enc.Utf8.parse('pwFHCqoQZGmho4w6');
var iv = CryptoJS.enc.Utf8.parse('EkRm7iFT261dpevs');

function encrypt(data: any) {
    const urlEncodeData = encodeURIComponent(JSON.stringify(data));
    return CryptoJS.AES.encrypt(urlEncodeData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
}

function decrypt(encrypted: string) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decodeURIComponent(decrypted));
}

// const encrypted = encrypt({ "Name": "Test", "ID": "A123456789" })

// console.log('encrypted:');
// console.log(encrypted);
// console.log('\n')

// const decrypted = decrypt(encrypted);
// console.log(decrypted);

export {
    encrypt,
    decrypt,
}