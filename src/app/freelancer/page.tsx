"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FreelancerDashboard() {
  const router = useRouter();
  const [freelancer, setFreelancer] = useState<any>(null);
  const [form, setForm] = useState({ name: "", skills: "", profilePic: "" });
  const [isActive, setIsActive] = useState(false);

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
    setIsActive(data.isActive || false);
  }, [router]);

  if (!freelancer) return <p className="text-center mt-10">Cargando...</p>;

  // Actualizar perfil
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

  // Cambiar disponibilidad
  const handleToggleActive = async () => {
    const res = await fetch("/api/freelancer/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: freelancer.id, isActive: !isActive }),
    });
    const data = await res.json();

    if (res.ok) {
      setIsActive(data.isActive);
      setFreelancer(data);
      localStorage.setItem("freelancer", JSON.stringify(data));
    } else {
      alert(data.error || "Error al cambiar estado");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("freelancer");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative">
      {/* Header con foto y logout */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-4 right-6 flex items-center space-x-4"
      >
        {form.profilePic ? (
          <motion.img
            whileHover={{ scale: 1.1, rotate: 3 }}
            src={form.profilePic}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover shadow-md"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 shadow-md">
            {freelancer.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Cerrar sesión
        </motion.button>
      </motion.header>

      {/* Formulario con animación */}
      <div className="flex justify-center items-center pt-20">
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleUpdate}
          className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-indigo-600">
            Editar Perfil
          </h2>

          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
            type="text"
            placeholder="Skills"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
            type="text"
            placeholder="URL Foto de perfil"
            value={form.profilePic}
            onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Guardar cambios
          </motion.button>

          {/* Botón toggle con animación */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleToggleActive}
            className={`w-full py-2 font-semibold rounded-lg shadow-md transition ${
              isActive
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isActive ? "Desactivar Disponibilidad" : "Activar Disponibilidad"}
          </motion.button>
        </motion.form>
      </div>
    </main>
  );
}
