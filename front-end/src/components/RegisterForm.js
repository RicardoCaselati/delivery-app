import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import '../style/components/form.css';

export default function RegisterForm() {
  const [invalidLogin, setInvalidLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validNewUser, setValidNewUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const pwdMinLength = 6;
    const nameMinLength = 12;

    if (password.length < pwdMinLength || !email.match(/\S+@\S+\.\S+/) || name.length < nameMinLength) setInvalidLogin(true);
    else setInvalidLogin(false);
  }, [name, email, password]);

  const handleRegister = (e) => {
    e.preventDefault();

    const NEW_USER_CODE = 201;
    const USER_ALREADY_EXISTS_CODE = 409;

    fetch(
      'http://localhost:3001/login/new',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      },
    ).then((res) => {
      console.log(res);
      if (res.status === NEW_USER_CODE) navigate('/customer/products');
      else if (res.status === USER_ALREADY_EXISTS_CODE) setValidNewUser(true);
    });
  };

  return (
    <div className="body">
      <Logo />
      <form onSubmit={ handleRegister } className="login-form">
        <input
          className="input-form"
          placeholder="nome"
          onChange={ ({ target }) => setName(target.value) }
          data-testid="common_register__input-name"
        />
        <input
          className="input-form"
          placeholder="email"
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          data-testid="common_register__input-email"
        />
        <input
          className="input-form"
          placeholder="senha"
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          data-testid="common_register__input-password"
        />
        <button
          className="login-btn"
          disabled={ invalidLogin }
          data-testid="common_register__button-register"
          type="button"
        >
          CADASTRAR
        </button>

        {validNewUser && (
          <div
            data-testid="common_register__element-invalid_register"
          >
            Usuário já cadastrado
          </div>
        )}
      </form>
    </div>
  );
}
