
import React, { useState } from 'react';
import styles from './Register.Module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




const Register = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setmessageError] = useState(null)



  let navigate = useNavigate()

  function handleRegister(values) {
    setIsLoading(true);
    axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values)
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        setmessageError(err.response.data.message);
        setIsLoading(false)
        console.log(messageError);
      })
  }


  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, "Name min length is 3 ").max(20, "Name max length is 20 "),
    email: Yup.string().required('email is required').email("Email is invalid "),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase - then from 5 to 10 numbers or letters "),
    rePassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], "Password and repassword doesn't match"),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, "Phone must be EGY number")
  })


  let formik = useFormik({

    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema
    ,
    onSubmit: handleRegister
  })


  return (

    <>


      <div className=' mx-auto py-4'>


        <div className='container register-box row gx-5 mx-auto my-5 align-items-center bg-black rounded-3 '>
          <div className='text-center register-image col-lg-6 col-sm-12 '>
            <img className='w-100' src={require('../../images//index_thumbnail.png')} alt="Logo" />
          </div>

          <div className='register-form col-lg-6'>
            <form className=' mx-auto' id='registerForm' onSubmit={formik.handleSubmit}>
              <label htmlFor='name'>Name</label>
              <input className={`form-control mb-2 ${styles.formControl}   ${formik.errors.name && formik.touched.name ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name'></input>
              {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p> : ''}



              <label htmlFor='phone'>Phone</label>
              <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.phone && formik.touched.phone ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type='tel' name='phone' id='phone'></input>
              {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ''}



              <label htmlFor='email'>Email</label>
              <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.email && formik.touched.email ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'></input>
              {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}



              <label htmlFor='password'>Password</label>
              <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.password && formik.touched.password ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'></input>
              {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}



              <label htmlFor='rePassword'>Confirm Password</label>
              <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.rePassword && formik.touched.rePassword ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type='password' name='rePassword' id='rePassword'></input>
              {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p> : ''}


              {/* {console.log(isLoading)} */}
              {isLoading ? <button className='btn btn-danger text-white w-100' disabled> <i className='fas fa-spinner fa-spin fs-4'> </i> </button>
                :
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn btn-danger text-white w-100' >Sign up</button>}
              <p className='text-white text-center py-2'>have an account ? <Link to={'/login'} className='text-danger'>Sign in</Link></p>
              {messageError ? <p className='text-danger text-center py-3'>{messageError}</p> : null}


            </form>
          </div>
        </div>

      </div>

      {/* <div className='container register-box row gx-5 mx-auto my-5 align-items-center bg-black rounded-3 '>
        <div className='text-center register-image col-lg-6 col-sm-12 '>
          <img className='w-100' src={require('../../images//index_thumbnail.png')} alt="Logo" />
        </div>
        <div className='register-form col-lg-6'>
          <form>
            <label htmlFor="name"> Name</label>
            <input className='form-control my-2' name='name' type="text" />
            <p className='text-danger'> asf</p>

            <label htmlFor="email">Email</label>
            <input className='form-control my-2' name='email' type="text" />

            <label htmlFor="phone">Phone</label>
            <input className='form-control my-2' name='phone' type="text" />

            <label htmlFor="password">Password</label>
            <input className='form-control my-2' name='password' type="password" />

            <label htmlFor="rePassword">Confirm Password</label>
            <input className='form-control my-2' name='rePassword' type="password" />

            {isLoading ? <button className='btn btn-info w-100 my-3 disabled '><i className='fas fa-spinner fa-spin text-white fs-4 '></i></button>
              : <button className='btn btn-info w-100 my-3'> Signup  </button>}


          </form>
        </div>
      </div> */}
    </>
  );
}

export default Register;

