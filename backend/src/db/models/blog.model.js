const mongoose = require("mongoose");
const CounterModel = require("./counter.model");

const BlogSchema = new mongoose.Schema(
  {
    // id: {
    //   type: Number,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    titleUrl: {
      type: String,
      required: true,
      unique: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: String,
    keywords: Array,
    img: String,
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    // dueDate: {
    //   type: Date,
    //   required: true,
    // },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { timestamps: true }
);

// Auto-increment logic
// BlogSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     const counter = await CounterModel.findOneAndUpdate(
//       { id: "task_id" },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     this.id = counter.seq;
//   }
//   next();
// });

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
