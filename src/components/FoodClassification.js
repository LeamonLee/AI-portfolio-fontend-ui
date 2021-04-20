import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid"

import UploadFile from "./UploadFile";
import ImagePredict from "./ImagePredict";

const FoodClassification = () => {

  const [ filePreview, setFilePreview ] = useState(null)
  const [ file, setFile ] = useState(null)
  const [ filename, setFilename ] = useState("")
  const [ uploadPercent, setUploadPercent ] = useState(0)

  return (
    <>
      <Grid container spacing={2}>
        <UploadFile 
          title="Please Upload a food image"
          filePreview={filePreview}
          setFilePreview={setFilePreview}
          setFile={setFile}
          setFilename={setFilename}
          setUploadPercent={setUploadPercent} />  
        <ImagePredict 
          file={file}
          predictAPIUrl={`https://odclassificationbackendapp-kkns75d4wq-de.a.run.app/classification/image_predict/${filename}`}
          isFileUploaded={filePreview ? true:false}
          uploadPercent={uploadPercent}
          setUploadPercent={setUploadPercent} />
      </Grid>
    </>
  )
}

export default FoodClassification
