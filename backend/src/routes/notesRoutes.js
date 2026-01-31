import express from "express"
import {getNotes,createPost, getNoteById,updatePost,deletePost} from "../notesController/notesController.js"


const router=express.Router()


 router.get("/", getNotes  )
 router.get("/:id", getNoteById  )
router.post("/", createPost)


router.put("/:id", updatePost)


router.delete("/:id", deletePost )



export default router