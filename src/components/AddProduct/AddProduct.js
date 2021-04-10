import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [imageURL, setIMageURL] = useState(null);

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        console.log(event.target[0].name, event.target[0].value, imageURL);
        const newProduct = {
            name: event.target[0].value,
            weight: event.target[1].value,
            price: event.target[2].value,
            photo: imageURL
        }
        const url = `https://immense-bastion-87390.herokuapp.com/addProduct`;
    
        fetch(url, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newProduct)
        })
        .then(res => console.log('server side response', res))
    } 

    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'a42122120174ecb35c6d611697a306af');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
          setIMageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    
      }

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleFormSubmit} className="mt-5 p-5">
                <div className="d-flex justify-content-around">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className="d-flex justify-content-around">
                    <label htmlFor="weight">Weight</label>
                    <input type="number" name="weight" id="weight"/>
                </div>
                <div className="d-flex justify-content-around">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price"/>
                </div>
                <div className="d-flex justify-content-around">
                    <label htmlFor="photo">Upload Photo</label>
                    <input type="file" name="photo" id="photo" onChange={handleImageUpload}/>
                </div>
                <div className="d-flex justify-content-center">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;