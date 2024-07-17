import ResponsiveDrawer from '../components/ResponsiveDrawer'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Blog from '../pages/Blog/Blog'
import SalonService from '../pages/SalonService/SalonService'
import Products from '../pages/Products/Products'
import EleganceAI from '../pages/EleganceAI/EleganceAI'
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <>
      <ResponsiveDrawer/>
      <Routes>
        <Route path = '*' element = {<Navigate to={'/home'}></Navigate>}/>
        <Route path = {'/home'} element = {<Home/>}/>
        <Route path = {'/register'} element = {<Register/>}/>
        <Route path = {'/login'} element = {<Login/>}/>
        <Route path = {'/blog'} element = {<Blog/>}/>
        <Route path = {'/salonService'} element = {<SalonService/>}/>
        <Route path = {'/products'} element = {<Products/>}/>
        <Route path = {'/eleganceAi'} element = {<EleganceAI/>}/>
      </Routes>
    </>
  )
}

export default App
