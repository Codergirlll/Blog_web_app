import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import { GetBlogById, UpdateBlog } from "../api/blog.api";

const EditForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    titleUrl: "",
    heading: "",
    description: "",
    keywords: "",
    content: "",
    status: "inactive",
  });

  const [imgFile, setImgFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { titleUrl } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateBlog = await UpdateBlog(titleUrl, formData, imgFile);
    if (updateBlog.success) {
      setSuccess(true);
      alert("✅ Blog updated successfully!");
      navigate("/all-blogs");
    } else {
      alert(`❌ ${updateBlog.error || "Submission failed"}`);
    }
  };

  const getBlog = async () => {
    try {
      const data = await GetBlogById(titleUrl);
      setFormData(data.data.GetBlogById);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
    <div style={styles?.pageContainer}>
    <h3 style={styles.titles}>✏️ Edit Blog</h3>

    <div >
      <Card style={styles.card}>
        <Form onSubmit={handleSubmit}>
          {/* Blog Info */}
          <section style={styles.section}>
            <h5 style={styles.sectionTitle}>Blog Info</h5>
            <Row className="g-3">
              {["title", "titleUrl", "heading", "description", "keywords"].map(
                (field) => (
                  <Col md={6} sm={12} key={field}>
                    <Form.Group controlId={field}>
                      <Form.Label>{field}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Enter ${field}`}
                      />
                    </Form.Group>
                  </Col>
                )
              )}
            </Row>
          </section>

          {/* Content */}
          <section style={styles.section}>
            <h5 style={styles.sectionTitle}>Content</h5>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "10px",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData((prev) => ({ ...prev, content: data }));
                }}
              />
            </div>
          </section>

          {/* Media & Settings */}
          <section style={styles.section}>
            <h5 style={styles.sectionTitle}>Media & Settings</h5>
            <Row className="g-3">
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </section>

          <div style={styles.buttonContainer}>
            <Button type="submit" variant="primary" style={styles.button}>
              💾 Update Blog
            </Button>
          </div>

          {success && (
            <p className="text-success mt-3">✅ Blog updated successfully!</p>
          )}
        </Form>
      </Card>
    </div>
    </div>
    </>
  );
};

const styles = {
  pageContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
  
  },
  card: {
    padding: "1.5rem",
    borderRadius: "1rem",
    border: "none",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  titles: {
    
    color: "#212121",
    marginBottom: "1.5rem",
    fontWeight: "bold",
    fontSize: "1.75rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    color: "#6c757d",
    marginBottom: "1rem",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  buttonContainer: {
    textAlign: "end",
    marginTop: "1rem",
  },
  button: {
    padding: "0.5rem 2rem",
    fontSize: "1.1rem",
  },

};

export default EditForm;

// import React, { useEffect, useState } from "react";
// import "../styles/TaskForm.css";
// import { Col, Row } from "react-bootstrap";
// import { GetBlogById, UpdateBlog } from "../api/blog.api";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { useNavigate, useParams } from "react-router-dom";

// const EditForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     titleUrl: "",
//     heading: "",
//     description: "",
//     keywords: "",
//     content: "",
//     status: "inactive",
//   });

//   const [imgFile, setImgFile] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const { id } = useParams();
//   console.log("koijuytfrdfg: ", id);

//   const handleImageChange = (e) => {
//     setImgFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("formData: ", formData);

//     const updateBlog = await UpdateBlog(id, formData, imgFile);
//     console.log("updateBlog: ", updateBlog);
//     if (updateBlog.success) {
//       setSuccess(true);
//       setFormData({
//         title: "",
//         titleUrl: "",
//         heading: "",
//         description: "",
//         keywords: "",
//         content: "",
//         status: "inactive",
//       });
//       // setImgFile(null);
//       alert("✅ Blog Edit Successfully!");
//       navigate("/all-blogs");
//     } else {
//       alert(`❌ ${updateBlog.error || "Submission failed"}`);
//     }
//     setFormData(updateBlog.updateData.updateBlog);
//   };

//   const getBlog = async () => {
//     try {
//       const data = await GetBlogById(id);
//       console.log("data: ", data);
//       setFormData(data.data.GetBlogById);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };
//   useEffect(() => {
//     getBlog(); // ✅ Run only once
//     console.log("getBlog: ", getBlog);
//   }, []);
//   return (
//     <div className="form-container">
//       <h2>Edit Task</h2>
//       <form onSubmit={handleSubmit}>
//         <Row>
//           {["title", "titleUrl", "heading", "description", "keywords"].map(
//             (field) => (
//               <Col lg={6} key={field}>
//                 <div className="form-group">
//                   <label>{field}</label>
//                   <input
//                     type="text"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </Col>
//             )
//           )}

//           {/* CKEditor for content */}
//           <Col lg={12}>
//             <div className="form-group">
//               <label>Content</label>
//               <CKEditor
//                 editor={ClassicEditor}
//                 data={formData.content}
//                 onChange={(event, editor) => {
//                   const data = editor.getData();
//                   setFormData((prev) => ({ ...prev, content: data }));
//                 }}
//               />
//             </div>
//           </Col>

//           <Col lg={6}>
//             <div className="form-group">
//               <label>Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </Col>

//           <Col lg={6}>
//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="inactive">Inactive</option>
//                 <option value="active">Active</option>
//               </select>
//             </div>
//           </Col>

//           <Col lg={12}>
//             <button type="submit" className="submit-btn">
//               Submit
//             </button>
//             {success && (
//               <p className="success-message">✅ Blog Edit Successfully!</p>
//             )}
//           </Col>
//         </Row>
//       </form>
//     </div>
//   );
// };

// export default EditForm;
