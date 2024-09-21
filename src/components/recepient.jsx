import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const CreateRecipientList = () => {
    const [name, setName] = useState('');
    const [recipients, setRecipients] = useState('');
    const [recipientLists, setRecipientLists] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRecipientLists = async () => {
            try {
                const response = await axios.get('https://bulk-email-tool-backend-zgvf.onrender.com/api/recipient-lists');
                setRecipientLists(response.data);
            } catch (error) {
                console.error('Error fetching recipient lists:', error);
                setMessage('Error fetching recipient lists.');
            }
        };

        fetchRecipientLists();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://bulk-email-tool-backend-zgvf.onrender.com/api/recipient-lists', {
                name,
                recipients: recipients.split('\n').map(email => email.trim()).filter(email => email.length > 0)
            });
            setMessage('Recipient list created successfully!');
            setName('');
            setRecipients('');

            // Refetch the recipient lists after creating a new one
            const response = await axios.get('https://bulk-email-tool-backend-zgvf.onrender.com/api/recipient-lists');
            setRecipientLists(response.data);

        } catch (error) {
            console.error('Error creating recipient list:', error);
            setMessage('Error creating recipient list.');
        }

        setTimeout(() => setMessage(''), 3000);
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
                <div className='content'>
                <h2>Create Recipient List</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">List Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipients">Recipient Emails (one per line):</label>
                        <textarea
                            id="recipients"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            className="form-control"
                            rows="5"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create List</button>
                </form>

                {/* Displaying recipient lists in a table */}
                <table className="templates-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Recipient List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipientLists.map(list => (
                            <tr key={list._id}>
                                <td>{list.name}</td>
                                <td>
                                    <ul>
                                        {list.recipients.map((email, index) => (
                                            <li key={index}>{email}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Tooltip for success message */}
                {message && (
                    <div className={`tooltip ${message ? 'visible' : ''}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateRecipientList;
