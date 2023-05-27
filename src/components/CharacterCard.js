import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
const imageStyle = {
  width: "50%"
}
export default function CharacterCard({ id, name, sprite }) {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Lord of the ring character
        </Typography>
        <Typography align="center" variant="h5" component="div">
          <img id={id} src={sprite}  style={imageStyle} alt=""/>
        </Typography>

        <Typography align="center" variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  )
}
