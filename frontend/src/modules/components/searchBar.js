import { useState, useEffect } from 'react'
import { Paper, Box, InputLabel, FilledInput, 
    InputAdornment, IconButton, FormControl, Divider} from '@mui/material'

import { Search } from '@mui/icons-material'
import SelectionFieldSmall from './formComponents/selectionFieldSmall';

function SearchBar({ setSearchVal, placeholder, placeholderFilter })
{

  const [search, setSearch] = useState(placeholder);
  const [filter, setFilter] = useState(placeholderFilter || 'last');

  useEffect(() => {
    setSearch(placeholder);
    setFilter(placeholderFilter || 'last');
  }, [placeholder, placeholderFilter]);

  useEffect(() => {
    setSearchVal(search, filter);
  }, [filter])

  const handleChange = (e) => {
      setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setSearchVal(search, filter);
  }

    return(
        <Paper
        square={true}
        elevation={0}
        sx={{
          position: "fixed",
          zIndex: "5",
          width: "100%",
          height: 118,
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
        <Box mt={1}>
          <SelectionFieldSmall label={'Sort By'} value={filter} options={sortByOptions} handleChange={(e) => setFilter(e.target.value)}/>
        </Box>
        <Divider sx={{ pt: 1 }} />
      </Paper>
    )
}

export default SearchBar;

const sortByOptions = [
  {
    value: 'first',
    text: 'first name'
  },
  {
    value: 'last',
    text: 'last name'
  },
  {
    value: 'city',
    text: 'city'
  },
  {
    value: 'zip',
    text: 'zip code'
  }
]