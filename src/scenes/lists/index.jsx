
import { useEffect, useState } from "react"

// grab backend to use based on environment
import { backend } from "../../data"

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
            .catch((error) => setErrorMessage(error.message))
            .finally(setLoading(false))
    }, [])

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

        // clear form fields after post
        setTitle("")
        setDescription("")
        // setShared("false")

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
        setErrorMessage(error.message)
        // stop loading
        setLoading(false)
    } finally {
      setLoading(false)
    }
    
  }
    const deleteList= () => {
      setLoading(true)

    }


    return (
        <div>
          {errorMessage}
          {loading && <p>Loading...</p>}

          {/* List of Lists */}
          <p>
            Lists
          </p>
          {lists.map(({id, title, description }) => (
            // public is a reserved word so need to revisit and rename
            // to shared then add to destructuring assignment above
            // add username to lists
            <article key={id}>
            <p>{title}</p>
            <p>{description}</p>
            {/* <p>{shared}</p> */}
            <button>DELETE</button>
            </article>
          ))}
       
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