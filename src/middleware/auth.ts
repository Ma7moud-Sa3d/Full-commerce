import jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express"

interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload
}


export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No authorization" });
    const token = auth.split(" ")[1];
    if (!token) throw new Error("token is not configured");
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("SECRET_KEY is not configured");
    const decriptToken = jwt.verify(token, secret);
    req.user = decriptToken;
    next();
  } catch (error) {
    next(error)
  }
};

//! Good function for authorazation
{
  /**
   * 
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization token is required" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid authorization format" });
    return;
  }

  const secret = process.env.SECRET_KEY;

  if (!secret) {
    console.error("SECRET_KEY is not configured");
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError
    ) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    next(error);
  }
};

   */
}
