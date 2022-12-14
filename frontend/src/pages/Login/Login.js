import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/userApiSlice';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import styles from './Login.module.css';
import {useDispatch} from 'react-redux';
import { userActions } from '../../store/userSlice';
import Message from '../../components/UI/Message/Message';
import Spinner from '../../components/UI/Spinner/Spinner';

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading: loginIsLoading, error: loginError }] = useLoginMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reqBody = {
            username: form.username.trim(),
            password: form.password.trim(),
        };

        try {
            const response = await login(reqBody).unwrap();
            dispatch(userActions.login({
                token: response.token,
            }))
            navigate(/* location.state?.from?.pathname ?? */ "/currency");   
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleFieldChange = (event) => {
        setForm({...form, [event.target.getAttribute('id')]: event.target.value})
    }

    const formIsValid = Object.keys(form).reduce((prev, formField) => {
        return prev && form[formField].trim() !== ''
    }, true)

    return (
    <>
        {loginIsLoading && <Spinner />}
        {loginError && <Message type='error' message={loginError?.data?.message || loginError?.error}/>}
        <Card className={styles['login-card']}>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'text',
                        id: 'username',
                        value: form.username,
                        onChange: handleFieldChange
                    }}
                    label={'Username'}
                    id={'username'}
                    error={form.username.isTouched && form.username.error}
                    ref={usernameRef}
                />
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'password',
                        id: 'password',
                        value: form.password,
                        onChange: handleFieldChange
                    }}
                    label={'Password'}
                    id={'password'}
                    error={form.password.isTouched && form.password.error}
                    ref={passwordRef}
                />
                
                <Button
                    button={{
                        type: 'submit',
                        disabled: !formIsValid
                    }}
                > 
                    Login 
                </Button>
            </form>
        </Card>
    
    </>)
}

export default Login