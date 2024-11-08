import '../CSS/AdminHeader.css'

function AdminHeader() {
    return(
        <div>
            <div className="content">
                <div className='uppersection'>
                        <h2>Conference Programs</h2>
                    
                        <button className='create-program-button'>
                            + | New Program
                        </button>
                </div>
            </div>
        </div>
    );
}
export default AdminHeader