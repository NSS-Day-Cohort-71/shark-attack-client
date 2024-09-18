import { useEffect, useState } from "react"

export const ShoppingCart = () => {
    const [cartProducts, setCartProducts] = useState([])

    const getCartProducts = async () => {
        const response = await fetch("http://localhost:8000/cart", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`
            }
        })
        const data = await response.json()
        setCartProducts(data)
    }

    useEffect(() => {
        getCartProducts()
    }, [])

    return <article className="cart">
        <h1>Shopping Cart</h1>
        <section className="cart__products">
            {
                cartProducts.map(product => {
                    return <div style={{
                        border: "0.6rem solid goldenrod",
                        backgroundColor: "fuchsia",
                        margin: "5px",
                        padding: "5px"
                    }}
                        key={product.id}
                        className="product">

                        <div className="product__name">({product.quantity}) x {product.name}</div>
                        <div className="product__description">{product.description}</div>
                        <div className="product__price">${product.price.toLocaleString({
                            style: "currency",
                            currency: "USD"
                        })}
                            <button onClick={async () => {
                                const response = await fetch(`http://localhost:8000/cart`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `Token ${JSON.parse(localStorage.getItem("shark_token")).token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ product_id: product.id }),
                                })
                                if (response.status === 404) {
                                    return window.alert("Invalid product id")
                                }
                                if (response.status === 400) {
                                    return window.alert("Product not in user's cart")
                                }
                                getCartProducts()
                            }}
                            >Remove from cart</button>
                        </div>
                    </div>
                })
            }
        </section>
    </article>
}