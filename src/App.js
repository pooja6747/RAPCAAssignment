import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

///style for card
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.grey[200],
    paddingTop: theme.spacing(5),
  marginBottom:theme.spacing(5)
  },
}));

function App() {
  const classes = useStyles();
  const [apiData, setApidata] = useState([]);

  //API call with axios
  const fetchData = async () => {
    await axios.get("https://reqres.in/api/users?page=2").then((response) => {
      console.log(response);
      setApidata((apiData) => [...apiData, ...response.data.data]);
      console.log(apiData);
    });
  };
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <Container className={classes.root}>

      <Grid container>
        <Grid item sm={3}>
          {apiData.map((value, index) => {
            return (
              <>
                <Card>
                  <CardContent>
                    <Typography key={index} variant="h4">{value.first_name}</Typography>
                    <Typography key={index} variant="subtitle1">{value.email}</Typography>
                    <CardMedia image={value.avatar} style={{height:100}} />
                  </CardContent>
                </Card>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
