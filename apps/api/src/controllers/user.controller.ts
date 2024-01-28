import { calcPoint } from '@/common/helper/poin.calc.helper';
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

    // start of updationg poin karena expired
    if (getPoin) {
      await prisma.poin.deleteMany({
        where: {
          userId: parseInt(id),
          expired_date: {
            lte: new Date(),
          },
        },
      });

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          totalPoin: null,
        },
      });

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          totalPoin: calcPoint(getPoin.length),
        },
      });
    }
    // end of updationg poin karena expired

    // start of updationg voucher karena expired
    if (getVoucher) {
      await prisma.voucher.deleteMany({
        where: {
          userId: parseInt(id),
          expired_date: {
            lte: new Date(),
          },
        },
      });
    }
    // end of updationg voucher karena expired

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
