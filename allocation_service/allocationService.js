const express = require("express");
const app = express();
const PORT = 4000;

// how should the service receive the company name ?
// FINALIZED - via query parameter
app.get("/allocation", (req, res) => {
  const companyName = req.query.company;

  const response = {
    companyName: companyName,
    time: Date.now(),
    duration: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Allocation Service is running on port ${PORT}`);
});
