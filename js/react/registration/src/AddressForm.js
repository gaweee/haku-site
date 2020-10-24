import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import * as Yup from 'yup';

import styles from './App.module.scss';

const AddressForm = ({ stage, profile, onSave, onJump, errors: remoteErrors, isLoading = false }) => {
	 // React Hook Form and Validation Details
	 const { register, handleSubmit, setValue, errors, setError } = useForm({
        defaultValues: { address: '50 Scotts Road', addressApt: '#04-03', postalCode: '228242', ...profile },
        resolver: yupResolver(Yup.object().shape({
            address: Yup.string().label('Address').required(),
            postalCode: Yup.string().label('Postal Code').min(5).max(10).matches(/\d+/, 'Postal Code must be made of 6-10 digits'),
        })),
	});

	const save = (values) => {
        console.log(values);
        if (typeof onSave === 'function') onSave(values);
    };

    const prev = () => {
        if (typeof onJump === 'function') onJump(--stage);
    }

    const next = () => {
        if (typeof onJump === 'function') onJump();   
    }

    useEffect(() => {
        for (const error of _.castArray(remoteErrors)) setError(error.field, { type: 'manual', message: error.message });
    }, [remoteErrors]);

	return (
        <Form onSubmit={handleSubmit(save)}>
            <Container>
                <Row>
                    <Form.Group as={Col} controlId='address'>
                        <Form.Label>Street Name </Form.Label>
                        <Form.Control type='text' name='address' ref={register} isInvalid={Boolean(errors.address)} />
                        <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row>
                    <Form.Group as={Col} controlId='addressApt'>
                        <Form.Label>Apt/Suite Details</Form.Label>
                        <Form.Control type='text' name='addressApt' ref={register} isInvalid={Boolean(errors.addressApt)} />
                        <Form.Control.Feedback type="invalid">{errors.addressApt?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='text' name='postalCode' ref={register} isInvalid={Boolean(errors.postalCode)} />
                        <Form.Control.Feedback type="invalid">{errors.postalCode?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row>
                    <Col md="auto">
                        <Button variant='outline-dark' type='submit' onClick={prev}>Previous</Button>
                    </Col>

                    <Col></Col>

                    <Col md="auto">
                        <Button variant='outline-primary' type='submit' className={styles.spacerR} onClick={next}>Skip</Button>
                        <Button variant='primary' type='submit' disabled={isLoading}>
                            {isLoading && (<Spinner animation='border' variant='light' size='sm' className={styles.spacerR} />)}
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>				
        </Form>
	);
}

export default AddressForm;
