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
  category_event: string;
  price: number;
}

export interface jwtPayload {
  id: number;
}

export const getEventAll = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findMany();

    return res.status(200).json({
      code: 200,
      message: 'data succesfully collected',
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const getEventAllById = async (req: Request, res: Response) => {
  try {
    const event_id = req.params.id;

    const event = await prisma.event.findMany({
      where: {
        userId: parseInt(event_id),
      },
    });

    return res.status(200).json({
      code: 200,
      message: `all event succesfully collected`,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const eventCreate = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      event_date,
      location,
      available_seat,
      image,
      category_event,
      price,
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

    const transactionForEventCreate = await prisma.$transaction(
      async (prisma) => {
        await prisma.user.update({
          where: { id: getUserFromDB.id },
          data: { role: 'EO' },
        });

        const getCategoryEvent = await prisma.categoryEvent.findMany();

        const event = await prisma.event.create({
          data: {
            title,
            description,
            event_date,
            location,
            available_seat,
            image,
            category_event,
            price,
            userId: getUserFromDB.id,
          },
        });
      },
    );

    return res.status(200).json({
      code: 200,
      message: 'succesfully create an event',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const eventUpdate = async (req: Request, res: Response) => {
  try {
    const event_id = req.params.id;
    const {
      title,
      description,
      event_date,
      location,
      available_seat,
      image,
      category_event,
      price,
    }: eventCreateListPayload = req.body;

    const patchEventPayload = {
      title,
      description,
      event_date,
      location,
      available_seat,
      image,
    };

    //decode cookies
    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const idWhoCreated = cookiesToDecode.id;

    const checkUser = await prisma.user.findUnique({
      where: {
        id: idWhoCreated,
      },
    });

    if (checkUser?.role != 'EO') {
      return res.status(200).json({
        code: 200,
        message: 'you are not Event Organizer',
      });
    }

    //get userId dari event
    const userIdFromEvent = await prisma.event.findUnique({
      where: {
        id: parseInt(event_id),
      },
    });

    // check params.id = cookies id
    if (userIdFromEvent?.userId != idWhoCreated) {
      return res.status(400).json({
        code: 400,
        message: 'you are not authorized to edit this event',
      });
    }

    const transactionEvent = await prisma.$transaction(async (prisma) => {
      const event = await prisma.event.update({
        where: {
          id: parseInt(event_id),
        },
        data: {
          title,
          description,
          location,
          image,
          category_event,
          available_seat,
          price,
        },
      });
    });

    return res.status(200).json({
      code: 200,
      message: 'successfully edit an event',
      // data:
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const eventDelete = async (req: Request, res: Response) => {
  try {
    const event_id = req.params.id;

    //decode cookies
    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const idWhoCreated = cookiesToDecode.id;

    const checkUser = await prisma.user.findUnique({
      where: {
        id: idWhoCreated,
      },
    });

    if (checkUser?.role != 'EO') {
      return res.status(200).json({
        code: 200,
        message: 'you are not Event Organizer',
      });
    }

    //get userId dari event
    const userIdFromEvent = await prisma.event.findUnique({
      where: {
        id: parseInt(event_id),
      },
    });

    // check params.id = cookies id
    if (userIdFromEvent?.userId != idWhoCreated) {
      return res.status(400).json({
        code: 400,
        message: 'you are not authorized to edit this event',
      });
    }

    //delete event
    await prisma.event.delete({
      where: {
        id: parseInt(event_id),
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'event successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
