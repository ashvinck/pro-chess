import React from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// For Error Messages
const StyledTypography = styled(Typography)(() => ({
  color: '#ff6363',
  wordWrap: 'break-word',
  fontSize: 'small',
  maxWidth: '250px',
  textAlign: 'center',
}));

// Text Field for all input fields
const TextFormField = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
}) => {
  return (
    <>
      <TextField
        required
        type='text'
        variant='outlined'
        margin='dense'
        color='secondary'
        id={id}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        focused
        sx={{ my: 2 }}
      />
      {touched && error && <StyledTypography>{error}</StyledTypography>}
    </>
  );
};

export default TextFormField;
