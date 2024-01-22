import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/404'
import DetailRecipePage from './pages/DetailRecipePage'
import DashboardPage from './pages/DashboardPage'
import AddRecipePage from './pages/AddRecipePage'
import DashboardLayout from './components/layouts/DashboardLayout'
import HomeLayout from './components/layouts/HomeLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EditRecipePage from './pages/EditRecipePage'
import Loading from './components/layouts/Loading'

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
    element: <DetailRecipePage />
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
      },
      {
        path: 'dashboard/edit',
        element: <EditRecipePage />
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'loading',
    element: <Loading />
  },
])

export default router