import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import Checkbox from "@mui/material/Checkbox";

interface IDemoData{
  id:number,
  FirstName: string,
  MiddleName: string
  LastName: string
  Gender: any,
  Email:string,
  ContactNumber: number

}

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

const EditContact = () => {
  const { id } = useParams();

  const contact = useSelector((state) => state);
  console.log(contact);

  let demoData = localStorage.getItem("datum");

  const [currentContact, setCurrentContact] = useState <IDemoData | undefined> ()

  useEffect(() => {
    if(demoData != null){
    const list = JSON.parse(demoData)
    setCurrentContact(list.find((dmdata: IDemoData) => dmdata.id === parseInt(id as string)))
    reset(list.find((dmdata: IDemoData) => dmdata.id === parseInt(id as string)))
    }
  }, [demoData])

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm({
    mode: "all",
    defaultValues: currentContact,
    resolver: yupResolver(schema),
  });

  // const contacts = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const datum = {
      id: parseInt(id as string),
      ...data,
    };
    console.log(datum)
    //Applying Action
    dispatch({ type: "UPDATE_EMPLOYEE", payload: datum }); //Action with its type and payload
    navigate("/");
    // const handleClick=()=> {
    //   dispatch({ type: "UPDATE_EMPLOYEE", payload: datum }); //Action with its type and payload
    //   navigate("/");
    // }
  };


  const [disable, setDisable] = useState(false);

  const handleText = () => {
    setDisable(!disable);
  };

  return (
    <>
      {currentContact ? (
        <>
          <Typography variant="h4" align="center" style={{ marginTop: "70px" }}>
            Employee ID {parseInt(id as string) + 1}
          </Typography>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <TextField
                    //   name="FirstName"
                      label="First Name"
                      placeholder="Enter Your First Name"
                      {...register("FirstName")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <p>{errors.FirstName?.message}</p>
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
                      placeholder="Enter Your Last Name"
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
                          value="Male"
                          control={<Radio />}
                          {...register("Gender")}
                          label="Male"
                        />
                      </Grid>
                      <ManIcon fontSize="large" />
                      <Grid item>
                        <FormControlLabel
                          style={{ marginLeft: "5px" }}
                          value="Female"
                          control={<Radio />}
                          {...register("Gender")}
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
                      label="Employe Email"
                      placeholder="Enter Your Email"
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
                  <Button type="submit" variant="contained" color="primary">
                    Update Employee
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
      ) : (
        <Typography variant="h4" align="center" style={{ marginTop: "70px" }}>
          Employee with ID {id} doesnot exist.
        </Typography>
      )}
    </>
  );
};

export default EditContact;
