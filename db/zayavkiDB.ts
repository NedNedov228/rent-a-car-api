import { createTable, selectFromTable, executeQuery } from './utils';

const zayavkiDB = {
    createZayavkiTable: () => createTable('zayavki', 'id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, auto INTEGER, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id)'),
    getZayavkiDataByUserId: (id: number) => selectFromTable('zayavki', `WHERE user_id = ?`, [id]),
    insertZayavkiData: (description : string, status : number, user_id : number) => executeQuery('INSERT INTO zayavki (description, status, user_id) VALUES (?, ?, ?)', [description, status, user_id]),
    deleteZayavkiData: (id: number) => executeQuery('DELETE FROM zayavki WHERE id = ?', [id]),
    getZayavkiDataById: (id: number) => selectFromTable('zayavki', `WHERE id = ?`, [id]),
}

export default zayavkiDB;