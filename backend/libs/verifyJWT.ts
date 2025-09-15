import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: { userId: number; email: string };
}

export const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    console.error("Missing ACCESS_TOKEN_SECRET environment variable.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};