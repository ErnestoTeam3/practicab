import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px] text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Plataforma Freelancers 🚀
        </h1>
        <p className="text-gray-600">
          Elige tu rol para registrarte o iniciar sesión
        </p>

        {/* Cliente */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-indigo-600">Cliente</h2>
          <div className="flex justify-center gap-3">
            <Link
              href="/client/register"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Registro
            </Link>
            <Link
              href="/client/login"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Freelancer */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-pink-600">Freelancer</h2>
          <div className="flex justify-center gap-3">
            <Link
              href="/freelancer/register"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Registro
            </Link>
            <Link
              href="/freelancer/login"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
