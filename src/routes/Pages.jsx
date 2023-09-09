import Contester from "./pages/Contester/Contester";
import General from "./pages/General/General";
import Rounds from "./pages/Rounds/Rounds";

const pages= [
    {
        path:'/',
        element:<General/>
    },
    {
        path:'/generalka',
        element:<General/>
    },
    {
        path:'/rundy',
        element:<Rounds/>
    },
    {
        path:'/zawodnik',
        element:<Contester/>
    }
]
export default pages