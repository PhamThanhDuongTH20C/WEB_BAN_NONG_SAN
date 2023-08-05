import React from 'react'

import { QrcodeOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import bgLogin from '../../assets/img/bgLogin.png';
import './Login.css';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [username, usernameupdate] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const usenavigate = useNavigate();
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }
  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {

      let inputobj = {
        "Username": username,
        "password": password
      };
      fetch("https://localhost:7225/Authenticate/login", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj)
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp)
        if (resp.status === 401) {
          setErrorMessage("Tài Khoản hoặc Mật Khẩu Không Đúng!!! Mời Bạn Nhập Lại");
          console.log({ setErrorMessage })
        } else {
          toast.success('Success');
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('token', resp.token);
          usenavigate('/')
          window.location.reload();
        }

      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
      });
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ backgroundColor: "rgb(255, 235, 225)" }}>
      <div className='_3M9lzn PeA8Gc img-bg' style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}>
        <div className='Gxi65y'>
          <div className='MIUGgs'></div>
          <div>
            <form>
              <div className='IxqCyD J1i6cp B-fiUo'>
                <div className='gZNAGg'>
                  <div className='KG+Utm'>
                    <div className='K1dDgL'>Đăng Nhập</div>
                    <div className='NYkwiO'>
                      <div className="_6ELZeI">Đăng nhập với mã QR</div>
                      <Link to="/" className='_7nvtMo'>
                        <QrcodeOutlined className='sYzQJQ' />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='yXry6s'>
                  <div></div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='text' placeholder='Email/Số điện thoại/Tên đăng nhập' value={username} onChange={e => usernameupdate(e.target.value)} maxLength={128} />
                    </div>
                  </div>
                  <div className='vkgBkQ'>
                    <div className='yup5K8'>
                      <input
                        className='pDzPRp'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='Mật khẩu'
                        name='password'
                        maxLength={16}
                      />
                      <button className='SnLyxu' onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <EyeInvisibleOutlined className='_340FWs' />
                        ) : (
                          <EyeOutlined className='_340FWs' />
                        )}
                      </button>
                    </div>
                    <div className='pYVjxt'>
                      {errorMessage && (
                        <div className='error-message'>{errorMessage}</div>
                      )}
                    </div>
                  </div>
                  <button className='wyhvVD _1EApiB hq6WM5 L-VL8Q cepDQ1 _7w24N1' onClick={ProceedLoginusingAPI} >Đăng nhập</button>
                  <div className='tRiWov'>
                    <Link to='/user/Forgot' className='anLGcx'>Quên mật khẩu</Link>
                    <div></div>
                  </div>
                  <div className="_6yKazv">
                    <div className="lhhucE">
                      <div className="lreZhl">
                      </div>
                      {/* <span className="PqS8vj">hoặc</span> */}
                      <div className="lreZhl"></div>
                    </div>
                    {/* <div className="_3051nA">
                      <button className="nGTAZw lyJbNT bQ2eCN">
                        <div className="Bq4Bra">
                          <div className="_1a550J social-white-background social-white-fb-blue-png">
                          </div>
                        </div>
                        <div className="">Facebook</div>
                      </button>
                      <button className="nGTAZw lyJbNT bQ2eCN">
                        <div className="Bq4Bra">
                          <div className="_1a550J social-white-background social-white-google-png">
                          </div>
                        </div>
                        <div className="">Google</div>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className='XLzpXt'>
                  <div className='Oug9xv Z8OMtU'>
                    Hãy đăng ký tại đây!
                    <Link to="/signup" className='wzgwUg'> Đăng ký</Link>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login