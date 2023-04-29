import { User } from '../types/user.type';
import { client } from '../database';
import bcrypt from 'bcrypt';
const { SALT_ROUNDS, PEPPER } = process.env;
export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (firstname,lastname,username,password,email,type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS));
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash,
        u.email,
        u.type,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async update(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE users SET firstname=($1),lastname=($2),username=($3),password=($4),email=($5),type=($6) WHERE id=($7) RETURNING *';
      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS));
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash,
        u.email,
        u.type,
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async delete(id: number): Promise<string> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      await connection.query(sql, [id]);
      connection.release();
      return `Finesh delete(${id})`;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async login(username: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
}
