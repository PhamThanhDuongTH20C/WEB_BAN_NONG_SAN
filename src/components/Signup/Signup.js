import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { QrcodeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import bgLogin from '../../assets/img/bgLogin.png';
// import './Signup.css';
import { toast } from "react-toastify";
import { useState } from "react";
const Signup = () => {

  const navigate = useNavigate();


  const [username, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phoneNumber, phonechange] = useState("");
  const [fullName, fullNamechange] = useState("");
  const [address, addresschange] = useState("");

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';

    if (username === null || username === '') {
        isproceed = false;
        errormessage += ' Fullname';
    }
    if (password === null || password === '') {
        isproceed = false;
        errormessage += ' Password';
    }
    if (email === null || email === '') {
        isproceed = false;
        errormessage += ' Email';
    }
    if (phoneNumber === null || phoneNumber === '') {
        isproceed = false;
        errormessage += ' phoneNumber';
    }
    if (fullName === null || fullName === '') {
        isproceed = false;
        errormessage += ' fullName';
    }
    if (address === null || address === '') {
        isproceed = false;
        errormessage += ' address';
    }
    if(!isproceed){
        toast.warning(errormessage)
    }
    return isproceed;
}
const handlesubmit = (e) => {
  e.preventDefault();
  let regobj = {  username, email  ,password, phoneNumber,fullName , address };
  if (IsValidate()) {
  console.log(regobj);
  fetch("https://localhost:7225/Authenticate/register", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(regobj)
  }).then((res) => {
      toast.success('Registered successfully.')
      navigate('/login');
  }).catch((err) => {              
      toast.error('Failed :' + err.message);
  });
}
}

  return (
    <div style={{ backgroundColor: "rgb(255, 235, 225)" }}>
      <div className='_3M9lzn PeA8Gc img-bg' style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
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
                    <div className='K1dDgL'>Đăng ký</div>
                  </div>
                </div>
                <div className='yXry6s'>
                  <div></div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                    <input className='pDzPRp' type='text' placeholder='Tên đăng nhập' value={username} onChange={e => namechange(e.target.value)} maxLength={128} />
                    </div>
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='text' placeholder='Email' value={email} onChange={e => emailchange(e.target.value)} maxLength={128} />
                    </div>
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='password' placeholder='Mật khẩu'value={password} onChange={e => passwordchange(e.target.value)} maxLength={16} />
                    </div>
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='text' placeholder='Họ và tên' value={fullName} onChange={e => fullNamechange(e.target.value)} maxLength={128} />
                    </div>
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='text' placeholder='Địa chỉ'value={address} onChange={e => addresschange(e.target.value)} maxLength={128} />
                    </div>
                    
                  </div>
                  <div className='D3QIf1'>
                    <div className='yup5K8'>
                      <input className='pDzPRp' type='text' placeholder='Số điện thoại' value={phoneNumber} onChange={e => phonechange(e.target.value)} maxLength={128} />
                    </div>
                    <div className='pYVjxt'></div>
                  </div>
                  <button className='wyhvVD _1EApiB hq6WM5 L-VL8Q cepDQ1 _7w24N1' onClick={handlesubmit} >Đăng Ký</button>
                  <div className='tRiWov'>
                    <div></div>
                  </div>
                  <div className="_6yKazv">
                  </div>
                </div>
                <div className='XLzpXt'>
                  <div className='Oug9xv Z8OMtU'>
                    Bạn đã có tài khoản?
                    <Link to="/login" className='wzgwUg'> Đăng nhập</Link>
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

export default Signup