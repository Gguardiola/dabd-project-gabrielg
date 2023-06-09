import React, { useEffect } from "react";
import footerStyles from "../styles/general.module.css"

const TableFooter = ({ range, setPage, page, slice }) => {
  function checkLimit(buttonType, page, range){
    
    let maxIndex = range.length;
    console.log(maxIndex);
    
    if(page != 1 && buttonType == "previous"){
      setPage(page - 1);
    }
    else if(page < maxIndex && buttonType == "next"){
      setPage(page +1);
    }

    console.log("currentPage "+page)
  }

  return (
    <div className="m-3">
      
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
            Mostrando página <span class="font-semibold text-gray-900 dark:text-white">{page}</span> de <span class="font-semibold text-gray-900 dark:text-white">{range.length}</span>
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
            <button onClick={() => checkLimit("previous",page,range)} class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Anterior
            </button>
            <button onClick={() => checkLimit("next",page,range)} class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Siguiente
            </button>
        </div>
      </div>

      {/* <nav>
      <ul className={footerStyles.tablePaginationContainer}>
        <li>
        <button onClick={() => checkLimit("previous",page,range)} className={footerStyles.tablePaginationPrevious}>Previo</button>
        </li>
        {range.map((el, index) => (
          <li>
          <button key={index} onClick={() => setPage(el)} className={`${page != el ? footerStyles.tablePaginationNumber : footerStyles.tablePaginationNumberCurrent}`}>{el}</button>
          </li>                 
        ))}
        <li>
        <button onClick={() => checkLimit("next",page,range)} className={footerStyles.tablePaginationNext}>Siguiente</button>
        </li>
      </ul>
      </nav> */}
    </div>
  );
};

export default TableFooter;