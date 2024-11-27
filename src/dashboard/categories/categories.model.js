import mongoose from "mongoose";

// set schema
const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 75,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  seoTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  seoKeywords: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  seoDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000,
    minlength: 100,
  },
});

// create collection
const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
