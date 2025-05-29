const ServerURL = `http://localhost:4000/api/v1`;

exports.AddBlog = async (formData, imgFile) => {
  const data = new FormData();

  for (let key in formData) {
    data.append(key, formData[key]);
  }

  if (imgFile) {
    data.append("img", imgFile);
  }

  try {
    const res = await fetch(`${ServerURL}/add/blog`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Failed to submit Blog Details");
    }

    return { success: true };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.GetAllBlogs = async () => {
  try {
    const res = await fetch(`${ServerURL}/get/allblogs`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to Get Blog");
    }

    const data = await res.json(); // ✅ Parse response as JSON
    return { success: true, data }; // ✅ Return the parsed data
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};
