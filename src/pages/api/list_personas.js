import { PrismaClient } from '@prisma/client'

export default async function list_personas(req, res){
    //protección
    
    if(req.headers.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
   
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.headers.auth))
    let body = "none"

    try{
        body = await prisma.persona.findMany({
            orderBy: { id: 'asc' },
          })
     
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})

    }
    return res.status(200).json({body});
}



