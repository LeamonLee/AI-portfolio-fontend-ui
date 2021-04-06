

function App() {
  return (
    <div>
      {/* <img src="http://localhost:5001/webcam" alt="logo" /> */}
      {/* <img src="http://localhost:5001/image" alt="logo" /> */}
      {/* <img src="" alt="logo" /> */}
      
      <h4>Upload your image</h4>
      <form action="http://localhost:5001/od/image_detect" method="POST" enctype="multipart/form-data">
          <label for="">Select image</label>
          <div>
              <input type="file" name="image" id="image" />
          </div>
          <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
