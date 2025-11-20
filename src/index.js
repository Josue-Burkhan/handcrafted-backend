const express = require('express');
const config = require('./config/config');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

app.use(`${config.api.prefix}/products`, productRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
