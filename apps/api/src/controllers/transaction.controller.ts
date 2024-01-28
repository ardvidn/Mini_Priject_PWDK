import { calcPoint } from '@/common/helper/poin.calc.helper';
import { calcVoucher } from '@/common/helper/voucher.calc.helper';
import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
}

export const transactionEvent = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const event_id = req.params.id;

    const { total_ticket } = req.body;

    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const { id } = cookiesToDecode;

    if (!getCookies) {
      return res.status(400).json({
        code: 400,
        message: 'please sign in to buy a ticket',
      });
    }

    const getEventToBuy = await prisma.event.findUnique({
      where: {
        id: parseInt(event_id),
      },
    });

    const getPoin = await prisma.poin.findMany({
      where: {
        userId: id,
        expired_date: {
          gt: new Date(),
        },
      },
    });

    const getVoucher = await prisma.voucher.findFirst({
      where: {
        userId: id,
        expired_date: {
          gt: new Date(),
        },
      },
    });

    if (getEventToBuy?.price) {
      if (getPoin && getVoucher) {
        const poin = calcPoint(getPoin.length);
        const total =
          getEventToBuy.price - poin - calcVoucher(getEventToBuy.price);

        return res.status(200).json({
          code: 200,
          message: `total: ${total} `,
          data: total,
        });
      }

      // if gapake poin dan pake voucher
      if (getVoucher) {
        const total = getEventToBuy?.price - calcVoucher(getEventToBuy.price);

        await prisma.voucher.deleteMany({
          where: {
            userId: id,
          },
        });
        return res.status(200).json({
          code: 200,
          message: `total: ${total} `,
          data: total,
        });
      }
      // if gapake voucher dan pake poin
      if (getPoin) {
        const total = getEventToBuy?.price - calcPoint(getPoin.length);

        return res.status(200).json({
          code: 200,
          message: `total: ${total} `,
          data: total,
        });
      }
    }

    return res.status(200).json({
      code: 200,
      message: 'price collected',
      data: getEventToBuy?.price,
    });
  }
};
