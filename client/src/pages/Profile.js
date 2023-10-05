import React, { useState } from 'react'
import '../layout.css'
import Layout from '../componants/Layout';
import { Button, Form } from 'antd';
import axios from 'axios';


function Profile() {
    const [image, setImage] = useState(null)
    const onFinish = async (values) => {
        try {
            console.log('hfdhf');
            const resposnse = await axios.post(`/api/user/profile`);
            console.log(resposnse, 'haidfslf');
        } catch (error) {
            console.log('risva');
        }
    }
    return (
        <Layout>
            <div className='pofile_div'>
                <Form layout='vertical' onFinish={onFinish}>
                    <h1>profile</h1>
                    <img className='Image'
                        alt="Posts"
                        width="200px"
                        height="200px"
                        src={image ? URL.createObjectURL(image) : ''}></img>
                    <br />
                    <input
                        className='input_profile'
                        type="file" onChange={(event) => {
                            setImage(event.target.files[0])
                            console.log(event.target.files[0]);
                        }} />
                    <br />
                    <Button htmlType='submit' className="uploadBtn">upload and Submit</Button>
                </Form>
            </div >
        </Layout >

    )
}

export default Profile