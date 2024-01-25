import { Request } from 'express';

export const calcPoint = (point: number) => {
  const totalPoint = point * 10000;

  return totalPoint;
};
