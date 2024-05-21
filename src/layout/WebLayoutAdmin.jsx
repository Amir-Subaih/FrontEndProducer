import React from 'react'
import Navbar from '../components/web/navbar/Top/Topn'
import { Outlet } from 'react-router-dom'

export default function WebLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
