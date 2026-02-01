import mongoose from "mongoose"




export const connectDb = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected successfully")

    } catch (error) {

        console.error("error connecting to mongodb", error)

    }

}