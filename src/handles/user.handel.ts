import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { User } from '../types/user.type';
import bcrypt from 'bcrypt';
import { checkadd, checkupdate } from '../securty/jwt';
const { TOKEN_SECRET, PEPPER } = process.env;

const userslog = new UserModel();

const index = async (req: Request, res: Response) => {
  try {
    const users = await userslog.index();
    console.log(users);
    res.send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    const User = await userslog.show(id);
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const check = jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;
    if (User == null) {
      return res.status(400).send('Please enter valid data');
    }
    if (
      check.username == User.username ||
      check.type == 'Admin' ||
      check.type == 'SuperAdmin'
    ) {
      console.log(check.username);
      return res.send(User);
    } else {
      return res.status(400).send('you can`t see this user...!');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, password, email, type } = req.body;
    checkadd(req, res, firstname, lastname, username, password, email, type);
    const TU: User = { firstname, lastname, username, password, email, type };
    const newuser = await userslog.create(TU);
    if (newuser == undefined) {
      return res.status(400).send('Please enter valid data(username,email)');
    }
    res.send(newuser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, email, password, id } = req.body;
    let type = req.body.type as string;
    if (type == null || type == undefined) {
      type = 'user';
    }

    const U: User = {
      firstname,
      lastname,
      username,
      password,
      email,
      type,
      id,
    };
    checkupdate(req, res, U);
    const updatuser = await userslog.update(U);
    if (updatuser == null || updatuser == undefined || !updatuser) {
      return res.status(400).send('Please enter valid data(username,email)');
    }
    return res.send(updatuser);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteProduct = await userslog.delete(id);
    res.send(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body;
    // const password = req.query.password as string;
    // const username = req.query.username as string;
    if (!username || !password) {
      return res.status(400).send('Please enter valid data(username,password)');
    }
    const User = await userslog.login(username);
    if (User == null) {
      return res.status(400).send('Please enter valid data(username,password)');
    }
    const verified = bcrypt.compareSync(password + PEPPER, User.password);
    if (!verified) {
      return res.status(400).send('Please enter valid data');
    }
    const tokin = jwt.sign(
      { username: User.username, type: User.type },
      TOKEN_SECRET as string
    );
    return res.send(tokin);
  } catch (error) {
    res.status(500).json(error);
  }
};
const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const check = jwt.verify(token, TOKEN_SECRET as string);
    if (!check) {
      throw new Error('you have an error');
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json(
        'Access denied, invalid token ,Pleas go to (http://localhost:8080/login/user)'
      );
  }
};
export const userRoute = (app: express.Application) => {
  app.get('/user', index);
  app.get('/login/user', login);
  app.post('/user', create);
  app.get('/user/show', verifyAuthToken, show);
  app.put('/user', verifyAuthToken, update);
  app.delete('/user', verifyAuthToken, destroy);
};
