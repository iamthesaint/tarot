<<<<<<< HEAD
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
interface User {
  username: string;
  email: string;
  password: string;
  savedBooks: string[];
}
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = ({}: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
=======
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import type { User } from "../models/User";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
>>>>>>> 43a01edab0822946b3993937e88a192d2ef7eb3f
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER); //added mutation

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await login({
<<<<<<< HEAD
      //  variables: { ...userFormData },
        variables: { email: userFormData.email, password: userFormData.password },
=======
        variables: { ...userFormData },
>>>>>>> 43a01edab0822946b3993937e88a192d2ef7eb3f
      });

      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
<<<<<<< HEAD
      } else {
        throw new Error('Login failed');
=======
        localStorage.setItem("userData", JSON.stringify(data.login));
      } else {
        throw new Error("Login failed");
>>>>>>> 43a01edab0822946b3993937e88a192d2ef7eb3f
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
<<<<<<< HEAD
      username: '',
      email: '',
      password: '',
      savedBooks: [],
=======
      username: "",
      email: "",
      password: "",
>>>>>>> 43a01edab0822946b3993937e88a192d2ef7eb3f
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
<<<<<<< HEAD
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
=======
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
>>>>>>> 43a01edab0822946b3993937e88a192d2ef7eb3f
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
