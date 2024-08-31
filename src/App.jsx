import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./components/loginform";
import RegistrationForm from './components/registrationform';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import SendEmails from './components/sendemail';
import TemplateManager from './components/emailtemplateeditor';
import CreateRecipientList from './components/recepient';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/editor" element={<TemplateManager />} />
                <Route path="/sendmails" element={<SendEmails />} />
                <Route path="/recepient" element={<CreateRecipientList />} />
            </Routes>
        </Router>
    );
};

export default App;
