const express = require('express');
const cors = require('cors');
const receiptRoutes = require('./routes/receipts');

const app = express();
app.use(cors());  // ✅ CORS first
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Receipt Processor API is running." });
});

app.use('/receipts', receiptRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
