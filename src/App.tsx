import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Layout from './components/Layout';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import CocktailInfo from './components/CocktailInfo/CocktailInfo';
import Checkout from './components/Checkout/Checkout';
import KlarnaCheckout from './components/Klarna/KlarnaCheckout';
import LogIn from './components/Admin/LogIn';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/om-oss' element={<About/>}></Route>
          <Route path='/kontakt' element={<Contact/>}></Route>
          <Route path='/varukorg' element={<ShoppingCart/>}></Route>
          <Route path='/:drink' element={<CocktailInfo/>}></Route>
          <Route path='/kassa' element={<Checkout/>}></Route>
        </Route>
        <Route path='/klarna' element={<KlarnaCheckout/>}></Route>
        <Route path='/admin-login' element={<LogIn/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </>
  );
}

export default App;
