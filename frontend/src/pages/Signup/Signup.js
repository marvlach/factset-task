import { useEffect, useReducer, useRef, useState, } from 'react';
import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import styles from './Signup.module.css';
import { 
    containsLowercase, 
    containsNumbers, 
    containsSpecialChars, 
    containsUppercase, 
    hasMinLength, 
    mustMatch, 
    notEmpty, 
} from '../../utils/formFieldValidators.js';
import Button from '../../components/UI/Button/Button';
import { useSignupMutation } from '../../api/userApiSlice';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/UI/Message/Message';

const initialState = {
    username: {
        value: '',
        isValid: false,
        isTouched: false,
        validators: [notEmpty],
        error: null
    },
    password: {
        value: '',
        isValid: false,
        isTouched: false,
        validators: [
            notEmpty, 
            containsLowercase, 
            containsUppercase, 
            containsNumbers, 
            containsSpecialChars, 
            (value) => {return hasMinLength(value, 10)}
        ],
        error: null
    },
    passwordRe: {
        value: '',
        isValid: false,
        isTouched: false,
        validators: [
            notEmpty, 
            (value, matchField, valueToMatch) => {return mustMatch(value, matchField, valueToMatch,)}
        ],
        error: null
    },
    adminCode: {
        value: '',
        isValid: true,
        isTouched: false,
        validators: [
            notEmpty,
        ],
        error: null
    },
    isAdmin: {
        value: false,
        isValid: true,
        isTouched: false,
        validators: [],
        error: null
    },
}

const formReducer = (state, action) => {
    if (action.type === 'FIELD_CHANGE') {
        const errorArray = [];
        const isValid = state[action.payload.fieldName].validators?.reduce((prev, currFn) => {
            // extra args are ignored 
            const val = currFn(action.payload.fieldValue);
            if (!val.isValid) {
                errorArray.push(val.message)
            }
            return prev && val.isValid
        }, true) ?? state[action.payload.fieldName].isValid;

        return {
            ...state,
            [action.payload.fieldName]: {
                value: action.payload.fieldValue,
                isValid: isValid,
                isTouched: true,
                validators: state[action.payload.fieldName].validators,
                error: errorArray.length ? errorArray[0] : null
            }
        }
    }

    if (action.type === 'PASSWORD_CHANGE') {
        const passwordErrorArray = [];
        const passwordReErrorArray = [];
        const newPassword = action.payload.fieldName === 'password' ? action.payload.fieldValue : state.password.value;
        const newPasswordRe = action.payload.fieldName === 'passwordRe' ? action.payload.fieldValue : state.passwordRe.value;
        
        
        const passwordIsValid = state.password.validators?.reduce((prev, currFn) => {
            // extra args are ignored 
            const val = currFn(newPassword);
            if (!val.isValid) {
                passwordErrorArray.push(val.message)
            }
            return prev && val.isValid
        }, true);

        const passwordReIsValid = state.passwordRe.validators?.reduce((prev, currFn) => {
            // extra args are ignored 
            const val = currFn(newPasswordRe, 'password', newPassword);
            if (!val.isValid) {
                passwordReErrorArray.push(val.message)
            }
            return prev && val.isValid
        }, true) ?? state[action.payload.fieldName].isValid;
        
        return {
            ...state,
            password: {
                value: newPassword,
                isValid: passwordIsValid,
                isTouched: action.payload.fieldName === 'password' ? true : state.password.isTouched,
                validators: state.password.validators,
                error: passwordErrorArray.length ? passwordErrorArray[0] : null
            },
            passwordRe: {
                value: newPasswordRe,
                isValid: passwordReIsValid,
                isTouched: action.payload.fieldName === 'passwordRe' ? true : state.passwordRe.isTouched,
                validators: state.passwordRe.validators,
                error: passwordReErrorArray.length ? passwordReErrorArray[0] : null
            },
            
        }
    }

    if (action.type === 'ADMIN_CHANGE') {
        return {
            ...state,
            isAdmin: {
                value: action.payload.fieldValue,
                isValid: true,
                isTouched: true,
                validators: state.isAdmin.validators,
                error: null
            },
            adminCode: {
                value: '',
                isValid: !action.payload.fieldValue, // is Valid if isAdmin turned false
                isTouched: false,
                validators: state.adminCode.validators,
                error: []
            },
        }
    }

    return {...state}
}

const mapFieldToAction = {
    username: 'FIELD_CHANGE',
    password: 'PASSWORD_CHANGE',
    passwordRe: 'PASSWORD_CHANGE',
    isAdmin: 'ADMIN_CHANGE',
    adminCode: 'FIELD_CHANGE'
}


const Signup = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordReRef = useRef();
    const isAdminRef = useRef();
    const adminCodeRef = useRef();
    
    const [form, dispatchForm] = useReducer(formReducer, initialState);
    const [signup, { isLoading, error }] = useSignupMutation();
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // wait 1sec to see message and redirect to /login
    useEffect(() => {

        if (!success) {
            return
        }
        const timer = setTimeout(() => {
            navigate("/login");
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [navigate, success])


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form);
        const reqBody = {
            username: form.username.value,
            password: form.password.value,
            isAdmin: form.isAdmin.value,
            adminCode: form.adminCode.value
        };

        try {
            const response = await signup(reqBody).unwrap();
            setSuccess(response.message)
        } catch (error) {
            console.log('error', error)
        }
        
        
    }


    const handleFieldChange = (event) => {
        dispatchForm({
            type: mapFieldToAction[event.target.getAttribute('id')],
            payload: {
                fieldName: event.target.getAttribute('id'),
                fieldValue: event.target.type === 'checkbox'? event.target.checked : event.target.value
            }
        })
    }
    const formIsValid = Object.keys(form).reduce((prev, key) => {
        return prev && form[key].isValid
    }, true);

    // console.log('formIsValid', form, formIsValid);

    return (
    <>
        {success && <Message type='success' message={success}/>}
        {error && <Message type='error' message={error?.data?.message || error?.error}/>}
        <Card className={styles['signup-card']}>
            <h1> Signup </h1>    
            <form onSubmit={handleSubmit}>
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'text',
                        id: 'username',
                        value: form.username.value,
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
                        value: form.password.value,
                        onChange: handleFieldChange
                    }}
                    label={'Password'}
                    id={'password'}
                    error={form.password.isTouched && form.password.error}
                    ref={passwordRef}
                />
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'password',
                        id: 'passwordRe',
                        value: form.passwordRe.value,
                        onChange: handleFieldChange
                    }}
                    label={'Re-enter Password'}
                    id={'passwordRe'}
                    error={form.passwordRe.isTouched && form.passwordRe.error}
                    ref={passwordReRef}
                />

                {form.isAdmin.value &&  <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'password',
                        id: 'adminCode',
                        value: form.adminCode.value,
                        onChange: handleFieldChange
                    }}
                    label={'Enter the secret admin code'}
                    id={'asAdmin'}
                    error={form.adminCode.isTouched && form.adminCode.error}
                    ref={adminCodeRef}
                />}


                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'checkbox',
                        id: 'isAdmin',
                        checked: form.isAdmin.value,
                        onChange: handleFieldChange
                    }}
                    label={'Signup as Admin'}
                    id={'asAdmin'}
                    ref={isAdminRef}
                />
                <Button 
                    button={{
                        type: 'submit',
                        disabled: !formIsValid
                    }}
                > 
                    Signup 
                </Button>
            </form>
        </Card>
    </>)
}

export default Signup