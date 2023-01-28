/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import generalRoutes from "./routes/general.js";

/* MongoDB DATA MOCK Imports */
// import Product from "./models/Product.js";
// import { dataProduct } from "./data/index.js";
// import ProductStat from "./models/ProductStat.js";
// import { dataProductStat } from "./data/index.js";
// import User from "./models/User.js";
// import { dataUser } from "./data/index.js";
// import Transaction from "./models/Transaction.js";
// import { dataTransaction } from "./data/index.js";
// import OverallStat from "./models/OverallStat.js";
// import { dataOverallStat } from "./data/index.js";
// import AffiliateStat from "./models/AffiliateStat.js";
// import { dataAffiliateStat } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);
app.use("/general", generalRoutes);

/* SETTING UP MONGODB */
const PORT = process.env.PORT || 9000;

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

  /* Inserting data in MongoDB */
  // OverallStat.insertMany(dataOverallStat);
  // Product.insertMany(dataProduct);
  // ProductStat.insertMany(dataProductStat);
  // User.insertMany(dataUser);
  // Transaction.insertMany(dataTransaction);
  // AffiliateStat.insertMany(dataAffiliateStat);
}).catch((error) => {
  console.log(error);
});
