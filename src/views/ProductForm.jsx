import { Button, DropdownMenu, Heading, Select, TextArea, TextField } from "@radix-ui/themes"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

export const ProductForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState(0)
    const [allCategories, setAllCategories] = useState([])

    const navigate = useNavigate()

    const selectedCategory = useMemo(() =>
        allCategories.find(cat => cat.id === category),
        [category, allCategories]
      )

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


    return <section className="form-container">
        <Heading>Create A Product To Sell</Heading>
        <form className="product-form">
            <fieldset className="mb-4">
                <label htmlFor="name"> Product name </label>
                <input type="text" id="name"
                    value={name}
                    onChange={evt => setName(evt.target.value)}
                    className="form-control"
                    required autoFocus />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="description"> Description </label>
                <TextArea value={description} onChange={evt => setDescription(evt.target.value)} />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="price"> Price </label>
                <input type="number" id="price"
                    value={price}
                    onChange={evt => setPrice(evt.target.value)}
                    className="form-control"
                    required />
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="stock"> Number in stock </label>

                <TextField.Root value={stock} onChange={evt => setStock(parseInt(evt.target.value))}> </TextField.Root>
            </fieldset>
            <fieldset className="mb-4">
                <label htmlFor="firstName"> Product Category </label>


                <Select.Root value={category} onValueChange={(value) => {
                    setCategory(parseInt(value))
                }}>
                    <Select.Trigger>
                        {selectedCategory ? selectedCategory.name : 'Choose a category'}
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            {
                                allCategories.map(cat => <Select.Item key={cat.id} value={cat.id}>{cat.name}</Select.Item>)
                            }

                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </fieldset>
            <Button color="indigo" className="btn btn-primary" onClick={(evt) => {
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
            }}>Submit</Button>
        </form>
    </section>
}