import Head from 'next/head'
import apiEndpoint from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import topbarStyles from "../styles/topbar.module.css"
//componentes
import Supervisores from '../component/Supervisores'
import Personas from '../component/Personas'
import Tareas from '../component/Tareas'
import Viajes from '../component/Viajes'
import Naves from '../component/Naves'

export default function Home(){
  const [currentPage, setCurrentPage] = useState('main')


  return (
    <>
      <Head>
        <title>AMONG US Corp.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main className='bg-white dark:bg-gray-900'>

        <h1 className='text-xl m-5 text-gray-500 font-bold font-sans'>Panel de administración de AMONG US Corp.</h1>
        <div className="mt-5  bg-white dark:bg-gray-900">
          <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul class=" flex flex-wrap -mb-px">
                  <li class="mr-2">
                      <a onClick={() => setCurrentPage('naves')} className={currentPage == "naves" ? topbarStyles.currentTab : topbarStyles.tab}>Gestionar Naves</a>
                  </li>
                  <li class="mr-2">
                      <a onClick={() => setCurrentPage('personas')} className={currentPage == "personas" ? topbarStyles.currentTab : topbarStyles.tab}>Agregar personas al registro</a>
                  </li>
                  <li class="mr-2">
                      <a onClick={() => setCurrentPage('viajes')} className={currentPage == "viajes" ? topbarStyles.currentTab : topbarStyles.tab}>Gestionar viajes (tripulante)</a>
                  </li>
                  <li class="mr-2">
                      <a onClick={() => setCurrentPage('tareas')} className={currentPage == "tareas" ? topbarStyles.currentTab : topbarStyles.tab}>Gestionar tareas</a>
                  </li>
                  <li class="mr-2">
                      <a onClick={() => setCurrentPage('supervisores')} className={currentPage == "supervisores" ? topbarStyles.currentTab : topbarStyles.tab}>Agregar supervisor</a>
                  </li>
              </ul>
          </div>
        </div>
        <div>

            <div class="text-base text-gray-900 dark:text-white flex items-center justify-center m-2.5 p-2.5 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {currentPage == 'main' && <p>Qué quieres hacer?</p>}
              {currentPage == 'naves' && <Naves></Naves>}
              {currentPage == 'personas' && <Personas></Personas>}
              {currentPage == 'viajes' && <Viajes></Viajes>}
              {currentPage == 'tareas' && <Tareas></Tareas>}
              {currentPage == 'supervisores' && <Supervisores></Supervisores>}
            </div>
        </div>
      </main>
    </>
  )


}