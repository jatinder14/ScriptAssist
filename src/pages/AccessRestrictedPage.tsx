import React from 'react';
import { Button, Container, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const AccessRestrictedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title order={2} c="red">Access Restricted</Title>
      <Text size="md" mt="md">
        You do not have access to this page. Please log in with valid credentials.
      </Text>
      <Button onClick={() => navigate('/login')} mt="lg">
        Go to Login Page
      </Button>
    </Container>
  );
};

export default AccessRestrictedPage;