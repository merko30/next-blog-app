import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "utils/getCroppedImg";
import blobURLToFile from "utils/blobToFile";
import Button from "./Button";

const AvatarCropper = ({ src, ...props }) => {
  // photo size
  const [cropSize] = useState({ width: 200, height: 200 });

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels, 1);
      props.props.onClose();
      props.getImage(croppedImage);
      props.setFieldValue(
        "avatar",
        await blobURLToFile(croppedImage, `newavatar-${Date.now()}.jpeg`)
      );
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <div>
      <div
        style={{
          width: "400px",
          height: "400px",
          position: "relative",
        }}
      >
        <div className="crop-container">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            cropSize={cropSize}
            cropShape="round"
            showGrid={false}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="controls">
            <input
              type="range"
              className="custom-range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button color="orange" classes="mb-2" onClick={showCroppedImage}>
        Crop image
      </Button>
    </div>
  );
};

export default AvatarCropper;
