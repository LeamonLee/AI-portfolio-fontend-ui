import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

const ImagePredict = (props) => {

  const {
    file,
    predictAPIUrl,
    isFileUploaded,
    uploadPercent,
    setUploadPercent,
  } = props

  const [ predictedClass, setPredictedClass ] = useState("")
  const [ score, setScore ] = useState("")
  const [ isReceivedRes, setIsReceivedRes ] = useState(false);

  const onPredictClick = () => {
    let data = new FormData();
    data.append('image', file)

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
      {
        isReceivedRes === true && uploadPercent >= 100 &&
        <>
          <Grid item xs={6}>
            <Typography  variant="body1">
              Predicted_class: {predictedClass}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography  variant="body1">
              Score: {score}
            </Typography>
          </Grid>
        </>
      }
    </>
  )
}

export default ImagePredict
