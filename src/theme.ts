// theme.ts
import { MantineThemeOverride} from '@mantine/core';

const theme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif', // Set your preferred font family
  primaryColor: 'blue', // You can change the primary color

  colors: {
    // Customize primary color shades (blue is default)
    'blue': [
      '#E3F2FD', // lightest shade
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3', // primary shade
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1', // darkest shade
    ],
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px', // Default font size
    lg: '18px',
    xl: '20px',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif', // Same font for headings
    sizes: {
      h1: { fontSize: '32px', fontWeight: '700' },
      h2: { fontSize: '28px', fontWeight: '600' },
      h3: { fontSize: '24px', fontWeight: '500' },
    },
  },

  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
};

export default theme;