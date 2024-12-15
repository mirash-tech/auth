import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"], // Ensures title is required
        unique: true,
        minlength: [5, "Title must be at least 5 characters long"],
        maxlength: 100
    },
    image: {
        type: String,
        required: true,
       
      },
    description: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: [false, "Please enter an author name"] // Adding author as a required field
    },
    createdAt: {
        type: Date,
        required: [false, "Please enter a date"], // Adding date as a required field
        default: Date.now // Defaulting to current date
    },
    tags: {
        type: [String],
        required: [false, "Please add at least one tag"] // Ensuring at least one tag is added
    }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
