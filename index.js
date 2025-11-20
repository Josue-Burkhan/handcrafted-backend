import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
