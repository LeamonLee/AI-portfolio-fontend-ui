import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Grid, Button, AppBar, Toolbar, Typography, MenuItem, Menu, Avatar, makeStyles} from "@material-ui/core"

import Upload from "./components/Upload";
import ShowResult from "./components/ShowResult";
import Home from "./components/Home";

const useStyles = makeStyles(theme =>({

  row:{
    flexGrow:1
  },
  grow:{
    flexGrow:1
  },
  container:{
    width:1170,
    margin:"auto"
  },
  buttonFontSize:{
    fontSize:"11px",
    color:"#a1a1a1"
  },

  AppBar:{
    //height:400,
    //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
    backgroundColor:"#fff",
    backgroundSize:"cover"
  },
  mainLogo:{
    color: "#a1a1a1",
    justifyContent:"left",
    '&:hover':{
      background:"transparent"
    }
  },

  avatar:{
    height:"100%",
    borderRadius:0,


  },

  loginButton:{
    background:"#e91e63",
    color:"#fff",
    borderRadius:"25px",
    padding:"0px 25px",

    '&:hover':{
      background: 'blue',
      boxShadow: "0px 2px 10px #888888"
    }
  }

}));

function App() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)
  
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Router>
    <div>
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Grid item sm={12} xs={12} className={classes.container}>
          <Toolbar>
            <Grid className={classes.grow}>
              <Button className={[classes.mainLogo]}>
                <Avatar src="https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg" className={classes.avatar} />
              </Button>
            </Grid>
            
            <Button component={Link} to="/" color="inherit" className={classes.buttonFontSize}>Home</Button>
            <Button component={Link} to="/od/image/upload" color="inherit" className={classes.buttonFontSize}>Upload</Button>
            
            <Button color="inherit" onClick={handleMenu} className={classes.buttonFontSize}>Discover</Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            <Button color="inherit" className={classes.buttonFontSize}>Profile</Button>
            <Button color="inherit" className={[classes.buttonFontSize,classes.loginButton]}>Login</Button>
          </Toolbar>
        </Grid>
      </AppBar>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/od/image/upload">
          <Upload />
        </Route>
        <Route path="/od/image/show-result">
          <ShowResult />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
