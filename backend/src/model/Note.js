import mongoose from "mongoose"

const noteSchema=new mongoose.Schema({

      title:{
          type:String,
          required:true 
      },

      content:{
          type:String,
          required:true
      }

}, {timestamps:true} )  // database schema

const Note=mongoose.model("Note", noteSchema)  //model based off schema

export default Note