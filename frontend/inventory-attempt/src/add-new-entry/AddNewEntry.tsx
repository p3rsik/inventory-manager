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
  const [imgUrl, setImgUrl] = useState<string | null>(null); // Store the image URL
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For image preview

  // Handle form field changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleComesFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComesFrom(event.target.value);
  };

  // Handle file upload and image preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string); // Set imgUrl to the base64 string here
        setPreviewImage(reader.result as string); // Preview image also as base64 string
      };
      reader.readAsDataURL(file); // This returns base64 string
    }
  };

  // Handle form submission and entry creation
  const onCreateButtonHandler = () => {
    if (name && comesFrom) {
      const newEntry: EntryDataType = {
        id: Math.max(...entryData.map((item) => item.id)) + 1,
        name: name,
        comesFrom: comesFrom,
        imgUrl: imgUrl || "", // Use empty string if no image
      };

      onAddNewEntry(newEntry);
      setName("");
      setComesFrom("");
      setImgUrl(null);
      setPreviewImage(null);
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
        onChange={handleNameChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Comes From"
        variant="outlined"
        fullWidth
        value={comesFrom}
        onChange={handleComesFromChange}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ paddingBottom: 2 }}>
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
          Upload Image
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
        </Button>
      </Box>

      {/* Image Preview */}
      {previewImage && (
        <Box sx={{ marginBottom: 2 }}>
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={onCreateButtonHandler}
        disabled={!name || !comesFrom} // Disable button if fields are empty
      >
        Create
      </Button>
    </Box>
  );
};

export default AddNewEntry;
