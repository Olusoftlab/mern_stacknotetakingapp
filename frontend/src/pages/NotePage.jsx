import React from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axiosInstance from "../lib/axios"
import toast, { ToastBar } from 'react-hot-toast'
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from 'lucide-react'

const NotePage = () => {

    const [notes, setNotes] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)

    const navigate = useNavigate()

    const { id } = useParams()


    React.useEffect(() => {

        const fetchNote = async () => {

            try {

                const res = await axiosInstance.get(`/notes/${id}`)
                setNotes(res.data)

            } catch (error) {
                console.log("Error in fetching note", error)
                toast.error("Failed to fetch note")

            } finally {

                setLoading(false)

            }


        }

        fetchNote()

    }, [id])


    const handleDelete = async (id) => {

        if (!window.confirm("are you sure you want to delete")) return


        try {

            await axiosInstance.delete(`/notes/${id}`)
            toast.success("Successfully deleted data")

        } catch (error) {

            console.log("Error in deleting note", error)
            toast.error("Error deleting data")
        } finally {


            setNotes({ ...notes, title: "", content: "" })

        }


    }


    const handleSave = async (id, myNote) => {

        if (!myNote.title.trim() || !myNote.content.trim()) {

            toast.error("please provide either note or title")
            return
        }



        try {
            setSaving(true)
            await axiosInstance.put(`/notes/${id}`, { title: myNote.title, content: myNote.content })
        } catch (error) {

            console.log("Error saving data", error)
            toast.error("Error saving data")

        } finally {

            setSaving(false)
            setNotes({ ...notes, title: "", content: "" })

        }


    }





    if (loading) {

        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>

                <Loader2Icon className="animate-spin size-10" />

            </div>

        )

    }



    return (
        <div className='min-h-screen bg-base-200'
        >
            <div className='container mx-auto px-4 py-8'>

                <div className='max-w-2xl mx-auto' >

                    <div className='flex items-center justify-between mb-4'>

                        <Link to="/" className='btn btn-ghost' >
                            <ArrowLeftIcon className='size-5' />
                            Back to Notes
                        </Link>

                        <button onClick={() => handleDelete(notes._id)} className='btn btn-error btn-outline'>

                            <Trash2Icon className='size-5' />
                            Delete Note
                        </button>


                    </div>

                    <div className='card bg-base-100'>

                        <div className='card-body' >
                            <div className='form-control mb-4' >
                                <label className='label'>
                                    <span className='label-text' >Title</span>
                                </label>
                                <input
                                    className='input input-bordered'
                                    placeholder="Note title"
                                    type="text"
                                    value={notes.title}
                                    onChange={(e) => setNotes({ ...notes, title: e.target.value })}
                                />
                            </div>
                            <div className='form-control mb-4' >
                                <textarea
                                    className='textarea textarea-bordered h-32'
                                    placeholder="Write your content here"
                                    value={notes.content}
                                    onChange={(e) => setNotes({ ...notes, content: e.target.value })}
                                />
                            </div>
                            <div className='card-actions justify-end' >
                                <button onClick={() => handleSave(notes._id, notes)} disabled={saving} className='btn btn-primary' >
                                    {saving ? "Saving..." : "Saved"}
                                </button>
                            </div>

                        </div>



                    </div>


                </div>

            </div>


        </div>
    )
}

export default NotePage