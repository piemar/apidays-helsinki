import React from 'react';
import { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CharacterList from "../components/CharactertList";
import { styled } from '@mui/material/styles';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Search(props) {
  const childToHome = props.childToHome;

  const childToParent = (childdata) => {
    setSelectedCharacter(childdata);
    setShowEmail(true);

  }


  const [characters, setCharacters] = useState([]);
  const [showSearchInputField, setShowSearchInputField] = useState(true);
  const [showSearchResult, setSearchResult] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const searchInputRef = useRef();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSearch() {
    if (searchInputRef.current.value.length > 2) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        `https://data.mongodb-api.com/app/` + props.atlasAppId + "/endpoint/search?search=" + searchInputRef.current.value,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setCharacters(result);
          setSearchResult(true)
        })
        .catch((error) => console.log("error", error));
    } else {
      setCharacters([]);
    }
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stack>
          {showSearchInputField && (
            <Item>
              <Paper
                sx={{ p: '2px 4px', display: 'flex' }}
              >

                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton>

                <TextField
                  sx={{ ml: 1, flex: 2 }}
                  placeholder="Search for your characters"
                  inputProps={{ 'aria-label': 'Search for your character' }}
                  inputRef={searchInputRef}
                  onChange={handleSearch}

                />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

            </Item>
          )}
          {characters.length > 0 && showSearchResult &&
            <CharacterList atlasAppId={props.atlasAppId} characters={characters} childToParent={childToParent} />
          }
        </Stack>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Stack>
          {showEmail && (
            <Item>
              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >

                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <TextField
                  sx={{ ml: 1, flex: 2 }}
                  placeholder="Email adress"
                  inputProps={{ 'aria-label': 'Specify email adress' }}
                  value={email}
                  onChange={handleEmailChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="Specify Email adress" onClick={() => {
                  setEmail(email);
                  childToHome(email,selectedCharacter);
                  setShowEmail(false);
                  setShowSearchInputField(false);
                }
                }>
                  <PlayCircleFilledIcon />
                </IconButton>

              </Paper>

            </Item>
          )}

        </Stack>
      </Box>

    </div>

  )

}