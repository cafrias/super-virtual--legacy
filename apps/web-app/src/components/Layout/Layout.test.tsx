/* eslint-disable object-curly-newline */
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import Layout from './Layout';
import reduxWrapper from '../../utils/test/reduxWrapper';
import routerWrapper from '../../utils/test/routerWrapper';

describe('Layout', () => {
  it('mounts correctly', async () => {
    const ctx = render(reduxWrapper(routerWrapper(<Layout />)));

    // Mounts collapsed
    const homeButton = ctx.queryByText('Inicio');
    expect(homeButton).toBeNull();
  });

  it('expands', async () => {
    const ctx = render(reduxWrapper(routerWrapper(<Layout />)));

    const toggleCollapseButton = await ctx.findByTestId('toggle_collapse');

    act(() => {
      fireEvent.click(toggleCollapseButton);
    });

    await waitFor(() => {
      const homeButton = ctx.queryByText('Inicio');
      expect(homeButton).not.toBeNull();
      expect(homeButton).toBeInTheDocument();
    });
  });
});
