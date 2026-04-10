import crypto from "crypto";

export const hash = (password, salt) => {
    const saltedHash = salt + password + salt;
    const hashing = crypto.createHash("sha256");
    const hash = hashing.update(saltedHash).digest("base64url");

    return hash;
}

export const getSalt = (size) => {
    return crypto.randomBytes(10*size).toString("base64url").substring(0, size);
}