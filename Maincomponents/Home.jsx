import AdminSidebar from "../SubComponents/adminSidebar";
import '../CSS/home.css'
import AdminHeader from "../SubComponents/AdminHeader";
import SearchBar from "../SubComponents/SearchBar";

function Home() {
    return(
        <div className="Body">
            <div className="Home">
                <AdminHeader />
                <AdminSidebar />
                <SearchBar />
            </div>
        </div>
    );
}
export default Home