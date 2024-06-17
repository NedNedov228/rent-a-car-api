import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
require('dotenv').config(path.resolve(__dirname, '../.env'));
import { env } from 'process';

export interface AuthenticatedRequest extends Request {
    token?: string;
    authData?: any;
}

export const handleAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
};

export function verifyToken(req: AuthenticatedRequest, res: Response, next: any) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, env.SECRET_KEY!, (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.token = bearerToken;
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

export function prohibit(req: AuthenticatedRequest, res: Response, next: any) {
    res.sendStatus(403);
}