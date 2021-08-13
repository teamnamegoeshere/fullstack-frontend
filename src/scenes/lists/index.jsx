
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// grab backend to use based on environment and grab error helper
import { backend, errorHelper } from '../../data'

export const Lists = () => {

    const [lists, setLists] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
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

    // Create list
    const createList = async (e) => {
    // prevent default form behaviour
    e.preventDefault()
    // set loading state to true
    setLoading(true)
    // unset error message
    setErrorMessage("")
    // send post request to the backend
    try {
        const { data } = await backend.post("/lists", {
          title,
          description
        // shared,
        })
        // clone list of lists and add new entry to the list
        const listsClone = [...lists]
        // add new list to cloned array
          listsClone.push({
            title: data.title,
            description: data.description,
            // shared,
            id: data.id
          })
          // set cloned array of lists as state
          setLists(listsClone)
        // if success:
    } catch (error) {
        // If Fail:
        // display error message to the user
        setErrorMessage(errorHelper(error))
        // stop loading
        setLoading(false)
    } finally {
      setLoading(false)
    }
    
  }
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
          <p>
            Lists
          </p>
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