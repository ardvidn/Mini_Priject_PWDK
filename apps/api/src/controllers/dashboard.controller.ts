import prisma from '@/prisma';
import { Request, Response } from 'express';

export const getAllDataForDashboard = async (req: Request, res: Response) => {
  try {
    const getAllUserData = await prisma.user.findMany();

    const getAllEventData = await prisma.event.findMany();

    const getAllTicketTierData = await prisma.ticketTier.findMany();

    return res.status(200).json({
      code: 200,
      message: 'all data collected',
      data: getAllEventData,
      getAllUserData,
      getAllTicketTierData,
    });
  } catch (error) {
    console.log(error);
  }
};
