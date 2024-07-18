import jwtDecode from "jwt-decode";

function getUserIdFromToken() {

    const token = localStorage.getItem("token");

    if(token) {
        const decodedToken = jwtDecode(token);

        const userId = decodedToken.id || decodedToken.userId;

        return userId;
    }

    return null;
}