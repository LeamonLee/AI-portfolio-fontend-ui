import React, { useState, useRef } from 'react'
import Button from "@material-ui/core/Button"
import axios from 'axios'

const ImageObjDetect = () => {
    const [ imagePreview, setImagePreview ] = useState(null)
    const [ imageFile, setImageFile ] = useState(null)
    const detectedImageRef = useRef(null)

    const onFileChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImageFile(img);
            setImagePreview(URL.createObjectURL(img));
        }
    };

    const onPredictClick = () => {
      let data = new FormData();
      data.append('images', imageFile)

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total)
          console.log(` ${loaded} kb of ${total} kb | ${percent}%`)
        }
      }

      axios.post("http://localhost:5001/od/image_detect4", data, options).then(res => {
        console.log(res)
        detectedImageRef.current.src = res.data
      })
    }

    return (
        <div>
            {/* <img src="http://localhost:5001/webcam" alt="logo" /> */}
            {/* <img src="http://localhost:5001/image" alt="logo" /> */}
            
            <h4>Upload your image</h4>
            {imagePreview && <img src={imagePreview} alt="upload_image"/>}
            <input type="file" name="myImage" onChange={onFileChange} />

            {/* <form action="http://localhost:5001/od/upload" method="POST" enctype="multipart/form-data">
                <label for="">Select image</label>
                <div>
                    <input type="file" name="image" id="image" />
                </div>
                <button type="submit">Upload</button>
            </form> */}

            { imagePreview && <Button color="inherit" onClick={onPredictClick}>Predict</Button> }
            <img ref={detectedImageRef} src="" alt="" />
        </div>
    )
}

export default ImageObjDetect
