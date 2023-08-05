import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import bgLogin from '../../assets/img/bklogin.jpg';
import './Signup copy.css';
import { useLocation } from 'react-router-dom';

const Resetpass = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisableSubmit(false);
  };
  
  
const resetpas =async(token,password,confirmPassword)=>{
  console.log('sss',token);
  console.log('sss',password);
  console.log('sss',confirmPassword); 
  


try {
const response = await axios.post('https://localhost:7225/api/Accounts/reset-password', {
  "token": token,
  "password": password,
  "confirmPassword": confirmPassword });
console.log('Response:', response.data);

} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
// Handle the error
}
}
  // const validateForm = () => {
  //   if (!password || !confirmPassword) {
  //     toast.warning('Please enter the password and confirm password.');
  //     return false;
  //   }

  //   if (password !== confirmPassword) {
  //     toast.warning('The password and confirm password do not match.');
  //     return false;
  //   }

  //   return true;
  // };

  return (
    <div style={{ backgroundColor: 'rgb(255, 235, 225)' }}>
      <div
        className='_3M9lzn PeA8Gc img-bg'
        style={{
          backgroundImage: `url(${bgLogin})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <div className='Gxi65y'>
          <div className='MIUGgs'></div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='IxqCyD J1i6cp B-fiUo'>
                <div className='gZNAGg'>
                  <div className='KG+Utm'>
                    <div className='K1dDgL'>Đăng ký</div>
                  </div>
                </div>
                <div className='yXry6s'>
                  <div></div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input
                        className='pDzPRp'
                        type='password'
                        placeholder='Mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={16}
                      />
                    </div>
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input
                        className='pDzPRp'
                        type='password'
                        placeholder='Mật khẩu'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        maxLength={16}
                      />
                    </div>
                  </div>
                  <button
                    className='wyhvVD _1EApiB hq6WM5 L-VL8Q cepDQ1 _7w24N1'
                    onClick={() => resetpas(token, password, confirmPassword)}
                  >
                    Xác Nhận Email
                  </button>
                  <div className='tRiWov'>
                    <div></div>
                  </div>
                  <div className='_6yKazv'></div>
                </div>
                <div className='XLzpXt'>
                  <div className='Oug9xv Z8OMtU'>
                    Bạn đã có tài khoản?
                    <Link to='/login' className='wzgwUg'>
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpass;
