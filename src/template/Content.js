import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Employee from "../components/Employee";
import { useState } from "react";
import AddForm from "../components/AddForm";

export default function Content() {

  const [editModal, setEditModal] = useState(false);

  const [addNew, setAddNew] = useState(false);

  const [localList ,setLocalList]=useState([]);
  
  const [userList, setUserList] = useState([]);

  const [editValue, setEditValue] = useState();


  React.useEffect(()=>{
    const useList=JSON.parse(localStorage.getItem("data"));
    if(useList && Array.isArray(useList)&& useList.length>0){
      setLocalList([...useList]);
      setUserList([...useList]);
    }
  
  },[] );

  const emptyUser = {
    id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  };

  const addUser = (data) => {
    localList.push(data);
    setLocalList(localList);
    setUserList((prev) => [...prev, data]);
    localStorage.setItem("data",JSON.stringify(localList));
    setAddNew(false);
  };

  const deleteUser = (data) => {
    const newList = userList.filter((item) => item.id !== data.id);
    setUserList(newList);
    localStorage.setItem("data",JSON.stringify(newList));
  };
  const editUser = (data) => {
    setEditModal(true);
    setEditValue(data);
  };
  const editForm = (data) => {
    const newList = userList.filter((item) => item.id !== data.id);
    newList.push(data);
    localStorage.setItem("data",JSON.stringify(newList));;
    setUserList(newList);
    setEditModal(false);
  };

  const handleSubmit = () => {
    setAddNew(true);
  };

  const removeUserPanel = () => {
    setAddNew(false);
  };

  return (
    <>
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{ mr: 1 }}
              >
                Add user
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <Employee list={userList} deleteUser={deleteUser} editUser={editUser}/>
          </TableBody>
        </Table>
      </TableContainer>     
    </Paper>
    {addNew ? (
      <AddForm
        addNew={addNew}
        removeUserPanel={removeUserPanel}
        addUser={addUser}
      />
    ) : null}
     {editModal ? (
      <AddForm
        addNew={editModal}
        removeUserPanel={removeUserPanel}
        editUser={editUser}
        editValue = {editValue}
        editForm={editForm}
      />
    ) : null} </>
  );
}
