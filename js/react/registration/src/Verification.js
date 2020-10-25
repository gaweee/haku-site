import React, { useState, useEffect } from 'react';
import axios from 'axios';

import config from './config';

const Verification = (props) => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.match.params && props.match.params.otp) {
            const otp = props.match.params.otp;
            console.log(otp);

            axios.get(`${config.API_DOMAIN}/customers/verify/${otp}`)
                .then((msg) => {
                    setIsVerified(true);
                })
                .catch((err) => {
                    setIsVerified(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

	return (
        <div className='heading-block center border-bottom-0'>
            { isLoading ? (
                <div className="css3-spinner">
                    <div className="css3-spinner-ball-scale-multiple">
                        <div className='bg-primary'></div>
                        <div className='bg-primary'></div>
                        <div className='bg-primary'></div>
                    </div>
                </div>
            ) : (
                <>
                    { isVerified ? (
                        <>
                            <h3 className='font-weight-semibold uppercase'>All set! Help is just around the coner!</h3>
                            <span>Login to the Customer Portal to manage your bookings!</span>
                            <a className='btn btn-primary btn-lg mt-3 gradient-purple-blue ' href='#'>Console Login</a>

                            <div className='mt-3'><img src='/images/illustrations/verified.png' width='600px' /></div>
                        </>
                    ) : (
                        <>
                            <h3 className='font-weight-semibold uppercase'>Invalid Verification Token</h3>
                            <span>Perhaps its a typo? Check your mail or mobile messages and use the link provided</span>

                            <div className='mt-3'><img src='/images/illustrations/error.png' width='600px' /></div>
                        </>
                    )}
                </>
            )}
        </div>
	);
}

export default Verification;
