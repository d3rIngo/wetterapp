import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Wetter-App/i);
  expect(titleElement).toBeInTheDocument();
});
