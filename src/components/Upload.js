import React, { useState } from 'react'

const Upload = () => {
    const [ image, setImage ] = useState(null)

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(URL.createObjectURL(img));
        }
    };
    return (
        <div>
            {/* <img src="http://localhost:5001/webcam" alt="logo" /> */}
            {/* <img src="http://localhost:5001/image" alt="logo" /> */}
            {/* <img src="" alt="logo" /> */}
            <h4>Upload your image</h4>
            {image && <img src={image} />}
            <input type="file" name="myImage" onChange={onImageChange} />

            {/* <form action="http://localhost:5001/od/upload" method="POST" enctype="multipart/form-data">
                <label for="">Select image</label>
                <div>
                    <input type="file" name="image" id="image" />
                </div>
                <button type="submit">Upload</button>
            </form> */}
        </div>
    )
}

export default Upload
