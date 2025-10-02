"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FreelancerLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/freelancer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("freelancer", JSON.stringify(data));
      router.push("/freelancer");
    } else {
      alert(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600">
          Iniciar Sesión Freelancer
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
