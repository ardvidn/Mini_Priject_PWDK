import createTransaction from '@/common/helper/create.transaction';
import decreamentSeat from '@/common/helper/decreament.seat';
import { calcPoint } from '@/common/helper/poin.calc.helper';
import { calcVoucher } from '@/common/helper/voucher.calc.helper';
import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface jwtPayload {
  id: number;
  username: string;
}

export const transactionEvent = async (req: Request, res: Response) => {
  try {
    const event_id = req.params.id;

    const { total_ticket, usePoin, useVoucher } = req.body;

    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const { id } = cookiesToDecode;
    const { username } = cookiesToDecode;

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

    // membatasi pembeli agar tidak beli lebih dari 5
    if (total_ticket > 5) {
      return res.status(200).json({
        code: 200,
        message: "please don't be greedy",
      });
    }

    if (getEventToBuy?.available_seat == 0) {
      return res.status(200).json({
        code: 200,
        message: 'seats already sold out',
      });
    }
    // update user poin karnera expired
    await prisma.poin.deleteMany({
      where: {
        userId: id,
        expired_date: {
          lte: new Date(),
        },
      },
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        totalPoin: null,
      },
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        totalPoin: calcPoint(getPoin.length),
      },
    });

    if (getEventToBuy?.price) {
      let totalPrice = total_ticket * getEventToBuy.price;

      if (usePoin > 0) {
        const userPoin = await prisma.user.findUnique({
          where: {
            id: id,
          },
        });

        if (userPoin?.totalPoin != null && userPoin.totalPoin != 0) {
          if (userPoin?.totalPoin >= getEventToBuy.price) {
            createTransaction(username, getEventToBuy.title, getEventToBuy.id);
            decreamentSeat(event_id, total_ticket);

            return res.status(200).json({
              code: 200,
              message:
                'price collected, poin not use cause a price to high compare to your poin',
              data: totalPrice,
            });
          }
          totalPrice -= userPoin?.totalPoin;
          await prisma.poin.deleteMany({
            where: {
              userId: id,
            },
          });

          await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              totalPoin: null,
            },
          });

          createTransaction(username, getEventToBuy.title, getEventToBuy.id);
          decreamentSeat(event_id, total_ticket);
          return res.status(200).json({
            code: 200,
            message: 'price collected, poin used',
            data: totalPrice,
          });
        }
      }

      if (useVoucher) {
        totalPrice -= calcVoucher(totalPrice);

        await prisma.voucher.deleteMany({
          where: {
            userId: id,
          },
        });
        createTransaction(username, getEventToBuy.title, getEventToBuy.id);
        decreamentSeat(event_id, total_ticket);
        return res.status(200).json({
          code: 200,
          message: 'price collected after use voucher',
          data: totalPrice,
        });
      }
      createTransaction(username, getEventToBuy.title, getEventToBuy.id);
      decreamentSeat(event_id, total_ticket);
      return res.status(200).json({
        code: 200,
        message: 'price collected',
        data: totalPrice,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
