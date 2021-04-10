import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

const Checkout = () => {
    const{id} = useParams()
    const[product, setProduct] = useState({})
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(()=>{
        fetch(`https://immense-bastion-87390.herokuapp.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])

    let history = useHistory();

    const handleCheckout = ()=>{
        const newOrder = {
            name: product.name,
            quantity: 1,
            price: product.price,
            userEmail: loggedInUser.email
        }
        fetch("https://immense-bastion-87390.herokuapp.com/addOrder", {
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        .then(res => console.log('server side response', res))

        history.push("/")
    }
    console.log(loggedInUser.email);
    return (
        <div>
            <h2 className="p-5">checkout</h2>
            <div className="w-75 mx-auto">
                <table className="w-100">
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>{product.name}</td>
                        <td>1</td>
                        <td>{product.price}</td>
                    </tr>
                    <br/>
                    <tr>
                        <td colSpan="2">Total</td>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <button className="btn btn-success d-block mx-auto" onClick={handleCheckout}>Checkout</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Checkout;