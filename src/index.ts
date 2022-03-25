import express, { Application, Request, Response } from "express";
require("./db/mongoose");
import cors from "cors";

//routers
import userRouter from "./routers/user.router";
import listRouter from "./routers/list.router";

const app: Application = express();
const port = 8080;

const allowedOrigins = ["http://localhost:3000", "https://iinact.vercel.app"];

// middlwares
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json({ limit: "10mb" }));

//appending routers to app
app.use("/user", userRouter);
app.use("/list", listRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("it's up and away");
});

app.listen(port, () => console.log(`Server up and running on ${port}`));
