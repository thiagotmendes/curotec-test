const React = require('react');
require('@testing-library/jest-dom');

// Mock do Inertia
jest.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      auth: {
        user: null
      }
    }
  }),
  Link: ({ children, ...props }) => React.createElement('a', props, children),
  useForm: (initialData) => ({
    data: initialData,
    setData: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn()
  })
}));

// Mock do Ziggy
jest.mock('ziggy-js', () => ({
  route: () => '#'
})); 