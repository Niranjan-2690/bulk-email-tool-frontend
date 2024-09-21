import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div>
            <div className="registration-container">
                <h2>Register</h2>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post('https://bulk-email-tool-backend-zgvf.onrender.com/api/auth/register', {
                            email: values.email,
                            password: values.password,
                        })
                        .then((response) => {
                            console.log('Success:', response.data);
                            if (response.data.error) {
                                alert(`Error: ${response.data.error}`);
                            } else {
                                alert('User registered successfully');
                                navigate('/'); // Redirect to the login screen
                            }
                            setSubmitting(false);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            alert('Error during registration');
                            setSubmitting(false);
                        });
                    }}
                >
                    <Form className="registration-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        <div>
                            <p>already an registered user <a href='/'>click here to login</a></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RegistrationForm;
