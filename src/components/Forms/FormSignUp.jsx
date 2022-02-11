import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import Logo from "../../images/Ironchat.png";
const FormSignUp = () => {
  const [values, handleChange] = useForm({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signup(values)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      <div className="divLogo">
        <NavLink
          className="logo"
          to="/"
          style={{ color: "rgb(224, 224, 224)" }}
        >
          <img style={{ width: "50px" }} src={Logo} alt="" />
          IronChat
        </NavLink>
      </div>

      <div className="signinForm">
        {error && <h3 className="error">{error.message}</h3>}
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="form1">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              className="signinput"
              onChange={handleChange}
              value={values.name}
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="signinput"
              onChange={handleChange}
              value={values.email}
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              className="signinput"
              onChange={handleChange}
              value={values.password}
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className="btnsub">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormSignUp;
