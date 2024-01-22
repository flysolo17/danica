const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middlewares

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// routes

const authRoute = require("./routes/auth-route");
app.use("/auth", authRoute);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running to PORT ${PORT}`);
});
