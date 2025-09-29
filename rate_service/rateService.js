const express = require("express");
const app = express();
const PORT = 3000;

// how should the service receive the company name ?
// FINALIZED - via query parameter
app.get("/rate", (req, res) => {
  const companyName = req.query.company;

  const response = {
    companyName: companyName,
    time: Date.now(),
    rate: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Rate Service is running on port ${PORT}`);
});
