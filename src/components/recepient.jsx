import { useState } from 'react';
import axios from 'axios';

const CreateRecipientList = () => {
    const [name, setName] = useState('');
    const [recipients, setRecipients] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/recipient-lists', {
                name,
                recipients: recipients.split('\n').map(email => email.trim()).filter(email => email.length > 0)
            });
            setMessage('Recipient list created successfully!');
            setName('');
            setRecipients('');
        } catch (error) {
            console.error('Error creating recipient list:', error);
            setMessage('Error creating recipient list.');
        }
    };
    

    return (
        <div className="create-recipient-list-container">
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
                        rows="10"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create List</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateRecipientList;
