import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { listCategoryAPI } from "../../services/category/categoryServices";
import { updateTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("La transacción es requerida")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("El monto es requerido")
    .positive("Debe ser un valor positivo"),
  category: Yup.string().required("Categoria es requerida"),
  date: Yup.date().required("Fecha es requerida"),
  description: Yup.string(),
});

const EditTransactionForm = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  // Fetch transaction details
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = getUserFromStorage();
        const response = await axios.get(`${BASE_URL}/transaction/print/${transactionId}`, {
          headers: {
            'x-auth-token': `Bearer ${token}`,
          },
        });
        setTransaction(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar la transacción");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  // Mutation
  const {
    mutateAsync,
    isPending,
    isError: isUpdateTranErr,
    error: updateErr,
    isSuccess,
  } = useMutation({
    mutationFn: ({ id, data }) => updateTransactionAPI(id, data),
    mutationKey: ["update-transaction"],
  });

  //fetching categories
  const { 
    data: dataCategory, 
  } = useQuery({
    queryFn: listCategoryAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync({ id: transactionId, data: values })
        .then(() => {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        })
        .catch((e) => console.log(e));
    },
    enableReinitialize: true,
  });

  // Set form values when transaction data is loaded
  useEffect(() => {
    if (transaction) {
      // Format date to YYYY-MM-DD for input[type="date"]
      const formattedDate = new Date(transaction.date).toISOString().split('T')[0];
      
      formik.setValues({
        type: transaction.type || "",
        amount: transaction.amount || "",
        category: transaction.category?.name || "",
        date: formattedDate || "",
        description: transaction.description || "",
      });
    }
  }, [transaction]);

  if (loading) {
    return <div className="text-center py-10">Cargando datos de la transacción...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertMessage type="error" message={error} />
        <button 
          onClick={() => navigate("/dashboard")} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Editar Transacción
        </h2>
        <p className="text-gray-600">Actualiza los datos de la transacción</p>
      </div>
      
      {/* Display alert messages */}
      {isUpdateTranErr && (
        <AlertMessage
          type="error"
          message={
            updateErr?.response?.data?.message ||
            "Algo salió mal, por favor intenta nuevamente"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Transacción actualizada correctamente" />
      )}

      {/* Transaction Type Field */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Tipo</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Selecciona el tipo de transacción</option>
          <option value="income" selected={formik.values.type === "income"}>Entrada</option>
          <option value="expense" selected={formik.values.type === "expense"}>Salida</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Amount Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" />
          Monto
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Monto"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Categoria
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          value={formik.values.category}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Selecciona una categoria</option>
          {dataCategory?.map((category) => (
            <option 
              key={category?._id} 
              value={category?.name}
            >
              {category?.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Fecha
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Descripción (Opcional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Descripción"
          rows="3"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Actualizando..." : "Actualizar Transacción"}
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;