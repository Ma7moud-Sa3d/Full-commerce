
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface AuthUser extends JwtPayload {
      id: string;
      role?: "user" | "admin";
    }

    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
