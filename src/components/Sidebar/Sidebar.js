import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="bg-dark w-25 text-white rounded-right d-flex flex-column align-items-start ps-5 pt-5 fw-5 fs-5 w-100" style={{height:"90vh", marginLeft:"-50px"}}>
            <Link to="/manage-product" style={{textDecoration: "none", color: 'white'}}><p><FontAwesomeIcon className="icon me-1 text-light" icon={faTasks} /> Manage Product</p></Link>
            <Link to="/add-product" style={{textDecoration: "none", color: 'white'}}><p><FontAwesomeIcon className="icon me-1 text-light" icon={faPlus} /> Add Product</p></Link>
            <Link to="/edit-product" style={{textDecoration: "none", color: 'white'}}><p><FontAwesomeIcon className="icon me-1 text-light" icon={faEdit} /> Edit Product</p></Link>
        </div>
    );
};

export default Sidebar;