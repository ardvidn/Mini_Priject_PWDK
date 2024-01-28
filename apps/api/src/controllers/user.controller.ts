import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  username: string;
}

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const idWhoCreated = cookiesToDecode.id;

    if (idWhoCreated != parseInt(id)) {
      return res.status(400).json({
        code: 200,
        message: 'you are not authorized to get this user detail information',
      });
    }

    const getUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const getPoin = await prisma.poin.findMany({
      where: {
        userId: parseInt(id),
      },
    });

    const getVoucher = await prisma.voucher.findFirst({
      where: {
        userId: parseInt(id),
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'all data retrieved',
      data: getUser,
      getPoin,
      getVoucher,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
