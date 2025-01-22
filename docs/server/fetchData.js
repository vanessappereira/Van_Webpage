import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

// Load environment variables from .env file
config();

const uri = process.env.MONGO_URI;
const collections = ['perfil', 'formacao', 'experiencia_profissional'];

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

async function fetchData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
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
        console.error('Error:', error);
        return null;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

app.get('/api/data', async (req, res) => {
    const data = await fetchData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
