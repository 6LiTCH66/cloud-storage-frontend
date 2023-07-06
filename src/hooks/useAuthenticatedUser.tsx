import { useQuery } from 'react-query';
import {UserAuthentication} from "../types/UserAuthentication";
import {get_user, login} from "../http/userAPI";
const UseAuthenticatedUser = () => {
    const { data: user, isLoading } = useQuery('user', get_user, {
        retry: 0
    });

    return {
        user,
        isLoading,
        isAuthenticated: Boolean(user),
    };
}

export default UseAuthenticatedUser;