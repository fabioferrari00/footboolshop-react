
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import LoadingContext from '../context/LoadingContext'
import Loader from '../components/Loader'
const DefaultLayout = () => {
  const { isLoading } = useContext(LoadingContext)
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {isLoading && <Loader />}

    </>
  )
}

export default DefaultLayout
