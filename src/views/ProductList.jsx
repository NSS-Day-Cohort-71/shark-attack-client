import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductList.css"
import { Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes"

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

        <Button color="mint" onClick={() => {
            navigate("/products/new")
        }}>Add Product
        </Button>


        <section className="products">
            <Flex gap="3" justify="center" wrap="wrap">
            {
                products.map(product => {
                    return <Box maxWidth="240px">
                        <Card>
                            <Flex gap="3" justify="center" wrap="wrap" align="center">
                                <Box>
                                    <Text as="div" size="2" weight="bold">
                                        {product.name} <Badge color="blue">{product.category.name}</Badge>
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                        {product.description}
                                    </Text>
                                    <Text as="div" size="2" color="green">
                                        ${product.price.toLocaleString({
                                            style: "currency",
                                            currency: "USD"
                                        })}
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                        <Button color="gold" onClick={() => addtoCart(product.id)}>Add to cart</Button>
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>
                })
            }
            </Flex>
        </section>
    </>
}