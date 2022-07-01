import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";

function CreateBook(props) {
  const { open, handleClose } = props;

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    isbn: "",
  });

  const checkButtonValidity = () => {
    const isEmpty = Object.values(formData).every((value) => value);
    return isEmpty ? false : true;
  };

  const onInputFill = (type, value) => {
    console.log(type, value);
    setFormData({
      ...formData,
      [type]: value,
    });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:4000/api/books/create", formData)
      .then((response) => {
        handleClose()
      })
      .catch((error) => {
        throw new Error("Api error occured");
      });
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            value={formData["name"]}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => onInputFill("name", e.target.value)}
          />
          <TextField
            value={formData["author"]}
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            fullWidth
            variant="standard"
            onChange={(e) => onInputFill("author", e.target.value)}
          />
          <TextField
            value={formData["isbn"]}
            autoFocus
            margin="dense"
            id="isbn"
            label="ISBN"
            fullWidth
            variant="standard"
            onChange={(e) => onInputFill("isbn", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={checkButtonValidity()} onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBook;
