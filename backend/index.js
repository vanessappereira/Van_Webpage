import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

config();

const uri = process.env.MONGODB_URL;
const collections = ['perfil', 'formacao', 'experiencia_profissional'];

const app = express();
const port = 3000;
app.use(cors());

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Function to fetch data from MongoDB
async function fetchData(client) {
    try {
        const database = client.db('Van_Webpage');
        const data = {};

        for (const collectionName of collections) {
            const collection = database.collection(collectionName);
            const documents = await collection.find({}).toArray();
            data[collectionName] = documents.map(doc => {
                delete doc._id;
                return doc;
            });
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to handle API request
async function handleAPIRequest(req, res) {
    try {
        const client = await connectToMongoDB();
        const data = await fetchData(client);
        await client.close();
        console.log('Disconnected from MongoDB');
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
}

app.get('/api/data', handleAPIRequest);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});