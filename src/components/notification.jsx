import { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = ({ message, type }) => {
    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

const EmailStatusNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://bulk-email-tool-backend-zgvf.onrender.com/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    return (
        <div className="notifications-container">
            {notifications.map((notif, index) => (
                <Notification key={index} message={notif.message} type={notif.type} />
            ))}
        </div>
    );
};

export default EmailStatusNotifications;
