console.clear();
import fetch from 'node-fetch';
import { encrypt, decrypt } from './ecpayUtils';

const MerchantID = '3002607';

const data = {
    MerchantID,
    RememberCard: 1, // 要記憶卡號
    PaymentUIType: 2, // 付款選擇清單頁
    ChoosePaymentList: 1, // 信用卡一次付清
    OrderInfo: { // 訂單資訊
        MerchantTradeDate: '2021/03/10 00:00:00', // 廠商交易時間
        MerchantTradeNo: '01312319271924', // 特店交易編號 (訂單編號 ?)
        TotalAmount: 60,
        ReturnURL: 'https://jsonplaceholder.typicode.com/posts/1',
    },
    CardInfo: {
        OrderResultURL: 'https://jsonplaceholder.typicode.com/posts/1',
    },
    ConsumerInfo: {
        MerchantMemberID: '221889',
    }
}

const postData = {
    MerchantID,
    RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
        Revision: "1.0.0",
    },
    Data: encrypt(data),
}

console.log('what is postData:', postData);
console.log('\n\n\n')

// 取得廠商驗證碼(Server) - 介接路徑
const url = 'https://ecpg-stage.ecpay.com.tw/Merchant/GetTokenbyTrade';

function doFetch() {
    fetch(url, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
        .then(data => {
            const encryptedData = data.Data;
            const decrypted = decrypt(encryptedData);
            console.log('decrypted:', decrypted);
        })
        .catch(err => {
            console.log('err:', err.message);
        })
}

doFetch();