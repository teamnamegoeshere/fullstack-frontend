
import { useEffect, useState } from "react"

// grab backend to use based on environment
import { backend } from "../../data"

export const Lists = () => {

    const [lists, setLists] = useState([])

    useEffect(() => {
        backend.get("/lists")
            .then(({ data }) => setLists(data))
    }, [])

    return (
        <div>
          <p>
            Movie Bucket List Lists
          </p>
          {lists.map(({id, title, description }) => (
            // public is a reserved word so need to revisit and rename
            // then add to destructuring assignment above
            // add username to lists
            <article key={id}>
            <p>{title}</p>
            <p>{description}</p>
            {/* <p>{public}</p> */}
            </article>
          ))}
        </div>
    )

}