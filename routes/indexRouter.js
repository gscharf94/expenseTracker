const express = require("express");
const router = express.Router();
const {
  getSum,
  formatCurrency,
  getGraphData,
} = require("../helperFunctions.js");

router.get("/:user", (req, res) => {
  console.log(`${req.params.user} accessing main page`);
  if (req.params.user == "admin") {
    let sums = {};
    let graphData = {};
    const users = ["Thiago", "Cesar"];
    for (const user of users) {
      sums[user] = formatCurrency(getSum(user));
      graphData[user] = getGraphData(user);
    }
    res.render("indexAdmin", {
      sums: sums,
      user: "admin",
      graphData: JSON.stringify(graphData),
    });
  } else {
    const usr = req.params.user[0].toUpperCase() + req.params.user.slice(1);
    const sum = getSum(usr);
    res.render("index", {
      balance: formatCurrency(sum),
      user: usr,
    });
  }
});

module.exports = router;
