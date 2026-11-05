
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No authorization token provided",
      });
    }

    const token = authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({
    message: "Token is missing",
  });
}
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error("SECRET_KEY is not configured");
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || typeof decoded.id !== "string") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = decoded as Express.AuthUser;

    next();
  } catch (error) {
    next(error);
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
