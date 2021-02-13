import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import restServices from "../library/RestService";


const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
  


      const loginObject = {
        username: data.username,
        password: data.password
      };


      restServices.authenticate(loginObject)
      .then(response => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.userDetails));
        localStorage.setItem("projectList", JSON.stringify(response.data.projectList));
        history.push("/dashboard");
      }).catch(error => {
          if (error.response) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("projectList");
          }
          setMessage({
            data: "Başarısız İşlem..",
            type: "alert-danger",
          });

      });

  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Kullanıcı Adı</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="username"
                type="input"
                className="form-control"
                aria-describedby="Kullanıcı Adı giriniz"
                placeholder="Kullanıcı Adı giriniz"
                ref={register({
                  required: {
                    value: true,
                    message: "Kullanıcı Adı giriniz",
                  },
                })}
              />
    
              {errors.username && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Şifre"
                ref={register({
                  required: {
                    value: true,
                    message: "Lütfen Şifrenizi Girin",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
