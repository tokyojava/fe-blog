import bcrypt from 'bcrypt';

export const hashPassword = async (plainText: string) => {
  const hash = await bcrypt.hash(plainText, 10);
  return hash;
};

export const verifyPassword = async (plainText: string, hash: string) => {
  const match = await bcrypt.compare(plainText, hash);
  return match;
};