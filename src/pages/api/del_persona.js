import { PrismaClient } from '@prisma/client'

export default async function add_persona(req, res){
    //protección
    if(req.body.auth != "yes"){
         return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    try{
        body = await prisma.persona.delete({
            where: {
                id: parseInt(req.body.id)
            }

        })
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Esta persona ya se encuentra en el registro!"})
        }
        if(error.message.includes("Foreign key constraint failed on the field")){
            return res.status(500).json({status: "error", body: "Error! Debes eliminar los registros asociados a esta persona!"})
        }
        else{
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Persona eliminada correctamente!"});
}



