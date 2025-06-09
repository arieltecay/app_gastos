import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TransactionChart from "../Transactions/TransactionChart";
import AlertMessage from "../Alert/AlertMessage";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  if (isLoading) {
    return <AlertMessage type="loading" message="Cargando dashboard..." />;
  }

  return (
    <>
      <TransactionChart />
    </>
  );
};

export default Dashboard;
