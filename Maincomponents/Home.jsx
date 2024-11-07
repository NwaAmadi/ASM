import AdminSidebar from "../SubComponents/adminSidebar";
import '../CSS/home.css'
import AdminHeader from "../SubComponents/AdminHeader";

function Home() {
    return(
        <div className="Home">
            <AdminSidebar />
            <AdminHeader />
        
        </div>
    );
}
export default Home