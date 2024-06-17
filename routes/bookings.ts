import { Router } from "express";
import { handleAsync, AuthenticatedRequest, verifyToken  } from "./utils";
import { Response } from 'express';
import bookingsDB from "../db/bookingsDB";
import { getOne } from "../db/utils";

const app = Router();

app.post('/add', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = parseInt(req.authData.user.id);
    const period = req.body.period;
    const auto = parseInt(req.body.auto);
    const result = await bookingsDB.insertBookingsData(period,auto, userId);
    res.json(result);
}));

app.get('/my', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = parseInt(req.authData.user.id);
    const result = await bookingsDB.getBookingsDataByUserId(userId);
    res.json(result);
}));

app.delete('/delete/:id', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const id = parseInt(req.params.id);

    console.log(id)
// check if the user is the owner of the zayavka
    const result = await bookingsDB.deleteBookingsData(id);
    res.json(result);
}));

export default app;