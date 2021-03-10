import { Ecpay } from "../src/Ecpay";

/** 原始資料 */
const product = {
    Name: "Test",
    ID: "A123456789"
};

/** 加密後結果 */
const encryptedData = '7woM9RorZKAtXJRVccAb0qhHYm+5lnlhBzyfh5EZdNck7PacNsRHgv/Jvp//ajJidqcQcs0UmAgPQVjXQHeziw==';

const ecpay = new Ecpay({
    key: 'A123456789012345',
    iv: 'B123456789012345',
});

describe("ecpay", () => {
    it("encrypt method should work", () => {
        expect(ecpay.encrypt(product)).toBe(encryptedData);
    });

    it('decrypt method should work', () => {
        expect(ecpay.decrypt(encryptedData)).toStrictEqual(product);
    });
});
