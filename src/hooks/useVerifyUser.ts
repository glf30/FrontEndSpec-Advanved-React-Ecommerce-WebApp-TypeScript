import { useState } from 'react';
import axios from 'axios';

interface Account {
    user: string;
    pass: string;
}

interface User {
    username: string;
    password: string;
    customer_id: string; 
    account_id: string;   
}

export const useVerifyUser = () => {
    const [verifiedUser, setVerifiedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Changed to string to handle error messages

    const verifyUser = async (account: Account) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<User[]>('http://127.0.0.1:5000/customeraccounts');
            const user = response.data.find(
                (user) => user.username === account.user && user.password === account.pass
            );
            setVerifiedUser(user || null);
            if (!user) {
                setError("Invalid username or password");
            }
        } catch (error: any) {
            setError(error.message || "An error occurred during verification");
        } finally {
            setLoading(false);
        }
    };

    return { verifyUser, verifiedUser, loading, error };
};
