import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductList.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const getProducts = async () => {
        const response = await fetch("http://localhost:8000/products", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`
            }
        })

        if (response.status === 401) {
            console.log("Unauthorized")
            return
        }

        const data = await response.json()
        setProducts(data)
    }

    const addtoCart = async (productId) => {
        const response = await fetch(`http://localhost:8000/cart`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_id: productId }),
        })

        navigate("/cart")
    }

    useEffect(() => {
        getProducts()
    }, [])

    return <>
        <h1>Products</h1>

        <button onClick={() => {
            navigate("/products/new")
        }}>Add Product
        </button>


        <section className="products">
            {
                products.map(product => {
                    return <div style={{
                        border: "0.6rem solid goldenrod",
                        backgroundColor: "fuchsia",
                        margin: "5px",
                        padding: "5px"
                    }}
                        key={product.id}
                        className="product">

                        <div className="product__name">{product.name}</div>
                        <div className="product__description">{product.description}</div>
                        <div className="product__price">${product.price.toLocaleString({
                            style: "currency",
                            currency: "USD"
                        })}
                            <button onClick={() => addtoCart(product.id)}>Add to cart</button>
                        </div>
                    </div>
                })
            }
        </section>
    </>
}