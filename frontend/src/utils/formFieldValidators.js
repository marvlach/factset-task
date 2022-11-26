
export const notEmpty = value => { 
    return {
        isValid: value.trim() !== '', 
        message: 'Field cannot be empty.'
    }
}

export const containsUppercase = value => {
    return {
        isValid: /[A-Z]/.test(value), 
        message: 'Field must contain uppercase characters.'
    }
}


export const containsLowercase = value => {
    return {
        isValid: /[a-z]/.test(value), 
        message: 'Field must contain lowercase characters.'
    }
}


export const containsNumbers = value => {
    return {
        isValid: /[0-9]/.test(value), 
        message: 'Field must contain numbers.'
    }
}


export const containsSpecialChars = value => {
    return {
        isValid: /[!@#$%^&*]/.test(value), 
        message: 'Field must contain one of !@#$%^&*.'
    }
}

export const hasLengthBetween = (value, min, max,  ) => {
    return {
        isValid: value.length >= min && value.length <= max, 
        message: `Field length must be between ${min} and ${max}.`
    }
}

export const hasMinLength = (value, min,  ) => {
    return {
        isValid: value.length >= min, 
        message: `Length must be at least ${min} characters.`
    }
}


export const mustMatch = (value, matchField, match, ) => {
    return {
        isValid: value === match, 
        message: `Must match ${matchField}`
    }
}





