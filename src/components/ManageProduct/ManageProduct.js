import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const ManageProduct = () => {
    const[ products, setProducts] = useState([])

    useEffect(()=>{
        fetch('https://immense-bastion-87390.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[products])

    const handleDeleteButton = (id)=>{
        fetch(`https://immense-bastion-87390.herokuapp.com/deleteProduct/${id}`, {
            method: 'DELETE',
          })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <h2>Manage Products</h2>
            <table className="w-100 mt-5">
                <tr>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                {
                    products.map(cv => 
                        <tr key={cv._id}>
                            <td>{cv.name}</td>
                            <td>{cv.weight}</td>
                            <td>{cv.price}</td>
                            <td>
                                <button className="btn btn-success"><FontAwesomeIcon className="icon me-1 text-light" icon={faEdit} /></button>
                                
                                <button onClick={ () => handleDeleteButton(cv._id) } className="btn btn-danger"><FontAwesomeIcon className="icon me-1 text-light" icon={faTrash} /></button>
                            </td>
                        </tr>
                        )
                }
            </table>
        </div>
    );
};

export default ManageProduct;