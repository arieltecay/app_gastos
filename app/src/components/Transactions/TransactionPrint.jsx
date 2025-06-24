import { useQuery } from "@tanstack/react-query";
import { printTransactionAPI } from "../../services/transactions/transactionService";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const TransactionPrint = () => {
  const { id } = useParams();

  const { data: transaction, isLoading } = useQuery({
    queryFn: () => printTransactionAPI(id),
    queryKey: ["print-transaction", id],
  });
  if (isLoading) {
    return <ClipLoader size={50} color={"#123abc"} loading={true} />;
  }
  if (!transaction) {
    return <div>Transaction not found.</div>;
  }

  const date = new Date(transaction.date);
  const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
    month: "short",
  })}-${date.getFullYear()}`;

  return (
    <div className="shadow-md rounded-lg p-4 w-64 mx-auto bg-white">
      <h5 className="text-lg font-semibold mb-2">Movimiento</h5>
      <div className="mb-2">
        <span className="font-medium">Monto:</span> ${transaction?.amount?.toLocaleString()}
      </div>
      <div className="mb-2">
        <span className="font-medium">Categoría:</span> {transaction?.category}
      </div>
      <div className="mb-2">
        <span className="font-medium">Descripción:</span> {transaction?.description}
      </div>
      <div>
        <span className="font-medium">Fecha:</span> {formattedDate}
      </div>
      <div className="mt-4">
        <span className="font-medium">Firma:</span>
        <div className="mt-2">_________________________</div>
      </div>
      <div className="mt-4">
        <span className="font-medium">Aclaración:</span>
        <div className="mt-2">_________________________</div>
      </div>
    </div>
  );
};

export default TransactionPrint;