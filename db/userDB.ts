import { createTable, insertIntoTable, selectFromTable, hashPassword, executeQuery } from './utils';
import path from 'path';
require('dotenv').config(path.resolve(__dirname, '../.env'));
import { env } from 'process';

const userDB = {
    createUsersTable: () => createTable('users', 'id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255) UNIQUE, password VARCHAR(255)'),
    insertUser: (username: string, password: string) => {
        const hash = hashPassword(password + env.SALT!);
        return insertIntoTable('users', ['username', 'password'], [username, hash]);
    },
    loginUser: (username: string, password: string) => {
        const hash = hashPassword(password + env.SALT!);
        return selectFromTable('users', `WHERE username = ? AND password = ? LIMIT 1`, [username, hash]);
    },
    getUserByName: (username: string) => selectFromTable('users', `WHERE username LIKE '%' || ? || '%'`, [username]),
    getUserById: (id: number) => selectFromTable('users', `WHERE id = ?`, [id]),
    getAllUsers: () => selectFromTable('users')
}

export default userDB;