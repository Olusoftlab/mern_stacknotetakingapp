import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from "react-router"

const NoteNotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center py-16 space-y-6 text-center'>

            <div className='bg-primary/10 rounded-full p-8 '>

                <NotebookIcon className='size-10 text-primary' />

            </div>

            <h3 className='font-bold text-2xl'  >No notes yet</h3>
            <p className='text-base-content/90' >
                Ready to organize your thoughts. Create your first note to get started on your journey
            </p>

            <Link to="/create-page" className="btn btn-primary">
                Create your first note
            </Link>

        </div>
    )
}

export default NoteNotFound