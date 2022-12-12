import { IMenuItem } from './MenuItem';
import { IReservationItem } from './ReservationItem';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
app.use(cors());
var jsonParser = bodyParser.json()
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const menus: { breakfast: IMenuItem[], lunch: IMenuItem[], dinner: IMenuItem[] } = require('../data/menus.json');
const available: IReservationItem[] = require('../data/available.json');
const reservations: IReservationItem[] = require('../data/reservations.json');

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
    return res.json({available, reservations});
});

// modify a reservation (used to reduce the max party number)
app.put('/reservation', (req: any, res: any) => {
    const availableReservation = available.find(c => c.id == req.body.id)
    const availiableReservation_index = available.findIndex(c => c.id == req.body.id)
    if (availableReservation) {
        console.log(`body is ${JSON.stringify(req.body)}`);
        available[availiableReservation_index] = req.body;
        return res.sendStatus(200);
    }
    res.status(404);
    return res.json({ error: `Reservation with id:${req.body.id} not found.` });
});

// Delete a reservation from available
app.delete('/reservation', (req: any, res: any) => {
    const availableReservation = available.find(c => c.id == req.body.id)
    console.log(req.body.id)
    const availiableReservation_index = available.findIndex(c => c.id == req.body.id)
    console.log(availiableReservation_index)
    if (availableReservation) {
        available.splice(availiableReservation_index, 1)
        return res.status(200);
    }
    res.status(404);
    return res.json({ error: `Reservation with id:${req.body.id} not found.` });
});

// add a reservation to the confirmed list
app.post('/reservation', (req: any, res: any) => {
    console.log(`body is ${JSON.stringify(req.body)}`);
    reservations.push(req.body);
    return res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});