import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../server.js";
import type { Request, Response } from "express";
import { generateAccessToken,generateRefreshToken } from "../libs/utils.js";

dotenv.config();

interface RegisterRequestBody {
  fullName: string;
  email: string;
  password: string;
}

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

async function createUser(fullName: string, email: string, hashedPassword: string) {
  await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });
}

async function associateRefreshToken(userId: number, refreshToken: string, expiresInMs: number) {
  const expiresAt = new Date(Date.now() + expiresInMs);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: userId,
      expiresAt: expiresAt,
      revoked: false,
    },
  });
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ message: "Please fill all fields", type: "Error" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters!", type: "Error" });
    return;
  }

  const emailExists = await findUserByEmail(email);
  if (emailExists) {
    res.status(400).json({ message: "Email already exists!", type: "Error" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  await createUser(fullName, email, hashedPassword);

  res.status(201).json({ message: "User registered successfully.", type: "Success" });
  return;
};

export const login = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields", type: "Error" });
    return;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    res.status(400).json({ message: "Fields are incorrect!", type: "Error" });
    return;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    res.status(400).json({ message: "Fields are incorrect!", type: "Error" });
    return;
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    res.status(500).json({ message: "Server issue.", type: "Error" });
    return;
  }

  const accessToken = generateAccessToken(user.id, user.email, accessTokenSecret);
  const refreshToken = generateRefreshToken(user.id, user.email, refreshTokenSecret);

  const oneDayMs = 24 * 60 * 60 * 1000;

  await associateRefreshToken(user.id, refreshToken, oneDayMs);

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', refreshToken, { 
    httpOnly: true, 
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: oneDayMs,
    domain: isProduction ? undefined : 'localhost'
  });

  res.status(200).json({ 
    message: "User logged in successfully.", 
    type: "Success",
    accessToken: accessToken
  });

  return;
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (refreshToken) {
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      });
    }

    if (!refreshToken) {
        res.status(200).json({ message: "You are already logged out." });
        return;
    }

    
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.clearCookie("jwt", { 
      httpOnly: true, 
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? undefined : 'localhost'
    });
    
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Could not logout successfully." });
  }
};