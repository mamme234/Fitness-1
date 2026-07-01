import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hash a plain text password
 */
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (
    password,
    hashedPassword
) => {
    return await bcrypt.compare(
        password,
        hashedPassword
    );
};

/**
 * Check password strength
 */
export const validatePassword = (password) => {

    if (!password) {
        return {
            valid: false,
            message: "Password is required."
        };
    }

    if (password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters."
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain an uppercase letter."
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain a lowercase letter."
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain a number."
        };
    }

    return {
        valid: true,
        message: "Strong password."
    };
};
