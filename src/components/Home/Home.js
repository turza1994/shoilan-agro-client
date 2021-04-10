import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import SingleProduct from '../SingleProduct/SingleProduct';

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch('https://immense-bastion-87390.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    console.log(products);

    return (
        <div className="bg-light">
            <div className="pt-3 container">
                <Search className="mx-auto"/>
                {
                    products.length == 0 && 
                    <div className="d-flex justify-content-center mt-5 pt-5 bg-white">
                        <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                <div className="row g-5 align-items-center justify-content-center pt-5 gy-3">
                    {
                        products.map(cv => <SingleProduct key={cv._id} product={cv} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;