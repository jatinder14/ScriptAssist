import React from 'react';
import { Button, Title, Text, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

      <Stack align='flex-start' style={{ position: 'relative', zIndex: 1, paddingTop: '10rem', paddingLeft:'4rem' }}>
        <Title order={1}>
          Welcome to <span style={{ color: '#2196F3' }}>Script Assist</span>
        </Title>
        <Text size="lg" c="dimmed">
          An attempt to impress you with my frontend skills, every step of the way.
        </Text>
        <Button size="lg" onClick={handleOnClick} color="blue" > 
          Login Now
        </Button>
      </Stack>
    </div>
  );
};

export default HomePage;