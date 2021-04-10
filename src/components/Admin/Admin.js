import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
import Sidebar from '../Sidebar/Sidebar';

const Admin = () => {
    return (
        <HashRouter>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <Sidebar />
                    </div>

                    <div className="col-sm-9">
                        <Route path="/manage-product">
                            <ManageProduct />
                        </Route>
                        <Route path="/add-product">
                            <AddProduct />
                        </Route>
                        <Route path="/edit-product">
                            <EditProduct />
                        </Route>
                        <Route exact path="/">
                            <ManageProduct />
                        </Route>
                    </div>

                </div>
            </div>
        </HashRouter>
    );
};

export default Admin;