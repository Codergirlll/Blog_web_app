import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteBlog, GetAllBlogs } from "../api/blog.api";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const data = await GetAllBlogs();
      setBlogs(data.data.GetAllBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleEdit = (titleUrl) => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this blog post?"
    );
    if (confirmEdit) navigate(`/edit-blog/${titleUrl}`);
  };

  const handleDelete = async (titleUrl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const data = await DeleteBlog(titleUrl);
      if (data.status) {
        const updatedBlogs = blogs.filter((item) => item.titleUrl !== titleUrl);
        setBlogs(updatedBlogs);
        setUpdateStatus(true);
        alert("🗑️ Blog deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [updateStatus]);

  return (
    <>
    <div className="my-4" style={styles?.mainContiner}>
    <h3 className="" style={styles?.title}>📚 All Blogs</h3>

      <Card className="">
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th style={styles?.th}>Title</th>
              <th style={styles?.th}>Title URL</th>
              <th style={styles?.th}>Status</th>
              <th style={styles?.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id}>
                  <td style={styles?.th}>{blog.title}</td>
                  <td style={styles?.th}>{blog.titleUrl}</td>
                  <td style={styles?.th}>
                    <span
                      className={`badge bg-${
                        blog.status === "active" ? "success" : "secondary"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td style={styles?.th}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(blog.titleUrl)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(blog.titleUrl)}
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
    </>
  );
};

export default AllBlog;
const styles = {
  mainContiner:{
    maxWidth:"1000px",
    margin:"0 auto"
  },
  title: {
    
    color: "#212121",
    marginBottom: "1.5rem",
    fontWeight: "bold",
    fontSize: "1.75rem",
  },
  th:{
    padding:"15px",
    maxWidth:"250px"
  }
}

// import React, { useEffect, useState } from "react";
// import { DeleteBlog, GetAllBlogs } from "../api/blog.api";
// import { useNavigate } from "react-router-dom";

// const AllBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const navigate = useNavigate();

//   const fetchBlogs = async () => {
//     try {
//       const data = await GetAllBlogs();
//       setBlogs(data.data.GetAllBlogs);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(); // ✅ Run only once
//   }, []);

//   const handleEdit = async (id) => {
//     const confirmEdit = window.confirm(
//       "Are you sure you want to edit this blog post?"
//     );
//     if (confirmEdit) {
//       navigate(`/edit-blog/${id}`);
//     }

//     // navigate(`/edit-blog/${id}`);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this blog?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const data = await DeleteBlog(id);
//       console.log("Delete response", data);
//       if (data.status) {
//         const updatedBlogs = blogs.filter((item) => item._id !== id);
//         setBlogs(updatedBlogs);
//       }
//     } catch (error) {
//       console.error("Error Deleting blog:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>All Blogs</h2>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             {/* <th style={styles.th}>ID</th> */}
//             <th style={styles.th}>Title</th>
//             <th style={styles.th}>Title URL</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.length > 0 &&
//             blogs.map((blog) => (
//               <tr key={blog._id}>
//                 {/* <td style={styles.td}>{blog._id}</td> */}
//                 <td style={styles.td}>{blog.title}</td>
//                 <td style={styles.td}>{blog.titleUrl}</td>
//                 <td style={styles.td}>{blog.status}</td>
//                 <td style={styles.td}>
//                   <button
//                     style={styles.editBtn}
//                     onClick={() => handleEdit(blog._id)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     style={styles.deleteBtn}
//                     onClick={() => handleDelete(blog._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Inline styles (same as before)
// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "1000px",
//     margin: "auto",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: {
//     fontSize: "24px",
//     marginBottom: "16px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   th: {
//     border: "1px solid #ccc",
//     padding: "12px",
//     backgroundColor: "#f4f4f4",
//     textAlign: "left",
//     color: "#000",
//   },
//   td: {
//     border: "1px solid #ccc",
//     padding: "12px",
//   },
//   editBtn: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "4px",
//     marginRight: "8px",
//     cursor: "pointer",
//   },
//   deleteBtn: {
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default AllBlog;
