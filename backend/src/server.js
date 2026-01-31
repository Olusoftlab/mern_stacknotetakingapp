import express from "express"
import notesRoutes from "./routes/notesRoutes.js "
import { connectDb } from "../config/db.js"
import dotenv from "dotenv"
import { myLimiter } from "./middleware/ratelimiter.js"
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))

const PORT = process.env.PORT || 5000




app.use(myLimiter)


app.use("/api/notes", notesRoutes)


// app.get("/", (req,res)=>{

//     res.send("this is my home route") 
// })




connectDb().then(() => {


   app.listen(PORT, () => {

      console.log("server running on port 7000")

   })


})


