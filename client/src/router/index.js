import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ResultPage from '../pages/ResultPage'
import InstructionPage from '../pages/InstructionPage'

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage />
    },
    {
        path:'/result',
        element:<ResultPage />
    },
    {
        path:'/instruction',
        element:<InstructionPage />
    },

])

export default router