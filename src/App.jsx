// src/Login.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { login } from "./api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.usuario, data.contraseña)
      .then((token) => {
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        // Redirigir a otra página, por ejemplo a la página principal
        // window.location.href = '/dashboard';
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Toaster position="bottom-right" />
      <div className="bg-white w-1/4 text-black rounded shadow-md shadow-white p-10">
        <form
          className="text-black flex gap-4 p-4 items-center justify-center flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="border-2 border-black p-2 rounded shadow-black"
            type="text"
            placeholder="Usuario"
            {...register("usuario", {
              required: { value: true, message: "Campo Requerido" },
              minLength: {
                value: 2,
                message: "Tu nombre debe tener Minimo 2 Palabras",
              },
              maxLength: { value: 100, message: "Maximo 100 palabras" },
            })}
          />
          {errors.usuario && <p>{errors.usuario.message}</p>}
          <input
            className="border-2 border-black p-2 rounded shadow-black"
            type="password"
            placeholder="Contraseña"
            {...register("contraseña", {
              required: { value: true, message: "Campo Requerido" },
              minLength: {
                value: 2,
                message: "Tu Contraseña debe tener Minimo 2 Palabras",
              },
              maxLength: { value: 50, message: "Maximo 50 palabras" },
            })}
          />
          {errors.contraseña && <p>{errors.contraseña.message}</p>}
          <button
            type="submit"
            className="bg-black text-white p-[6px_15px] rounded"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
