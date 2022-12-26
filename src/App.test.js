import React from 'react';
import renderWithProviders from './test-utils/renderWithProviders';
import { act } from '@testing-library/react';

import App from './App';

describe('App', () => {
    it('Renders without crashing', async () => {
        await expect(
            act(() => {
                renderWithProviders(<App />);
            })
        ).resolves.not.toThrow();
    });
});
