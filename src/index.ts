import { IMenuItem } from './MenuItem';
import { IReservationItem } from './ReservationItem';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
app.use(cors());
var jsonParser = bodyParser.json()

const port = process.env.PORT || 3000;
const menus: { breakfast: IMenuItem[], lunch: IMenuItem[], dinner: IMenuItem[] } = require('../data/menus.json');
const reservations: {available: IReservationItem[], reserved: IReservationItem[]} = require('../data/reservations.json');

app.get('/', (req: any, res: any) => {
    res.status(200);
    return res.json('Server is working');
});

app.get('/menus', (req: any, res: any) => {
    res.status(200);
    return res.json(menus);
});

app.get('/reservation', (req: any, res: any) => {
    res.status(200);
    return res.json(reservations);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});