export const validationInvalid = (string) => {
    return string.toString().length === 0
}

export const validationEmail = (email) => {
    if(email.length === 0){
        return true
    }
    let reg = /\S+@\S+\.\S+/
    return !reg.test(email);
}


export const validationIsNumber = (string) => {
    return !isNaN(string);
}