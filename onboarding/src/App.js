import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

//importing components that I will work on also installing and importing yup and axios(post request only)
import Form from './components/Form';
import User from './components/User';

import axios from 'axios';
import * as yup from 'yup';

// Post request to send form data to endpoint
const url = 'https://reqres.in/api/users';

//This state will drive my formValues
const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  serviceTerms: '',
};

//This state will drive the FormErrors
const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  //I will add a checkbox to Terms of Service
  serviceTerms: '',
};

// Using the Yup Library here. Understanding what will happen with the 
// form from then information below. I will be making one for the firstname, 
// lastname,email,and password

const formSchema = yup.object().shape({
  
  first_name: yup
    .string()
    .min(3, 'name must have at least 4 characters')
    .required('name is required'),

  last_name: yup
  .string()
  .min(3, 'name must have at least 4 characters')
  .required('name is required'),
  
  email: yup
  .string()
  .email('a Valid email required')
  .required('email is required'),

  password: yup
  .string()
  .min(8, 'characters a must.')
  .required('contain Capital lower case'),

  serviceTerms: yup
  .boolean()
  .oneOf([true], "You must accept Terms and Conditions")
});


export default function App() {
  //creating states to understand what follows
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  
  //this is for the submit button
  const [formDisabled, setFormDisabled] = useState(true);
  
  //Tracking Validation Errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const getUsers = () => {
    //calling for API using Get
    axios
    .get(url)
    .then((res) => {
      setUsers(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getUsers();
  }, []); //this is not an Array

  const postUser = (user) => {
    //crafting API post request
    axios
    .post(url, user)
    .then((res) => {
      setUsers([...users, res.data]) // what does ...something mean? 
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setFormDisabled(!valid);
    });
  }, [formValues]);

  const onSubmit = (evt) => {
    evt.preventDefault();
  
    const newUser = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      password: formValues.password,
    };
  
    //Post new User to API
    postUser(newUser);
    setFormValues(initialFormValues);
  };
  //the effect that will take place in form.js
  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
  
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  //the effect that will take place in form.js
  const onCheckboxChange = (evt) => {
    const { name } = evt.target;
    const isChecked = evt.target.checked;
  
    setFormValues({
      ...formValues,
      serviceTerms: {
        ...formValues.serviceTerms,
        [name]: isChecked,
      },
    });
  };

  return (
    <div className='App'>
      <h1>Form Management</h1>
  
      <Form
        value={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        disabled={formDisabled}
        errors={formErrors}
      />
  
      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );

}
