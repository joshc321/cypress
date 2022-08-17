import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TopBarBase from '../components/topBarBase';
import AppForm from '../components/AppForm';
import { Stack } from '@mui/material';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';
import SelectionField from '../components/formComponents/selectionField';
import MainButton from '../components/mainbutton';
import ConfirmationDialog from '../components/confirmationDialog';
import BottomNavigationBar from '../components/bottomNavigationBar'

function User()
{
    const navigate = useNavigate();
    let { slug } = useParams(); 
    const [me, setMe] = useState(meDemo)
    const [user, setUser] = useState(usersDemo)
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
      };

    const deleteUser = () => {
        console.log("User deleted");
        navigate(-1);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setError(false);
        if(user.first && user.last && user.email && user.permissionLevel)
        {
            console.log("Submit!")
            navigate(-1);
        }
        else
        {
            setError(true)
        }
    }

    return(
        <div>
            <TopBarBase primary={`${user.first} ${user.last}`} secondary={"Edit"} handleClick={() => setOpen(true)} final="delete"/>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2} pt={2}>
                        <NameField first={user.first} last={user.last} handleChange={handleChange} error={error} />
                        <EmailField value={user.email} error={error} handleChange={handleChange('email')} />
                        <SelectionField 
                            label="Role"
                            value={user.permissionLevel}
                            handleChange={handleChange('permissionLevel')}
                            options={permissions.filter(perm => perm.value <= me.permissionLevel)}
                        />
                        <MainButton text={"Submit"} />
                    </Stack>
                </form>
            </AppForm>
            <ConfirmationDialog open={open} handleClose={() => setOpen(false)} handleConfirm={deleteUser}/>
            <BottomNavigationBar />
        </div>
    )
}

export default User;

const meDemo = 
{
    _id: '0s98f7dg098sdfg',
    first: 'Joshua',
    last: 'Cordero',
    email: 'joshcordero@gmail.com',
    permissionLevel: 2,
}

const usersDemo =
{
    _id: '0s98f7dg098sdfg',
    first: 'Jermaine',
    last: 'Cole',
    email: 'Jermaine@gmail.com',
    permissionLevel: 2,
}

const permissions = [
    {
        value: 0,
        text: 'Viewer',
    },
    {
        value: 1,
        text: 'Editor'
    },
    {
        value: 2,
        text: 'Admin',
    }
]