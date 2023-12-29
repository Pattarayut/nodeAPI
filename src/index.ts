import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import connectDB from "../config/db";
// security api
import helmet from "helmet";
// limit api
import rateLimit from "express-rate-limit";
// open access api
import cors from "cors";

import usersRouter from "../routes/users";
import productRouter from "../routes/product";

// middleware error
import errorHandler from "../middleware/errorHandler";

const app: Application = express();

// use cors open access api
app.use(cors());

// config for env
import config from "../config/index";
import passport from "passport";
connectDB();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
// apply to all requests
app.use(limiter);

app.use(bodyParser.json());

// use helmet security
app.use(helmet());
app.use(passport.initialize());

app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb", // fix size file picture
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const PORT: number = Number(config?.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server" + config?.JWT_SECRET);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use("/api/users", usersRouter);
app.use("/api/product", productRouter);

// use middleware error
app.use(errorHandler);

// module.exports = app;
export default app;
