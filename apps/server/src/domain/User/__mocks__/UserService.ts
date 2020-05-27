/* global jest */

export const mockGetEncryptedPassword = jest.fn((input) => input);

const mock = jest.fn().mockImplementation(() => {
  return {};
});
(mock as any).getEncryptedPassword = mockGetEncryptedPassword;

export default mock;
