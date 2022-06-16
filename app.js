
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());



const orderRouter = require("./routes/order");
const accountsRouter = require("./routes/accounts");
const menuRouter = require("./routes/menu");
const productRouter = require("./routes/product");
const passCheck = require("./passCheck/passCheck");


app.use("/api/menu", menuRouter);
app.use("/api/account", accountsRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", passCheck, productRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
