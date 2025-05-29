import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <h4 className="text-light mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/add-blog"
          active={location.pathname === "/add-blog"}
          className="text-light"
        >
          Add Blog
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/all-blogs"
          active={location.pathname === "/all-blogs"}
          className="text-light"
        >
          All Blogs
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
