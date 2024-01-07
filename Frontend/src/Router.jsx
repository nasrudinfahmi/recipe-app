import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/404'
import DetailRecipe from './pages/DetailRecipe'
import DashboardPage from './pages/DashboardPage'
import AddRecipePage from './pages/AddRecipePage'
import DashboardLayout from './components/layouts/DashboardLayout'
import HomeLayout from './components/layouts/HomeLayout'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  {
    path: 'recipe/:idRecipe',
    element: <DetailRecipe />
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'dashboard/add',
        element: <AddRecipePage />
      }
    ]
  }
])

export default router