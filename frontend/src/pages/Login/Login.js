import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/userApiSlice';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import styles from './Login.module.css';
import {useDispatch} from 'react-redux';
import { userActions } from '../../store/userSlice';
import Message from '../../components/UI/Message/Message';

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [login, { isLoading: loginIsLoading, error: loginError }] = useLoginMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form)
        const reqBody = {
            username: form.username.trim(),
            password: form.password.trim(),
        };

        try {
            const response = await login(reqBody).unwrap();
            console.log(response)
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
        {loginIsLoading && <h1>{`Loading... ${loginIsLoading}`}</h1>}
        {loginError && <Message type='error' message={loginError.data.message || loginError.error}/>}
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