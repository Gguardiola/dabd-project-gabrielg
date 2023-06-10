import { PrismaClient } from '@prisma/client'

export default async function add_viaje(req, res){
    //protección
    if(req.body.auth != "yes"){
        return res.status(403).json({"error" : "acceso denegado"})

    }
    const prisma = new PrismaClient()
    console.log("TEST APICALL: "+JSON.stringify(req.body))
    let body = "none"
    const randomNumberInRange = Math.floor(Math.random() * (500000 - 300000 + 1)) + 300000
    try{
        body = await prisma.viajetripulante.create({
            data: {
                id_viaje: randomNumberInRange,
                nombre: req.body.nombre,
                id: parseInt(req.body.id),
                fecha_abordaje: req.body.fecha_abordaje+"T00:00:00.000Z",
                ingeniero: req.body.ingeniero
            }

        })
        //controlar tabla supervisor vs ingeniero bool
        if(req.body.ingeniero == false){
            console.log(req.body.empresa)
            const empresaId = await prisma.empresa.findMany({
                where: {
                    nombre: req.body.empresa
                },
                select: {
                    id_empresa: true,
                    
                },
            })
            console.log(empresaId[0].id_empresa)
            await prisma.supervisor.create({
                data: {
                    id_viaje: randomNumberInRange,
                    id_empresa: empresaId[0].id_empresa
                }
            })
        }
        await prisma.$disconnect
    }catch (error){
        await prisma.$disconnect
        if(error.code == "P2002"){
            return res.status(500).json({status: "error", body: "Error! Este viaje ya se encuentra en el registro!"})
        }
        else{
            console.log(JSON.stringify(error.message))
            return res.status(500).json({status: "error", body: "Error inesperado: "+error.message})
        }
    }
    return res.status(200).json({status: "ok",body: "Viaje creado correctamente!"});
}



