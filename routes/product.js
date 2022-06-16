const { Router } = require("express");
const router = Router();
const { removeItem, addMenu, findItem } = require("../model/menu");

router.post("/", async (req, res) => {
  const productId = req.body.id;
  const productTitle = req.body.title;
  const productDesc = req.body.desc;
  const productPrice = req.body.price;
  if (
    productId == undefined ||
    productTitle == undefined ||
    productDesc == undefined ||
    productPrice == undefined
  ) {
    res.status(400).send("Missing Data");
    return;
  }

  if (!Number.isInteger(productId) || !Number.isInteger(productPrice)) {
    res.status(400).send("Wrong type");
    return;
  }

  if (typeof productDesc !== "string" || typeof productTitle !== "string") {
    res.status(404).send("Wrong type");
    return;
  }
  const productExist = await findItem(req.body.id);
  if (productExist.length !== 0) {
    res.status(400).send("Already Exist");
    return;
  }
  const result = addMenu({
    id: productId,
    title: productTitle,
    desc: productDesc,
    price: productPrice,
  });
  if (!result) {
    res.status(501).send("Internal Server Error");
    return;
  }
  res.json("productadded");
});

router.delete("/", async (req, res) => {
  const productId = req.body.id;
  if (productId != undefined && Number.isInteger(productId)) {
    console.log(productId);
    const isItemRemoved = await removeItem(productId);
    if (isItemRemoved) {
      res.json("productremoved");
    } else {
      res.status(404).send("No product Id Matched");
    }
  } else {
    res.status(400).send("No product Id Provided");
  }
});
module.exports = router;
