import React, { useEffect, useState } from "react";
import axios from "axios";

const BookData = () => {
  const [bookData, setBookData] = useState([]);

  // use useefect
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books/books")
      .then((res) => {
        console.log(res);
        setBookData(res.data);
      })
      .catch((err) => console.log("Sorry ", err));
  }, []);
  console.log("****", bookData);
  return (
    <div>
      <h1>ListBook data</h1>
      <table style={{ width: "100%" }} className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Authors</th>
            <th scope="col">Publisher</th>
            <th scope="col">PublisherYear</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book) => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
              <td>{book.publishYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookData;
