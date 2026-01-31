import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import axiosInstance from "../lib/axios.js"


const CreatePage = () => {

    const [title, ssetTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate()


    const handleSubmit = async (e) => {

        e.preventDefault()


        setLoading(true)

        try {

            await axiosInstance.post("/notes", {

                title,
                content

            })

            toast.success("Note created successfully")

            navigate("/")


        } catch (error) {

            console.log("failed to create note!  please try again later")

            if (error.response.status === 429) {

                toast.error("you are creating too many notes", { duration: 5000 })

            } else {

                toast.error("Failed to create note")
            }

        } finally {

            ssetTitle("")
            setContent("")
            setLoading(false)
        }





    }

    return (
        <div className='min-h-screen bg-base-200' >

            <div className='container mx-auto px-4 py-8' >

                <div className='max-w-2xl mx-auto' >

                    <Link to={"/"} className='btn btn-ghost mb-6' >

                        <ArrowLeftIcon className='size-5' />
                        Back to Notes
                    </Link>

                    <div className='card bg-base-100 '>

                        <div className='card-body ' >

                            <h2 className='card-title text-2xl mb-4'>Creates new Notes</h2>
                            <form onSubmit={handleSubmit} >

                                <div className='form-control mb-4'>
                                    <label className='label'  >
                                        <span className='label-text'>Text</span>
                                    </label>

                                    <input type="text"
                                        placeholder='Note-title'
                                        className='input file-input-bordered'
                                        value={title}
                                        onChange={(e) => ssetTitle(e.target.value)}
                                    />

                                </div>

                                <div className='form-control mb-4'>
                                    <label className='label'  >
                                        <span className='label-text'>Content</span>
                                    </label>

                                    <textarea className='textarea textarea-bordered h-32'

                                        placeholder='Write your note here'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />

                                </div>

                                <div className='card-actions justify-end' >

                                    <button className='btn btn-primary' disabled={loading} type="submit" >{loading ? "Creating" : "Create Notes"}</button>

                                </div>


                            </form>


                        </div>


                    </div>




                </div>



            </div>




        </div>
    )
}

export default CreatePage