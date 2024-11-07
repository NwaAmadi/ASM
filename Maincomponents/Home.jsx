import AdminSidebar from "../SubComponents/adminSidebar";
import '../CSS/home.css'
import AdminHeader from "../SubComponents/AdminHeader";

function Home() {
    return(
        <div className="Body">
            <div className="Home">
                <AdminHeader />
                <AdminSidebar />
            </div>
        </div>
    );
}
export default Home