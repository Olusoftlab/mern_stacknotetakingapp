import express from "express"
import notesRoutes from "./routes/notesRoutes.js "
import { connectDb } from "../config/db.js"
import dotenv from "dotenv"
import { myLimiter } from "./middleware/ratelimiter.js"
import cors from "cors"
import path from "path"

dotenv.config()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV !== "production") {

   app.use(cors({ origin: "http://localhost:5173" }))
}




const PORT = process.env.PORT || 5000

const __dirname = path.resolve()


app.use(myLimiter)


app.use("/api/notes", notesRoutes)


console.log("hello world you are welcome")

if (process.env.NODE_ENV === "production") {

   app.use(express.static(path.join(__dirname, "../frontend/dist")))

   app.get("/{*splat}", (req, res) => {

      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))

   })

}




// app.get("/", (req,res)=>{

//     res.send("this is my home route") 
// })




connectDb().then(() => {


   app.listen(PORT, () => {

      console.log("server running on port 7000")

   })


})


