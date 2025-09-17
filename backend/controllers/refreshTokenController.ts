import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../server.js";
import { generateAccessToken } from "../libs/utils.js";

dotenv.config();

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "No refresh token cookie." });
    return;
  }

  const refreshToken = cookies.jwt;

  try {
    
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
      
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const decoded = jwt.verify(refreshToken, secret) as JwtPayload;

    
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.revoked) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    if (storedToken.expiresAt < new Date()) {
      
      try {
        await prisma.refreshToken.delete({
          where: { token: refreshToken },
        });
      } catch (cleanupError) {
        console.error("Network error.");
        return;
        
      }
      
      res.status(403).json({ message: "Refresh token expired" });
      return;
    }

    
    if (decoded.userId !== storedToken.userId || decoded.email !== storedToken.user.email) {
      
      res.status(403).json({ message: "Token does not match user" });
      return;
    }

    
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const newAccessToken = generateAccessToken(
      storedToken.userId, 
      storedToken.user.email, 
      accessTokenSecret
    );

    res.json({ accessToken: newAccessToken });
    return;

  } catch (err) {
    
    if (err instanceof jwt.JsonWebTokenError) {
      
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    if (err instanceof jwt.TokenExpiredError) {
      
      res.status(403).json({ message: "Refresh token expired" });
      return;
    }

    
    
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};