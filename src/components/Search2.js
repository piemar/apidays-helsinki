import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useRef } from "react";
export default function Search2() {
    const [pokemons, setPokemons] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchInputRef = useRef();
  
    function handleSearch() {
      console.log(searchInputRef.current.value.length);
      if (searchInputRef.current.value.length > 2) {
        setSearching(true);
        console.log(searchInputRef.current.value);
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          "https://data.mongodb-api.com/app/pokemon-bpmfw/endpoint/search?search=" + searchInputRef.current.value,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setPokemons(result);
            setSearching(false);
          })
          .catch((error) => console.log("error", error));
      } else {
        setPokemons([]);
        setSearching(false);
      }
    }
  
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >


      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 2 }}
        placeholder="Your email"
        inputProps={{ 'aria-label': 'Your Email Adress' }}
        inputRef={searchInputRef}
        onChange={handleSearch}

      />

      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    
  );
}

