import { PrismaClient } from '@prisma/client'

export default async function add_nave(req, res){
    //protección
    if(req.body.auth != "yes"){
         return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    try{
        body = await prisma.nave.delete({
            where: {
                nombre: req.body.nombre
            }

        })
        await prisma.$disconnect
    }catch (error){
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Esta nave ya se encuentra en el registro!"})
        }
        else{
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Nave eliminada correctamente!"});
}



