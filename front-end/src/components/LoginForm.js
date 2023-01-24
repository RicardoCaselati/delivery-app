import React, { useEffect, useState } from 'react';
import '../style/components/form.css';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function LoginForm() {
  const [invalidLogin, setInvalidLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const pwdMinLength = 6;

    if (password.length < pwdMinLength || !email.match(/\S+@\S+\.\S+/)) setInvalidLogin(true);
    else setInvalidLogin(false);
  }, [email, password]);

  const handleLogin = (e) => {
    const ERROR_CODE = 404;
    e.preventDefault();
    fetch(
      'http://localhost:3001/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    ).then((res) => {
      if (res.status === ERROR_CODE) window.alert('Usuário inexistente');
      else navigate('/customer/products');
    });
  };

  return (
    <div className="body">
      <Logo />

      <form onSubmit={ handleLogin } className="login-form">

        <input
          className="input-form"
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          data-testid="common_login__input-email"
          placeholder="email"
        />

        <input
          className="input-form"
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          data-testid="common_login__input-password"
          placeholder="senha"
        />

        <button
          className="login-btn"
          disabled={ invalidLogin }
          data-testid="common_login__button-login"
          type="submit"
        >
          LOGIN
        </button>

        <button
          type="button"
          className="register-btn"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>

        <div data-testid="common_login__element-invalid-email" />
      </form>
    </div>
  );
}
