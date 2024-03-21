import { Route, Routes } from 'react-router-dom';
import Header from '../Component/Header/Header';
import Home from '../pages/Home/Home';
import Login from '../pages/login/login';
import Register from '../pages/register/Register';
import Cv from '../pages/Cv/Cv';
import Profile from '../pages/Profile/Profile';
import Products from '../pages/Products/Products';
import NotFound from '../pages/NotFound/NotFound';
import ProductDetail from '../pages/Products/ProductDetail/ProductDetail';
import MiniDrawer from '../pages/text/test';

export default function MainRoute() {
  return (
    <>
      {/* <Header /> */}
      <Routes element= {<MiniDrawer/>}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cv' element={<Cv />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='text' element={<MiniDrawer />} />
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

