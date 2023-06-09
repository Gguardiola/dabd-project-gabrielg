import { PrismaClient } from '@prisma/client'

export default async function list_empresas(req, res){
    //protección
    if(req.headers.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.headers.auth))
    let body = "none"
    try{
        body = await prisma.empresa.findMany()
        await prisma.$disconnect
    }catch (error){
        return res.status(500).json({status: "error", body: "Error inesperado"})

    }
    body = JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
    return res.status(200).json({body});
}



