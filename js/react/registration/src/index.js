import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from "react-dom";

import Registration from './Registration';
import Verification from './Verification';

let element = document.getElementById("registration"); 
let component;
if (element) {
    component = Registration;
} else {
    element = document.getElementById("verification")
    component = Verification;
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route component={component} />
        </BrowserRouter>
    </React.StrictMode>,
    element
);
