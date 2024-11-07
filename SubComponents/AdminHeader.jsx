import '../CSS/AdminHeader.css'

function AdminHeader() {
    return(
        <div>
            <div className="content">
                <div className='uppersection'>
                        <h2>Your Programs</h2>
                    
                        <button className='create-program-button'>
                            Create a new Program
                        </button>
                </div>
            </div>
        </div>
    );
}
export default AdminHeader