import React, { useState } from "react";
import { EntryDataType } from "../main-table/MainTable";
import { ImageList, ImageListItem } from "@mui/material";

type PropsType = {
  entry: Array<EntryDataType>;
};

export function GalleryTable(props: PropsType) {
  const [fullScreenImageId, setFullScreenImageId] = useState<number | null>(null);

  const toggleFullScreen = (id: number | null) => {
    setFullScreenImageId(id);
  };

  // Filter out entries without a valid image URL
  const entriesWithImages = props.entry.filter((item) => item.imgUrl && item.imgUrl !== "");

  return (
    <div style={{ padding: "20px" }}>
      <ImageList sx={{ width: "100%", height: "auto", overflow: "hidden" }} cols={5} gap={6}>
        {" "}
        {/* Adjust gap to 6px and columns to 5 */}
        {entriesWithImages.map((item) => (
          <ImageListItem key={item.id} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              className={"thumbnail"}
              onClick={() => toggleFullScreen(item.id)}
              src={item.imgUrl || "path_to_placeholder_image"} // Use a placeholder image if imgUrl is null
              alt={item.name || "Image"} // Show name as alt text
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Full-screen image view on click */}
      {fullScreenImageId !== null && (
        <div className="overlay" onClick={() => toggleFullScreen(null)} style={overlayStyles}>
          <img
            src={props.entry.find((img) => img.id === fullScreenImageId)?.imgUrl || ""}
            className="full-screen"
            alt="Full Screen"
            style={{ width: "80%", maxHeight: "80%", objectFit: "contain" }} // Adjust size for full-screen image
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
