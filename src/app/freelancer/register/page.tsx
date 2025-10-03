"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FreelancerRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    skills: "",
    profilePic: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/freelancer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("freelancer", JSON.stringify(data));
      router.push("/freelancer");
    } else {
      alert(data.error || "Error en el registro");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600">
          Registro Freelancer
        </h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Habilidades (ej. React, Node.js)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="URL Foto Perfil"
          value={form.profilePic}
          onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
          className="w-full p-3 border rounded"
        />

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
          Registrarse
        </button>
      </form>
    </main>
  );
}
