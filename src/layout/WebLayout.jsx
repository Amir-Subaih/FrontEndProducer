import Navbar from '../components/web/navbar/Navbar'
import Footer from '../components/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function WebLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>

  )
}
