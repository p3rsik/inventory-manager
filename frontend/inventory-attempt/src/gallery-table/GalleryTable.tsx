import React, { useState } from "react";
import { EntryDataType } from "../main-table/MainTable";
import { ImageList, ImageListItem } from "@mui/material";

type PropsType = {
  entry: Array<EntryDataType>;
};

export function GalleryTable(props: PropsType) {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const handleImageClick = (imgUrl: string) => {
    setFullScreenImage(imgUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  // Flatten all images across entries for display in the gallery
  const images = props.entry
    .filter((item) => item.imgUrls && item.imgUrls.length > 0)
    .flatMap((item) =>
      item.imgUrls.map((url) => ({
        id: item.id,
        url,
        name: item.name,
      }))
    );

  return (
    <div style={{ padding: "20px" }}>
      <ImageList sx={{ width: "100%", height: "auto", overflow: "hidden" }} cols={5} gap={6}>
        {images.map((image, index) => (
          <ImageListItem key={`${image.id}-${index}`} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              className="thumbnail"
              onClick={() => handleImageClick(image.url)}
              src={image.url}
              alt={image.name || "Image"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Full-screen image view on click */}
      {fullScreenImage && (
        <div className="overlay" onClick={handleCloseFullScreen} style={overlayStyles}>
          <img
            src={fullScreenImage}
            className="full-screen"
            alt="Full Screen"
            style={{ width: "80%", maxHeight: "80%", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}

// Inline styles for overlay (for full-screen image)
const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};
