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
        body = await prisma.persona.create({
            data: {
                nombre: req.body.nombre,
                fecha_nacimiento: req.body.fecha_nacimiento+"T00:00:00.000Z",
            }

        })
        await prisma.$disconnect
    }catch (error){
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Esta persona ya se encuentra en el registro!"})
        }
        else{
            console.log(JSON.stringify(error.message))
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Persona agregada correctamente!"});
}



