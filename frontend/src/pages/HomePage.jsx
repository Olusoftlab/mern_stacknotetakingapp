import React from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import axios from 'axios'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import NoteNotFound from '../components/NoteNotFound'



const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = React.useState(true)
    const [note, setNote] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {

        const fetchData = async () => {

            try {
                const res = await axios.get("http://localhost:7000/api/notes")
                console.log(res.data)
                setNote(res.data)
                setIsRateLimited(false)

            } catch (error) {
                console.error(error)
                if (error.response.status === 429) {

                    setIsRateLimited(true)
                } else {

                    toast.error("Error fetching data")
                }
            } finally {

                setLoading(false)

            }

        }

        fetchData()

    }, [])



    return (
        <div className="min-h-screen" >
            <Navbar />
            {isRateLimited && <RateLimited />}

            <div className='max-w-7xl mx-auto p-4 mt-6 ' >

                {loading && <div className='text-center py-10 text-primary'   >Loading....</div>}

                {note.length === 0 && !isRateLimited && (<NoteNotFound />)}

                {note.length > 0 && !isRateLimited && (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >

                    {note.map((item) => (

                        <NoteCard key={item._id} mynote={item} setNote={setNote} />


                    ))}


                </div>)}



            </div>


        </div>
    )
}

export default HomePage