pages / api / audio.js

import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';

export default async (req, res) => {
    const client = new MongoClient('mongodb+srv://mohit1504:mohitonchainradio123@cluster0.2nzlvj0.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db("Audio");
    const collection = db.collection("AudioFiles");

    const audios = await collection.find({}).toArray();
    console.log(audios)

    const io = new Server();

    io.on('connection', (socket) => {
        console.log('Client connected');

        // Emit the initial list of audio files when a client connects
        socket.emit('audioUpdate', audios);

        // You might listen for other events from the client and perform updates accordingly
    });

    io.on('disconnect', () => {
        console.log('Client disconnected');
    });

    res.status(200).json(audios);
};
