import '../CSS/AdminHeader.css'

function AdminHeader() {
    return(
        <div>
            <div className="content">
                <div className='uppersection'>
                    <div>
                        <h2>Your Programs</h2>
                    </div>
                    <div>
                        <button className='create-program-button'>
                                Create a new Program
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminHeader