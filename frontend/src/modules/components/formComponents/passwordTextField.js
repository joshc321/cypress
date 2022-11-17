import { FormControl, InputLabel, 
        OutlinedInput, InputAdornment,
        IconButton, FormHelperText
    } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react'; 

function PasswordTextField({error, password, handleChange, message}){
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(
      <div>
        <FormControl variant="outlined" error={error} fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                required
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            {error && (
                <FormHelperText error id="accountId-error">
                { message || 'Invalid Email or Password'}
                </FormHelperText>
            )}
        </FormControl>
      </div>
    )
}


export default PasswordTextField