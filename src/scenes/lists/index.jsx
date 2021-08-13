
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// grab backend to use based on environment and grab error helper
import { backend, errorHelper } from '../../data'

export const Lists = () => {

    const [lists, setLists] = useState([])
    // const [shared, setShared] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    // get lists from backend
    useEffect(() => {
        backend.get("/lists")
            .then(({ data }) => setLists(data))
            .catch((error) => setErrorMessage(errorHelper(error)))
            .finally(() => setLoading(false))
    }, [])
    
  // List delete method
  // Do we want to delete from lists screen or click on individual list first?
    const deleteList = async (id, index) => {
      // set loading to true
      setLoading(true)

      try {
        // send request to backend
        await backend.delete(`/lists/${id}`)
        // make copy of lists array
        const listsCopy = [...lists]
        // delete entry with matching ID
        listsCopy.splice(index, 1)
        // update lists in React state
        setLists(listsCopy)
      } catch (error) {
        setErrorMessage(errorHelper(error))
      } finally {
        // set loading state to false
        setLoading(false)
      }

    }

    return (
        <div>
          {errorMessage}
          {loading && <p>Loading...</p>}

          {/* List of Lists */}
          <h1>
            Lists
          </h1>
          {/* map over each entry in Lists */}
          {lists.map(({id, title, description, shared }, index) => (
            // public is a reserved word so need to revisit and rename
            // to shared then add to destructuring assignment above
            // add username to lists
            <article key={id}>
              <Link key={id} to={`/lists/${id}`}>
              <p>{title}</p>
              <p>{description}</p>
              {shared && <p>shared</p>}
              </Link>
              {/* delete button */}
              <button onClick={() => deleteList(id, index)}>DELETE</button>
            </article>
            
          ))}
        {/* create list button */}
        <Link to ="/lists/create"><button>New List</button></Link>
       
       
        </div>
    )

}