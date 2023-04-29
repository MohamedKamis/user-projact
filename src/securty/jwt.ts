import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../types/user.type';
const { TOKEN_SECRET } = process.env;

export const checkadd = (
  req: Request,
  res: Response,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  email: string,
  type: string
) => {
  if (!firstname || !lastname || !username || !password || !email) {
    return res
      .status(400)
      .send(
        'Please enter valid data( firstname, lastname, username, password, email)'
      );
  }
  if (type != 'user') {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const check = jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;

    if (
      (check.type != 'SuperAdmin' && check.type != 'Admin') ||
      (type == 'Admin' && check.type != 'SuperAdmin')
    ) {
      return res.status(400).send('you cant add this user..!');
    }

    if (type != 'Admin' && type != 'user' && type != 'SuperAdmin') {
      return res.status(400).send('Please enter valid data(type)');
    }
  }
};

export const checkupdate = (req: Request, res: Response, u: User) => {
  if (
    !u.firstname ||
    !u.lastname ||
    !u.username ||
    !u.password ||
    !u.email ||
    !u.id
  ) {
    return res
      .status(400)
      .send(
        'Please enter valid data( firstname, lastname, username, password, email, type ,id)'
      );
  }
  const authorizationHeader = req.headers.authorization as string;
  const token = authorizationHeader.split(' ')[1];
  const check = jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;
  if (u.type != 'user') {
    if (check.type != 'SuperAdmin' && check.type != 'Admin') {
      return res.status(400).send('you cant update this user..!');
    }
    if (u.type == 'SuperAdmin' && check.type != 'SuperAdmin') {
      return res.status(400).send('you cant update this user..!');
    }
    if (
      u.type == 'Admin' &&
      check.type != 'Admin' &&
      check.type != 'SuperAdmin'
    ) {
      return res.status(400).send('you cant update this user..!');
    }
  }
};
