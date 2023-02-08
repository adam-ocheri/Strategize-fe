import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
test('renders learn react link', () => {
    const { getByText } = render(_jsx(Provider, { store: store, children: _jsx(App, {}) }));
    expect(getByText(/learn/i)).toBeInTheDocument();
});
