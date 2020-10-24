import React from 'react';
import clsx from 'clsx';

const Progress = ({ stage = 1, onJump }) => {

    const change = (newStage) => {
        if (typeof onJump === 'function') onJump(newStage);
    };
    
	return (
        <ul className='process-steps process-3 row col-mb-30 justify-content-center mb-4'>
            <li className={clsx(['col-sm-6', 'col-lg-3', stage >= 1 ? 'active' : ''])} onClick={() => change(1)}>
                <a className='i-circled i-alt mx-auto icon-id-badge'></a>
                <h5>Profile Details</h5>
            </li>
            <li className={clsx(['col-sm-6', 'col-lg-3', stage >= 2 ? 'active' : ''])} onClick={() => change(2)}>
                <a className='i-bordered i-circled mx-auto icon-map-marker-alt'></a>
                <h5>Address Details</h5>
            </li>
            <li className={clsx(['col-sm-6', 'col-lg-3', stage >= 3 ? 'active' : ''])} onClick={() => change(3)}>
                <a className='i-bordered i-circled mx-auto icon-check-circle'></a>
                <h5>Verify Account</h5>
            </li>
        </ul>
	);
}

export default Progress;
