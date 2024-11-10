import dotenv from 'dotenv'; // Import dotenv at the top
dotenv.config(); // Load environment variables

import app from './app.js';
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000;
// console.log("MONGO_URI:", process.env.MONGO_URI);


app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`Server is listening at http://localhost:${PORT}`);
});


