import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import axiosInstance from "../lib/axios.js"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'


const NoteCard = ({ mynote, setNote }) => {

    const navigate = useNavigate()

    const handleDelete = async (e, id) => {

        e.preventDefault()

        if (!window.confirm("Aew you sure youwant to delete this note")) return


        try {

            await axiosInstance.delete(`/notes/${id}`)
            setNote(prev => prev.filter(item => item._id !== id))
            toast.success("Note deleted successfullyy")

        } catch (error) {

            console.log("Error deleting note")
            toast.error("Error deleting note")
        }

    }


    const handleUpdate = async (e, id) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to edit note")) return

        try {

            await axiosInstance.put(`/notes/${id}`, { content: 'My first editing is here', title: "Almighty" })
            const res = await axiosInstance.get("/notes")
            setNote(res.data)
            toast.success("successfully updated note")
        } catch (error) {
            console.log("error updating database", error)
            toast.error("Error updating note")
        }



    }









    return (
        <Link to={`/note-page/${mynote._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d] '>

            <div className='card-body' >
                <h3 className='card-title text-base-content' >{mynote.title}</h3>
                <p className='text-base-content/70 line-clamp-3'  >{mynote.content}</p>
                <div className='card-actions justify-between items-center mt-4'  >

                    <span className='text-sm text-base/60'>
                        {formatDate(new Date(mynote.createdAt))}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4' onClick={(e) => handleUpdate(e, mynote._id)} />
                        <button onClick={(e) => handleDelete(e, mynote._id)} className='btn btn-ghost btn-xs text-error'>

                            <Trash2Icon className='size-4' />

                        </button>
                    </div>

                </div>
            </div>


        </Link>
    )
}

export default NoteCard