import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import generalStyles from '../styles/general.module.css'

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()
//   const res = await prisma.nave.findMany()
//   // async function main() {
//   //   // ... you will write your Prisma Client queries here
//   // }

//   // main()
//   //   .then(async () => {
//   //     await prisma.$disconnect()
//   //   })
//   //   .catch(async (e) => {
//   //     console.error(e)
//   //     await prisma.$disconnect()
//   //     process.exit(1)
//   //   })
//   return { props: { res } };
// };
export default function Home() {

  return (
    <>
      <Head>
        <title>AMONG US Corp.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen bg-center bg-no-repeat bg-[url('../../public/amongus.jpg')] bg-gray-700 bg-blend-multiply">
        <section class="">
          <div class=" py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">AMONG US CORP.</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Bienvenido al gestor de AMONG US Corp. desarrollado por Gabriel Guardiola para DABD!</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="/panel" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Panel de administrador
                    </a>
                    <a href="/user" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Soy ingeniero
                    </a>  
                </div>
          </div>
        </section>
      </main>
    </>
  )
}

