import prisma from '@/prisma';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

export interface reviewAndRatingPayload {
  comment: string;
  rating: number;
  commentBy: string;
}

export interface jwtPayload {
  id: number;
  username: string;
}

export const reviewEvent = async (req: Request, res: Response) => {
  const event_id = req.params.id;

  const getCookies = req.cookies.user_cookie;
  const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
  const idWhoCreated = cookiesToDecode.id;

  if (!getCookies) {
    return res.status(400).json({
      message: 'please sign in to comment this event',
    });
  }

  const { comment, rating }: reviewAndRatingPayload = req.body;

  const getReviewAndRating = await prisma.reviewandrating.create({
    data: {
      comment,
      rating,
      eventId: parseInt(event_id),
      commentBy: cookiesToDecode.username,
    },
  });

  return res.status(200).json({
    code: 200,
    message: 'iyadah',
    data: getReviewAndRating,
  });
};
