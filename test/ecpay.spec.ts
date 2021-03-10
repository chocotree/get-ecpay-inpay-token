import { Ecpay } from "../src/Ecpay";

const product = {
    Name: "Test",
    ID: "A123456789"
};

const str = '7woM9RorZKAtXJRVccAb0qhHYm+5lnlhBzyfh5EZdNck7PacNsRHgv/Jvp//ajJidqcQcs0UmAgPQVjXQHeziw==';

const ecpay = new Ecpay({
    key: 'A123456789012345',
    iv: 'B123456789012345',
});

describe("ecpay", () => {
    it("encrypt method should work", () => {
        expect(ecpay.encrypt(product)).toBe(str);
    });

    it('decrypt method should work', () => {
        expect(ecpay.decrypt(str)).toStrictEqual(product);
    });
});
