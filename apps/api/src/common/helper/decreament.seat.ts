import prisma from '@/prisma';

const decreamentSeat = async (eventId: string, ticketToBuy: Number) => {
  await prisma.event.update({
    where: {
      id: parseInt(eventId),
    },
    data: {
      available_seat: {
        decrement: parseInt(`${ticketToBuy}`),
      },
    },
  });
};

export default decreamentSeat;
