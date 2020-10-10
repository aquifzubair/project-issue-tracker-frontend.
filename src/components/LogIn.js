
import React, { useState} from 'react'
import axios from '../utils/API'

const LogIn = ( { handleLoggedIn }) =>  {    

    const [ loginForm, setLoginForm ] = useState({ email:'', password:''})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await axios({
                method: 'post',
                url: '/users/login',
                data: loginForm
            })
            localStorage.setItem('token', token.data.token)
            handleLoggedIn()
        }
        catch (err) {
            console.error(err)
        }

    }

        return (
            <div>
                <form className='text-light form-width' onSubmit={handleSubmit}>
                    <h1>Login Form</h1>

                    <div className='form-group'>
                        <label htmlFor='name'>Email Address</label>
                        <input type='email' className='form-control' placeholder='Enter Your Email' name='email' onChange={handleChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='form-control' placeholder='Enter Password' name='password' onChange={handleChange}></input>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
}


export default LogIn;