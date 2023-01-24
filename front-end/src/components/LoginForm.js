import React, { useEffect, useState } from 'react';
import '../style/components/form.css';
import Logo from './Logo';

export default function LoginForm() {
  const [invalidLogin, setInvalidLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const pwdMinLength = 6;

    if (password.length < pwdMinLength || !email.match(/\S+@\S+\.\S+/)) setInvalidLogin(true);
    else setInvalidLogin(false);
  }, [email, password]);

  const handleLogin = (e) => {
    e.preventDefault();
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

        <a
          href="/register"
          className="register-btn"
          data-testid="common_login__element-invalid-email"
          to="/register"
        >
          Ainda não tenho conta
        </a>

      </form>
    </div>
  );
}
