import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Button, AppBar, Toolbar, Typography, Menu, MenuItem, CssBaseline, Container, makeStyles} from "@material-ui/core"

import GenericImgObjDetect from "./components/GenericImgObjDetect";
import GenericVideoObjDetect from "./components/GenericVideoObjDetect";
import LicensePlateImgObjDetect from "./components/LicensePlateImgObjDetect";
import LicensePlateVideoObjDetect from "./components/LicensePlateVideoObjDetect";
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
  // const [LstODItemAnchorEl, setLstODItemAnchorEl] = useState([]);

  const handleODMenu = event => {
    setODAnchorEl(event.currentTarget);
  };

  const handleODLPMenuClick = idx => event => {
    // console.log("handleODLPMenuClick: ", idx)
    // console.log("handleODLPMenuClick event: ", event)
    if (ODItemAnchorEl !== event.currentTarget) {    
      setODItemAnchorEl(event.currentTarget);
      setODItemActiveIdx(idx);
    } else {
      handleODItemClose();
    }
  };

  // const handleODLPMenuEnter = idx => event => {
    // console.log("handleODLPMenuEnter: ", idx)
    // console.log("handleODLPMenuEnter event: ", event)
    // setTimeout(() => {
      // setODItemAnchorEl(event.target);
      // setODItemActiveIdx(idx);
    // }, 200);  
  // };
  
  // const handleODLPMenuLeave = idx => event => {
    // console.log("handleODLPMenuLeave: ", idx)
    // console.log("handleODLPMenuLeave event: ", event)
  //   setTimeout(() => {
  //     setODItemAnchorEl(null);
  //     setODItemActiveIdx(-1);
  //   }, 300); 
  // };

  // const handleLstODLPMenuClick = idx => event => {
  //   // console.log("handleODLPMenuClick: ", idx)
  //   // console.log("handleODLPMenuClick event: ", event)
  //   setLstODItemAnchorEl(prevValue => {
  //     let tmpArray = [...prevValue];
  //     tmpArray[idx] = event.currentTarget;
  //     console.log("handleODLPMenuClick tmpArray: ", tmpArray)
  //     return tmpArray;
  //   })
  // };

  // const handleLstODLPMenuEnter = idx => event => {
  //   setLstODItemAnchorEl(prevValue => {
  //     console.log("handlePopoverOpen event: ", event)
  //     console.log("handlePopoverOpen prevValue: ", prevValue)
  //     let tmpArray = [...prevValue];
  //     tmpArray[idx] = event.target;
  //     console.log("handlePopoverOpen tmpArray: ", tmpArray)
  //     return tmpArray;
  //   })
  // };

  // const handleLstODLPMenuLeave = idx => event => {
  //   setLstODItemAnchorEl(prevValue => {
  //     console.log("handlePopoverClose prevValue: ", prevValue)
  //     let tmpArray = [...prevValue];
  //     tmpArray[idx] = null;
  //     console.log("handlePopoverClose tmpArray: ", tmpArray)
  //     return tmpArray;
  //   })
  // };

  const handleODClose = () => {
    setODAnchorEl(null);
    handleODItemClose();

    // setLstODItemAnchorEl(prevValue => {
    //   let tmpArray = []
    //   for(let i = 0; i < prevValue.length; i++){
    //     tmpArray.push(null);
    //   }
    //   return tmpArray;
    // });
  };

  const handleODItemClose = () => {
    setODItemAnchorEl(null);
    setODItemActiveIdx(-1);
  };

  // useEffect(() => {
  //   let tmpArr = []
  //   for(let i = 0; i < lstODMenuItemList.length ; i++){
  //     tmpArr.push(null)
  //   }
  //   // console.log("tmpArr: ", tmpArr);
  //   setLstODItemAnchorEl(tmpArr);
  // }, [])

  useEffect(()=>{
    const result = lstODMenuItemList.reduce((prev, cur) => {
      if (prev === "")
        return cur.url

      return prev + '|' + cur.url;
    },"")
    setODURLConstraint(result)
  }, []);

  // console.log("ODItemAnchorEl: ", LstODItemAnchorEl)
  // console.log("Boolean(ODItemAnchorEl[0]: ", Boolean(LstODItemAnchorEl[0]))
  // console.log("Boolean(ODItemAnchorEl[1]: ", Boolean(LstODItemAnchorEl[1]))
  // console.log("Boolean(ODItemAnchorEl[2]: ", Boolean(LstODItemAnchorEl[2]))
  
  return (
    <Router>
    <div>
      <CssBaseline />  
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Toolbar>
          <Button component={Link} to="/classification/food" className={classes.menuButton}>Classification</Button>
          {/* <Button component={Link} to="/od/image/license_plate" color="inherit" className={classes.menuButton}>Image</Button>
          <Button component={Link} to="/od/video/license_plate" color="inherit" className={classes.menuButton}>Video</Button> */}
          
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
            // MenuListProps={{
            //   onMouseEnter: handleODLPMenuEnter,
            //   onMouseLeave: handleODLPMenuLeave,
            // }}
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

                  // <MenuItem 
                  //   key={`${item.display}${idx}`} 
                  //   onClick={handleODLPMenuClick(idx)}
                  //   onMouseEnter={handleODLPMenuEnter(idx)}
                  //   onMouseLeave={handleODLPMenuLeave(idx)}>
                  //   {item.display}
                  // </MenuItem>

                  // <MenuItem 
                  //   key={`${item}${idx}`} 
                  //   onClick={handleLstODLPMenuClick(idx)}>
                  //   {item}
                  // </MenuItem>

                  // <MenuItem 
                  //   key={`${item}${idx}`} 
                  //   onMouseEnter={handleLstODLPMenuEnter(idx)}
                  //   onMouseLeave={handleLstODLPMenuLeave(idx)}>
                  //   {item}
                  // </MenuItem>
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
          {/* {
            LstODItemAnchorEl.length > 0 &&
            lstODMenuItemList.map((item, idx) => {
              return (
                <Menu
                  key={`${item}${idx}`}
                  id={`${item}-menu`}
                  open={Boolean(LstODItemAnchorEl[idx])} 
                  anchorEl={LstODItemAnchorEl[idx]}
                  onClose={handleClose}
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
                  <MenuItem onClick={handleClose} component={Link} to="">Image</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="">Video</MenuItem>
                </Menu>
              )
            })
          } */}
          <Button component={Link} to="/od/image/lpr/ocr" color="inherit" className={classes.menuButton}>OCR</Button>
        </Toolbar>
      </AppBar>

      <Container classes={{maxWidthXl:classes.containerWidthXl, maxWidthLg:classes.containerWidthLg}}>
        <Switch>
          <Route path="/classification/food">
            <FoodClassification />
          </Route>
          <Route path={`/od/image/:ODSubjectURL(${ODURLConstraint})`} exact>
            {/* <LicensePlateImgObjDetect /> */}
            <GenericImgObjDetect />
          </Route>
          <Route path={`/od/video/:ODSubjectURL(${ODURLConstraint})`} exact>
            {/* <LicensePlateVideoObjDetect /> */}
            <GenericVideoObjDetect />
          </Route>
          <Route path={`/od/image/:ODSubjectURL(lpr)/ocr`}>
            {/* <LicensePlateImgObjDetect /> */}
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
