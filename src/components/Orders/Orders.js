import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([])
    
    useEffect(()=>{
        fetch(`https://immense-bastion-87390.herokuapp.com/orders/${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])

    console.log(orders);

    return (
        <div>
            <h2 className="p-5">Order</h2>
            <table className="w-75 mx-auto mt-5">
                <tr>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                </tr>
                {
                    orders.map(cv => 
                        <tr key={cv._id}>
                            <td>{cv.name}</td>
                            <td>{cv.quantity}</td>
                            <td>{cv.price}</td>
                        </tr>
                        )
                }
            </table>
        </div>
    );
};

export default Orders;