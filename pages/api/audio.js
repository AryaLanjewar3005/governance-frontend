// import clientPromise from "../../lib/mongodb";
// // Replace the uri string with your MongoDB deployment's connection string.

// // Create a new client and connect to MongoDB

// export default async (req, res) => {
//     try {
//         // Connect to the "insertDB" database and access its "haiku" collection
//         const client = await clientPromise;
//         const database = client.db("Audio");
//         const haiku = database.collection("AudioFiles");

//         // Create a document to insert
//         const doc = {
//             title: "Record of a Shriveled Datum",
//             content: "No bytes, no problem. Just insert a document, in MongoDB",
//         }
//         // Insert the defined document into the "haiku" collection
//         const result = await haiku.insertOne(doc);

//         // Print the ID of the inserted document
//         console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         // Close the MongoDB client connection
//         await clientPromise.close();
//     }
// }


// Run the function and handle any errors
// run().catch(console.dir);


// // pages/api/upload.js

// import multer from 'multer';
// import clientPromise from '../../lib/mongodb';

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const handler = async (req, res) => {
//     if (req.method === 'POST') {
//         try {
//             const client = await clientPromise

//             const db = client.db('Audio'); // Replace with your database name
//             const collection = db.collection('AudioFiles'); // Replace with your collection name

//             const audioBuffer = req.file.buffer;
//             const result = await collection.insertOne({
//                 filename: req.file.originalname,
//                 audio: audioBuffer,
//             });

//             console.log('Audio file stored in MongoDB:', result);

//             res.status(200).json({ message: 'File uploaded successfully!' });
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// };

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default upload.single('audioFile')(handler);


// import fs from 'fs';
// import ffmpeg from 'fluent-ffmpeg';
// // import { MongoClient } from 'mongodb';
// import clientPromise from '../../lib/mongodb';

// const inputFile = require('../../assets/song1.mp3');
// const outputFile = require('../../assets/song1.mp3');

// // Convert audio file

// ffmpeg(inputFile)
//     .toFormat('wav')
//     .on('end', () => {
//         console.log('Audio conversion finished.');
//         storeAudioFile(outputFile, 'Audio', 'AudioFiles');
//     })
//     .on('error', (err) => {
//         console.error('Error:', err);
//     })
//     .save(outputFile);

// // Store audio file in MongoDB using GridFS

// async function storeAudioFile(filePath, dbName, collectionName) {

//     try {
//         const client = await clientPromise;
//         const database = client.db(dbName);
//         const collection = database.collection(collectionName);

//         // Read the audio file content
//         const audioBuffer = fs.readFileSync(filePath);

//         // Store the audio file in MongoDB using GridFS
//         const result = collection.insertOne({
//             filename: 'Audio1.wav',
//             audio: audioBuffer,
//         });

//         console.log('Audio file stored in MongoDB:', result);
//     } finally {
//         await clientPromise.close();
//     }
// }



// pages/api/upload.js

// pages/api/upload.js

// import multer from 'multer';
// import { MongoClient } from 'mongodb';

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const handler = async (req, res) => {
//     if (req.method === 'POST') {
//         try {
//             const client = new MongoClient('mongodb + srv://mohit1504:mohitonchainradio123@cluster0.2nzlvj0.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
//             await client.connect();

//             const db = client.db('Audio'); // Replace with your database name
//             const collection = db.collection('AudioFiles'); // Replace with your collection name

//             const inputFileBuffer = req.file.buffer;

//             // Convert the audio buffer to WAV using ffmpeg
//             const outputFileBuffer = await convertToWav(inputFileBuffer);

//             // Store the audio file in MongoDB using GridFS
//             const result = await collection.insertOne({
//                 filename: req.file.originalname.replace(/\..+$/, '.wav'),
//                 audio: outputFileBuffer,
//             });

//             console.log('Audio file stored in MongoDB:', result);

//             res.status(200).json({ message: 'File uploaded successfully!' });
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// };

// const convertToWav = (inputBuffer) => {
//     return new Promise((resolve, reject) => {
//         const tempInputFile = 'tempInput.mp3';
//         const tempOutputFile = 'tempOutput.wav';

//         // Write the input buffer to a temporary file
//         fs.writeFileSync(tempInputFile, inputBuffer);

//         // Convert the temporary input file to WAV using ffmpeg
//         ffmpeg(tempInputFile)
//             .toFormat('wav')
//             .on('end', () => {
//                 const outputBuffer = fs.readFileSync(tempOutputFile);

//                 // Clean up temporary files
//                 fs.unlinkSync(tempInputFile);
//                 fs.unlinkSync(tempOutputFile);

//                 resolve(outputBuffer);
//             })
//             .on('error', (err) => {
//                 reject(err);
//             })
//             .save(tempOutputFile);
//     });
// };

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default upload.single('audioFile')(handler);


// import clientPromise from "../../lib/mongodb";
// import { writeFile } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";
// import {join} from 'path'

// export default async function POST(request : NextRequest) {
//     const data = await request.formData();
//     const file: File | null =data.get('file') as unknown as File
//     if(!file){
//         return NextResponse.json({success: false})
//     }

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const path = join('/', 'tmp', file.name)
//     await writeFile(path, buffer)
//     console.log(`open${path} to see the uploaded file`)

//     return NextResponse.json({success :true})
// };


// generateSampleData.js

import { MongoClient } from "mongodb";
import fs from 'fs'
import path from "path";

export default async (req, res) => {
  const uri = 'mongodb+srv://mohit1504:mohitonchainradio123@cluster0.2nzlvj0.mongodb.net/?retryWrites=true&w=majority' // Replace with your MongoDB URI
  const dbName = 'Audio'; // Replace with your database name
  const collectionName = 'AudioFiles'; // Replace with your collection name

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert sample audio file records
    const sampleAudioFiles = [
      {
        filename: 'SampleAudio1.wav',
        audio: fs.readFileSync(path.join(process.cwd(), 'public', 'assets', 'song1.mp3')), // Replace with the actual path
      },
      {
        filename: 'SampleAudio2.wav',
        audio: fs.readFileSync(path.join(process.cwd(), 'public', 'assets', 'song2.mp3')), // Replace with the actual path
      },
      // Add more sample audio files as needed
    ];

    const result = await collection.insertMany(sampleAudioFiles);
    console.log('Sample data inserted:', result.insertedCount);
    res.json(result);
  } catch (error) {
    console.error('Error generating sample data:', error);
  } finally {
    await client.close();
  }
}