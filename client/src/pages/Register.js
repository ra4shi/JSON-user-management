import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const resposnse = await axios.post('/api/user/register', values);
            dispatch(hideLoading())
            if (resposnse.data.success) {
                toast.success(resposnse.data.message);
                toast('Redirecting to login page')
                navigate('/login');
            } else {
                toast.error(resposnse.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("somthing went wrong  ")
        }
    }
    return (
        <div className='authentication'>
            <div className='authentication-form card p-2'>
                <h1 className='card-title'>Register</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name' >
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label='Email' name='email' >
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password' >
                        <Input placeholder='Password' type='password' />
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button>
                    <Link to='/Login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link>

                </Form>
            </div>
        </div >
    )
}

export default Register