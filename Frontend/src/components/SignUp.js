import React from 'react'
import logo from "../img/logo.png"

export default function signUp() {
  return (
    <div className='signUp'>
        <div className='form-container'>
            <img className='signUpLogo' src={logo} alt=''/>
            <p className='LoginPara'>
                signUp for access the features <br/>
                of your friends
            </p>
            <div>
                <input type='email' name='email' id='email' placeholder='Enter Your Email'/>
            </div>
            <div>
                <input type='text' name='name' id='name' placeholder='Enter Your Name'/>
            </div>
            <div>
                <input type='text' name='username' id='username' placeholder='Enter Your User Name'/>
            </div>
            <div>
                <input type='password' name='password' id='password' placeholder='Enter Your Password'/>
            </div>
        </div>
    </div>
  )
}
