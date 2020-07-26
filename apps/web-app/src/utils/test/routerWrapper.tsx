// test-utils.js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export default function routerWrapper(children?: React.ReactNode) {
  return <MemoryRouter>{children}</MemoryRouter>;
}
