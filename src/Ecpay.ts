import CryptoJS from 'crypto-js';

export class Ecpay {
    key: CryptoJS.lib.WordArray;
    iv: CryptoJS.lib.WordArray;

    constructor(options: { key: string; iv: string; }) {
        this.key = CryptoJS.enc.Utf8.parse(options.key);
        this.iv = CryptoJS.enc.Utf8.parse(options.iv);
    }

    public encrypt(data: any) {
        const urlEncodeData = encodeURIComponent(JSON.stringify(data));
        return CryptoJS.AES.encrypt(urlEncodeData, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
    }

    decrypt(encrypted: string): any {
        const decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decodeURIComponent(decrypted));
    }
}
