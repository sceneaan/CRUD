import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setUsers (result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) =>
    {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
        .then(res => {console.log(res)
            window.location.reload()
        })
        .catch(errr => console.log(errr))
    }

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <h2 className='text-center mb-5'>User List</h2>
                <table className='table'>
                    <thead>
                    <tr>
                    <th style={{ padding: '10px' }}>Profile Picture</th>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Password</th>
                    <th style={{ padding: '10px' }}>Address</th>
                    
                    <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                <div style={{maxWidth:'100px',maxHeight:'100px',borderRadius:'50%',overflow:'hidden'}}>
                                <img
                                    src={`http://localhost:3001/${user.imagePath}`}
                                    alt=""
                                    style={{ maxWidth: '100px' }}
                                />
                                </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.password}</td>
                                <td>{user.address}</td>
                                
                                <td>
                                    <Link to={`/update/${user._id}`}><button className='btn btn-warning' style={{marginRight:'5px'}}>Edit</button></Link>
                                    <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                <div className="text-center">
                    <Link to="/create" className='btn btn-success'>Add User</Link>
                </div>
            </div>
        </div>
    );
}

export default Users;
