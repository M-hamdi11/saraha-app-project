import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_KEY, "hex")


export function encryption(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;

}
export function decryption(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(":");

    const iv = Buffer.from(ivHex, "hex");

    const plaintext = crypto.createDecipheriv(algorithm, key, iv)

    let text = plaintext.update(encrypted, "hex", "utf8")
    text += plaintext.final('utf8');
    return text

}
