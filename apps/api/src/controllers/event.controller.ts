import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import prisma from '@/prisma';

export interface TicketTier {
  nameTier: string;
  price: number;
}

export interface eventCreateListPayload {
  title: string;
  description: string;
  event_date: string;
  location: string;
  available_seat: number;
  image: string;
  userId: number;
  ticketTier: TicketTier[];
}

export interface jwtPayload {
  id: number;
}

export const eventCreate = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      event_date,
      location,
      available_seat,
      image,
      ticketTier,
      userId,
    }: eventCreateListPayload = req.body;

    // decode cookies
    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const idWhoCreated = cookiesToDecode.id;

    // validator
    const getUserFromDB = await prisma.user.findUnique({
      where: { id: idWhoCreated },
    });

    if (!getUserFromDB) {
      return res.status(400).json({
        code: 400,
        message: 'user not found',
      });
    }

    const transactionForEvent = await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: getUserFromDB.id },
        data: { role: 'EO' },
      });

      const event = await prisma.event.create({
        data: {
          title,
          description,
          event_date,
          location,
          available_seat,
          image: title,
          userId: getUserFromDB.id,
        },
      });

      if (!ticketTier) return;

      const ticketTierData = ticketTier.map(({ nameTier, price }) => {
        const eventId = event.id;
        return {
          nameTier,
          price,
          eventId,
        };
      });

      await prisma.ticketTier.createMany({
        data: ticketTierData,
      });
    });

    return res.status(200).json({
      code: 200,
      message: 'succesfully create an event',
    });
  } catch (error) {
    console.log(error);
  }
};

// export const eventUpdate = async (req: Request, res: Response) => {
//   try {
//     const get_id = req.params.id;

//     res.send('id is');
//   } catch (error) {
//     console.log(error);
//   }
// };
