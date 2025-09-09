import { Link, useLocation } from 'react-router-dom'; 
const Header = () => {
  const location = useLocation();

  const getNavLinkClasses = (path) => {
    const baseClasses = "py-2 px-4 rounded-lg font-medium transition-colors";
    const activeClasses = "bg-blue-600 text-white shadow-md";
    const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";
    return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white rounded-xl shadow-lg p-6 mb-8 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-4xl font-extrabold text-gray-900">Product</h1>
      <nav className="flex space-x-4">
        <Link
          to="/"
          className={getNavLinkClasses("/")}
        >
          Show List
        </Link>
        <Link
          to="/create"
          className={getNavLinkClasses("/create")}
        >
          Create
        </Link>
      </nav>
    </header>
  )
}
export default Header;