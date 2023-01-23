import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
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
    <form onSubmit={ handleLogin }>
      <input
        onChange={ ({ target }) => setEmail(target.value) }
        type="email"
        data-testid="common_login__input-email"
      />
      <input
        onChange={ ({ target }) => setPassword(target.value) }
        type="password"
        data-testid="common_login__input-password"
      />
      <button
        disabled={ invalidLogin }
        data-testid="common_login__button-login"
        type="submit"
      >
        LOGIN
      </button>
      <Link
        data-testid="common_login__element-invalid-email"
        to="/register"
      >
        Ainda não tenho conta
      </Link>
    </form>
  );
}
