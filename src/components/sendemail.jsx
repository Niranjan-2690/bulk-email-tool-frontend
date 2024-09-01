import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Notification = ({ message, type, visible }) => {
    return (
        <div className={`notification ${type} ${visible ? 'visible' : ''}`}>
            {message}
        </div>
    );
};

const SendEmails = () => {
    const [templates, setTemplates] = useState([]);
    const [templateId, setTemplateId] = useState('');
    const [recipientListId, setRecipientListId] = useState('');
    const [recipientLists, setRecipientLists] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/templates');
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
                alert('Error fetching templates');
            }
        };

        const fetchRecipientLists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/recipient-lists');
                setRecipientLists(response.data);
            } catch (error) {
                console.error('Error fetching recipient lists:', error);
                alert('Error fetching recipient lists');
            }
        };

        fetchTemplates();
        fetchRecipientLists();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    useEffect(() => {
        // Automatically hide notifications after 5 seconds
        const timeoutIds = notifications.map((notif, index) => 
            setTimeout(() => {
                setNotifications(prevNotifications => 
                    prevNotifications.filter((_, i) => i !== index)
                );
            }, 5000)
        );

        return () => timeoutIds.forEach(clearTimeout);
    }, [notifications]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/send', {
                templateId,
                recipientListId,
            });
            setNotifications(prevNotifications => [
                ...prevNotifications,
                { message: 'Emails sent successfully', type: 'success', visible: true }
            ]);
        } catch (error) {
            console.error('Error sending emails:', error);
            setNotifications(prevNotifications => [
                ...prevNotifications,
                { message: 'Error sending emails', type: 'error', visible: true }
            ]);
        }
    };

    return (
        <div>
            <div className='sidebar'>
                <ul>
                    <li><Link to="/editor">Create Template</Link></li>
                    <li><Link to="/recepient">Create Recepient</Link></li>
                    <li><Link to="/sendmails">Send Mail</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>
            <div className="send-emails-container content">
                <h2>Send Mass Emails</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="template-id">Select Template:</label>
                        <select
                            id="template-id"
                            name="templateId"
                            value={templateId}
                            onChange={(e) => setTemplateId(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">Select a template</option>
                            {templates.map(template => (
                                <option key={template._id} value={template._id}>{template.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-list-id">Select Recipient List:</label>
                        <select
                            id="recipient-list-id"
                            name="recipientListId"
                            value={recipientListId}
                            onChange={(e) => setRecipientListId(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">Select a recipient list</option>
                            {recipientLists.map(list => (
                                <option key={list._id} value={list._id}>{list.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Emails</button>
                </form>
                <div className="notifications-container">
                    {notifications.map((notif, index) => (
                        <Notification
                            key={index}
                            message={notif.message}
                            type={notif.type}
                            visible={notif.visible}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SendEmails;
