import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import Buttons from "/Users/gauravpathak/Desktop/eecrm/my-app/src/Components/Buttons"

interface IDemoData{
  id:number
  FirstName: string,
  MiddleName: string
  LastName: string
  Gender: any,
  Email:any,
  ContactNumber: number
}

const Home = () => {

 const contacts = useSelector<Array<IDemoData>, Array<IDemoData>>((state) => state);

  const dispatch = useDispatch();

  const deleteEmployee = (id: number) => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: id });
  };

  let demoData = localStorage.getItem("datum");
  console.log(demoData)

  const [demoDataJson, setDemoDataJson] = useState<Array<IDemoData>>([])

  // console.log(demoDataJson)
  useEffect(() => {
    if(demoData != null){
      setDemoDataJson(JSON.parse(demoData))
    }
  }, [demoData])

  return (
    <div className="container">
      <div className="row">
        <div className="home-link">
          <Link to="/add" className="home-btn">
            <Buttons buttonStyle="btn--outline" buttonSize="btn--large">
              Add Employee
            </Buttons>
          </Link>
        </div>
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: "50px", marginBottom: "30px" }}
        >
          Welcome to Employee Management System.
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoDataJson.map((contact, id) => (
                <TableRow key={id}>
                  <TableCell>{id + 1}</TableCell>
                  <TableCell>{contact.FirstName}</TableCell>
                  <TableCell>{contact.MiddleName}</TableCell>
                  <TableCell>{contact.LastName}</TableCell>
                  <TableCell>{contact.Gender}</TableCell>
                  <TableCell>{contact.Email}</TableCell>
                  <TableCell>{contact.ContactNumber}</TableCell>
                  <TableCell>
                    <Button variant="contained">
                      <Link
                        to={`/edit/${contact.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => deleteEmployee(contact.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
