import { Request, Response } from 'express';
import prisma from '@/prisma';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from '@/common/helper/bcrypt.helper';
import { generateToken } from '@/common/helper/jwt.helper';
import dayjs, { Dayjs } from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { calcPoint } from '@/common/helper/poin.calc.helper';
import { calcVoucher } from '@/common/helper/voucher.calc.helper';

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //get data dari db
    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });

    // validasi email
    if (!userWithEmail) {
      return res.status(404).json({
        code: 404,
        message: 'Email or password is incorrect',
      });
    }

    // validasi password
    const isValidPassword = compare(password, userWithEmail.password);
    if (!isValidPassword) {
      return res.status(404).json({
        code: 404,
        message: 'Email or password is incorrect',
      });
    }

    //generate token untuk cookie
    const token = generateToken({
      username: userWithEmail.username,
      id: userWithEmail.id,
      email: userWithEmail.email,
      role: userWithEmail.role,
    });

    //bikin cookienya
    res.cookie('user_cookie', token, {
      // pas production secure:true
      secure: false,
      httpOnly: true,
      expires: dayjs().add(7, 'day').toDate(),
    });

    return res.status(200).json({
      code: 200,
      message: 'successfully sign in',
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export interface sigupPayload {
  email: string;
  password: string;
  username: string;
  referralCode?: string;
  phone_num?: string;
}

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, referralCode, phone_num }: sigupPayload =
      req.body;

    const userByEmail = await prisma.user.findUnique({
      where: { email },
    });

    const generateReferral = (username: string): string => {
      let result: string = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 5) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }
      let referral: string = `${username}${result}`;
      return referral.toUpperCase();
    };
    const referralUser = generateReferral(username);

    if (userByEmail?.email === email) {
      return res.send(`${email} already used`);
    }

    // generate hash passowrd
    const hashedPassword = hash(password);

    // ini ga masukin referral code dan tetep pengen bikin akun
    if (!referralCode) {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          referral: referralUser,
          phone_num,
        },
      });
      return res.status(200).json({
        code: 200,
        message: `user with email ${req.body.email} succesfully created`,
        data: user,
      });
    }

    // cek referral punya siapa?
    const referralBy = await prisma.user.findUnique({
      where: { referral: referralCode },
    });

    // ini masukkin referral code tapi salah, jadi masukin referral code ulang
    if (!referralBy) {
      return res.status(400).json({
        code: 400,
        message: `${referralCode} not found, please check your referral code again`,
      });
    }

    // ini masukin referral code yg bener
    if (referralCode) {
      const addPoinAndVoucher = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            referral: referralUser,
            referralBy: referralBy?.username,
            phone_num,
          },
        });

        const expiredDate = dayjs().add(90, 'day').toDate();

        const createPoint = await prisma.poin.create({
          data: {
            userId: referralBy.id,
            usedBy: username,
            expired_date: expiredDate,
          },
        });

        // const getNewUserId = await prisma.user.findUnique({
        //   where: {
        //     username: username,
        //   },
        // });

        const createVoucher = await prisma.voucher.create({
          data: {
            userId: user.id,
            expired_date: expiredDate,
          },
        });

        return { user };
      });

      return res.status(200).json({
        code: 200,
        message: `user with email ${req.body.email} succesfully created`,
        data: addPoinAndVoucher.user,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const signoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie('user_cookie');
    return res.status(200).json({
      code: 200,
      message: 'Successfuly sign out',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export interface jwtPayload {
  id: number;
}

export const getPoint = async (req: Request, res: Response) => {
  try {
    // decode cookies
    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const { id } = cookiesToDecode;

    const getPointData = await prisma.poin.findMany({
      where: {
        userId: id,
        expired_date: {
          gt: new Date(),
        },
      },
    });

    const point = calcPoint(getPointData.length);

    // console.log(point);

    res.status(200).json({
      code: 200,
      total: point,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};

export const getVoucher = async (req: Request, res: Response) => {
  try {
    // decode cookies
    const getCookies = req.cookies.user_cookie;
    const cookiesToDecode = jwtDecode<jwtPayload>(getCookies);
    const { id } = cookiesToDecode;

    const getVoucherData = await prisma.voucher.findFirst({
      where: {
        userId: id,
        expired_date: {
          gt: new Date(),
        },
      },
    });

    if (!getVoucherData) {
      return res.status(200).json({
        code: 200,
        message: 'voucher not found',
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'discount 10%',
      voucher: '0.1',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'internal server error',
    });
  }
};
