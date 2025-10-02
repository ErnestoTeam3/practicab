"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [form, setForm] = useState({
    companyName: "",
    projectName: "",
    projectDesc: "",
    profilePic: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("client");
    if (!stored) return router.push("/client-login");

    const data = JSON.parse(stored);
    setClient(data);
    setForm({
      companyName: data.companyName,
      projectName: data.projectName,
      projectDesc: data.projectDesc || "",
      profilePic: data.profilePic || "",
    });
  }, [router]);

  if (!client) return <p>Cargando...</p>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/client/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: client.id, ...form }),
    });
    const data = await res.json();

    if (res.ok) {
      setClient(data);
      localStorage.setItem("client", JSON.stringify(data));
      alert("Datos actualizados correctamente ✅");
    } else {
      alert(data.error || "Error al actualizar");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Editar Información
        </h2>

        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Descripción del proyecto"
          value={form.projectDesc}
          onChange={(e) => setForm({ ...form, projectDesc: e.target.value })}
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
      </form>
    </main>
  );
}
