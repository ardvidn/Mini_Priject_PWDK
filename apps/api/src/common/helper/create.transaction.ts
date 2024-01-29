import prisma from '@/prisma';

const createTransaction = async (
  userWhoBuy: string,
  eventBuy: string,
  eventId: number,
): Promise<void> => {
  try {
    const random = Math.floor(Math.random() * 10000);

    await prisma.transaction.create({
      data: {
        transaction_id: `${eventId}ticket${random}`,
        userWhoBought: userWhoBuy,
        eventBought: eventBuy,
        eventId: eventId,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export default createTransaction;
