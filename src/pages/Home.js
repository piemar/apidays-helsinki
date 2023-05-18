import * as React from 'react';
import Chart from "../components/Chart";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Unstable_Grid2";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import CharacterCard from "../components/CharacterCard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#001e2b",
      paper: "#001e2b",
    },
  },
});


export default function Home() {

  const [characters, setCharacters] = useState([]);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const searchInputRef = useRef();
  const childRef = useRef(null);
  const [showChart, setShowChart] = useState(false);
  const [showSearchResult, setSearchResult] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function showWorldMap() {
    setShowChart(true);
  }

  function handleSearch() {
    if (searchInputRef.current.value.length > 2) {
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
          setCharacters(result);
          setSearchResult(true)
          setSearching(false);
        })
        .catch((error) => console.log("error", error));
    } else {
      setCharacters([]);
      setSearching(false);
    }
  }

  const characterClick = (character) => {
    console.log(character);
    setSelectedCharacter(character);
    setSearchResult(false)
    setShowEmail(true);


  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div>
        <Header />
        <Box sx={{ width: '100%' }}>
          <Stack>
            <Item>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex' }}
              >

                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton>

                <InputBase
                  sx={{ ml: 1, flex: 2 }}
                  placeholder="Search for your character"
                  inputProps={{ 'aria-label': 'Search for your character' }}
                  inputRef={searchInputRef}
                  onChange={handleSearch}

                />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

            </Item>
            {showEmail && (
              <Item>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >


                  <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 2 }}
                    placeholder="Email adress"
                    inputProps={{ 'aria-label': 'Specify email adress' }}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={showWorldMap}>
                    <PlayCircleFilledIcon />
                  </IconButton>


                </Paper>

              </Item>
            )}
          </Stack>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item>

            </Item>

            <Item>

              {characters.length > 0 && showSearchResult &&
                characters.map((character) => {

                  return (
                    <Grid onClick={() => characterClick(character)}>
                      <CharacterCard
                        id={character.id}
                        name={character.name}
                        species={character.species.name}
                        sprite={character.sprite}
                      />
                    </Grid>
                  );
                })}

              {characters.length < 1 && (
                <Typography variant="h4" gutterBottom>
                  No results
                </Typography>
              )}

            </Item>
            <Item>
              {characters.length > 0 && showChart && (

                <Chart userEmail={email} selectedCharacter={selectedCharacter} />
              )}
            </Item>
          </Stack>

        </Box>

        {email}
      </div>
    </ThemeProvider>

  )



}