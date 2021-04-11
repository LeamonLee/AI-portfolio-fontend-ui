import React, { useState, useRef } from 'react';
import Button from "@material-ui/core/Button"
import axios from 'axios'

const VideoObjDetect = () => {
    const [ videoPreview, setVideoPreview ] = useState(null)
    const [ videoFile, setVideoFile ] = useState(null)
    const [ filename, setFilename ] = useState("")
    // const [ isPredict, setIsPredict ] = useState(false)
    const [ uploadPercent, setUploadPercent] = useState(0)

    const onFileChange = event => {
        if (event.target.files && event.target.files[0]) {
            let video = event.target.files[0];
            setVideoFile(video);
            setVideoPreview(URL.createObjectURL(video));
            setFilename(video.name);
        }
    };

    const onPredictClick = () => {
      let data = new FormData();
      data.append('video', videoFile)

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total)
          console.log(` ${loaded} kb of ${total} kb | ${percent}%`)
          setUploadPercent(percent)
        }
      }

      axios.post("http://localhost:5001/od/video_upload", data, options).then(res => {
        console.log(res)

      })
    }

    return (
        <div>
          <h4>Upload your video</h4>
          {
            videoPreview &&
            <video width="400" controls>
                <source src={videoPreview}/>
            </video>
          }
          <input type="file" name="myVideo" onChange={onFileChange} />
          { videoPreview && <Button color="inherit" onClick={onPredictClick}>Predict</Button> }
          { uploadPercent >= 100 && <img src={`http://localhost:5001/od/video_detect/${filename}`} alt="video_predict" />}
        </div>
    )
}

export default VideoObjDetect
