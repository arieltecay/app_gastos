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
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Heading */}
                    <h1 className="text-5xl font-bold text-center">
                        Contról de gastos
                    </h1>

                    {/* Subheading */}
                    <p className="mt-4 text-xl text-center">
                        Administra todos los gastos personales y de tu negocio en un solo lugar.
                    </p>

                    {/* Feature Icons */}
                    <div className="flex space-x-8 mt-10">
                        <div className="flex flex-col items-center">
                            <FaMoneyBillWave className="text-3xl" />
                            <p className="mt-2">Eficiente y veloz</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaFilter className="text-3xl" />
                            <p className="mt-2">Busquedas faciles gastos</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <IoIosStats className="text-3xl" />
                            <p className="mt-2">Control completo</p>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <Link to="/register">
                        <button className="mt-8 px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                            Puedes contactarnos
                        </button>
                    </Link>
                </div>
            </div>
            {/* How it works */}
            <div className="py-20 px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    ¿Como funciona gastos personales?
                </h2>
                <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-blue-500 text-white mb-4">
                            <FaSignInAlt className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Creación de cuenta</h3>
                        <p>Solicita una pruebas por 30 días libres.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-green-500 text-white mb-4">
                            <FaList className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Agrega información</h3>
                        <p>Categorias y transacciones</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-yellow-500 text-white mb-4">
                            <FaChartPie className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Mira tus movimientos</h3>
                        <p>Mira y analiza todo el balance de tu cuenta.</p>
                    </div>
                </div>
            </div>
            {/* Testimonials */}
            <div className="bg-gray-100 py-20 px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    What Our Users Say
                </h2>
                <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaQuoteLeft className="text-xl text-gray-400" />
                        <p className="mt-4">
                            This app has revolutionized the way I track my expenses. Highly
                            intuitive and user-friendly.
                        </p>
                        <p className="mt-4 font-bold">- Jane Doe</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaQuoteLeft className="text-xl text-gray-400" />
                        <p className="mt-4">
                            Finally, a hassle-free way to manage my finances. The insights
                            feature is a game changer!
                        </p>
                        <p className="mt-4 font-bold">- John Smith</p>
                    </div>
                </div>
            </div>
            {/* CTA */}
            <div className="bg-blue-500 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">
                        Ready to Take Control of Your Finances?
                    </h2>
                    <p className="mt-4">
                        Join us now and start managing your expenses like a pro!
                    </p>
                    <Link to="/register">
                        <button className="mt-8 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                            Sign Up For Free
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
