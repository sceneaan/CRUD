import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
        .then(result => {console.log(result)
            setName(result.data.name)
            setPassword(result.data.password)
            setAddress(result.data.address)
            setExistingImage(result.data.imagePath);
        })
        .catch(err => console.log(err))
    }, [id])

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const Update = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('address', address);
    
        if (image) {
            formData.append('image', image);
        }
    
        axios.put(`http://localhost:3001/updateUser/${id}`, formData)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err))
    }
    

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='bg-white rounded p-3' style={{width:'400px'}}>
            <form onSubmit={Update}>
                <h2 className='text-center mb-5'>Update User</h2>
                <div className='mb-2'>
                    <label htmlFor='' className='mb-1'>Name</label>
                    <input type='text' placeholder='Enter Your Name' className='form-control' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='' className='mb-1'>Password</label>
                    <input type='password' placeholder='Enter Your Password' className='form-control' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='' className='mb-1'>Address</label>
                    <input type='text' placeholder='Enter Your Permanent Address' className='form-control' 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                        <label htmlFor='image' className='mb-1'>Image</label>
                        <input
                            type='file'
                            id='image'
                            className='form-control'
                            onChange={handleImageChange}
                            accept='image/*'
                        />
                        <img
                            src={`http://localhost:3001/${existingImage}`}
                            alt=""
                            style={{ maxWidth: '100px', marginTop: '10px' }}
                        />
                    </div>
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateUser