import DefaultLayout from './layouts/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailProductPage from '../pages/DetailProductPage'
import ProductsPage from '../pages/ProductsPage'
import ContactsPage from '../pages/ContactsPage'
import AboutUsPage from '../pages/AboutUsPage'
import EditProduct from '../pages/EditProduct'


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:slug' element={<DetailProductPage />} />
            <Route path='/products/:slug/edit' element={<EditProduct />} />
            <Route path='/contacts' element={<ContactsPage />} />
            <Route path='/about_us' element={<AboutUsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
