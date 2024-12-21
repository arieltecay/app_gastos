import { useEffect, useRef } from 'react';

const AddMoney = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center">Agregar Dinero</h2>
            <form className="w-full">
                <div className="mb-4">
                    <input
                        type="number"
                        id="amount"
                        ref={inputRef}
                        className="w-f<ull text-center text-6xl p-4 bg-transparent border-none focus:outline-none focus:ring-0"
                        required
                    />
                </div>
                <div className="p-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add Money
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMoney;