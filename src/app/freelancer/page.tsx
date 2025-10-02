"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FreelancerDashboard() {
  const router = useRouter();
  const [freelancer, setFreelancer] = useState<any>(null);
  const [form, setForm] = useState({ name: "", skills: "", profilePic: "" });

  useEffect(() => {
    const stored = localStorage.getItem("freelancer");
    if (!stored) return router.push("/login-freelancer");

    const data = JSON.parse(stored);
    setFreelancer(data);
    setForm({
      name: data.name,
      skills: data.skills,
      profilePic: data.profilePic || "",
    });
  }, [router]);

  if (!freelancer) return <p className="text-center mt-10">Cargando...</p>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/freelancer/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: freelancer.id, ...form }),
    });
    const data = await res.json();

    if (res.ok) {
      setFreelancer(data);
      localStorage.setItem("freelancer", JSON.stringify(data));
      alert("Datos actualizados correctamente ✅");
    } else {
      alert(data.error || "Error al actualizar");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Editar Perfil
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Skills"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL Foto de perfil"
          value={form.profilePic}
          onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Guardar cambios
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("freelancer");
            router.push("/login-freelancer");
          }}
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}
