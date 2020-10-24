import React, { useState, useCallback } from 'react';
import axios from 'axios';

import Progress from './Progress';
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';

import config from './config';

function App() {
	const [profile, setProfile] = useState();
	const [stage, setStage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([])

	const setProfileFragment = useCallback((fragment) => {
		const newProfile = { ...profile, ...fragment }
		setProfile(newProfile);
		const promise = (stage !== 2) ? Promise.resolve() : axios.post(`${config.DOMAIN}/customers/register`, newProfile);

		promise
			.then((msg) => {
				console.log(msg);
				setStage((stage) => stage + 1);
			})
			.catch((err) => {
				setErrors(err?.response?.data?.errors || []);
				setStage(1);
			});
	}, [stage]);

	const cJump = useCallback((newStage) => {
		setStage((stage) => newStage || ++stage);
	}, []);

	const props = { stage, profile, isLoading, errors, onJump: cJump, onSave: setProfileFragment };

	return (
		<>
			<Progress stage={stage} onJump={cJump} />

			{ stage === 1 && (<ProfileForm {...props} />)}
			{ stage === 2 && (<AddressForm {...props} />)}
			{ stage === 3 && (
				<div className='heading-block center border-bottom-0'>
					<h3 className='font-weight-semibold uppercase'>Almost done, verify your contact details</h3>
					<span>Check your mailbox and mobile for verification links</span>

					<img src='./images/illustrations/verification.png' width='600px' />
				</div>
			)}
		</>
	);
}

export default App;
