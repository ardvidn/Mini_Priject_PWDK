import { Request } from 'express';

export const calcVoucher = (price: number) => {
  const totalVoucher = price * 0.1;

  return totalVoucher;
};
