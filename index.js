import express from 'express';
import { connectDB } from './db.js';
import { Card } from './models/Cards.js';
import cors from 'cors';
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

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

app.delete("/deleteCard/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedCard = await Card.findByIdAndDelete(id); 

        if (!deletedCard) {
        return res.status(404).json({ message: "Card not found" });
        }
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting card" });
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