const express = require("express");
const app = express();
const cors = require("cors");
require("./helper/databaseUtility").connectToServer;
const corsOptions = {
  origin: true,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
// middleware to get the data from frontend , can be in multiple forms , json, html, urlencoded ,etc
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors(corsOptions))
// Import the router files
const companyRoutes = require("./routes/company/Company");
const jobSeekerRoutes = require("./routes/user/User");

app.use("/company", companyRoutes);
app.use("/user", jobSeekerRoutes);

app.listen(3000, () => {
  console.log("Server is running on Port 3000!");
});
