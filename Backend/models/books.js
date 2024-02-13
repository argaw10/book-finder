const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
    },
    favourite: {
      type: Boolean,
    },
   
  },
  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
//  Exporting Schema
module.exports = mongoose.model("book", BookSchema);
