const express = require("express");
const app = express();
app.use(express.json());

async function scatter(company = "ABC") {
  // RATE SERVICE
  const fetchRate = new Promise(async (resolve) => {
    let done = false;

    // timeout after 2s
    setTimeout(() => {
      if (!done) {
        console.error("Rate service timeout");
        resolve("no response");
      }
    }, 2000);

    try {
      console.log(`Fetching rate for company: ${company}`);
      const res = await fetch(
        `http://rateService:3000/rate?company=${company}`
      );
      const data = await res.json();
      done = true;
      resolve(data.rate || "no response");
    } catch (err) {
      console.error("Rate service error:", err);
      resolve("no response");
    }
  });

  // ALLOCATION SERVICE
  const fetchAllocation = new Promise(async (resolve) => {
    let done = false;

    setTimeout(() => {
      if (!done) {
        console.error("Allocation service timeout");
        resolve("no response");
      }
    }, 2000);

    try {
      const res = await fetch(
        `http://allocationService:4000/allocation?company=${company}`
      );
      const data = await res.json();
      done = true;
      resolve(data.duration || "no response");
    } catch (err) {
      console.error("Allocation service error:", err.message);
      resolve("no response");
    }
  });

  // LOGISTIC SERVICE
  const fetchLogistic = new Promise(async (resolve) => {
    let done = false;

    setTimeout(() => {
      if (!done) {
        console.error("Logistic service timeout");
        resolve("no response");
      }
    }, 2000);

    try {
      const res = await fetch(
        `http://logisticService:5000/logistic?company=${company}`
      );
      const data = await res.json();
      done = true;
      resolve(data.location || "no response");
    } catch (err) {
      console.error("Logistic service error:", err.message);
      resolve("no response");
    }
  });

  // run all 3 at once
  const [rate, duration, location] = await Promise.all([
    fetchRate,
    fetchAllocation,
    fetchLogistic,
  ]);

  return {
    company,
    time: Date.now(),
    value: rate,
    duration: duration,
    location: location,
  };
}

// expose a route so clients can call it
app.get("/scatter-gather", async (req, res) => {
  const { company = "ABC" } = req.query;

  try {
    const results = await scatter(company);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to gather data" });
  }
});

// start server
const PORT = 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`scatterGather Service is running on port ${PORT}`);
});
