
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material'
function AppForm(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: props.top || 7}}>
            {children}
        </Box>
      </Container>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;