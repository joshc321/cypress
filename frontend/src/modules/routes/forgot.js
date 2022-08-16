import TopBase from "../components/topbase"
import { useState } from "react"
import AppForm from "../components/AppForm"
import { TextField, Stack, Typography } from "@mui/material"
import MainButton from "../components/mainbutton"
import { useNavigate } from 'react-router-dom'
import PostForgot from "../components/api/postForgot"
import EmailField from "../components/formComponents/emailField"

function Forgot(){

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handleChange = () => (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(false)
        if (email === ''){
            setError(true)
        }

        if(email){
            PostForgot({email: email})
            navigate('/login')
        }
    }

    return(
        <div>
            <TopBase page="Forgot Password" arrow={true}/>
            <AppForm>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <EmailField value={email} error={error} handleChange={handleChange('email')}/>
                    {error ? <Typography variant="body2" color="error" >Input valid email</Typography> : ""}
                    <MainButton text={"Send"} />
                    </Stack>
                </form>
            </AppForm>
        </div>
    )
}

export default Forgot;