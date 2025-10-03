"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-800">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl font-extrabold text-white drop-shadow-lg mb-6"
        >
          Bienvenido a{" "}
          <span className="text-yellow-300">FreeConnect 🚀</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-white/90 max-w-2xl mb-10"
        >
          Conecta clientes con freelancers de todo el mundo.  
          Encuentra talento o comparte tus habilidades en un solo lugar.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Link
            href="#roles"
            className="px-8 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            Comenzar Ahora
          </Link>
        </motion.div>
      </section>

      {/* ROLES */}
      <section
        id="roles"
        className="bg-white py-16 px-6 rounded-t-3xl shadow-lg space-y-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-indigo-700 mb-8"
        >
          Elige tu rol
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Cliente */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              Cliente
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Buscas talento? Publica tus proyectos y encuentra al freelancer
              ideal para tu negocio.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/client/register"
                className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Registro
              </Link>
              <Link
                href="/client/login"
                className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* Freelancer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-pink-50 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">
              Freelancer
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Quieres trabajar? Ofrece tus servicios, consigue proyectos y haz
              crecer tu carrera profesional.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/freelancer/register"
                className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Registro
              </Link>
              <Link
                href="/freelancer/login"
                className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gray-900 text-white py-8 mt-auto"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">
            © {new Date().getFullYear()} FreeConnect. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/about" className="hover:text-yellow-300 transition">
              Acerca de
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition">
              Contacto
            </Link>
            <Link href="/privacy" className="hover:text-yellow-300 transition">
              Privacidad
            </Link>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
