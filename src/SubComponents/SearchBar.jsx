import '../CSS/SearchBar.css'
const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <form className="search-form">
        <div className="search-input-container">
          <span className="search-icon">
            <img src="../../Assets/searchicon.svg" alt="Search Icon" className="icon-img" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
