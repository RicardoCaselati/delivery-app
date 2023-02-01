import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [invalidUser, setInvalidUser] = useState(true);
  const [invalidRegister, setInvalidRegister] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/admin/list-users').then((response) => response.json()).then((json) => setUsers(json));
  }, []);

  useEffect(() => {
    const nameMinLength = 12;
    const passwordMinLength = 6;

    if (name.length < nameMinLength || !email.match(/\S+@\S+\.\S+/) || password.length < passwordMinLength || role === '') setInvalidUser(true);
    else setInvalidUser(false);
  }, [name, email, password, role]);

  const addNewUser = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('admin'));

    fetch('http://localhost:3001/admin/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ name, email, password, role }),
    }).then((response) => {
      const CONFLICT_CODE = 409;
      const NEW_USER_CODE = 201;
      console.log(response);
      if (response.status === CONFLICT_CODE) setInvalidRegister(true);
      else if (response.status === NEW_USER_CODE) {
        fetch('http://localhost:3001/admin/list-users').then((res) => res.json()).then((json) => setUsers(json));
      }
    });
  };

  return (
    <div>
      <header>
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </header>
      <form onSubmit={ addNewUser }>
        <input
          onChange={ ({ target }) => setName(target.value) }
          data-testid="admin_manage__input-name"
        />
        <input
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="admin_manage__input-email"
        />
        <input
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="admin_manage__input-password"
        />
        <select
          aria-label="role"
          onChange={ ({ target }) => setRole(target.value) }
          data-testid="admin_manage__select-role"
          defaultValue=""
        >
          <option value="">selecione</option>
          <option value="admin">admin</option>
          <option value="seller">seller</option>
          <option value="customer">customer</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          disabled={ invalidUser }
        >
          CADASTRAR
        </button>
        {invalidRegister && <div data-testid="admin_manage__element-invalid-register" />}
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={ user.id }>
              <td
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                {user.name}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {user.email}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {user.role}
              </td>
              <td>
                <button
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  type="button"
                  // onClick={}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
