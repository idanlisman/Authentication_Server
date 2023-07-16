import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const UsersPage = () => {

    const path = useLocation();
    const { username } = useParams();
    const [password, setPassword] = useState('Loading');

    useEffect(() => {
        getUserData()
    }, [path])

    async function getUserData() {
        const token = cookies.get('token');
        await axios.get(`http://localhost:3002/v1/auth/users/${username}`, { withCredentials: true })
            .then(res => {
                setPassword(res.data.password);
            })
            .catch(() => {
                setPassword('Not Found');
            })
    }

    return (
        <div>
            <p>{password}</p>
        </div>
    );
}

export default UsersPage;