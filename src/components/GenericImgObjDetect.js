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

const GenericImgObjDetect = (props) => {

    const { isOCR } = props;
    const { ODSubjectURL } = useParams();  // Ex: lpr, facemask, 
    const classes = useStyles();

    const [ filePreview, setFilePreview ] = useState(null);
    const [ file, setFile ] = useState(null);
    const [ filename, setFilename ] = useState("");
    const [ uploadPercent, setUploadPercent ] = useState(0);
    // const [ isBackdropOpen, setIsBackdropOpen ] = useState(false)
    const [ ODSubject, setODSubject ] = useState("");
    const [ predictAPIUrl, setPredictAPIUrl ] = useState("");

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
      if(ODSubject !== result[0]){
        setODSubject(result[0]);
        setFilePreview(null);
        setFile(null);
        setFilename(null);
        setUploadPercent(0);
      }

      // if(ODSubjectURL === "coronavirus") {
      //   setPredictAPIUrl(`https://odclassificationbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect`)
      // } else if (ODSubjectURL === "lpr" && isOCR === true) {
      //   setPredictAPIUrl(`https://odlprbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect/ocr`)
      // } else if (ODSubjectURL === "lpr") {
      //   setPredictAPIUrl(`https://odlprbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect`)
      // } else {
      //   setPredictAPIUrl(`https://odfacemaskbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect`)
      // }

      if(ODSubjectURL === "coronavirus") {
        setPredictAPIUrl(`https://odclassificationbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect`)
      } else if (isOCR === true) {
        setPredictAPIUrl(`https://odbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect/ocr`)
      } else {
        setPredictAPIUrl(`https://odbackendapp-kkns75d4wq-de.a.run.app/od/${ODSubjectURL}/image_detect`)
      }

    }, [ODSubjectURL, isOCR, ODSubject]);

    console.log("ODSubjectURL:", ODSubjectURL)
    return (
      <>
        <Backdrop className={classes.backdrop} open={uploadPercent > 0 && uploadPercent < 100}>
          <CircularProgressWithLabel color="inherit" value={uploadPercent} />
        </Backdrop>
        <Grid container spacing={2}>
          <UploadFile 
            title={`Please Upload a ${ODSubject.display?.toLowerCase()} image`}
            filePreview={filePreview}
            setFilePreview={setFilePreview}
            setFile={setFile}
            setFilename={setFilename}
            setUploadPercent={setUploadPercent} />  
          <ODPredict 
            file={file}
            predictAPIUrl={predictAPIUrl}
            isFileUploaded={filePreview ? true:false}
            uploadPercent={uploadPercent}
            setUploadPercent={setUploadPercent} />
        </Grid>
      </>
    )
}

export default GenericImgObjDetect
