import { Router } from "express";
import { handleAsync, AuthenticatedRequest, verifyToken  } from "./utils";
import { Response } from 'express';
import zayavkiDB from "../db/zayavkiDB";
import { getOne } from "../db/utils";

const app = Router();

app.post('/add', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = parseInt(req.authData.user.id);
    const description = req.body.description;
    const status = parseInt(req.body.status);
    const result = await zayavkiDB.insertZayavkiData(description, status, userId);
    res.json(result);
}));

app.get('/my', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = parseInt(req.authData.user.id);
    const result = await zayavkiDB.getZayavkiDataByUserId(userId);
    res.json(result);
}));

app.delete('/delete/:id', verifyToken, handleAsync(async (req: AuthenticatedRequest, res: Response) => {
    const id = parseInt(req.params.id);

    console.log(id)
// check if the user is the owner of the zayavka
    const result = await zayavkiDB.deleteZayavkiData(id);
    res.json(result);
}));

export default app;