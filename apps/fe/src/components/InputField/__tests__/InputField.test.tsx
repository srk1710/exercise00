import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../InputField';

describe('InputField component', () => {
    it('renders with correct label and value', () => {
        render(<InputField label="Username" value="testuser" onChange={() => { }} />);

        expect(screen.getByText('Username')).toBeInTheDocument();

        expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    });

    it('updates value when user types', () => {
        const handleChange = jest.fn();
        render(<InputField label="Username" value="testuser" onChange={handleChange} />);

        const input = screen.getByDisplayValue('testuser');
        fireEvent.change(input, { target: { value: 'newuser' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('displays the placeholder text when no value is provided', () => {
        render(<InputField label="Username" value="" onChange={() => { }} placeholder="Enter username" />);

        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    });

    it('renders the input field as disabled when disabled prop is true', () => {
        render(<InputField label="Username" value="testuser" onChange={() => { }} disabled />);

        const input = screen.getByDisplayValue('testuser');
        expect(input).toBeDisabled();
    });

    it('limits the input value to maxLength', () => {
        render(<InputField label="Username" value="testuser" onChange={() => { }} maxLength={10} />);

        const input = screen.getByDisplayValue('testuser');
        expect(input).toHaveAttribute('maxLength', '10');
    });
});
