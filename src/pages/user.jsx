import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import topbarStyles from "../styles/topbar.module.css"
//componentes
import TareasIngeniero from '../component/TareasIngeniero'


export default function Home(){
  const [currentPage, setCurrentPage] = useState('supervisores')


  return (
    <>
      <Head>
        <title>AMONG US Corp.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main className='bg-white dark:bg-gray-900'>

        <h1 className='text-xl m-5 text-gray-500 font-bold font-sans'>Vista de Ingeniero de AMONG US Corp.</h1>

        <div>

            <div class="text-base text-gray-900 dark:text-white flex items-center justify-center m-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {currentPage == 'supervisores' && <TareasIngeniero></TareasIngeniero>}
            </div>
        </div>
      </main>
    </>
  )


}