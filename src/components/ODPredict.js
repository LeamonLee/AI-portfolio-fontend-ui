import React, { useState, useRef } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

const ODPredict = (props) => {

  const {
    file,
    predictAPIUrl,
    isFileUploaded,
    uploadPercent,
    setUploadPercent
  } = props

  const [ isReceivedRes, setIsReceivedRes ] = useState(false);
  const [ objectSrc, setObjectSrc ] = useState("");
  const detectedImageRef = useRef(null);

  const onPredictClick = () => {
    let data = new FormData();
    data.append('images', file)

    setUploadPercent(0);
    setIsReceivedRes(false);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(` ${loaded} kb of ${total} kb | ${percent}%`);
        setUploadPercent(percent);
      }
    }

    axios.post(predictAPIUrl, data, options).then(res => {
      console.log(res);
      setIsReceivedRes(true);
      setObjectSrc(res.data);
    })
  }

  return (
    <>
      <Grid item xs={12}>
        { isFileUploaded && 
          <Button variant="contained" color="secondary" onClick={onPredictClick} fullWidth>
            Predict
          </Button> }
      </Grid>
      {
        isReceivedRes === false && uploadPercent > 0 &&
        <Grid item container justify="center" alignItems="center" xs={12}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>  
      }
      { isReceivedRes === true && uploadPercent >= 100 &&
        <Grid item xs={12}>
          <img ref={detectedImageRef} style={{width:"100%"}} src={objectSrc} alt="" />
        </Grid>
      }
    </>
  )
}

export default ODPredict
