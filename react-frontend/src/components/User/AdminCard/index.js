import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const AdminCard = ({ name, email, onClick }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card color={"#ED8CBB"} sx={{ backgroundColor: '#FFF8DC' }}  variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Created By
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>See More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AdminCard;
