import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  Divider,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Avatar
} from '@mui/material';
import {
  Login as LoginIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const AuthenticationPage = ({ 
  onLogin = () => {}, 
  authMode = 'login',
  navigateTo = () => {},
  showHeader = true,
  showFooter = true
}) => {
  // Auth mode state (login, register, forgotPassword)
  const [mode, setMode] = useState(authMode);
  
  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  
  // Error and notification states
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
    
    // Clear errors for the field being edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.email) errors.email = 'Lūdzu, ievadiet e-pastu';
    if (!formData.password) errors.password = 'Lūdzu, ievadiet paroli';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // Simulate successful login - in a real app this would check credentials with backend
      // For now, we'll just simulate a successful login
      const user = {
        name: 'Lietotājs',
        email: formData.email,
        token: 'sample-jwt-token',
        preferences: {
          darkMode: false,
          language: 'lv'
        }
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Show success message
      setNotification({
        open: true,
        message: 'Pieslēgšanās veiksmīga',
        severity: 'success'
      });
      
      // Call the login callback
      onLogin(user);
      
      // Navigate to homepage after a delay
      setTimeout(() => {
        navigateTo('home');
      }, 1000);
      
      setLoading(false);
    }, 1500);
  };
  
  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.name) errors.name = 'Lūdzu, ievadiet vārdu';
    if (!formData.email) errors.email = 'Lūdzu, ievadiet e-pastu';
    if (!formData.password) errors.password = 'Lūdzu, ievadiet paroli';
    if (formData.password && formData.password.length < 8) {
      errors.password = 'Parolei jābūt vismaz 8 simbolus garai';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Paroles nesakrīt';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // Simulate successful registration
      setLoading(false);
      
      // Show success message
      setNotification({
        open: true,
        message: 'Reģistrācija veiksmīga! Jūs varat pieslēgties.',
        severity: 'success'
      });
      
      // Switch to login mode
      setTimeout(() => {
        setMode('login');
      }, 2000);
    }, 1500);
  };
  
  // Handle password reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.email) errors.email = 'Lūdzu, ievadiet e-pastu';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // Simulate successful password reset request
      setLoading(false);
      
      // Show success message
      setNotification({
        open: true,
        message: 'Paroles atjaunošanas saite ir nosūtīta uz jūsu e-pastu',
        severity: 'success'
      });
      
      // Switch to login mode after a delay
      setTimeout(() => {
        setMode('login');
      }, 3000);
    }, 1500);
  };
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Switch authentication mode
  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setFormErrors({});
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };
  
  // Render login form
  const renderLoginForm = () => (
    <Box component="form" onSubmit={handleLogin} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-pasta adrese"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Parole"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <FormControlLabel
          control={
            <Checkbox 
              value="remember" 
              color="primary" 
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
          }
          label="Atcerēties mani"
        />
        <Button
          variant="text"
          size="small"
          onClick={() => handleSwitchMode('forgotPassword')}
        >
          Aizmirsi paroli?
        </Button>
      </Box>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
        startIcon={<LoginIcon />}
      >
        {loading ? 'Notiek pieslēgšanās...' : 'Pieslēgties'}
      </Button>
      
      <Divider sx={{ my: 2 }}>vai</Divider>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => alert('Google pieslēgšanās pagaidām nav pieejama')}
          >
            Google
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={() => alert('Facebook pieslēgšanās pagaidām nav pieejama')}
          >
            Facebook
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Nav konta?{' '}
          <Link 
            href="#" 
            variant="body2"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchMode('register');
            }}
          >
            Reģistrēties
          </Link>
        </Typography>
      </Box>
    </Box>
  );
  
  // Render registration form
  const renderRegisterForm = () => (
    <Box component="form" onSubmit={handleRegister} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Vārds, Uzvārds"
        name="name"
        autoComplete="name"
        autoFocus
        value={formData.name}
        onChange={handleInputChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-pasta adrese"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Parole"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Apstiprināt paroli"
        type={showPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!formErrors.confirmPassword}
        helperText={formErrors.confirmPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Notiek reģistrācija...' : 'Reģistrēties'}
      </Button>
      
      <Divider sx={{ my: 2 }}>vai</Divider>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => alert('Google reģistrācija pagaidām nav pieejama')}
          >
            Google
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={() => alert('Facebook reģistrācija pagaidām nav pieejama')}
          >
            Facebook
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Jau ir konts?{' '}
          <Link 
            href="#" 
            variant="body2"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchMode('login');
            }}
          >
            Pieslēgties
          </Link>
        </Typography>
      </Box>
    </Box>
  );
  
  // Render forgot password form
  const renderForgotPasswordForm = () => (
    <Box component="form" onSubmit={handleResetPassword} noValidate>
      <Typography variant="body1" gutterBottom>
        Ievadiet savu e-pasta adresi, un mēs nosūtīsim jums saiti, lai atjaunotu paroli.
      </Typography>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-pasta adrese"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Notiek nosūtīšana...' : 'Nosūtīt atjaunošanas saiti'}
      </Button>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => handleSwitchMode('login')}
        >
          Atpakaļ uz pieslēgšanos
        </Button>
      </Box>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            {mode === 'login' && <LoginIcon fontSize="large" />}
            {mode === 'register' && <PersonIcon fontSize="large" />}
            {mode === 'forgotPassword' && <LockIcon fontSize="large" />}
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {mode === 'login' && 'Pieslēgties'}
            {mode === 'register' && 'Reģistrēties'}
            {mode === 'forgotPassword' && 'Atjaunot paroli'}
          </Typography>
          
          {mode === 'login' && renderLoginForm()}
          {mode === 'register' && renderRegisterForm()}
          {mode === 'forgotPassword' && renderForgotPasswordForm()}
        </Paper>
      </Container>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthenticationPage;