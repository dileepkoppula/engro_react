import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function App() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [anagram, setAnagram] = useState("");
  const [newsList, setNewsList] = useState([]);
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

  const handleSubmit = (event) => {
    event.preventDefault();
    let a = string1;
    let b = string2;
    console.log(a, b);
    let len1 = a.length;
    let len2 = b.length;
    /*
  If two strings are not equal || len1!=len2
  */
    if (len1 == 0 && len2 == 0) {
      return;
    } else {
      let str1 = a.split("").sort().join("");
      let str2 = b.split("").sort().join("");

      if (str1 === str2) {
        console.log("True");
        setAnagram("TRUE");
      } else {
        console.log("False");
        setAnagram("FALSE");
      }
    }
  };

  useEffect(() => {
    fetch(
      "https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setNewsList([json]);
      });
  }, []);

  const openInNewTab = (url) => {
    console.log(url);
    window.open(url);
  };

  const getFormatedDate =(timestamp)=>{
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(timestamp).toLocaleDateString(undefined, options)
   }
  return (
    <div className="App">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <form onSubmit={handleSubmit}>
            <label>
              Enter string 1 :
              <input
                type="text"
                value={string1}
                onChange={(e) => setString1(e.target.value)}
              />
              <br />
            </label>
            <br />
            <label>
              Enter string 2:
              <input
                type="text"
                value={string2}
                onChange={(e) => setString2(e.target.value)}
              />
              <br />
            </label>
            <br></br>
            <input type="submit" style={{ backgroundColor: "skyblue" }} />
            <span>
              {" "}
              <b> {anagram} </b>
            </span>
          </form>
        </div>
        <div class="col-md-4"></div>
      </div>

      {newsList.map((item) => (
        <Card sx={{ maxWidth: 500,padding:2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <strong>{item.title}</strong><span style={{fontSize:'13px'}}> by {item.by}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.type}
            </Typography>
          </CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.score}
          </Typography>
          <CardActions>
            <Button
              size="small"
              role="link"
              onClick={() => openInNewTab(item.url)}
            >
              Share
            </Button>
            <Button size="small">Learn More</Button>
            <h6>{getFormatedDate(item.time)}</h6>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default App;
