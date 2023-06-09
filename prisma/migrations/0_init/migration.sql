-- CreateTable
CREATE TABLE "empresa" (
    "id_empresa" BIGINT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "informetarea" (
    "id_viaje" BIGINT NOT NULL,
    "id_tarea" INTEGER NOT NULL,
    "veredicto" TEXT,

    CONSTRAINT "informetarea_pkey" PRIMARY KEY ("id_viaje","id_tarea")
);

-- CreateTable
CREATE TABLE "nave" (
    "nombre" VARCHAR(50) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "color" VARCHAR(50) NOT NULL,

    CONSTRAINT "nave_pkey" PRIMARY KEY ("nombre")
);

-- CreateTable
CREATE TABLE "persona" (
    "id" SERIAL NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisa" (
    "id_viaje_s" BIGINT NOT NULL,
    "id_viaje_i" BIGINT NOT NULL,

    CONSTRAINT "supervisa_pkey" PRIMARY KEY ("id_viaje_s","id_viaje_i")
);

-- CreateTable
CREATE TABLE "supervisor" (
    "id_viaje" BIGINT NOT NULL,
    "id_empresa" BIGINT NOT NULL,

    CONSTRAINT "supervisor_pkey" PRIMARY KEY ("id_viaje")
);

-- CreateTable
CREATE TABLE "tarea" (
    "id_tarea" SERIAL NOT NULL,
    "desc_tarea" VARCHAR(500) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "sector_nave" VARCHAR(50) NOT NULL,

    CONSTRAINT "tarea_pkey" PRIMARY KEY ("id_tarea")
);

-- CreateTable
CREATE TABLE "viajetripulante" (
    "id_viaje" BIGINT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "id" SERIAL NOT NULL,
    "fecha_abordaje" DATE NOT NULL,
    "ingeniero" BOOLEAN NOT NULL,

    CONSTRAINT "viajetripulante_pkey" PRIMARY KEY ("id_viaje")
);

-- AddForeignKey
ALTER TABLE "informetarea" ADD CONSTRAINT "informetarea_id_tarea_fkey" FOREIGN KEY ("id_tarea") REFERENCES "tarea"("id_tarea") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informetarea" ADD CONSTRAINT "informetarea_id_viaje_fkey" FOREIGN KEY ("id_viaje") REFERENCES "viajetripulante"("id_viaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisa" ADD CONSTRAINT "supervisa_id_viaje_i_fkey" FOREIGN KEY ("id_viaje_i") REFERENCES "viajetripulante"("id_viaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisa" ADD CONSTRAINT "supervisa_id_viaje_s_fkey" FOREIGN KEY ("id_viaje_s") REFERENCES "supervisor"("id_viaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor" ADD CONSTRAINT "supervisor_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor" ADD CONSTRAINT "supervisor_id_viaje_fkey" FOREIGN KEY ("id_viaje") REFERENCES "viajetripulante"("id_viaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajetripulante" ADD CONSTRAINT "viajetripulante_id_fkey" FOREIGN KEY ("id") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajetripulante" ADD CONSTRAINT "viajetripulante_nombre_fkey" FOREIGN KEY ("nombre") REFERENCES "nave"("nombre") ON DELETE RESTRICT ON UPDATE CASCADE;

