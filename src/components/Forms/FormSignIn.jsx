import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const FormSignIn = () => {
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signin({ email, password })
      .then((res) => {
        storeToken(res.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <div className="signinForm">
      {error && <h3 className="error">{error.message}</h3>}
        <h2>Signin</h2>
      <form onSubmit={handleSubmit} className="form1">
      <div>
        <label htmlFor="email">Email: </label>
        <input className="signinput"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input className="signinput"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
      </div>
        <button className="btnsub">Submit</button>
      </form>
    </div>
  );
};

export default FormSignIn;
