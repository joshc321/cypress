import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TopBarBase from '../components/topBarBase';
import AppForm from '../components/AppForm';
import { Stack } from '@mui/material';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';
import SelectionField from '../components/formComponents/selectionField';
import MainButton from '../components/mainbutton';
import ConfirmationDialog from '../components/confirmationDialog';
import BottomNavigationBar from '../components/bottomNavigationBar'
import useAuth from '../components/api/useAuth';
import GetMe from '../components/api/getMe';
import GetUser from '../components/api/getUser';
import putUser from '../components/api/putUser';
import deleteUser from '../components/api/deleteUser';

function User()
{
    useAuth();
    const navigate = useNavigate();
    let { slug } = useParams(); 
    const [me, loadingM] = GetMe();
    const [data, loading] = GetUser(slug);
    const [user, setUser] = useState(emptyUser)
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(data?._id) setUser({...user, ...data})
    }, [loading])

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
      };

    const handleDeleteUser = () => {
        deleteUser(slug)
        .then(rsp => {
            const [_, status] = rsp;
            switch(status)
            {
                case 200:
                    navigate(-1);
                    break;
                case 422:
                    setError(true);
                    break;
                case 401:
                    navigate('/logout');
                    break;
                default:
                    setError(true);
                    console.error(rsp)
            }
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setError(false);
        if(user.first && user.last && user.email && [0,1,2].includes(user.permissionLevel))
        {
            putUser(user, slug)
            .then(rsp => {
                const [_, status] = rsp;
                switch(status)
                {
                    case 200:
                        navigate(-1);
                        break;
                    case 422:
                        setError(true);
                        break;
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        setError(true);
                        console.error(rsp)
                }
            })
        }
        else setError(true)
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
                            options={permissions.filter(perm => perm.value <= (!loadingM ? me?.permissionLevel : 2))}
                        />
                        <MainButton text={"Submit"} />
                    </Stack>
                </form>
            </AppForm>
            <ConfirmationDialog open={open} handleClose={() => setOpen(false)} handleConfirm={handleDeleteUser}/>
            <BottomNavigationBar />
        </div>
    )
}

export default User;


const emptyUser =
{
    _id: '',
    first: '',
    last: '',
    email: '',
    permissionLevel: 0,
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