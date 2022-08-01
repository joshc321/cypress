import { Box, Grid } from '@mui/material'
import { useState, useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';

import CustomerListSelect from "./customerListSelect";

function CustomerListScroll({searchVal, linkTo})
{
    const [customers, setCustomers] = useState(customerList)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        console.log("new search woo", searchVal)
    }, [searchVal]);

    const getMore = () => {
        setCustomers([...customers, ...customerList])
        setHasMore(false)
    }


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

const customerList = [
    {
      _id: 'a098d7sf0asdf',
      first: 'Coral',
      last: 'Raymond',
      phone: '951 537 4949',
      address: 
      {
        city: 'Greenwood',
        state: 'Coral',
      }
    },
    {
      _id: 'ldaf80d0a98d7f',
      first: 'Elin',
      last: 'Stamp',
      phone: '951 537 4949',
      address: 
      {
        city: 'Amarillo',
        state: 'TX',
      }
    },
    {
      _id: 'aasd8sodify0ad',
      first: 'Dominykas',
      last: 'Crawford',
      phone: '951 537 4949',
      address: 
      {
        city: 'Bristow',
        state: 'VA',
      }
    },
    {
      _id: 'a7se8dw6fy345',
      first: 'Hugo',
      last: 'Woodward',
      phone: '951 537 4949',
      address: 
      {
        _id: '0q19834a98wsd7yf',
        city: 'Leland',
        state: 'NC',
      }
    },
    {
        _id: 'a098d7sf0asdf',
        first: 'Coral',
        last: 'Raymond',
        phone: '951 537 4949',
        address: 
        {
          city: 'Greenwood',
          state: 'Coral',
        }
      },
      {
        _id: 'ldaf80d0a98d7f',
        first: 'Elin',
        last: 'Stamp',
        phone: '951 537 4949',
        address: 
        {
          city: 'Amarillo',
          state: 'TX',
        }
      },
      {
        _id: 'aasd8sodify0ad',
        first: 'Dominykas',
        last: 'Crawford',
        phone: '951 537 4949',
        address: 
        {
          city: 'Bristow',
          state: 'VA',
        }
      },
      {
        _id: 'a7se8dw6fy345',
        first: 'Hugo',
        last: 'Woodward',
        phone: '951 537 4949',
        address: 
        {
          _id: '0q19834a98wsd7yf',
          city: 'Leland',
          state: 'NC',
        }
      },
      {
        _id: 'a098d7sf0asdf',
        first: 'Coral',
        last: 'Raymond',
        phone: '951 537 4949',
        address: 
        {
          city: 'Greenwood',
          state: 'Coral',
        }
      },
      {
        _id: 'ldaf80d0a98d7f',
        first: 'Elin',
        last: 'Stamp',
        phone: '951 537 4949',
        address: 
        {
          city: 'Amarillo',
          state: 'TX',
        }
      },
      {
        _id: 'aasd8sodify0ad',
        first: 'Dominykas',
        last: 'Crawford',
        phone: '951 537 4949',
        address: 
        {
          city: 'Bristow',
          state: 'VA',
        }
      },
      {
        _id: 'a7se8dw6fy345',
        first: 'Hugo',
        last: 'Woodward',
        phone: '951 537 4949',
        address: 
        {
          _id: '0q19834a98wsd7yf',
          city: 'Leland',
          state: 'NC',
        }
      },
  ]