import React, { useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    if (imgFile) {
      data.append("img", imgFile);
    }

    // Debug log of FormData
    console.log("data: ", data);
    console.log("FormData contents:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        {[
          "title",
          "titleUrl",
          "heading",
          "description",
          "keywords",
          "content",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>{field}</label>
            {field === "description" || field === "content" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
        {success && <p className="success-message">✅ Task added!</p>}
      </form>
    </div>
  );
};

export default TaskForm;

// import React, { useState } from "react";
// import "../styles/TaskForm.css";

// const TaskForm = () => {
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImgFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     for (let key in formData) {
//       console.log(key, formData[key]);

//       data.append(key, formData[key]);
//     }
//     // if (imgFile) data.append("img", imgFile);
//     console.log("formData: ", formData);
//     console.log("data: ", data);
//     try {
//       const res = await fetch("http://localhost:4000/api/v1/add/task", {
//         method: "POST",
//         body: data, // ✅ THIS IS THE FIX
//         // headers: {
//         //   "Content-Type": "multipart/form-data", // optional — browser usually sets this
//         // },
//       });

//       if (res.ok) {
//         setSuccess(true);
//         setFormData({
//           title: "",
//           titleUrl: "",
//           heading: "",
//           description: "",
//           keywords: "",
//           content: "",
//           status: "inactive",
//         });
//         setImgFile(null);
//       } else {
//         alert("Failed to submit task");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Add Task</h2>
//       <form onSubmit={handleSubmit}>
//         {[
//           "title",
//           "titleUrl",
//           "heading",
//           "description",
//           "keywords",
//           "content",
//         ].map((field) => (
//           <div className="form-group" key={field}>
//             <label>{field}</label>
//             {field === "description" || field === "content" ? (
//               <textarea
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//               />
//             ) : (
//               <input
//                 type="text"
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//               />
//             )}
//           </div>
//         ))}

//         <div className="form-group">
//           <label>Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         <div className="form-group">
//           <label>Status</label>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="inactive">Inactive</option>
//             <option value="active">Active</option>
//           </select>
//         </div>

//         <button type="submit" className="submit-btn">
//           Submit
//         </button>
//         {success && <p className="success-message">✅ Task added!</p>}
//       </form>
//     </div>
//   );
// };

// export default TaskForm;
