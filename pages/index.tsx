import React from "react"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import stripeConfig from "../config/stripe"
import Link from "next/link"

interface Props {
  products: Stripe.Product[]
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: "2020-08-27"
  })

  const products = await stripe.products.list();

  return {
      props: {
        products: products.data
      }

  }
}

const HomePage: React.FC<Props> = ({ products }) => {


  return (
    <>
      <h1>Lista de produtos</h1>

      {products.map(prod =>(
        <div key={prod.id}>
          <h1>Nome do Produto {prod.name}</h1>
          {prod.images[0] && <img src={prod.images[0]} width="200px"/>}
          {/* <h2>20.00 BRL</h2> */}
          <Link href={'/'+prod.id}><h3 style={{cursor: 'pointer'}}>Ver produto</h3></Link>
          <hr/>
        </div>
        ))}
    </>
  )
}

export default HomePage
