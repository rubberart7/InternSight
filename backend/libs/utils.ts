import jwt from "jsonwebtoken"


const generateAccessToken = (userId: Number, email: string, secretKey: string) => {
  return jwt.sign({ userId, email }, secretKey, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId: Number, email: string, secretKey: string) => {
  return jwt.sign({ userId, email }, secretKey, {
    expiresIn: "1d",
  });
};

export { generateAccessToken, generateRefreshToken }