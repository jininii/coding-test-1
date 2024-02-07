import { generateSecret, SignJWT } from 'jose';

const secretKey = generateSecret('HS256');

export async function createToken() {
  return new SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1h')
    .sign(await secretKey);
}

export async function createRefreshToken() {
  return new SignJWT({ 'urn:example:claim': 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1d')
    .sign(await secretKey);
}
