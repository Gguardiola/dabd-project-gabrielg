import { PrismaClient } from '@prisma/client'

export default async function update_persona(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    try{
        body = await prisma.persona.update({
            where:{
                id: req.body.id_persona 
            },
            data: {
                nombre: req.body.nombre
            }
        })

        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Esta persona ya se encuentra en el registro!"})
        }
        else{
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Persona actualizada correctamente!"});
}



