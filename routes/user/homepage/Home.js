const express = require("express");
const router = express.Router();
const Test = require("../../../schema/TestSchema");

// need: query
router.get('/search', async(req, res)=> {
    const query = req.query.query;
    if (query) {
        const resData = await Test.find({
            $or: [
              { title: { $regex: query } },
              { des: { $regex: query } }
            ]
          });
        res.status(200).json({"data": resData}); 
    } else {
        res.status(400).json({"message": "Invalid Query Search"});
    }
});

// need: degree

router.get("/recommended", async(req, res)=> {
    const degree = req.query.degree;
    if (degree) {
        const resData = await Test.find({ eligibility: { $regex: degree, $options: 'i' } });
        res.status(200).json({"data": resData});
    } else {
        res.status(400).json({"message": "Invalid Degree"});
    }
});


router.get("/allTest", async(req, res) => {
    const resData = await Test.find({});
    res.status(200).json({"data": resData});    
});


module.exports = router;