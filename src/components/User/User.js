import React from 'react';
import HeaderUS from './Page/Header/HeaderUS';
import FooterUS from './Page/Footer/FooterUS';
import Home from './Page/Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Product  from './Page/Product/Product';
import Cart from './Page/Card/CardUS'
import AccountDetail from './Page/AccountDetails/AccountDetail';
import PrDetails from './Page/ProductDetails/PrDetails'
import OrderUS from './Page/AccountDetails/OrderUS'
import Odrersp  from './Page/Card/Pay/PayUS'
import ListOrder from './Page/AccountDetails/ListOrder'
import Forgot from '../Forgetpass/Forgetpass'
import Resetpass from '../Resetpass/Resetpass'
import Knowledge from './Page/Knowledge/Knowledge';
import Directory from './Page/FmDirectory/Directory';
import Introduce from './Page/Introduce/Introduce';
const User = () => {
    return (
        <div id='wrapper'>
            <HeaderUS />
            <div id='main'>
                <div id='content' className='content-area page-wrapper'>
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />}/>
                        <Route path='/product' element={<Product />} />
                        <Route path='/kienthuc' element={<Knowledge/>} />
                        <Route path='/danhbanhanong' element={<Directory/>} />
                        <Route path='/introduce' element={<Introduce/>}/>
                        <Route path='/Cart' element={<Cart />} />                      
                        <Route path='/PrDetails' element={<PrDetails />} />
                        <Route path='/Odrersp' element={<Odrersp />} />
                        <Route path='/OdrerUS' element={<OrderUS />} />
                        <Route path='/user/account/profile' element={<AccountDetail />}></Route>
                        <Route path='/user/purchase' element={<ListOrder />}></Route>
                        <Route path='/user/account' element={<AccountDetail/>} />
                        <Route path='/user/Forgot' element={<Forgot />}></Route>
                        <Route path='/user/Resetpass' element={<Resetpass />}></Route>
                    </Routes>
                    {/* <CardUS /> */}
                </div>
            </div>
            <FooterUS />
        </div>
    )
}

export default User