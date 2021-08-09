import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

// grab backend to use based on environment
import { backend } from "../../data"

// Create list
export const CreateList = () => {

    const {id} = useParams()
    // const [lists, setLists] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    // const [shared, setShared] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const history = useHistory()
    
    useEffect(() => {
		if(id) {
			backend.get(`lists/${id}`)
			.then(({ data }) => {				
				setTitle(data.title)
                setDescription(data.description)
			})
		}
	},[id])

    const createList = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading state to true
        setLoading(true)
        // unset error message
        setErrorMessage("")
        // send post request to the backend
        try {
            if(id){
                await backend.put(`/lists/${id}`, {
                    title,
                    description,
                    // shared
                })
                // if success:
                setLoading(false)
                history.push(`/lists/${id}`)
            } else {
                await backend.post("/lists", {
                title,
                description
                // shared,
                })
                // if success:
                setLoading(false)
                history.push("/lists")
            }
            // clear form fields after post
            setTitle("")
            setDescription("")
        } catch (error) {
            // If Fail:
            // display error message to the user
            setErrorMessage(error.message)
            // stop loading
            setLoading(false)
        }
        
    }
    return (
        <div>
          {errorMessage}
          {loading && <p>Loading...</p>}
       
       {/* Create list form */}
          <form onSubmit={createList}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="title" />
            <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder="description" />
            {/* <label>
              Share this list
            <input onChange={(e) => setShared(e.target.value)} value={shared} type="checkbox"/>
            </label> */}
            <input type="submit" value="Submit" />
            
          </form>
        </div>
    )
}