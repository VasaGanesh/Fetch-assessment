const express = require('express');
const app = express();
const receiptRoutes = require('./routes/receipts');

app.use(express.json());
app.use('/receipts', receiptRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});