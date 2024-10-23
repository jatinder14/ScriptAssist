
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Notification.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/PasswordInput.css';

import React, { useState } from 'react';
import { useAuthStore } from '../state/authStore';
import { TextInput, PasswordInput, Button, Loader, Notification, Container, Stack, Title, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        const mockToken = 'fakeJWTtoken';
        login(mockToken); // Update Zustand store with the token
        navigate('/missions'); // Use useNavigate to redirect
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Particle background to enhance the overall feel */}

      <Container size="xs" style={{ zIndex: 1 }}>
        <Paper
          radius="md"
          p="xl"
          withBorder
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Title
            order={1}
            style={{
              textAlign: 'center',
              color: '#2196F3',
              marginBottom: '1.5rem',
              fontSize: '2.2rem',
              fontWeight: '700',
              letterSpacing: '0.05rem',
            }}
          >
            Welcome Back!
          </Title>

          <form onSubmit={handleLogin}>
            <Stack>
              <TextInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                placeholder="Enter your username"
                size="md"
                radius="md"
                required
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter your password"
                size="md"
                radius="md"
                required
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <span>🙈</span> : <span>👁️</span>
                }
              />

              {error && (
                <Notification
                  color="red"
                  style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    marginTop: '1rem',
                  }}
                >
                  {error}
                </Notification>
              )}

              <Button
                type="submit"
                disabled={loading}
                radius="md"
                size="lg"
                fullWidth
                style={{
                  backgroundColor: '#2196F3',
                  marginTop: '1rem',
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                {loading ? <Loader size="xs" /> : 'Login'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;