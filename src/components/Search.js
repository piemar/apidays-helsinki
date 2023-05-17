import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import PokemonCard from "./PokemonCard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";

export default function Search() {
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
          background: {
            default: "#001e2b",
            paper: "#001e2b",
          },
        },
      });    
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ pt: 8 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid md={12} lg={12}>
            <Typography variant="h1" sx={{ color: "#00ed63" }} gutterBottom>
              Pokemon Search
            </Typography>
          </Grid>
          <Grid md={12} lg={12}>
            <TextField
              sx={{ width: "100%", pb: 3 }}
              inputRef={searchInputRef}
              onChange={handleSearch}
              on
              id="outlined-search"
              label="Search field"
              type="search"
            />
            <Divider />
          </Grid>
          {searching && (
            <Typography variant="h4" gutterBottom>
              Searching...
            </Typography>
          )}
          {pokemons.length > 0 &&
            pokemons.map((pokemon) => {
              console.log(pokemon);
              return (
                <Grid>
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
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

