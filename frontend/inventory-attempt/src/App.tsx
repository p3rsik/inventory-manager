import React, { useState } from "react";
import "./App.css";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { GalleryTable } from "./gallery-table/GalleryTable";
import { SearchTable } from "./search-table/SearchTable";
import { EntryDataType, MainTable } from "./main-table/MainTable";
import AddNewEntry from "./add-new-entry/AddNewEntry";

const App: React.FC = () => {
  // State to hold the entry data
  const [entryData, setEntryData] = useState<Array<EntryDataType>>([
    { id: 1, name: "Pisya", comesFrom: "zalupa 1", imgUrl: "https://picsum.photos/100" },
    { id: 2, name: "Zopa", comesFrom: "zalupa 2", imgUrl: "https://picsum.photos/200" },
    { id: 3, name: "Parasha", comesFrom: "zalupa 3", imgUrl: "https://picsum.photos/300" },
  ]);

  // State to track selected tab
  const [value, setValue] = useState("2");

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Function to add a new entry
  const addNewEntry = (newEntry: EntryDataType) => {
    setEntryData((prevData) => [...prevData, newEntry]);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="lab API tabs example">
            <Tab label="Add New" value="1" />
            <Tab label="Table" value="2" />
            <Tab label="Gallery" value="3" />
            <Tab label="Search..." value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddNewEntry onAddNewEntry={addNewEntry} entryData={entryData} />
        </TabPanel>
        <TabPanel value="2">
          <MainTable entry={entryData} />
        </TabPanel>
        <TabPanel value="3">
          <GalleryTable entry={entryData} />
        </TabPanel>
        <TabPanel value="4">
          <SearchTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default App;
