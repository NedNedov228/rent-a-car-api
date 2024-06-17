import { Router } from "express";
import { handleAsync, AuthenticatedRequest, verifyToken  } from "./utils";
import { Response } from 'express';
import userDB from "../db/userDB";
import jwt from 'jsonwebtoken';
import path from 'path';
require('dotenv').config(path.resolve(__dirname, '../.env'));
import { env } from 'process';
import { getOne } from "../db/utils";

const app = Router();

const authenticateUser = (username: string, password: string) => {
    return userDB.loginUser(username, password);
}

app.post('/login', handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    console.log(req.body);
    const user = getOne(await authenticateUser(req.body.username, req.body.password));

    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }

    jwt.sign({ user }, env.SECRET_KEY!, { expiresIn: '24h' }, (err, token) => {
        res.json({
            token
        });
    });
}));

app.post('/check-token', verifyToken, (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: 'Token is valid' });
});

app.post('/register', handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    console.log(req.body);
    const user = await userDB.insertUser(req.body.username, req.body.password);
    res.json(user);
}));

export default app;