import { createHash } from 'crypto';
import { pool } from './db';

export const executeQuery = (query: string, params: any[] = []) => {
    return new Promise((resolve, reject) => {
        pool.all(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const hashPassword = (password: string) => {
    return createHash('sha256').update(password).digest('base64');
}

export const createTable = (tableName: string, columns: string) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
    return executeQuery(query);
}

export const insertIntoTable = (tableName: string, columns: string[], values: any[]) => {
    const placeholders = columns.map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    return executeQuery(query, values);
}

export const selectFromTable = (tableName: string, conditions: string = '', values: any[] = []) => {
    const query = `SELECT * FROM ${tableName} ${conditions}`;
    return executeQuery(query, values);
}

export const getOne = (val : any | any[]) => {
    if (Array.isArray(val)){
        return val[0];
    }
    return val;
}