import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "src/types/User";

const prisma = new PrismaClient();

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginUser = async (req: Request, res: Response) => {};

export const logoutUser = async (req: Request, res: Response) => {};
