import React, { useState } from "react";
import { EntryDataType } from "../main-table/MainTable";

interface EntryTableProps {
  entry: EntryDataType;
}

const EntryTable: React.FC<EntryTableProps> = ({ entry }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const handleImageClick = (imgUrl: string) => {
    setFullScreenImage(imgUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
      <h2>{entry.name}</h2>
      <p>Comes from: {entry.comesFrom}</p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {entry.imgUrls.length > 0 ? (
          entry.imgUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(url)}
              style={{ width: "100px", cursor: "pointer" }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      {fullScreenImage && (
        <div
          onClick={handleCloseFullScreen}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}>
          <img
            src={fullScreenImage}
            alt="Full Screen"
            style={{
              width: "90%",
              height: "auto",
              maxWidth: "600px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EntryTable;
