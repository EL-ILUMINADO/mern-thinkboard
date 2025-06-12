import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//  Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // this middleware is used to parse the json data from the request body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server started on PORT:", PORT);
  });
});
