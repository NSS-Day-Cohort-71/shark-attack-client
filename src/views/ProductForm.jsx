import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState(0)
    const [allCategories, setAllCategories] = useState([])

    const navigate = useNavigate()

    const getCategories = () => {
        fetch(`http://localhost:8000/categories`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`
            }
        })
            .then(res => res.json())
            .then(setAllCategories)
    }

    useEffect(getCategories, [])


    return <>
        <form className="product">
            <fieldset className="mb-4">
                <label htmlFor="name"> Product name </label>
                <input type="text" id="name"
                    value={name}
                    onChange={evt => setName(evt.target.value)}
                    className="form-control"
                    required autoFocus />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="description"> First name </label>
                <textarea type="text" id="description"
                    value={description}
                    onChange={evt => setDescription(evt.target.value)}
                    className="form-control"
                    required ></textarea>
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="price"> Price </label>
                <input type="number" id="price"
                    value={price}
                    onChange={evt => setPrice(evt.target.value)}
                    className="form-control"
                    required  />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="stock"> Number in stock </label>
                <input type="number" id="stock"
                    value={stock}
                    onChange={evt => setStock(evt.target.value)}
                    className="form-control"
                    required  />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="firstName"> First name </label>
                <select onChange={(evt) => {
                    setCategory(parseInt(evt.target.value))
                }}>
                    <option value="0">Select a category...</option>
                    {
                        allCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                    }
                </select>
            </fieldset>
            <button className="btn btn-primary" onClick={(evt) => {
                evt.preventDefault()

                fetch("http://localhost:8000/products", {
                    method: "POST",
                    headers: {
                        "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        price,
                        stock,
                        category_id: category
                    })
                })
                .then(() => {
                    setName('')
                    setDescription('')
                    setPrice('')
                    setStock(0)
                    setCategory(0)

                    navigate("/products")
                })
            }}>Submit</button>
        </form>
    </>
}