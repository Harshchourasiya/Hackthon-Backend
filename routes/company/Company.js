const express = require("express");
const router = express.Router();
const Company = require("../../Schema/CompnaySchema");
const Test = require("../../schema/TestSchema");
const { generateId } = require('../../helper/utilFuctions');

// POST route for company signup
router.post("/signup", async (req, res) => {
  const { name, country, about, email, sector, password } = req.body;

  try {
    // Create a new company instance
    const newCompany = new Company({
      name,
      country,
      about,
      email,
      sector,
      password,
    });

    // Save the new company to the database
    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error("Company creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Company.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    if (password !== Company.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // User is authenticated
    res.status(200).json({ message: "Login successful", Company });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



/*
We want all the data that is requied in the schema from frontend
//*!NOTE: email of the company
*/
router.post('/createOrEditTest', async (req, res) => {
  const { email, id, title, des, role, ctc, location, course, eligibility } = req.body;
  const company = await Company.findOne({ email: email });
  if (!company)  res.status(401).json({ "message": "Invalid Company"});
  else {
    if (id) {
      // If Id exists, update the test
      try {
        const test = await Test.findOneAndUpdate({ id: id }, { title, des, ctc, role, location, course, eligibility }, { new: true });
        if (test) {
          res.status(200).json({ "data": test });
        } else {
          res.status(401).json({ "message": "Invalid Test"});
        }
      } catch (err) {
        res.status(401).json({ "message": "Failed"});
      }
    } else {
      // if Id not exists, create a new test
      const testId = generateId();
      const test = new Test({ id: testId, title, des: des, ctc: ctc, role: role, location: location, course: course, eligibility: eligibility });
      try {
        await test.save();
        company.test.push(testId);
        await company.save();
        res.status(200).json({"data": test });
      } catch (err) {
        res.status(401).json({ "message": "Failed"});
      }
    }
  }
});


/*
to get all the test that the company created
//*!NOTE: I need Email which will be used as a ID 
*/
router.get('/getAllTest', async (req, res) => {
  const email = req.body.email;
  const data = await Company.findOne({ email: email });
  if (data) {
    const resData = []
    for (let id of data.test) {
      const test = await Test.findOne({ id: id });
      if (test) resData.push(test);
    }
    res.status(200).json({"data": resData });
  } else {
    res.status(401).json({ "message": "Failed"});
  }

});


/*
just want the ID of the test
*/

router.delete('/deleteTest', async (req, res) => {
  const id = req.body.id;
  if (id) {
    await Test.deleteOne({ id: id });
    res.status(200).json({ "Message": "Success"});
  } else {
    res.status(401).json({ "message": "Failed"});
  }
})

module.exports = router;
