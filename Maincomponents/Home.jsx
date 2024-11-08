import AdminSidebar from "../SubComponents/adminSidebar";
import '../CSS/home.css'
import AdminHeader from "../SubComponents/AdminHeader";
import SearchBar from "../SubComponents/SearchBar";
import ProgramCard from "../SubComponents/ProgramCard";

function Home() {
    return(
        <div className="Body">
            <div className="Home">
                <AdminHeader />
                <AdminSidebar />
                <SearchBar />
                <ProgramCard title="Constituency 2025" duration="1 week"/>
                <ProgramCard title="Workers meeting"/>
                <ProgramCard title="End of year meeting"/>
                <ProgramCard title="Pastors/Laities week of blessings"/>
            </div>
           
        </div>
    );
}
export default Home