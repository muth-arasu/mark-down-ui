import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import { BsPersonVcardFill } from 'react-icons/bs';
import AxiosService from '../common/AxiosService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }
  const handleReset = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: '' }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await AxiosService.post('/signIn', formData);
      console.log("userData", userData);
      sessionStorage.setItem('token', userData.data.token);
      localStorage.setItem('email', formData.email);
      toast.success(userData.data.message);
      setTimeout(() => { navigate('/preview'); }, 500);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form className="bg-white shadow-lg p-8 rounded-md">
          <BsPersonVcardFill size={80} className="mx-auto mb-4" />
          <h1 className="text-3xl text-center mb-2 font-semibold">Sign In</h1>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mb: 2, width: '90%', sm: { mb: 0, width: 'auto' } }}
              aria-label="Submit Form" // Adding aria-label for screen readers
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mb: 2, width: '90%', sm: { mb: 0, width: 'auto' } }}
              onClick={handleReset} // Assuming handleReset function for resetting the form
              aria-label="Reset Form" // Adding aria-label for screen readers
            >
              Reset
            </Button>
          </div>

          <div className="text-center mt-4">
            <Link to={`/forgot-password`} className="text-gray-500">Forgot Password</Link>
          </div>
          <div className="text-center mt-4">
            <Link to={`/sign-up`} className="text-black underline">Sign Up</Link>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignIn;
