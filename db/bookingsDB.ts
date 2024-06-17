import { createTable, selectFromTable, executeQuery } from './utils';

const bookingsDB = {
    createBookingsTable: () => createTable('bookings', 'id INTEGER PRIMARY KEY AUTOINCREMENT, period TEXT, auto INTEGER, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id)'),
    getBookingsDataByUserId: (id: number) => selectFromTable('bookings', `WHERE user_id = ?`, [id]),
    insertBookingsData: (period : string, auto : number, user_id : number) => executeQuery('INSERT INTO bookings (period, auto, user_id) VALUES (?, ?, ?)', [period, auto, user_id]),
    deleteBookingsData: (id: number) => executeQuery('DELETE FROM bookings WHERE id = ?', [id]),
    getBookingsDataById: (id: number) => selectFromTable('bookings', `WHERE id = ?`, [id]),
}

export default bookingsDB;