import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from 'yup';

import config from './config';
import styles from './App.module.scss';


const ProfileForm = ({ profile, onSave }) => {
    const recaptchaRef = useRef();

	 // React Hook Form and Validation Details
	 const { register, handleSubmit, setValue, errors, setError } = useForm({
        defaultValues: { ...profile, city: 'SG', country: 'SG', },
        resolver: yupResolver(Yup.object().shape({
            firstName: Yup.string().label('First Name').max(255).required(),
            email: Yup.string().label('Email').email().required(),
            mobileNo: Yup.string().label('Mobile Number').max(15).required().matches(/^(\+65)?(6|8|9)\d{7}$/, 'Mobile Number invalid'),
            gender: Yup.string().label('Gender').max(1),
        })),
	});

	const save = async (values) => {
        console.log(recaptchaRef.current);
        const token = await recaptchaRef.current.executeAsync();
        console.log(token);
        if (typeof onSave === 'function') onSave(values);
    };

	return (
        <Form onSubmit={handleSubmit(save)}>
            <Container>
                <Row>
                    <Form.Group as={Col} controlId='firstName'>
                        <Form.Label>First Name </Form.Label>
                        <Form.Control type='text' name='firstName' ref={register} isInvalid={Boolean(errors.firstName)} />
                        <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' name='lastName' ref={register} isInvalid={Boolean(errors.lastName)} />
                        <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' name='email' ref={register} isInvalid={Boolean(errors.email)} />
                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId='mobileNo'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type='text' name='mobileNo' ref={register} isInvalid={Boolean(errors.mobileNo)} />
                        <Form.Control.Feedback type="invalid">{errors.mobileNo?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as='select' name='gender' custom ref={register} isInvalid={Boolean(errors.gender)}>
                            <option value=''>- Unspecifed -</option>
                            <option value='F'>Female</option>
                            <option value='M'>Male</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={6} controlId='password'>
                        <Form.Label>Set a Password</Form.Label>
                        <Form.Control type='password' name='password' ref={register} isInvalid={Boolean(errors.password)} />
                        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row>
                    <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={config.RECAPTCHA_SITE_KEY} />
                </Row>
                

                <Row>
                    <Form.Group as={Col} controlId='tnc'>
                        <Form.Check type='checkbox' name='tnc' label={(<>Agree to <a href="#">terms and conditions</a></>)} ref={register} isInvalid={Boolean(errors.tnc)}/>
                        <Form.Control.Feedback type="invalid">{errors.tnc?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row>
                    <Col md="auto">
                        <Button variant='outline-dark' type='submit'>Previous</Button>
                    </Col>

                    <Col></Col>

                    <Col md="auto">
                        <Button variant='outline-primary' type='submit' className={styles.spacerR}>Skip</Button>
                        <Button variant='primary' type='submit'>Submit</Button>
                    </Col>
                </Row>
            </Container>				
        </Form>
	);
}

export default ProfileForm;
