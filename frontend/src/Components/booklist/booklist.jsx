import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./booklist.css";
import AddBook from "../AddBook/addbook";
import { AuthContext } from "../context/Authcontext";
import { FaBoxesPacking } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { GrFormEdit } from "react-icons/gr";

const BookList = () => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const { bookData, setBookData } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  console.log(bookData);
  // Sorting
  const sortBookData = (value, order = "asc") => {
    const sortedData = [...bookData].sort((a, b) => {
      return order === "asc"
        ? a[value].localeCompare(b[value])
        : b[value].localeCompare(a[value]);
    });
    setBookData(sortedData);
  };
  // populating all books here
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books/books")
      .then((response) => {
        setBookData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Delete handler
  const handleDelete = async (id) => {
    try {
      console.log("clicked", id);
      axios
        .delete(`http://localhost:8080/api/books/books/${id}`)
        .then((res) => {
          setBookData(bookData.filter((book) => book._id !== id));
        });
    } catch (error) {
      console.error("Deletion failed", error);
    }
  };

  // Toggle Favurite
  const toggleFavorite = (id) => {
    setFavorite(
      bookData.map((book) =>
        book._id === id ? { ...book, favorite: !book.favorite } : book
      )
    );
    console.log("Id Clicked", id);
  };
  return (
    <div className="list-container">
      {/* for Seatrch */}
      <form className="d-flex  col-10 p-4 " role="search">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="form-control me-2"
          type="search"
          placeholder="Search by Title, publisher, Authors, publish Date ..."
          aria-label="Search"
        />
        <button
          style={{ width: "200px", height: "50px" }}
          className="btn btn-primary"
          type="submit"
        >
          Search
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        {!showForm && (
          <Link
            style={{
              float: "right",
              marginRight: "20px",
              width: "300px",
              height: "50px",
            }}
            to={"/create"}
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            + New
          </Link>
        )}{" "}
        &nbsp; &nbsp; &nbsp; &nbsp;
      </form>

      <table id="table" className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th
              onClick={() => sortBookData("title")}
              scope="col"
              className="search"
            >
              Title
            </th>
            <th
              onClick={() => sortBookData("authors")}
              scope="col"
              className="search"
            >
              <img
                style={{ backgroundColor: "white" }}
                src="./sort-alpha-up.svg"
                alt=""
              />
              Author
            </th>
            <th
              onClick={() => sortBookData("publisher")}
              scope="col"
              className="search"
            >
              &nbsp;
              <img
                style={{ backgroundColor: "white" }}
                src="./sort-alpha-up.svg"
                alt=""
              />
              Publisher
            </th>
            <th scope="col">Publish Year</th>
            <th scope="col">Favourite</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookData
            .filter((books) => {
              return search.toLowerCase() === ""
                ? books
                : books.title.toLowerCase().includes(search) ||
                    books.authors.toLowerCase().includes(search) ||
                    books.publisher.toLowerCase().includes(search) ||
                    books.publishYear.toLowerCase().includes(search);
            })
            .map((books) => (
              <tr key={books._id}>
                <td>{books.title}</td>
                <td>{books.authors}</td>
                <td>{books.publisher}</td>
                <td>{books.publishYear}</td>
                <td>
                  <GrFormEdit
                    checked={books.favorite}
                    style={{ backgroundColor: favorite ? "yellow" : null }}
                    onClick={() => toggleFavorite(books._id)}
                  />
                </td>
                <td>
                  <Link
                    onClick={() => setShowForm(true)}
                    {...(showForm && <AddBook />)}
                    className="btn btn-success"
                    id="btnList"
                    to={`/edit/${books._id}`}
                  >
                    <FiEdit />
                  </Link>

                  <button
                    id="btnList"
                    onClick={() => handleDelete(books._id)}
                    className="btn btn-danger"
                  >
                    &nbsp;
                    <FaBoxesPacking />{" "}
                  </button>
                </td>
                <td>{books.favorite}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
