import { useState } from 'react'
import { Paper, Box, InputLabel, FilledInput, 
    InputAdornment, IconButton, FormControl, Divider } from '@mui/material'

import { Search } from '@mui/icons-material'

function SearchBar({ setSearchVal })
{

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
      setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setSearchVal(search)
  }

    return(
        <Paper
        square={true}
        elevation={0}
        sx={{
          position: "fixed",
          zIndex: "tooltip",
          width: "100%",
          height: 90,
          p: 3,
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Box m="auto">
            <FormControl variant="filled" fullWidth>
              <InputLabel size="small" htmlFor="filled-adornment-search">
                Search
              </InputLabel>
              <FilledInput
                autoComplete='off'
                size="small"
                disableUnderline={true}
                value={search}
                onChange={handleChange}
                style={{
                  borderRadius: 25,
                }}
                id="filled-adornment-search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </Box>
        </form>
        <Divider sx={{ pt: 2 }} />
      </Paper>
    )
}

export default SearchBar;