import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js';
import authRouter from './routes/authRoutes.js'
import errorHandler from './middleware/error.js'
import cookieParser from "cookie-parser";
import resumeRouter from "./routes/resumeRoutes.js"


const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const app = express();
const prisma = new PrismaClient();


const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      CLIENT_URL, 
      "http://localhost:3000", 
    ];

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true, 
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/resume', resumeRouter);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});



export default prisma;