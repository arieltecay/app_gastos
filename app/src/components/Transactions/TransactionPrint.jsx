import { useQuery } from "@tanstack/react-query";
import { printTransactionAPI } from "../../services/transactions/transactionService";
import { useParams } from "react-router-dom";

const TransactionPrint = () => {
    const { id } = useParams();

    const { data: transaction, isLoading } = useQuery({
        queryFn: () => printTransactionAPI(id),
        queryKey: ["print-transaction", id],
    });
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }
    const date = new Date(transaction.date);
    transaction.date = date.toDateString();
    transaction.date = transaction.date.split(" ")[2] + "-" + transaction.date.split(" ")[1] + "-" + transaction.date.split(" ")[3];
    return (
        <div className="card shadow-lg rounded-lg w-auto">
            <div className="card-body">
                <h5 className="card-title">Monto: {transaction.amount}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Categoría: {transaction.category}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Descripción: {transaction.description}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Tipo: {transaction.type}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Fecha: {transaction.date}</h6>
            </div>
        </div>
    );
};

export default TransactionPrint;
