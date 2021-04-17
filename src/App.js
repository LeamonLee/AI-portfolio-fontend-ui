import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Button, AppBar, Toolbar, Menu, MenuItem, CssBaseline, Container, makeStyles} from "@material-ui/core"

import GenericImgObjDetect from "./components/GenericImgObjDetect";
import GenericVideoObjDetect from "./components/GenericVideoObjDetect";
import FoodClassification from "./components/FoodClassification";
import Home from "./components/Home";

import { lstODMenuItemList } from "./config/config";

const useStyles = makeStyles(theme =>({

  AppBar:{
    //height:400,
    //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
    backgroundColor:"#fff",
    backgroundSize:"cover"
  },
  containerWidthXl: {
    maxWidth: "400px"
  },
  containerWidthLg: {
    maxWidth: "600px"
  },
  menuButton:{
    fontSize:"12px",
    fontWeight: 600
  }
}));


function App() {

  const classes = useStyles();
  const [ODURLConstraint, setODURLConstraint] = useState("");
  const [ODAnchorEl, setODAnchorEl] = useState(null);
  const [ODItemAnchorEl, setODItemAnchorEl] = useState(null);
  const [ODItemActiveIdx, setODItemActiveIdx] = useState(-1);

  const handleODMenu = event => {
    setODAnchorEl(event.currentTarget);
  };

  const handleODLPMenuClick = idx => event => {
    if (ODItemAnchorEl !== event.currentTarget) {    
      setODItemAnchorEl(event.currentTarget);
      setODItemActiveIdx(idx);
    } else {
      handleODItemClose();
    }
  };

  const handleODClose = () => {
    setODAnchorEl(null);
    handleODItemClose();
  };

  const handleODItemClose = () => {
    setODItemAnchorEl(null);
    setODItemActiveIdx(-1);
  };

  

  useEffect(()=>{
    const result = lstODMenuItemList.reduce((prev, cur) => {
      if (prev === "")
        return cur.url

      return prev + '|' + cur.url;
    },"")
    setODURLConstraint(result)
  }, []);
  
  return (
    <Router>
    <div>
      <CssBaseline />  
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Toolbar>
          <Button component={Link} to="/classification/food" className={classes.menuButton}>Classification</Button>
          <Button color="inherit" onClick={handleODMenu} className={classes.menuButton}>Object Detection</Button>
          <Menu
            id="menu-object-detection"
            anchorEl={ODAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(ODAnchorEl)}
            onClose={handleODClose}
            
          >
            {
              // LstODItemAnchorEl.length > 0 &&
              lstODMenuItemList.map((item, idx) => {
                return (

                  <MenuItem 
                    key={`${item.display}${idx}`} 
                    onClick={handleODLPMenuClick(idx)}>
                    {item.display}
                  </MenuItem>
                )
              })
            }
          </Menu>
          {
            lstODMenuItemList.map((item, idx) => {
              return (
                <Menu
                  key={`${item.display}${idx}`}
                  id={`${item.display}-menu`}
                  open={idx === ODItemActiveIdx} 
                  anchorEl={ODItemAnchorEl}
                  onClose={handleODClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleODClose} component={Link} to={`/od/image/${item.url}`}>Image</MenuItem>
                  <MenuItem onClick={handleODClose} component={Link} to={`/od/video/${item.url}`}>Video</MenuItem>
                </Menu>
              )
            })
          }
          
          <Button component={Link} to="/od/image/lpr/ocr" color="inherit" className={classes.menuButton}>OCR</Button>
        </Toolbar>
      </AppBar>

      <Container classes={{maxWidthXl:classes.containerWidthXl, maxWidthLg:classes.containerWidthLg}}>
        <Switch>
          <Route path="/classification/food">
            <FoodClassification />
          </Route>
          <Route path={`/od/image/:ODSubjectURL(${ODURLConstraint})`} exact>
            <GenericImgObjDetect />
          </Route>
          <Route path={`/od/video/:ODSubjectURL(${ODURLConstraint})`} exact>
            <GenericVideoObjDetect />
          </Route>
          <Route path={`/od/image/:ODSubjectURL(lpr)/ocr`}>
            <GenericImgObjDetect isOCR={true}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </div>
  </Router>
  );
}

export default App;
