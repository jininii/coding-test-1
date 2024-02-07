import { generateSecret, SignJWT } from 'jose';

const secretKey = generateSecret('HS256');

export async function createJwt() {
  const refreshToken = await new SignJWT({
    'urn:example:claim': 'refresh_token',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('48h')
    .sign(secretKey);

  return refreshToken;
}
