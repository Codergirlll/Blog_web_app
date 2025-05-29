import React, { useEffect, useState } from "react";
import { GetAllBlogs } from "../api/blog.api";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await GetAllBlogs();
        setBlogs(data.data.GetAllBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  console.log("blogs: ", blogs);

  const handleEdit = (blog) => {
    alert(`Edit blog: ${blog.title}`);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    alert(`Delete blog with ID: ${id}`);
    // Implement your delete logic here
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Blogs</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Title URL</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 &&
            blogs?.map((blog) => (
              <tr key={blog?._id}>
                <td style={styles.td}>{blog?._id}</td>
                <td style={styles.td}>{blog?.title}</td>
                <td style={styles.td}>{blog?.titleUrl}</td>
                <td style={styles.td}>{blog?.status}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "12px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ccc",
    padding: "12px",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AllBlog;
