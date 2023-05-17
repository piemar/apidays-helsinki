import Chart from "../components/Chart";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

import PokemonCard from "../components/PokemonCard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home () {

  const [pokemons, setPokemons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const searchInputRef = useRef();

    function handleEmailChange(e) {
      setEmail(e.target.value);
    }
  
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
  
    const characterClick = (character) => {
      console.log(character);
      setSelectedCharacter(character);
      setShowModal(true);
    }

  return (
    
    <div>      
      <h1>Demo</h1>
      <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
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
          
        </Item>  
<Item>
{pokemons.length > 0 &&
            pokemons.map((pokemon) => {
              console.log(pokemon);
              return (
                <Grid onClick={() => characterClick(pokemon)}>
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    species={pokemon.species.name}
                    sprite={pokemon.sprite}
                  />
                </Grid>
              );
            })}
          {pokemons.length < 1 && (
            <Typography variant="h4" gutterBottom>
              No results
            </Typography>
          )}
  </Item>             
        <Item>
          {pokemons.length>0 && (
            <Chart userEmail={email} selectedCharacter={selectedCharacter}/>
          )}
        </Item>
      </Stack>      

      </Box>  


      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          Please enter email
          <input type="text" value={email} onChange={handleEmailChange} />
        </Box>
      </Modal>
      {email}
    </div>
    
  )
}