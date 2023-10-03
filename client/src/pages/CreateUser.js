import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
      };

  const formData = new FormData();
  formData.append('name', name);
  formData.append('password', password);
  formData.append('address', address);
  formData.append('image', image);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", formData)
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))      

        setName('');
        setPassword('');
        setAddress('');
    };

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='bg-white rounded p-3' style={{ width: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center mb-5'>Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor='name' className='mb-1'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter Your Name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='image' className='mb-1'>
                        Image
                        </label>
                        <input
                        type='file'
                        id='image'
                        className='form-control'
                        onChange={handleImageChange}
                        accept='image/*'
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password' className='mb-1'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter Your Password'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='address' className='mb-1'>
                            Address
                        </label>
                        <input
                            type='text'
                            id='address'
                            placeholder='Enter Your Permanent Address'
                            className='form-control'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-success mt-4'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
