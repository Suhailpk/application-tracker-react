import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MySelectMenu(props) {

  const{
    options,
    title,
    name,
    value,
    onChange
  } = props
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={value}
          label="Age"
          onChange={(e)=>{
            onChange(e)
          }}
        >

          {
            options.map((opt)=>{
                return <MenuItem key={opt.id} value={opt.id}>
                    <em>{opt.name}</em>
                </MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
