import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import Home from '@/pages/index';


beforeEach(() => {
    render(<Home />)
})

describe("Home", () => {
    mockRouter.push("/dogs")
    it("renders", () => {
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
    });

    it("renders a heading", () => {
        const banner = screen.getByText("Welcome to");
        expect(banner).toBeInTheDocument();
    })

    it("renders steps section", () => {
        const steps = screen.getByText("Step One");
        expect(steps).toBeInTheDocument();
    })

    it("renders a login form", () => {
        const login = screen.getByLabelText("Email:");
        expect(login).toBeInTheDocument();
    })
})