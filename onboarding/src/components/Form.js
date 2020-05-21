import React from 'react';

function Form(props) {
  //destructions so I won't have to add {props.}
  const { value, onInputChange, onCheckboxChange, onSubmit } = props;

  return (
    //working on form and the props will be included in the form
    <form>
      {/* firstname information */}
      <label>FirstName:</label>

      {/* add input and information below */}

      <input
        value={value.first_name}
        onChange={onInputChange}
        name='first_name'
        text='text'
        placeholder='FirstName'
      />

      {/* Lastname information  */}
      <label>Lastname:</label>

      <input
        value={value.last_name}
        onChange={onInputChange}
        name='last_name'
        text='text'
        placeholder='LastName'
      />

      {/* Email Information */}
      <label>Email:</label>

      <input
        value={value.email}
        onChange={onInputChange}
        name='email'
        text='text'
        placeholder='Email'
      />
      {/* Password Information */}
      <label>Password:</label>

      <input
        value={value.password}
        onChange={onInputChange}
        name='password'
        // use this below to hide password
        type='password' 
         placeholder='Password'
      />

      {/* Terms of Service */}
      <label>ServiceTerms:</label>
      <input
        type='checkbox'
        value={value.serviceTerms}
        onChange={onCheckboxChange}
        name='ServiceTerms'
      />
      {/* Button dealing with the user submit form*/}
      <button onClick={onSubmit}>Submit!</button>
    </form>
  );
}

export default Form;
