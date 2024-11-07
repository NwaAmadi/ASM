import './App.css'
import AdminSidebar from '../SubComponents/adminSidebar';

function App() {
  return (
    <div className="App">
      <AdminSidebar />
      <div className="content">
        <h1>Welcome to My App</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App
