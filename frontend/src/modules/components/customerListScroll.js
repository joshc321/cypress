import { Box, Grid } from '@mui/material'

import InfiniteScroll from 'react-infinite-scroll-component';
import SearchCustomers from './api/search';

import CustomerListSelect from "./customerListSelect";

function CustomerListScroll({searchVal, filterVal, linkTo})
{
  const [customers, _, hasMore, getMore] = SearchCustomers(searchVal, filterVal);

  return(
      <Box sx={{ pt: 13, pb: 8 }}>
        <InfiniteScroll
          dataLength={customers.length}
          next={getMore}
          hasMore={hasMore}
          initialScrollY={0}
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
              <b> No more cutomers </b>
            </p>
          }
        >
            <CustomerListSelect customers={customers} linkTo={linkTo} />
        </InfiniteScroll>
      </Box>
    )
}

export default CustomerListScroll;