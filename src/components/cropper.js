import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = () => {
  const [src, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }
  return (
    <div className="container">
      <div className="cont1">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="cont2">
        {src && (
          <div className="cont-2-1">
            <ReactCrop
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
            <button onClick={getCroppedImg}>Crop Image</button>
          </div>
        )}
        {result && (
          <div className="cont-2-2">
            <img src={result} alt="Cropped Image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cropper;
