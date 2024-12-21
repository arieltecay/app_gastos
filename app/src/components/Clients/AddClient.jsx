import { useState } from 'react';

const AddClient = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
        loan: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold py-4 block">Agregar Cliente</h2>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="text-black py-4 block">Nombre Completo</label>
                    <input
                        type="text"
                        id="fullName"
                        className="w-full text-center text-xl p-4 bg-white border-none focus:outline-none focus:ring-0"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="text-black py-4 block">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full text-center text-xl p-4 bg-white border-none focus:outline-none focus:ring-0"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="text-black py-4 block">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        className="w-full text-center text-xl p-4 bg-white border-none focus:outline-none focus:ring-0"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="text-black py-4 block">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full text-center text-xl p-4 bg-white border-none focus:outline-none focus:ring-0"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="loan" className="text-black py-4 block">Monto del Préstamo</label>
                    <input
                        type="number"
                        id="loan"
                        className="w-full text-center text-xl p-4 bg-white border-none focus:outline-none focus:ring-0"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-black p-4 rounded">Agregar</button>
            </form>
        </div>
    );
};

export default AddClient;