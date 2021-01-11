
var SHA256 = require("crypto-js/sha256");
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export default function crypto(msg){
    const hashDigest = SHA256(msg);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "privateKey"));
    console.log(hmacDigest);
    return hmacDigest
}