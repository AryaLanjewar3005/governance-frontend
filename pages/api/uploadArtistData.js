import { MongoClient } from "mongodb";

export default async (req, res) => {
    const uri = 'mongodb+srv://mohit1504:mohitonchainradio123@cluster0.2nzlvj0.mongodb.net/?retryWrites=true&w=majority' // Replace with your MongoDB URI
    const dbName = 'Audio'; // Replace with your database name
    const collectionName = 'AudioFiles'; // Replace with your collection name

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // console.log("req content ", req.body)

        const uploadTime = new Date();

        const { artistName, songName, collectionType, streamingType, streamingTime, ipfsHash, status } = req.body;

        const result = await collection.insertOne({
            artistName: artistName,
            songName: songName,
            collectionType: collectionType,
            streamingType: streamingType,
            streamingTime: streamingTime,
            ipfsHash: ipfsHash,
            uploadTime: uploadTime,
            status: status
        });

        console.warn('Sample data inserted succesfully');
        res.json(result);
        res.status(200).json({ success: true, message: 'Song registered successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}