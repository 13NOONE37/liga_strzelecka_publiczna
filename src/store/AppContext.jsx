import React, {createContext} from 'react'

const AppContext = createContext({
    contests:null,
    setContests:()=>{}
})
export default AppContext