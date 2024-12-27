import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit, FaPrint } from "react-icons/fa";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionWithFiltersAPI, printTransactionAPI, totalAmountAPI } from "../../services/transactions/transactionService";
import { listCategoryAPI } from "../../services/category/categoryServices";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const TransactionList = () => {
  const navigate = useNavigate();

  //!Filtering state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "all",
    page: 1, // Add page to filters
  });
  //!Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 })); // Reset to page 1 on filter change
  };

  //fetching
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    error: categoryErr,
  } = useQuery({
    queryFn: listCategoryAPI,
    queryKey: ["list-categories"],
  });
  //fetching
  const {
    data: transactions,
    isError,
    isLoading: transactionsLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: () => listTransactionWithFiltersAPI(filters),
    queryKey: ["list-transactions", filters],
  });
  //fetching
  const {
    data: totalAmount,
    isLoading: totalAmountLoading,
    refetch: refetchTotalAmount,
  } = useQuery({
    queryFn: () => totalAmountAPI(filters),
    queryKey: ["total-amount", filters],
  });

  const handlePageChange = (pageNumber) => {
    setFilters((prev) => ({ ...prev, page: pageNumber }));
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700  text-left">
            Fecha Inicial
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="mt-1 p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
          />
        </div>
        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700  text-left">
            Fecha Final
          </label>
          <input
            value={filters.endDate}
            onChange={handleFilterChange}
            type="date"
            id="endDate"
            name="endDate"
            className="mt-1 p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
          />
        </div>
        {/* Type */}
        <div className="relative">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 text-left">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none w-full"
          >
            <option value="">Todos</option>
            <option value="income">Entrada</option>
            <option value="expense">Salida</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={handleFilterChange}
            name="category"
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="all">Todas las categorías</option>
            <option value="Uncategorized">Descategorizado</option>
            {categoriesData?.map((category) => {
              return (
                <option key={category?._id} value={category?.name}>
                  {category?.name}
                </option>
              );
            })}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        {/* Inputs and selects for filtering (unchanged) */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Filtrar Transacciones
          </h3>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Total: ${totalAmount}
          </h3>
          {/* Create a spinner from fomik */}
          {categoryLoading || transactionsLoading ? (
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {transactions?.transactions?.map((transaction) => (
                <li
                  key={transaction._id}
                  className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                    <span className="ml-2 text-gray-800">
                      {transaction.category?.name} - $
                      {transaction.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 italic ml-2">
                      {transaction.description}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      // onClick={() => handleUpdateTransaction(transaction._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      // onClick={() => handleDelete(transaction._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                    <Link to={`/print/${transaction._id}`}>
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaPrint />
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: transactions?.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${transactions?.page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
