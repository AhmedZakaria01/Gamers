// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { Link, useNavigate } from 'react-router-dom'
// import joi from 'joi'
// export default function Login({ saveUserData }) {



//   const [userData, setuserData] = useState(
//     {
//       'email': '',
//       'password': '',
//     }
//   )
//   const [errorMsg, setErrorMsg] = useState("");
//   const [errorList, setErrorList] = useState([])
//   const [isLoading, setisLoading] = useState(false)
//   let navigate = useNavigate();


//   //Submit
//   let submitForm = async (e) => {
//     e.preventDefault()








//     let validationResponse = validationFormData();

//     if (validationResponse.error) {
//       setErrorList(validationResponse.error.details)
//     }
//     else {
//       setisLoading(true)
//       let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', userData)
//       console.log(data);
//       if (data.message === 'success') {
//         localStorage.setItem('token', data.token)
//         saveUserData()
//         setisLoading(false)
//         navigate('/') //navigate to login page
//       } else {
//         console.log('noway');
//         setisLoading(false)
//         setErrorMsg(data.message) //show error


//       }
//     }
//   }


//   //Validation
//   let validationFormData = () => {
//     const schema = joi.object({
//       email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
//       password: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{0,10}[a-z0-9]{1,10}$/))
//     })
//     return schema.validate(userData, { abortEarly: false })
//   }

//   let getInputValue = (e) => {
//     let user = { ...userData }
//     user[e.target.name] = e.target.value
//     setuserData(user)
//   }

//   return (
//     <>
// <div className='login-box container  row gx-5 mx-auto my-5 align-items-center bg-black rounded-3 '>
//   <div className='text-center register-image col-lg-6 col-sm-12 '>
//     <img className='w-100' src={require('../../images//index_thumbnail.png')} alt="Logo" />
//   </div>
//   <div className='register-form col-lg-6'>
//     <form onSubmit={submitForm}>
//       <label htmlFor="email">Email</label>
//       <input onChange={getInputValue} className='form-control my-2' name='email' type="text" />

//       <label htmlFor="password">Password</label>
//       <input onChange={getInputValue} className='form-control my-2' name='password' type="password" />
//       {isLoading ? <button className='btn btn-danger text-white w-100 my-3 disabled'><i className='fas fa-spinner fa-spin fs-4 text-white'></i></button>
//         : <button className='btn btn-danger text-white w-100 my-3' >Sign in</button>}

//       {errorMsg ? <div className='alert alert-danger d-flex justify-content-center align-items-center'> <p className='m-0'>{errorMsg}</p>  </div> : ''}
//       {errorList.map((error, index) => <div key={index} className='alert alert-danger d-flex justify-content-center align-items-center'> <p className='m-0'>{error.message}</p>  </div>)}
//       <p className='text-white text-center py-2'>don't have an account ? <Link to={'/register'} className='text-danger'>Sign up</Link></p>

//     </form>
//   </div>
// </div>


//     </>

//   )
// }




import React, { useState } from 'react';
// import styles from './Login.Module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




const Login = ({ saveUserData }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setmessageError] = useState(null)



  let navigate = useNavigate()

  function handleLogin(values) {
    setIsLoading(true);
    axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values)
      .then((res) => {
        localStorage.setItem("userToken", res.data.token)
        saveUserData()
        navigate('/');

      })
      .catch((err) => {
        console.log(err);
        setmessageError(err.response.data.message);
        console.log(err);
        setIsLoading(false)
      })
  }


  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email("Email is invalid "),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase - then from 5 to 10 numbers or letters "),
  })


  let formik = useFormik({

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema
    ,
    onSubmit: handleLogin
  })


  return (


    <div className='container register-box row gx-5 mx-auto my-5 align-items-center bg-black rounded-3 '>
      <div className='text-center register-image col-lg-6 col-sm-12 '>
        <img className='w-100' src={require('../../images//index_thumbnail.png')} alt="Logo" />
      </div>
      <form className='col-md-6 mx-auto' id='registerForm' onSubmit={formik.handleSubmit}>


        <label htmlFor='email'>Email</label>
        <input className={`form-control mb-2   ${formik.errors.email && formik.touched.email ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'></input>
        {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}



        <label htmlFor='password'>Password</label>
        <input className={`form-control mb-2   ${formik.errors.password && formik.touched.password ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'></input>
        {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}




        {messageError ? <p className='text-danger'>{messageError}</p> : null}
        {isLoading ? <button className='btn btn-danger text-white w-100' disabled> <i className='fas fa-spinner fa-spin'> </i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-danger text-white w-100'>Login</button>}
        <p className='text-white text-center py-2'>don't have an account ? <Link to={'/register'} className='text-danger'>Sign up</Link></p>

      </form>












    </div>
  );
}

export default Login;

