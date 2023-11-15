import express from "express";
import { HOST, PORT } from "./config/config.js";
import paymentsRouter from "./routes/payment.routes.js";

const app = express();
app.use(paymentsRouter);
app.listen(PORT);


console.log('Server Connect: ' + `${HOST}${PORT}`);