import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
}

export const transactionEvent = async (req: Request, res: Response) => {
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
    // if gapake voucher dan poin
    if (!getPoin && !getVoucher) {
      const price = getEventToBuy?.price;
      // langsung bayar
    }
    // if gapake voucher dan pake poin
    if (!getVoucher && getPoin) {
      // pilih mau pake poin apa kaga
    }
    // if pake voucher dan gapake poin
    if (getVoucher && !getPoin) {
      // pilih mau pake voucher apa akga
    }
    // if pake voucher dan poin
  }

  return res.status(200).json({
    code: 200,
    message: 'event data & ticket tier collected',
    data: getEventToBuy,
  });
};
