import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext';
import EditAxios from '../common/EditAxios';
import AxiosService from '../common/AxiosService';

export const Edit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { userData } = useContext(UserContext)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        image: null
    })
    useEffect(() => {

        const specificUserData = userData.filter((item) => item._id == params.id)
        if (specificUserData.length > 0) {
            const user = specificUserData[0]
            setFormData({
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                password: user.password,
                image: user.image
            })
        }

    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (formData.image) {
                const imageDatatoSend = new FormData();
                imageDatatoSend.append('image', formData.image);
                const response = await EditAxios.put(`upload/${params.id}`, imageDatatoSend);
                if (response) {
                    toast.success(response.data.message)
                    console.log('Response:', response.data.message);
                } else {
                    console.log('Error:', response.data.error);
                }
            } else {
                console.log('Image data is missing.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formDatatoSend = new FormData()
            formDatatoSend.append('fullName', formData.fullName)
            formDatatoSend.append('phone', formData.phone)
            formDatatoSend.append('email', formData.email)
            formDatatoSend.append('password', formData.password)
            const userData = await AxiosService.put(`edit/${params.id}`, formDatatoSend)
            console.log(userData);
            if (userData) {
                toast.success('User data successfully updated')
                navigate('/dashboard')
                console.log('Response:', userData);
            }
            else {
                toast.success(userData.response.data.error)
            }
        }

        catch (error) {
            // toast.error(error.response.data.error)
            console.log('Error:', error);
        }
    }

    return (
        <div className="container mx-auto w-2/5">
            <form action="" className="w-full mt-6 h-1/2 bg-red-200 shadow-lg relative overflow-hidden py-6 px-8 rounded-md flex flex-col gap-6">
                <h1 className='text-4xl text-center mb-2'>Edit User Data</h1>
                <div className="flex items-center w-full h-12 gap-4" >
                    <label htmlFor="fullName" className="text-xl font-medium w-1/3">Full Name</label>
                    <input type="text" name="fullName" placeholder='your-name' required
                        className="flex-1 py-2 px-2 focus:text-white  focus:outline-none rounded-md  focus:bg-black  h-8"
                        value={formData.fullName}
                        onChange={handleChange} />
                </div>
                <div className="flex items-center w-full h-12 gap-4">
                    <label htmlFor="email" className="text-xl font-medium w-1/3">Email</label>
                    <input type="text" name="email" placeholder='sdeisee@gmail.com' required
                        className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8"
                        value={formData.email}
                        onChange={handleChange} />
                </div>
                <div className="flex items-center w-full h-12 gap-4">
                    <label htmlFor="phone" className="text-xl font-medium w-1/3 ">Phone</label>
                    <input type="text" name="phone" placeholder='9087654321' required
                        className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8"
                        value={formData.phone}
                        onChange={handleChange} />
                </div>
                <div className="flex items-center w-full h-12 gap-4">
                    <label htmlFor="password" className="text-xl font-medium w-1/3">Password</label>
                    <input type="password" name="password" placeholder='ewe32!2$' required
                        className="flex-1 py-2 px-2  focus:text-white focus:outline-none rounded-md  focus:bg-black  h-8"
                        value={formData.password}
                        onChange={handleChange} />
                </div>
                <div className="flex items-center w-full h-12  gap-4">

                    <label htmlFor="image" className="text-lg font-medium w-1/3">Choose an image</label>
                    <input type="file" name="image"
                        className="flex-1 py-2 px-2 focus:text-white  focus:outline-none rounded-md  focus:bg-black h-16"
                        onChange={handleFileChange} />
                </div>
                <div className='flex items-center justify-center '>
                    <button className='bg-white p-2' onClick={(e) => handleUpload(e)} >Upload
                    </button></div>
                <div className="flex items-center w-full h-12 gap-8 justify-center ">
                    <button className=' bg-white text-red-500 rounded py-1 px-2 hover:bg-black hover:text-red-500 hover:border-none'
                        onClick={(e) => handleSubmit(e)}>Submit</button>
                    <button className=' bg-white text-red-500 rounded py-1 px-3 hover:bg-black hover:text-red-500 hover:border-none'>Reset</button>
                </div>
                {/* <div className='flex justify-center text-black underline'>
                    <Link to={`/sign-in`}>signIn</Link>
                </div> */}
            </form>
        </div>
    );
};
