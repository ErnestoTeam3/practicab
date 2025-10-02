"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    projectName: "",
    projectDesc: "",
    profilePic: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/client/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("client", JSON.stringify(data));
      router.push("/client");
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
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Registro Cliente
        </h2>

        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          placeholder="Descripción del proyecto"
          value={form.projectDesc}
          onChange={(e) => setForm({ ...form, projectDesc: e.target.value })}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="URL Foto de perfil"
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
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}
