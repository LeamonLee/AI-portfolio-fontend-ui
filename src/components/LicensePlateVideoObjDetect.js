import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Backdrop from '@material-ui/core/Backdrop';

import CircularProgressWithLabel from './CircularProgressWithLabel';
import UploadFile from "./UploadFile";
import ODPredict from "./ODPredict";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LicensePlateVideoObjDetect = () => {

    const classes = useStyles();

    const [ filePreview, setFilePreview ] = useState(null)
    const [ file, setFile ] = useState(null)
    const [ filename, setFilename ] = useState("")
    const [ uploadPercent, setUploadPercent ] = useState(0)
    // const [ isBackdropOpen, setIsBackdropOpen ] = useState(false)

    // useEffect(() => {
    //   if(uploadPercent >= 100){
    //     setIsBackdropOpen(true)
    //   } else {
    //     setIsBackdropOpen(false)
    //   }
    // }, [uploadPercent])

    return (
      <>
        <Backdrop className={classes.backdrop} open={uploadPercent > 0 && uploadPercent < 100}>
          <CircularProgressWithLabel color="inherit" value={uploadPercent} />
        </Backdrop>
        <Grid container spacing={2}>
          <UploadFile 
            title="Please Upload a license plate video"
            filePreview={filePreview}
            setFilePreview={setFilePreview}
            setFile={setFile} 
            setFilename={setFilename} />  
          <ODPredict 
            file={file}
            predictAPIUrl={`http://localhost:5001/od/video_detect/${filename}`}
            isFileUploaded={filePreview ? true:false}
            uploadPercent={uploadPercent} 
            setUploadPercent={setUploadPercent} />
        </Grid>
      </>
    )
}

export default LicensePlateVideoObjDetect
