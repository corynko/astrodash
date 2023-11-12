import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";

function SearchForm() {
  const [location, setLocation] = useState("");

  const handleLocationSearch = async (event) => {
    event.preventDefault();
    const encodedLocation = encodeURIComponent(location);
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedLocation}&apiKey=${apiKey}`;
    console.log(url); // This should now output the correct URL

    try {
      const response = await axios.get(url);
      const coords = response.data.features[0].geometry.coordinates;
      console.log(coords); // Do something with the coordinates
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  return (
    <form onSubmit={handleLocationSearch}>
      <TextField
        id="search-bar"
        className="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        label="Search for a Location"
        variant="outlined"
        size="small"
      />
      <IconButton type="submit" aria-label="search" size="large">
        <SearchIcon style={{ fill: "#5f75bf" }} />
      </IconButton>
    </form>
  );
}

export default SearchForm;
