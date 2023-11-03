import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import CircularProgress from '@mui/material/CircularProgress';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, GoogleProvider, GithubProvider } from '../utilities/firebase';
import TextFormField from '../components/textField';
import Template from '../components/template';

/**
 * UI Component Styles
 */
const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '10px',
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  color: theme.palette.secondary.light,
  textAlign: 'center',
  marginBottom: '10px',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  margin: theme.spacing(2),
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

/**
 * Validation Schemas
 */
const registrationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Please enter a username')
    .max(15, 'Please enter a shorter username')
    .required('Please provide a valid username'),

  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter a shorter email address')
    .required('Please provide an email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password field is required'),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter a valid email address')
    .required('Please provide an email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
});

const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter a valid email address')
    .required('Please provide an email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
});

/**
 * Form Components
 */
// Registration Form
const RegistrationForm = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextFormField
        id='username'
        label='Username'
        name='username'
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.username}
        error={formik.errors.username}
      />
      <TextFormField
        id='email'
        label='Email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
        error={formik.errors.email}
      />
      <TextFormField
        id='password'
        label='Password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
        error={formik.errors.password}
      />
      <TextFormField
        id='confirmPassword'
        label='Confirm Password'
        name='confirmPassword'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.confirmPassword}
        error={formik.errors.confirmPassword}
      />
      <StyledButton type='submit' variant='contained' fullWidth>
        {loading ? 'Registering...' : 'Sign Up'}
      </StyledButton>
    </form>
  );
};

// Login Form Component
const LoginForm = ({
  onSubmit,
  onForgotPassword,
  loading,
  handleSignInWithGithub,
  handleSignInWithGoogle,
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextFormField
        id='email'
        label='Email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
        error={formik.errors.email}
      />
      <TextFormField
        id='password'
        label='Password'
        name='password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
        error={formik.errors.password}
      />
      <StyledButton type='submit' variant='contained' fullWidth>
        {loading ? 'Logging In' : 'Login'}
      </StyledButton>
      <Divider
        sx={{
          height: '2px',
          backgroundColor: '#c8b5a7',
        }}
        variant='fullWidth'
      />
      <Box textAlign='center' sx={{ my: 2 }}>
        <StyledTypography>OR</StyledTypography>
        <StyledTypography>Sign in using</StyledTypography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledIconButton onClick={handleSignInWithGoogle}>
          <GoogleIcon />
        </StyledIconButton>
        <StyledIconButton onClick={handleSignInWithGithub}>
          <GitHubIcon />
        </StyledIconButton>
      </Box>
      <StyledTypography>
        <Link onClick={onForgotPassword}>Forgot Password</Link>
      </StyledTypography>
    </form>
  );
};

// Reset Form Component
const ResetPasswordForm = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextFormField
        id='email'
        label='Email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
        error={formik.errors.email}
      />
      <StyledButton type='submit' variant='contained' fullWidth>
        {loading ? 'Sending Reset Email' : 'Send Reset Email'}
      </StyledButton>
    </form>
  );
};

const UserAuth = () => {
  // For toggling forms
  const [formType, setFormType] = useState('login');
  // For toggling between loading states
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Authorization functions
   */
  // Register a user
  const handleRegister = ({ username, email, password }) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((res) => {
        updateProfile(res.user, { displayName: username }).then(() => {
          navigate('/play');
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
      });
  };
  // Login
  const handleSignIn = ({ email, password }) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/play');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
      });
  };
  // Reset Password
  const handleResetPassword = ({ email }) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setFormType('login'); // Switch back to login after sending reset email
        setLoading(false);
        console.log(res);
        toast.success('Email is sent successfully, if user exists');
      })
      .catch((error) => {
        toast.error(error?.code);
        setLoading(false);
      });
  };

  // Google Sign In
  const handleSignInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/play');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
        console.log(error);
      });
  };

  // Github Sign In
  const handleSignInWithGithub = () => {
    setLoading(true);
    signInWithPopup(auth, GithubProvider)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/play');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.code);
        console.log(error);
      });
  };

  const renderForm = () => {
    switch (formType) {
      case 'registration':
        return (
          <Box sx={{ width: '270px' }}>
            <RegistrationForm onSubmit={handleRegister} loading={loading} />
            <StyledTypography>
              <Link onClick={() => setFormType('login')}>
                Already a user? Login here
              </Link>
            </StyledTypography>
          </Box>
        );
      case 'resetPassword':
        return (
          <Box sx={{ width: '270px' }}>
            <ResetPasswordForm
              onSubmit={handleResetPassword}
              loading={loading}
            />
            <StyledTypography>
              <Link onClick={() => setFormType('login')}>Back to login</Link>
            </StyledTypography>
          </Box>
        );
      case 'login':
      default:
        return (
          <Box sx={{ width: '270px' }}>
            <LoginForm
              onSubmit={handleSignIn}
              onForgotPassword={() => setFormType('resetPassword')}
              loading={loading}
              handleSignInWithGoogle={handleSignInWithGoogle}
              handleSignInWithGithub={handleSignInWithGithub}
            />
            <StyledTypography>
              <Link onClick={() => setFormType('registration')}>
                New User? Register Here
              </Link>
            </StyledTypography>
          </Box>
        );
    }
  };

  return (
    <>
      <ToastContainer theme='dark' />
      <Template>
        {loading ? <CircularProgress color='secondary' /> : renderForm()}
      </Template>
    </>
  );
};

export default UserAuth;
