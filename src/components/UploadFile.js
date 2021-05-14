import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UploadFile = (props) => {
  const classes = useStyles();
  const {
    title,
    filePreview,
    setFilePreview,
    setFile,
    setFilename,
    setUploadPercent,
    isVideo
  } = props

  const onFileChange = event => {
    if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        setFile(file);
        setFilePreview(URL.createObjectURL(file));
        setFilename(file.name);
        setUploadPercent(0);
    }
  };


  return (
    <>
      <Grid item xs={12}>
        <h2>{title}</h2>
      </Grid>
      <Grid item xs={12}>
        {filePreview && <img style={{width:"100%"}} src={filePreview} alt="upload_image"/>}
      </Grid>
      <Grid item xs={12}>
        <input
          accept={isVideo ? "video/*" : "image/*"}
          className={classes.input}
          id="contained-btn-file"
          onChange={onFileChange}
          type="file"
        />
        <label htmlFor="contained-btn-file">
          <Button variant="contained" color="primary" component="span" fullWidth>
            Upload
          </Button>
        </label>
      </Grid>
    </>
  )
}

export default UploadFile
