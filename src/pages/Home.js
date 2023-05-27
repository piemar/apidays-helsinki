import * as React from 'react';
import Header from "../components/Header";
import Search from "../components/Search";
import Chart from "../components/Chart";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";


export default function Home(props) {

  const childToHome = (childdata, character) => {
    setCharacter(character)
    setEmail(childdata);
    setShowChart(true);
  }

  const [email, setEmail] = useState("");
  const [character, setCharacter] = useState("");
  const [showChart, setShowChart] = useState(false);


  return (
    <>
      <Header />
      <Search atlasAppId={props.atlasAppId} childToHome={childToHome} />
      {showChart && (
        <Chart atlasAppId={props.atlasAppId} userEmail={email} selectedCharacter={character} />
      )}

      <Grid container>
        <Grid item xs>
          Character:&nbsp;{character.name}
        </Grid>
        <Divider orientation="vertical" flexItem="true">
        </Divider>
        <Grid item xs>
          Email:&nbsp;{email}
        </Grid>
      </Grid>
    </>
  )



}