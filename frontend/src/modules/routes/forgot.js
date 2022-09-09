import TopBase from "../components/topbase"
import { useState } from "react"
import AppForm from "../components/AppForm"
import { Stack, Typography } from "@mui/material"
import MainButton from "../components/mainbutton"
import { useNavigate } from 'react-router-dom'
import PostForgot from "../components/api/postForgot"
import EmailField from "../components/formComponents/emailField"

function Forgot(){

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handleChange =  (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(false)
        if (email === ''){
            setError(true)
        }

        if(email){
            console.log(email)
            PostForgot({email: email})
             .then((rsp) => navigate('/login'))
             .catch(e => console.log(e))
        }
    }

    return(
        <div>
            <TopBase page="Forgot Password" arrow={true}/>
            <AppForm>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <EmailField value={email} error={error} handleChange={handleChange}/>
                    {error ? <Typography variant="body2" color="error" >Input valid email</Typography> : ""}
                    <MainButton text={"Send"} />
                    </Stack>
                </form>
            </AppForm>
        </div>
    )
}

export default Forgot;