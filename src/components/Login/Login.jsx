import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [serverError, setServerError] = useState("");
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    setServerError("");

    //simulo llamada a db
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === "error@test.com") {
            reject(new Error("Usuario o contraseña incorrectos"));
          }
          resolve();
        }, 2000);
      });

      console.log(data);
      alert("✅ Login exitoso!");
      reset();
    } catch (error) {
      setServerError(error.message);
      reset();
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-modal">
        <div className="login-title-container">
          <h2 className="login-title">Iniciar Sesión</h2>
          <div className="login-server-error-message">
            {serverError && (
              <div className="server-error-message">⚠️ {serverError}</div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="login-input-container">
            <input
              className={`login-input ${errors.email ? "error" : ""} ${watchEmail && !errors.email ? "valid" : ""}`}
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <p className="login-error-message">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="login-input-container">
              <input
                className={`login-input ${errors.password ? "error" : ""} ${watchPassword && !errors.password ? "valid" : ""}`}
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />

              {errors.password && (
                <p className="login-error-message">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="login-remember-forgot">
            <div className="login-remember">
              <input
                className="login-remember-checkbox"
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
              ></input>
              <label htmlFor="rememberMe" className="login-remember-label">
                Remember me
              </label>
            </div>

            <div className="login-forgot">
              <a className="forgot-password" href="#">
                Olvidaste la contraseña?
              </a>
            </div>
          </div>

          <button
            className="login-submit-button"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Cargando..." : "Iniciar Sesion"}
          </button>

          <div className="register-text-container">
            <p id="register-text" className="register-text">
              No tienes cuenta?{"  "}
              <a href="#" className="register-link">
                Registrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
