import { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        // Fetch templates from server
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/templates');
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/templates', { name, subject, body });
            setTemplates([...templates, response.data]);
            setName('');
            setSubject('');
            setBody('');
        } catch (error) {
            console.error('Error creating template:', error);
        }
    };

    return (
        <div className="template-manager">
            <h2 className="header">Template Manager</h2>
            <form onSubmit={handleCreate} className="template-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Create Template</button>
            </form>
            <h3 className="existing-templates">Existing Templates</h3>
            <ul className="templates-list">
                {templates.map(template => (
                    <li key={template._id} className="template-item">
                        <strong>{template.name}</strong> - {template.subject}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateManager;
