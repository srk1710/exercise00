import { render, screen } from '@testing-library/react';
import { CodeDisplay } from '../CodeDisplay';


describe('CodeDisplay component', () => {
    it('renders with code prop', () => {
        render(<CodeDisplay code="1234ABC" />);

        expect(screen.getByText('Live')).toBeInTheDocument();

        expect(screen.getByText('Your Code Now:')).toBeInTheDocument();
        expect(screen.getByText('1234ABC')).toBeInTheDocument();

        expect(screen.queryByText(' --')).toBeNull();
    });

    it('renders with no code', () => {
        render(<CodeDisplay code={null} />);

        expect(screen.getByText('Live')).toBeInTheDocument();

        expect(screen.getByText('Your Code Now:')).toBeInTheDocument();

        expect(screen.getByText('--')).toBeInTheDocument();
    });
});
