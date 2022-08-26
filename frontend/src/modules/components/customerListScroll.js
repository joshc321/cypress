import { Box, Grid } from '@mui/material'
import { useState, useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';
import SearchCustomers from './api/search';

import CustomerListSelect from "./customerListSelect";

function CustomerListScroll({searchVal, linkTo})
{
  const [customers, loading, hasMore, getMore] = SearchCustomers(searchVal)

    useEffect(() => {
        console.log("new search woo", searchVal)
    }, [searchVal]);


    return(
        <Box sx={{ pt: 10, pb: 8 }}>
        <InfiniteScroll
          dataLength={customers.length}
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
            <CustomerListSelect customers={customers} linkTo={linkTo} />
        </InfiniteScroll>
        </Box>
    )
}

export default CustomerListScroll;