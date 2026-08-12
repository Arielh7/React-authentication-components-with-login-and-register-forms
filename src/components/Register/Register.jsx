import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
  });

  const [serverError, setServerError] = useState("");

  const watchName = watch("name");
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    setServerError("");

    try {
      // Simular registro
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === "exists@test.com") {
            reject(new Error("Este email ya está registrado"));
          }
          resolve();
        }, 1500);
      });

      console.log("Datos de registro:", data);
      alert("✅ ¡Registro exitoso! Revisa tu email para verificar tu cuenta.");
    } catch (error) {
      setServerError(error.message);
    } finally {
      reset();
    }
  };

  return (
    <div className="register-container">
      <div className="register-modal">
        <div className="register-title-container">
          <h2 className="register-title">Crear Cuenta</h2>
          <div className="register-server-error-message">
            {serverError && (
              <div className="server-error-message">⚠️ {serverError}</div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="register-input-container">
            <input
              className={`register-input ${errors.name ? "error" : ""}`}
              type="text"
              placeholder="Nombre completo"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "Solo letras y espacios",
                },
              })}
            />
            {errors.name && (
              <p className="register-error-message">{errors.name.message}</p>
            )}
            {watchName && !errors.name && (
              <p className="register-error-message valid-message">
                Nombre Valido
              </p>
            )}
          </div>

          <div className="register-input-container">
            <input
              className={`register-input ${errors.email ? "error" : ""} ${watchEmail && !errors.email ? "valid" : ""}`}
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
              <p className="register-error-message">{errors.email.message}</p>
            )}
            {watchEmail && !errors.email && (
              <p className="register-error-message valid-message">
                Email válido
              </p>
            )}
          </div>

          <div className="register-input-container">
            <input
              className={`register-input ${errors.password ? "error" : ""} ${watchPassword && !errors.password ? "valid" : ""}`}
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 12,
                  message: "La contraseña debe tener hasta 12 caracteres",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "Debe tener al menos una mayúscula",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) || "Debe tener al menos una minúscula",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || "Debe tener al menos un número",
                },
              })}
            />

            {errors.password && (
              <p className="register-error-message">
                {errors.password.message}
              </p>
            )}
            {watchPassword && !errors.password && (
              <p className="register-error-message valid-message">
                Contraseña válida
              </p>
            )}
          </div>

          <div className="register-input-container">
            <input
              className={`register-input ${errors.confirmPassword ? "error" : ""} ${watchConfirmPassword && !errors.confirmPassword ? "valid" : ""}`}
              type="password"
              placeholder="Confirmar Contraseña"
              {...register("confirmPassword", {
                required: "La confirmacion es obligatoria",
                validate: (value) => {
                  if (!watchPassword) {
                    return "Primero establece una contraseña";
                  }
                  if (value !== watchPassword) {
                    return "Las contraseñas no coinciden";
                  }
                  return true;
                },
              })}
            />

            {errors.confirmPassword && (
              <p className="register-error-message">
                {errors.confirmPassword.message}
              </p>
            )}
            {watchConfirmPassword && !errors.confirmPassword && (
              <p className="register-error-message valid-message">
                Las contraseñas coinciden
              </p>
            )}
          </div>

          <div className="register-policy-checkbox-container">
            <input
              className="register-policy-checkbox"
              type="checkbox"
              id="policy"
              {...register("policy", {
                required: "Debes aceptar los términos y condiciones",
              })}
            ></input>

            {errors.policy && (
              <p className="register-error-message policy">
                {errors.policy.message}
              </p>
            )}

            <label htmlFor="policy" className="login-remember-label">
              Acepto los{" "}
              <a href="/terms" target="_blank" className="terms-link">
                términos y condiciones
              </a>{" "}
              y la{" "}
              <a href="/privacy" target="_blank" className="terms-link">
                política de privacidad
              </a>
            </label>
          </div>

          <button
            className="register-submit-button"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Cargando..." : "Registrarse"}
          </button>

          <div className="login-text-container">
            <p id="register-text" className="login-text">
              Tienes una cuenta{"  "}
              <a href="#" className="login-link">
                Inicia sesion
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
