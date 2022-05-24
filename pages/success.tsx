import React from "react";
import { useRouter } from "next/router";
import Link from "next/link"

const SuccesPage: React.FC = ()=>{
    const { query } = useRouter()

    return(
        <>
            <h1>Compra efetuada com sucesso!</h1>
            <hr/>
            <Link href={'/'}>Go back</Link>
        </>
    )
}

export default SuccesPage