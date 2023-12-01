import 'dotenv/config';
import express from 'express';
import sequelize from 'sequelize';
import { authRouter } from './routes/auth_route.js';

const PORT = process.env.PORT || 3004;

const app = express();
app.use(express.json());

app.use(authRouter);

app.get('/', (req, res) => {
  res.send('Hello');
})

app.listen(PORT, () => {
  console.log('server is running');
});