import { useContext } from "react";
import BookList from "../booklist/booklist";
import { AuthContext } from "../context/Authcontext";
import About from "../about/about";

const Dashboard = () => {
  const { isAuthenticated} = useContext(AuthContext)
  return (
    <div>
     { isAuthenticated  &&  <BookList/>}
     { !isAuthenticated && <About/>}
     
    </div>
  );
};

export default Dashboard;