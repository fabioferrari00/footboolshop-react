
import DefaultLayout from './layouts/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailProductPage from '../pages/DetailProductPage'
import ProductsPage from '../pages/ProductsPage'
import ContactsPage from '../pages/ContactsPage'
import AboutUsPage from '../pages/AboutUsPage'
import CartPage from '../pages/CartPage'
import { CartProvider } from './CartContext'
import FavoritesPage from '../pages/FavoritesPage';
import EditProduct from '../pages/EditProduct'
import Checkout from '../pages/Checkout'
import { FavoritesProvider } from './components/FavoritesContext';
import NotFound from "../pages/NotFound";
import SearchPage from '../pages/searchPage'


function App() {
  return (
    <>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <WelcomePopup />
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/product/:slug' element={<DetailProductPage />} />
                <Route path='/products/:slug/edit' element={<EditProduct />} />
                <Route path='/contacts' element={<ContactsPage />} />
                <Route path='/about_us' element={<AboutUsPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all */}
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>

    </>
  )
}

export default App
