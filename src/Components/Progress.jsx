import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ margin: "auto", width: "50%" ,paddingTop:"20px"}}>
      <CircularProgress />
    </Box>
  );
}