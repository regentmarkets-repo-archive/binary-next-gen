export const isValidEmail = email =>
    /\S+@\S+\.\S+/.test(email);

export const isValidPassword = (pw1, pw2) => ((pw1 === pw2) && (pw1.length > 6));
