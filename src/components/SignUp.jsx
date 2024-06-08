import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsPersonVcardFill } from "react-icons/bs";
import { TextField, Button, Grid } from '@mui/material'; // Import Material-UI components
import AxiosService from '../common/AxiosService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("sumbit")
      console.log("formData",formData);

      const formDatatoSend = new FormData()
      formDatatoSend.append('fullName', formData.fullName)
      formDatatoSend.append('phone', formData.phone)
      formDatatoSend.append('email', formData.email)
      formDatatoSend.append('password', formData.password)
      console.log("userData",formDatatoSend);
      const userData = await AxiosService.post('/signUp', formDatatoSend)
      console.log("userData",userData);
      if (userData) {
        toast.success('SignUp successfull')
        navigate('/sign-in')
        console.log('Response:', userData);
        await sessionStorage.setItem(userData.data.token)
      }
      else {
        toast.success("validation failed");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" className='h-screen'>
      {/* Background image */}
      <div className="bg-cover bg-center absolute inset-0"
        // style={{ backgroundImage: "url('../../signup.avif')", filter: "blur(1px)", WebkitFilter: "blur(1px)" }}
      />
      {/* Sign-up form */}
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form className="bg-white shadow-lg p-8 rounded-md">
          <BsPersonVcardFill size={80} className='mx-auto mb-4' />
          <h1 className='text-3xl text-center mb-4 font-semibold'>Sign Up</h1>
          {/* Full Name */}
          <TextField
            fullWidth
            label="Your Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ mb: 2 }}  
          />
          {/* Email */}
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}  
          />
          {/* Phone */}
          <TextField
            fullWidth
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}  
          />
          {/* Password */}
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}  
          />
          {/* Submit and Reset buttons */}
          <div className="flex justify-center gap-4 mt-2">
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" color="primary">Reset</Button>
          </div>
          {/* Sign-in link */}
          <div className='text-center mt-4'>
            <Link to={`/sign-in`} className='text-gray-500'>Already have an account? Sign In</Link>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUp;
