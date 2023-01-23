import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import '../style/components/form.css';

export default function RegisterForm() {
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
    <div className="body">
      <Logo />
      <form onSubmit={ handleRegister } className="login-form">
        <input
          className="input-form"
          placeholder="nome"
          onChange={ ({ target }) => setName(target.value) }
          data-testid="common_input__input-name"
        />
        <input
          className="input-form"
          placeholder="email"
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          data-testid="common_input__input-email"
        />
        <input
          className="input-form"
          placeholder="senha"
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          data-testid="common_input__input-password"
        />
        <button
          className="input-form"
          id="login-btn"
          disabled={ invalidLogin }
          data-testid="common_input__button-register"
          type="submit"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
