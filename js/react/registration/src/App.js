import React, { useState, useCallback } from 'react';

import Progress from './Progress';
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [profile, setProfile] = useState();
	const [stage, setStage] = useState(1);

	const cSetProfileFragment = useCallback((fragment) => {
		setProfile((profile) => ({ ...profile, ...fragment }));
		setStage((stage) => stage + 1);
	}, [])

	const cJump = useCallback((newStage) => {
		setStage((stage) => newStage || ++stage);
	}, []);

	return (
		<>
			<Progress stage={stage} onJump={cJump} />

			{ stage === 1 && (<ProfileForm stage={stage} profile={profile} onSave={cSetProfileFragment} onJump={cJump} />)}
			{ stage === 2 && (<AddressForm stage={stage} profile={profile} onSave={cSetProfileFragment} onJump={cJump} />)}
		</>
	);
}

export default App;
