import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (<div>
                <div className="login-container">
                    <h2>Login</h2>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            password: Yup.string()
                                .min(6, 'Password must be at least 6 characters')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            axios.post('http://localhost:3000/api/auth/login', {
                                email: values.email,
                                password: values.password,
                            })
                            .then((response) => {
                                console.log('Login successful:', response.data);
                                if (response.data.error) {
                                    alert(`Error: ${response.data.error}`);
                                } else {
                                    alert('Login successful');
                                    resetForm()
                                    navigate('/editor'); // Redirect to the email page
                                }
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                console.error('Error during login:', error);
                                alert('Invalid username or password');
                                setSubmitting(false);
                                resetForm()
                            });
                        }}
                    >
                        <Form className="login-form">
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
                            <div>
                                <p>click here for <Link to="/register">new user registration</Link></p>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        
    );
};

export default LoginForm;
