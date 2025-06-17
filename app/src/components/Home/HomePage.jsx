import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section con gradiente mejorado */}
      <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 text-white py-24 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl font-bold text-center tracking-tight">
            Control de Gastos
          </h1>

          <p className="mt-6 text-xl text-center max-w-2xl leading-relaxed">
            La manera más inteligente de administrar tus finanzas personales y empresariales en una sola plataforma.
          </p>

          {/* Iconos de características con hover effects */}
          <div className="flex flex-wrap justify-center gap-12 mt-12">
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <FaMoneyBillWave className="text-4xl text-white" />
              <p className="mt-3 font-medium">Eficiente y Veloz</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <FaFilter className="text-4xl text-white" />
              <p className="mt-3 font-medium">Búsqueda Inteligente</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <IoIosStats className="text-4xl text-white" />
              <p className="mt-3 font-medium">Control Total</p>
            </div>
          </div>

          {/* Botón CTA mejorado */}
          <Link to="/register">
            <button className="mt-12 px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Comienza Ahora Gratis
            </button>
          </Link>
        </div>
      </div>
      {/* Sección Cómo Funciona */}
      <div className="py-24 px-4 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          ¿Cómo Funciona Nuestra Plataforma?
        </h2>
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 rounded-full bg-blue-500 text-white mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <FaSignInAlt className="text-2xl" />
            </div>
            <h3 className="text-xl mb-3 font-semibold">Registro Gratuito</h3>
            <p className="text-gray-600">Obtén 30 días de prueba sin compromiso</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 rounded-full bg-emerald-500 text-white mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
              <FaList className="text-2xl" />
            </div>
            <h3 className="text-xl mb-3 font-semibold">Gestiona tus Datos</h3>
            <p className="text-gray-600">Organiza categorías y transacciones fácilmente</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 rounded-full bg-amber-500 text-white mb-6 group-hover:bg-amber-600 transition-colors duration-300">
              <FaChartPie className="text-2xl" />
            </div>
            <h3 className="text-xl mb-3 font-semibold">Analiza tus Finanzas</h3>
            <p className="text-gray-600">Visualiza y controla todos tus movimientos</p>
          </div>
        </div>
      </div>
      {/* Testimonios */}
      <div className="bg-white py-24 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Opiniones de Nuestros Usuarios
        </h2>
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaQuoteLeft className="text-2xl text-emerald-500" />
            <p className="mt-6 text-lg text-gray-700">
              "Esta aplicación ha revolucionado la forma en que controlo mis gastos.
              Es muy intuitiva y fácil de usar."
            </p>
            <p className="mt-6 font-bold text-gray-900">- María García</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaQuoteLeft className="text-2xl text-emerald-500" />
            <p className="mt-6 text-lg text-gray-700">
              "Por fin encontré una manera sencilla de gestionar mis finanzas.
              ¡Las estadísticas son increíbles!"
            </p>
            <p className="mt-6 font-bold text-gray-900">- Carlos Rodríguez</p>
          </div>
        </div>
      </div>
      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            ¿Listo para Tomar el Control de tus Finanzas?
          </h2>
          <p className="mt-6 text-xl">
            Únete ahora y comienza a gestionar tus gastos como un profesional
          </p>
          <Link to="/register">
            <button className="mt-12 px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Registrarse Gratis
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
