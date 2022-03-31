import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Stack from "@mui/material/Stack";

const AddForm = (props) => {
  const [openModal, setOpenModal] = useState(props.addNew);
  const [edit, setEdit] = useState(false);

  React.useEffect(() => {
    if (props.editUser) {
      setEdit(true);
      setValues({
        ...values,
        id: props.editValue.id,
        name: props.editValue.name,
        email: props.editValue.email,
        phone: props.editValue.phone,
        address: props.editValue.address,
      });
    }
  }, []);

  const [values, setValues] = React.useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleSubmit = () => {
    setOpenModal(false);

    if (edit) {
      props.editForm(values);
    } else {
      const min = 1;
      const max = 100;
      const rand = Math.floor(min + Math.random() * (max - min));
      values.id = rand;
      props.addUser(values);
    }
  };

  return (
    <Dialog open={openModal} onClose={props.removeUserPanel}>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={8}>
                {edit ? (
                  <Typography variant="h5">Edit Employee</Typography>
                ) : (
                  <Typography variant="h5">Add New Employee</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12}>
                <TextField
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Name"
                  id="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Email"
                  id="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Phone"
                  id="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.address}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Address"
                  id="address"
                />
              </Grid>
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={props.removeUserPanel}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                  {" "}
                  Save{" "}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;
