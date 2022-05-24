import React, { useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import stripeConfig from "../config/stripe"
import Link from "next/link"
import CheckoutButon from "../components/CheckoutButon"

interface Props {
    product: Stripe.Product
}

export const getStaticPaths: GetStaticPaths = async () => {
    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion: "2020-08-27"
    })

    const products = await stripe.products.list();

    const paths = products.data.map((prod) => ({
        params: {
            productId: `${prod.id}`,
        }
    }))

    return {
        paths,
        fallback: false,

    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion: "2020-08-27"
    })
    const product = stripe.products.retrieve(params.productId as string)

    return {
        props: {
            product: await product,
        }
    }
}

const Product: React.FC<Props> = ({ product }) => {
    const [ priceData, setPriceData] = useState<any>()

    fetch(`https://api.stripe.com/v1/prices/${product.default_price}`, {
        headers: {
            'Authorization': `Bearer ${stripeConfig.secretKey}`
        }
    })
        .then(res => res.json())
        .then((data) => {
            setPriceData(data)
        })
        .catch(console.log)


    return (
        <div>
            <h1>Nome do Produto {product.name}</h1>

            {product.images[0] && <img src={product.images[0]} width="200px" />}

            <h2>R$ {priceData && (priceData.unit_amount / 100).toFixed(2)}</h2>

            <CheckoutButon priceId={String(product.default_price)}/>
            <br/>
            <br/>
            <Link href={'/'}>Go back</Link>
        </div>
    )
}

export default Product;