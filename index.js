import express from 'express';
import { connectDB } from './db.js';
import { Card } from './models/Cards.js';
const app = express();
connectDB();

app.use(express.json());

app.post("/createCard", async (req, res) => {
    try {
        const card = await Card.create(req.body);
        console.log(card);
        res.status(201).json(card).send("Card created successfully");
    }catch (error){
        console.error(error);
    }
});

app.get("/getAllCards", async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards)
    }catch (error){
        res.status(400).send(error);
        console.error(error);
    }
});

app.get("/getCard/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    }catch (error){
        res.status(400).send(error);
        console.error(error);
    }
});

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos:" + user + "" + email);
    res.status(200).send("Datos recibidos correctamente");
})


app.get("/hello", (req, res) => {
    res.status(200).send("Hola mundo desde node.js");
});

app.get("/hola", (req, res) => {
    res.status(200).send("Hello world from node.js");
});

app.listen(3000, () => {
    console.log("Servidro ejecutantdose en http://localhost:3000");
});