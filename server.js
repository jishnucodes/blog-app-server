import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './src/config/dbConfig.js';
import cookieParser from 'cookie-parser';
import router from './src/index.js';

const app = express();

connectToDB();
app.use(cors())
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 3000;



app.use("/api/v1", router);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
  app.listen(port, (error) => {
    console.log(`Example app listening on port ${port}`);
    
  })