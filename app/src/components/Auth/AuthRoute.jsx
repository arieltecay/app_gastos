import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//obtain user from local storage
const user = getUserFromStorage();

export const AuthRoute = ({ children }) => {
    if (!user) {
        return (
            <Navigate to="/login" />
        );
    } else {
        return children;

    }
}
