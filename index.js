import "dotenv/config"
import express from 'express';
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import loginRoutes from "./routes/login.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(indexRoutes);
app.use(usersRoutes);
app.use(loginRoutes);

app.listen(7000, console.log("http://localhost:7000"));