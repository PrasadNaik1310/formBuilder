import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string };
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET || "";

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Make sure decoded is an object (not string)
    if (typeof decoded === "string") {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request
    req.user = { userId: (decoded as JwtPayload).user_id as string };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
