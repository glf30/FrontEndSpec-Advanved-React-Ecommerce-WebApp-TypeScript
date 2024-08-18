import { useState } from 'react';
import axios from 'axios';

export const useVerifyUser = () => {
    const [verifiedUser, setVerifiedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // to simulate a authentication i get all of the accounts info and 
    // then filter it by the user and pass to verify the user

    const verifyUser = async (account) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://127.0.0.1:5000/customeraccounts');
            // console.log(response.data)
            // Verify the user
            const user = response.data.find(
                user => user.username === account.user && user.password === account.pass
            );
            console.log(user)
            setVerifiedUser(user || null);
            if (!user) {
                setError("Invalid username or password.");
            }

        } catch (error) {
            setError("Error fetching accounts");
        } finally {
            setLoading(false);
        }
    };

    return { verifyUser, verifiedUser, loading, error };
};
