import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({product}) => {
    const {name, price, photo, _id} = product
    return (
        <div className="col-sm-4 d-flex flex-column justify-content-center align-items-center">
            <div className="w-75 bg-white shadow-sm rounded">
                <img className="w-100 rounded" src={photo} alt="" style={{ height: "250px" }} />
                <h4>{name}</h4>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-success">${price}</h4>
                    <Link to={`/checkout/${_id}`}><button className="btn btn-success">Buy Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;