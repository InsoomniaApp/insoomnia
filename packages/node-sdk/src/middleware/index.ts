import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { appData } from '../sdk';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res
      .status(401)
      .json({ status: 401, message: 'Invalid or malformed token' });

  verify(
    token,
    appData.secret,
    {
      audience: appData.audience,
      issuer: 'http://localhost:8080',
    },
    (err, data) => {
      console.log('err', err);
      if (err) {
        return res
          .status(401)
          .json({ status: 401, message: 'Invalid or malformed token' });
      }
      next();
    }
  );
};
