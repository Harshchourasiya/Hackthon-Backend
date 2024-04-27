const express = require("express");
const app = express();
const db = require("./db");

// middleware to get the data from frontend , can be in multiple forms , json, html, urlencoded ,etc
// here is an example of json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the router files
const companyRoutes = require("./routes/CompanyRoute");
const jobSeekerRoutes = require("./routes/JobSeekerRoute");

app.use("/company", companyRoutes);
app.use("/jobseeker", jobSeekerRoutes);

app.listen(3000, () => {
  console.log("Server is running on Port 3000!");
});
