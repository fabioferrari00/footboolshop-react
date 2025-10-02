import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Jumbotron from '../components/Jumbotron'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Jumbotron />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default DefaultLayout
