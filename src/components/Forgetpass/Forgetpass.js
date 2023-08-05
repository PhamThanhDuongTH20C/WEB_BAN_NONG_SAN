import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { QrcodeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import bgLogin from '../../assets/img/bklogin.jpg';

const Forgetpass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const usenavigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7225/api/Accounts/forgot-password?email=${email}`);
      const token = response.data;
      console.log('Token:', token);
      usenavigate(`/user/Resetpass?token=${token}`)
    } catch (error) {
      console.error('Error:', error.response.data);
     
    }
  };

  const validateForm = () => {
    if (!email) {
      toast.warning('Please enter the email.');
      return false;
    }

    return true;
  };

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
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input
                        className='pDzPRp'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={128}
                      />
                    </div>
                  </div>
                  <button className='wyhvVD _1EApiB hq6WM5 L-VL8Q cepDQ1 _7w24N1' type='submit'>
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

export default Forgetpass;
