const MenuButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-0 m-6 focus:outline-none md:hidden"
  >
    <span className="block bg-black w-8 h-1"></span>
    <span className="block bg-black my-1 w-8 h-1"></span>
    <span className="block bg-black w-8 h-1"></span>
  </button>
);

export default MenuButton;
