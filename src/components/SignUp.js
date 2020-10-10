
import React, { useState } from 'react'
import axios from './../utils/API';

const SignUp = () => {
    
    const [formDetails, setFormDetails] = useState({name:'',email:'', password:''})

    const handleChange = (e) => {        
        const {name,value} = e.target;
        setFormDetails({
            ...formDetails,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           await axios({
                method:'post',
                url:'/users/signup',
                data:formDetails
            })
            alert('user has been entered')
        }
        catch(err) {
            console.error(err)
        }

    }

        return (
            <div className='container'>
                <form className='text-light form-width' onSubmit={handleSubmit}>
                    <h1>SignUp Form</h1>

                    <div className='form-group '>
                        <label htmlFor='name'>Full Name</label>
                        <input type='text' className='form-control' name='name' placeholder='Enter Full Name' onChange={handleChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' name='email' className='form-control' placeholder='Enter Your Email' onChange={handleChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' className='form-control' placeholder='Enter Password' onChange={handleChange}></input>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
}


export default SignUp;