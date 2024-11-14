import React, { useState } from "react";
import { EntryDataType } from "../main-table/MainTable";

interface EntryTableProps {
  entry: EntryDataType;
}

const EntryTable: React.FC<EntryTableProps> = ({ entry }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
      <h2>{entry.name}</h2>
      <p>Comes from: {entry.comesFrom}</p>

      {/* Conditionally render image or fallback message */}
      {entry.imgUrl ? (
        <>
          {/* Small image */}
          <img
            src={entry.imgUrl}
            alt={entry.name}
            onClick={handleImageClick}
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
            }}
          />

          {/* Full-screen overlay */}
          {isFullScreen && (
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
                zIndex: 1000,
                cursor: "pointer",
              }}>
              <img
                src={entry.imgUrl}
                alt={entry.name}
                style={{
                  width: "90%",
                  height: "auto",
                  maxWidth: "600px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default EntryTable;
