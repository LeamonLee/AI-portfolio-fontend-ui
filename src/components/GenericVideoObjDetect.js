import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';

import CircularProgressWithLabel from './CircularProgressWithLabel';
import UploadFile from "./UploadFile";
import ODPredict from "./ODPredict";

import { lstODMenuItemList } from "../config/config";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const GenericVideoObjDetect = () => {

    const { ODSubjectURL } = useParams();  // Ex: License Plate, facemask, 
    const classes = useStyles();

    const [ filePreview, setFilePreview ] = useState(null)
    const [ file, setFile ] = useState(null)
    const [ filename, setFilename ] = useState("")
    const [ uploadPercent, setUploadPercent ] = useState(0)
    // const [ isBackdropOpen, setIsBackdropOpen ] = useState(false)
    const [ ODSubject, setODSubject ] = useState("")

    // useEffect(() => {
    //   if(uploadPercent >= 100){
    //     setIsBackdropOpen(true)
    //   } else {
    //     setIsBackdropOpen(false)
    //   }
    // }, [uploadPercent])

    useEffect(() => {
      const result = lstODMenuItemList.filter(obj => {
        return obj.url === ODSubjectURL;
      })
      setODSubject(result[0]);
    }, [ODSubjectURL]);

    return (
      <>
        <Backdrop className={classes.backdrop} open={uploadPercent > 0 && uploadPercent < 100}>
          <CircularProgressWithLabel color="inherit" value={uploadPercent} />
        </Backdrop>
        <Grid container spacing={2}>
          <UploadFile 
            title={`Please Upload a ${ODSubject.display?.toLowerCase()} video`}
            filePreview={filePreview}
            setFilePreview={setFilePreview}
            setFile={setFile} 
            setFilename={setFilename} />  
          <ODPredict 
            file={file}
            predictAPIUrl={`http://localhost:5001/od/video_detect/${filename}/${ODSubjectURL}`}
            isFileUploaded={filePreview ? true:false}
            uploadPercent={uploadPercent} 
            setUploadPercent={setUploadPercent} />
        </Grid>
      </>
    )
}

export default GenericVideoObjDetect
