import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reviews from "./routers/reviews.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4040;

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully connected to MongoDB!")
);

const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

const cors = (request, response, next) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

app.use("/reviews", reviews);

app.get("/status", (req, res) => {
  res.json({ message: "API is running" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
