import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CreateBook from "../BookCreate";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
    const [page, setPage]=useState(1)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBookList = (page) => {
    axios
      .get(`http://localhost:4000/api/books?page=${page}&size=${5}`)
      .then((response) => {
        console.log(response);
        let data = response["data"]["result"];
        let total = +response["data"]["totalCount"];
        let pageCount = Math.ceil(total / 5);
        setPageCount(pageCount);
        setTotalCount(total);
        setBooks(data);
      })
      .catch((error) => {
        throw new Error("Api error occured");
      });
  };

  const onPagination = (value) => {
    setPage(value)
    fetchBookList(value)
  };

  useEffect(() => {
    fetchBookList(page);
  }, [open]);

  return (
    <div className="container">
      <div className="headerContainer">
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Books
        </Button>
        <CreateBook open={open}  handleClose={handleClose} />
      </div>

      <div style={{ margin: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">ISBN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book.id}
                  </TableCell>
                  <TableCell align="right">{book.name}</TableCell>
                  <TableCell align="right">{book.author}</TableCell>
                  <TableCell align="right">{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="tableFooter">
        <div className="pagination">
          <Pagination
            onChange={(_, value) => onPagination(value)}
            showFirstButton={true}
            showLastButton={true}
            count={pageCount}
            color="primary"
          />
        </div>
        <p>Total of {totalCount} records</p>
      </div>
    </div>
  );
}
