"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ClientPage() {
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [form, setForm] = useState({
    companyName: "",
    projectName: "",
    projectDesc: "",
    profilePic: "",
  });

  const [freelancers, setFreelancers] = useState<any[]>([]);

  // ✅ cargar cliente logueado
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

  // ✅ cargar freelancers activos
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await fetch("/api/freelancer/active");
        const data = await res.json();
        if (res.ok) setFreelancers(data);
      } catch (err) {
        console.error("Error al obtener freelancers:", err);
      }
    };
    fetchFreelancers();
  }, []);

  if (!client) return <p className="text-center mt-10">Cargando...</p>;

  // ✅ actualizar datos del cliente
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

  // ✅ cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("client");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 relative">
      {/* Header con foto y logout */}
      <header className="absolute top-4 right-6 flex items-center space-x-4">
        {form.profilePic ? (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={form.profilePic}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"
          >
            {client.companyName?.charAt(0).toUpperCase()}
          </motion.div>
        )}
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Formulario */}
      <div className="flex justify-center items-center pt-20">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleUpdate}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-indigo-600">
            Editar Información
          </h2>

          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={form.projectName}
            onChange={(e) => setForm({ ...form, projectName: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            placeholder="Descripción del proyecto"
            value={form.projectDesc}
            onChange={(e) => setForm({ ...form, projectDesc: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="URL Foto de perfil"
            value={form.profilePic}
            onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          {form.profilePic && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={form.profilePic}
              alt="preview"
              className="w-24 h-24 rounded-full mx-auto border shadow-md"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Guardar cambios
          </motion.button>
        </motion.form>
      </div>

      {/* Freelancers Activos */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mt-10 mx-auto"
      >
        <h2 className="text-xl font-bold text-indigo-600 mb-6 text-center">
          Freelancers Activos
        </h2>

        {freelancers.length === 0 ? (
          <p className="text-gray-500 text-center">
            No hay freelancers activos 😢
          </p>
        ) : (
          <ul className="space-y-4">
            {freelancers.map((f) => (
              <motion.li
                key={f.id}
                whileHover={{ scale: 1.03 }}
                className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={f.profilePic || "https://via.placeholder.com/40"}
                  alt={f.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-gray-800">{f.name}</p>
                  <p className="text-sm text-gray-500">{f.skills}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>
    </main>
  );
}
