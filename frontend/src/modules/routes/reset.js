import TopBase from "../components/topbase"
import { useState } from "react"
import AppForm from "../components/AppForm"
import { Stack } from "@mui/material"
import PasswordTextField from "../components/passwordTextField"
import MainButton from "../components/mainbutton"
import { useNavigate, useParams } from 'react-router-dom'
import PostResetPassword from "../components/api/postResetPassword"

function Reset(){

    const navigate = useNavigate()
    let { slug } = useParams();
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');

      const handleChange = (e) => {
        setPassword(e.target.value)
      };

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(false)
        if (password.length < 6){
            setError(true)
        }

        if(password.length >= 6){
            //console.log(password)
            PostResetPassword({
                reset_token: slug,
                password: password
            })
            navigate('/login')
        }
    };

    return(
        <div>
            <TopBase page="Reset Password" arrow={true}/>
            <AppForm>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <PasswordTextField error={error} message={'Invalid Password'} password={password} handleChange={handleChange} />
                    <MainButton text={"reset"} />
                    </Stack>
                </form>
            </AppForm>
        </div>
    )
}

export default Reset;