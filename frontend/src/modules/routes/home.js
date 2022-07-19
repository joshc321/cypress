import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  FilledInput,
  IconButton,
  Divider,
  Fab,
  Grid,
} from "@mui/material";
import { ArrowForwardIos, Search, Add } from "@mui/icons-material";
import BottomNavigationBar from "../components/bottomNavigationBar";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import GetCustomers from '../components/api/getCustomers';
import SearchCustomers from "../components/api/search";

function Home() {
  const navigation = useNavigate();
  const loadAmount = 10;

  //api
  const [users, setUsers] = useState([])
  const [startVal, setStartVal] = useState(0)
  //


  const [hasMore, setMore] = useState(true);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  
  const handleCustomers = useCallback(async() =>{
    setStartVal(0)
    setMore(true);
    if(searchVal.trim() === ''){
      const data = await GetCustomers(0, loadAmount)
        if(data['status'] === 403){
          navigation('/login')
        }
        else{
        setStartVal(loadAmount)
        //console.log(data)
        setUsers(data)
      }
    }
    else{
      const data = await SearchCustomers(searchVal)
      setUsers(data)
      setMore(false)
    }
  },[navigation, searchVal])

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getMore = async() => {
    let newUsers = await GetCustomers(startVal, startVal+loadAmount);
    if(newUsers.length === 0){
        setMore(false);
        return;
    }
    setStartVal(startVal+loadAmount)
    setUsers([...users, ...newUsers]);
  };

  useEffect(() =>{
    handleCustomers()
  }, [searchVal, handleCustomers])

  const handleSubmit = async e => {
    e.preventDefault();
    setSearchVal(search);
    //console.log(search);
  };

  return (
    <div key={"main div"}>
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
              <InputLabel size="small" htmlFor="filed-adornment-search">
                Search
              </InputLabel>
              <FilledInput
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
      <Box sx={{ pt: 10, pb: 8 }}>
        <InfiniteScroll
          dataLength={users.length}
          next={getMore}
          hasMore={hasMore}
          loader={
            <Grid container
              spacing={0}
              alignItems="center"
              justifyContent="center">
                Loading...
            </Grid>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more cutomers</b>
            </p>
          }
        >
          <List>
            {users.map(({ first, last, phone, address, city, state, _id }, index) => (
            
              <div key={index + _id['$oid']}>
                <ListItem key={index + _id + "list item al"} sx={{ p: 0 }}>
                  <ListItemButton
                    key={index + "list:item"}
                    component={Link}
                    to={`/customer/:${_id['$oid']}`}
                  >
                    <ListItemText
                      key={index + "list item box"}
                      primary={
                        <div>
                          <Typography
                            key={index + phone}
                            sx={{
                              fontFamily: "Proxima Nova Alt",
                              fontWeight: "fontWeightThin",
                              fontSize: 13,
                            }}
                          >
                            {phone}
                          </Typography>
                          <Typography
                            key={index + first}
                            sx={{
                              fontFamily: "Proxima Nova Alt",
                              fontWeight: "fontWeightBold",
                              fontSize: 18,
                            }}
                          >
                            {first} {last}
                          </Typography>
                        </div>
                      }
                      secondary={
                        <Typography
                          key={index + address}
                          sx={{
                            fontFamily: "Proxima Nova Alt",
                            fontWeight: "fontWeightLight",
                            fontSize: 13,
                          }}
                        >
                          {`${address}, ${city}, ${state}`}
                        </Typography>
                      }
                    />
                    <ArrowForwardIos key={index + "arrowButton"} />
                  </ListItemButton>
                </ListItem>

              </div>
            ))}
          </List>
        </InfiniteScroll>
      </Box>
      <Fab
        onClick={() => navigation("/create-customer")}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 86,
          right: 16,
        }}
      >
        <Add />
      </Fab>
      <BottomNavigationBar value={0} />
    </div>
  );
}

export default Home;
