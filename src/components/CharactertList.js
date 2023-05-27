import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Unstable_Grid2";
import CharacterCard from "../components/CharacterCard";
import { useState, useEffect, useRef } from "react";

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

export default function CharacterList(props) {
  
  const childToParent=props.childToParent;
  const characters=props.characters;
  const appId = useRef(props.atlasAppId);
  const character = useRef(props.selectedCharacter);
  const [selectedCharacter, setSelectedCharacter] = useState(character);
  const [showSearchResult, setSearchResult] = useState(true);
  
  const characterClick = (character) => {
    setSelectedCharacter(character);    
    setSearchResult(false)
  }
  useEffect(() => {
    appId.current = appId;
    character.current = selectedCharacter;
    characters.current = characters;
  }, [props])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
          <Item>
            {characters.length > 0 && showSearchResult &&
              characters.map((character) => {

                return (
                  <Grid key={character.id} onClick={() => {
                    characterClick(character);
                    childToParent(character);
                  }
                    }>
                    <CharacterCard
                      id={character.id}
                      name={character.name}                      
                      sprite={character.sprite}
                    />
                  </Grid>
                );
              })
              }

              {characters.length < 1 && (
                <Typography variant="h4" gutterBottom>
                  No results
                </Typography>
              )}

            </Item>
          </Stack>

        </Box>
      </div>
    </ThemeProvider>
  )

}