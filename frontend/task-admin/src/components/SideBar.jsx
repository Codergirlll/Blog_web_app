import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../api/blog.api";
import Cookies from "js-cookie";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let res = await Logout();
      console.log("res: ", res);
      // Cookies.remove("token");
      if (res.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <h4 style={styles?.title}>Blog Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/add-blog"
          active={location.pathname === "/add-blog"}
          style={styles?.navlink}
        >
          Add Blog
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/all-blogs"
          active={location.pathname === "/all-blogs"}
          style={styles?.navlink}
        >
          All Blogs
        </Nav.Link>

        <button onClick={handleLogout}>Logout</button>
      </Nav>
    </>
  );
};

export default Sidebar;
const styles = {
  navlink: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
  },
  title: {
    padding: "20px",
    borderBottom: "1px solid #fff",
    color: "#fff",
  },
};
