import {jwtDecode} from 'jwt-decode';

// Function to decode the token and get the user ID
export const getUserIdFromToken = (token) => {
    try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        // Assuming your token contains a field `userId` or `id`
        const user = decodedToken.user;

        return user;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};