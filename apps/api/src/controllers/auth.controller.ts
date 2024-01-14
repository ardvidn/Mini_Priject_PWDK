import { Request, Response } from 'express';
import prisma from '@/prisma';

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      code: 200,
      message: 'plus plus',
      data: { email, password },
    });
  } catch (error: any) {
    console.log(error);
  }
};

export interface sigupPayload {
  email: string;
  password: string;
  username: string;
}

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username }: sigupPayload = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        referral: username,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'plus plus',
      data: user,
    });
  } catch (error: any) {
    console.log(error);
  }
};
