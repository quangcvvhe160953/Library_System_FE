import React from 'react'
    const CustomFormGroup = ({ controlId, label, name, type, placeholder, required, error, children }) => {
        return (
          <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            {error && <Alert variant="danger">{error}</Alert>}
            {children ? (
              <Form.Control name={name} type={type} placeholder={placeholder} required={required}>
                {children}
              </Form.Control>
            ) : (
              <Form.Control name={name} type={type} placeholder={placeholder} required={required} />
            )}
          </Form.Group>
        );
      };
 

export default CustomFormGroup