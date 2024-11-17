// Layout.jsx
import Navbar from './Navbar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        {children} {/* This will render the content passed from the route */}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
