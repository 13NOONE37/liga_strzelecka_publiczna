import React, { useEffect, useReducer, useState } from 'react'

import './App.css'
import AppContext from '../store/AppContext'
import { Route, Routes } from 'react-router-dom'
import pages from '../routes/Pages'
import NotFound from '../routes/pages/NotFound/NotFound'
import fetchData from '../utils/fetchData'

function App() {
  const [appState, setAppState] = useReducer((state,newState)=>({...state,...newState}),{
    contests:null,
    isLoading:false,
    error:false,
  }) 

  useEffect(() => {
    const fetchContests = async ()=>{
      setIsLoading(true)

      //fetch contests
      try{
        const response =await fetchData({
          action:'getContests',
        })
        console.log(response)
      }
      catch(error){

      }

      setIsLoading(false)
   }
   fetchContests();
  }, [])
  
  return (
    <div>

    <AppContext.Provider value={{
      contests:appState.contests,
      setContests:(value)=>setAppState({contests:value})
    }}>
   <Routes>
    <Route path="*" element={<NotFound/>}/>
    {pages.map(({path,element})=><Route path={path} element={element} key={path}/>)}
    </Routes>
    </AppContext.Provider>
    </div>
  )
}

export default App
