import fetch from 'node-fetch';
import { Ecpay } from './Ecpay';

const ecpayStagingInfo = {
    MerchantID: '3002607',
    HashKey: 'pwFHCqoQZGmho4w6',
    HashIV: 'EkRm7iFT261dpevs',
    // 取得廠商驗證碼(Server)
    tokenApiUrl: 'https://ecpg-stage.ecpay.com.tw/Merchant/GetTokenbyTrade',
}

const ecpay = new Ecpay({
    key: ecpayStagingInfo.HashKey,
    iv: ecpayStagingInfo.HashIV,
});

const MerchantID = ecpayStagingInfo.MerchantID;
const MerchantTradeNo = Math.floor(Math.random() * 654321 * Math.random() * 123456);

const data = {
    MerchantID,
    RememberCard: 1, // 要記憶卡號
    PaymentUIType: 2, // 付款選擇清單頁
    ChoosePaymentList: 1, // 信用卡一次付清
    OrderInfo: { // 訂單資訊
        MerchantTradeDate: '2021/03/10 00:00:00', // 廠商交易時間
        MerchantTradeNo, // 特店交易編號 (訂單編號 ?)
        TotalAmount: 60,
        ReturnURL: 'https://jsonplaceholder.typicode.com/posts/1',
    },
    CardInfo: {
        OrderResultURL: 'https://jsonplaceholder.typicode.com/posts/1',
    },
    ConsumerInfo: {
        MerchantMemberID: '1006', // 消費者會員編號
    }
}

const postData = {
    MerchantID,
    RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
        Revision: "1.0.0",
    },
    Data: ecpay.encrypt(data),
}

console.log('fetching...\n');

function doFetch() {
    fetch(ecpayStagingInfo.tokenApiUrl, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
        .then(data => {
            const encryptedData = data.Data;
            const decrypted = ecpay.decrypt(encryptedData);
            console.log('data:', decrypted);
        })
        .catch(err => {
            console.log('err:', err.message);
        })
}

doFetch();