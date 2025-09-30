const express = require("express");
const app = express();
const PORT = 5000;

// how should the service receive the company name ?
// FINALIZED - via query parameter
app.get("/logistic", (req, res) => {
  const companyName = req.query.company;

  const response = {
    companyName: companyName,
    time: Date.now(),
    location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  };

  res.json(response);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Logistic Service is running on port ${PORT}`);
});
