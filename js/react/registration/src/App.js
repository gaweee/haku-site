import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Registration from './Registration';
import Verification from './Verification';


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route key='verify' exact path='/verify/:otp' component={Verification} />

				<Route component={Registration} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
