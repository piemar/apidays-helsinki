import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
export default function CharacterCard({ id, name, sprite, species }) {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Pokemon
        </Typography>
        <Typography align="center" variant="h5" component="div">
          <img id={id} src={sprite} onclick="printSS(this)" />
        </Typography>

        <Typography align="center" variant="h5" component="div">
          {name}
        </Typography>
        <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
          {species}
        </Typography>
      </CardContent>
    </Card>
  )
}
