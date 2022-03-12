import mongoose, { ConnectOptions } from "mongoose";
import ENDPOINTS from "../utils/config/endpoints.config";

mongoose.connect(
  `${ENDPOINTS.DB_PASSWORD}@iinact.icq9t.mongodb.net/iinact?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions
);

const db = mongoose.connection;

db.on("error", () => console.log("Unable to connect to DB"));