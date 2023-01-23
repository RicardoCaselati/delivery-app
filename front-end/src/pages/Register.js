import React, { useEffect, useState } from 'react';

export default function Register() {
  const [invalidLogin, setInvalidLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const pwdMinLength = 6;
    const nameMinLength = 12;

    if (password.length < pwdMinLength || !email.match(/\S+@\S+\.\S+/) || name.length < nameMinLength) setInvalidLogin(true);
    else setInvalidLogin(false);
  }, [name, email, password]);

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={ handleRegister }>
      <input
        onChange={ ({ target }) => setName(target.value) }
        data-testid="common_input__input-name"
      />
      <input
        onChange={ ({ target }) => setEmail(target.value) }
        type="email"
        data-testid="common_input__input-email"
      />
      <input
        onChange={ ({ target }) => setPassword(target.value) }
        type="password"
        data-testid="common_input__input-password"
      />
      <button
        disabled={ invalidLogin }
        data-testid="common_input__button-register"
        type="submit"
      >
        CADASTRAR
      </button>
    </form>
  );
}
