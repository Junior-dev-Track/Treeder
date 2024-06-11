import CryptoJS, { AES } from 'crypto-js';

class Encryption {

    async generateSecretKey() {
        const keyLength = 32; // 32 bytes = 256 bits (AES-256)
        const buffer = new Uint8Array(keyLength);
        crypto.getRandomValues(buffer);
        return Array.from(buffer, (byte) =>
            byte.toString(16).padStart(2, '0')
        ).join('');

    }

    async encryptData(data, secretKey) {
        const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
        return encryptedData;
    };


    async decryptData(encryptedData, secretKey) {
        const decryptedData = AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    }

}

module.exports = Encryption