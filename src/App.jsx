import DefaultLayout from './layouts/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailProductPage from '../pages/DetailProductPage'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:id' element={<DetailProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
