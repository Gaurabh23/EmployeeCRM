import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import Checkbox from "@mui/material/Checkbox";

interface IDemoData{
  id:number,
  FirstName: string,
  MiddleName: string
  LastName: string
  Gender: string,
  Email:string,
  ContactNumber: number

}

// interface ObjContacts {
//   contacts: object,
// }

const schema = yup.object().shape({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
  Gender: yup.string().required(),
  Email: yup.string().email().required(),
  ContactNumber: yup
    .number()
    .positive()
    .integer()
    .typeError("Enter the valid contact number")
    .required(),
});

const AddContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDemoData>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  // const fnwatch = useWatch({ name: "FirstName", control });

  // const lnwatch = useWatch({ name: "LastName", control });

  // const ewatch = useWatch({ name: "Email", control });

  // const cnwatch = useWatch({ name: "ContactNumber", control });

  //For action
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector<Array<IDemoData>, Array<IDemoData>>((state) => state);

  const onSubmit = (data: any) => {
    console.log("data", data);
    const datum = {
      id: contacts[contacts.length - 1].id + 1,
      ...data,
    };

    let newArr = [...contacts, datum];

    console.log(newArr);

    //Applying Action
    dispatch({ type: "ADD_EMPLOYEE", payload: datum }); //Action with its type and payload
    navigate("/");

    localStorage.setItem("datum", JSON.stringify([...contacts, datum]));
  };

  // console.log(errors);

  const [disable, setDisable] = useState(false);

  const handleText = () => {
    setDisable(!disable);
  };

  return (
    <>
      <Typography variant="h4" align="center" style={{ marginTop: "70px" }}>
        Add Employee
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                 // name="FirstName"
                  label="First Name"
                  placeholder="Enter Your First Name"
                  {...register("FirstName")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Typography>{errors.FirstName?.message}</Typography>
              <Grid xs={12} item>
                <TextField
                  // name="MiddleName"
                  label="Middle Name"
                  placeholder="Enter Your Middle Name"
                  {...register("MiddleName")}
                  disabled={disable}
                  variant="outlined"
                  fullWidth
                />
                <FormControlLabel
                  control={<Checkbox onClick={handleText} />}
                  label="No Middle Name"
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  // name="LastName"
                  label="Last Name"
                  placeholder="Enter Your Last Name "
                  {...register("LastName")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <p>{errors.LastName?.message}</p>
              <Grid xs={12} item>
                <RadioGroup row>
                  <Grid item>
                    <FormControlLabel
                    {...register("Gender")}
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </Grid>
                  <ManIcon fontSize="large" />
                  <Grid item>
                    <FormControlLabel
                    {...register("Gender")}
                      style={{ marginLeft: "5px" }}
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </Grid>
                  <WomanIcon fontSize="large" />
                </RadioGroup>
              </Grid>
              <Grid xs={12} item>
                <TextField
                  // name="Email"
                  type="email"
                  label="Employee Email"
                  placeholder="Enter Your Email "
                  {...register("Email")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <p>{errors.Email?.message}</p>
              <Grid xs={12} item>
                <TextField
                  // name="ContactNumber"
                  type="number"
                  label="Employee Number"
                  placeholder="Enter Your Number"
                  {...register("ContactNumber")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <p>{errors.ContactNumber?.message}</p>
            </Grid>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Add Employee
              </Button>
              <Button variant="outlined">
                <Link to="/" style={{ textDecoration: "none" }}>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddContact;
