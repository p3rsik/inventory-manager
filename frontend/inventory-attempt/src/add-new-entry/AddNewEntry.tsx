import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField, Box, Typography } from "@mui/material";
import { EntryDataType } from "../main-table/MainTable";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface AddNewEntryProps {
  onAddNewEntry: (newEntry: EntryDataType) => void;
  entryData: Array<EntryDataType>;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddNewEntry: React.FC<AddNewEntryProps> = ({ onAddNewEntry, entryData }) => {
  const [name, setName] = useState<string>("");
  const [comesFrom, setComesFrom] = useState<string>("");
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filePreviews: string[] = [];
      const fileUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileUrls.push(reader.result as string);
          filePreviews.push(reader.result as string);
          if (fileUrls.length === files.length) {
            setImgUrls(fileUrls);
            setPreviewImages(filePreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onCreateButtonHandler = () => {
    if (name && comesFrom) {
      const newEntry: EntryDataType = {
        id: Math.max(...entryData.map((item) => item.id), 0) + 1,
        name,
        comesFrom,
        imgUrls,
      };

      onAddNewEntry(newEntry);
      setName("");
      setComesFrom("");
      setImgUrls([]);
      setPreviewImages([]);
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500, margin: "0 auto" }}>
      <Typography variant="h6" gutterBottom>
        Add New Entry
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Comes From"
        variant="outlined"
        fullWidth
        value={comesFrom}
        onChange={(e) => setComesFrom(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ paddingBottom: 2 }}>
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
          Upload Images
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} multiple />
        </Button>
      </Box>
      {previewImages.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 2 }}>
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
            />
          ))}
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={onCreateButtonHandler} disabled={!name || !comesFrom}>
        Create
      </Button>
    </Box>
  );
};

export default AddNewEntry;
