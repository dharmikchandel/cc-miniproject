import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import assessmentRoutes from './routes/assessmentRoutes';
import resultsRoutes from './routes/resultsRoutes';
import { getAssessments } from './controllers/dashboardController';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assess', assessmentRoutes);
app.use('/api/results', resultsRoutes);
app.get('/api/assessments', getAssessments);

// Basic health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CCM Advisor Backend is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
