import Note from "../model/Note.js"



export const getNotes=async(req,res)=>{

     try {
        
       const notes=await Note.find().sort({createdAt:1})
    
       res.status(200).json(notes)  


     } catch (error) {
       
        console.error("Error fetching notes",error)
        res.status(500).json({message:"internal server error"}) 
        

     } 
   
  

}


export const getNoteById=async(req,res)=>{

      try {
            
          const getNote=await Note.findById(req.params.id)
          if (!getNote) return res.status(404).json({message:"note not found"})

          res.status(200).json(getNote)  

      } catch (error) {
           
            console.error("Error fetching notes",error)
            res.status(500).json({message:"internal server error"}) 

      }
     

}



export const createPost=async(req,res)=>{
   
       try {
        
           const {title,content}=req.body

           const newNote=new Note({title,content})  
           await newNote.save()
        
           console.log(newNote)
           res.status(201).json(newNote)                

       } catch (error) {
                   
           console.error("Error creating note") 
           res.status(500).json({message:"internal server error"})
       }



}

export const updatePost=async(req,res)=>{

    try {
        
       const {title,content}=req.body
       const id=req.params.id

       const updatedData=await Note.findByIdAndUpdate(id,{title,content})

      if (!updatedData)res.status(404).json({message:"Note not found"})  


      res.status(200).json(updatedData)  

    } catch (error) {
         console.error("Error updating data") 
         res.status(500).json({message:"internal server error"})

    }      


}

export const deletePost=async(req,res)=>{
   
      try{
        
         const deletedData=await Note.findByIdAndDelete(req.params.id)
         
         if (!deletedData)res.status(404).json({message:"data not found"})
          res.status(200).json({message:"successfully deleted data"})

      }catch{
           
            console.error("Error updating data") 
            res.status(500).json({message:"internal server error"})

      }

     
}