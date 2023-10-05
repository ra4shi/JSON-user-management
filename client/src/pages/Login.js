import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const resposnse = await axios.post('/api/user/login', values);
            dispatch(hideLoading())
            if (resposnse.data.success) {
                toast.success(resposnse.data.message);
                toast('Redirecting to home page')
                localStorage.setItem('token', resposnse.data.data)
                navigate('/');
            } else {
                toast.error(resposnse.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("somthing went wrong ")
        }
    }
    return (
        <div className='authentication'>
            <div className='authentication-form card p-2'>
                <h1 className='card-title'>Welcome</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Email' name='email' >
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password' >
                        <Input placeholder='Password' type='password' />
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='submit'>LOG IN</Button>
                    <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>

                </Form>
            </div>
        </div >
    )
}

export default Login