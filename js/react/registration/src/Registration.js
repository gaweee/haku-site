import React, { useState, useCallback } from 'react';
import axios from 'axios';

import Progress from './Progress';
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';

import config from './config';

const Registration = (props) => {
	const [profile, setProfile] = useState();
	const [stage, setStage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([])

	const setProfileFragment = useCallback((fragment) => {
		const newProfile = { ...profile, ...fragment }
		setProfile(newProfile);

		new Promise((resolve) => {
				if (stage === 2) {
					setIsLoading(true);
					return resolve(axios.post(`${config.API_DOMAIN}/customers/register`, newProfile));
				}
				
				resolve();
			})
			.then((msg) => {
				console.log(msg);
				setStage((stage) => stage + 1);
			})
			.catch((err) => {
				setErrors(err?.response?.data?.errors || []);
				setStage(1);
			})
			.finally(() => setIsLoading(false));
			// eslint-disable-next-line
	}, [stage]);

	const cJump = useCallback((newStage) => {
		setStage((stage) => newStage || ++stage);
		// eslint-disable-next-line
	}, []);

	const formProps = { stage, profile, isLoading, errors, onJump: cJump, onSave: setProfileFragment };

	return (
		<>
			<Progress stage={stage} onJump={cJump} />

			{ stage === 1 && (<ProfileForm {...formProps} />)}
			{ stage === 2 && (<AddressForm {...formProps} />)}
			{ stage === 3 && (
				<div className='heading-block center border-bottom-0'>
					<h3 className='font-weight-semibold uppercase'>Almost done, verify your contact details</h3>
					<span>Check your mailbox and mobile for verification links</span>
                    
                    <div className='mt-3'><img src='images/illustrations/verification.png' width='600px' /></div>
				</div>
			)}
		</>
	);
}

export default Registration;
