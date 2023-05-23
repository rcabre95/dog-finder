import { render, screen, cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import LoginForm from '@/components/LoginForm';

afterEach(cleanup);

jest.mock('next/router', () => require('next-router-mock'));

function setup(jsx: any) {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}

describe("Login Form", () => {
    it("renders a heading", () => {
        render(<LoginForm />)
        const loginForm = screen.getByRole("heading", { name: "Login" });
        expect(loginForm).toBeInTheDocument();
    });

    it("renders all form components", () => {
        render(<LoginForm />)
        const nameInput = screen.getByRole("textbox", { name: "Name:" })
        const emailInput = screen.getByRole("textbox", { name: "Email:"})
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    it("validates the name field", async () => {
        const mockSave = jest.fn();
        const { user } = setup(<LoginForm />);
        await user.type(
            screen.getByRole("textbox", { name: "Name:" }),
            "Bo"
        )
        await user.type(
            screen.getByRole("textbox", { name: "Email:" }),
            "Bob@bob.com"
        )
        await user.click( screen.getByRole("button") );

        expect(mockSave).not.toBeCalled();
    });

    it("validates the email field", async () => {
        const mockSave = jest.fn();
        const { user } = setup(<LoginForm />)
        await user.type(
            screen.getByRole("textbox", { name: "Name:" }),
            "Bob"
        )
        await user.type(
            screen.getByRole("textbox", { name: "Email:" }),
            "Bobbob.com"
        )
        await user.click(screen.getByRole("button"));

        expect(mockSave).not.toBeCalled();
    });

    it("submits data when the form is valid", async () => {
        const mockSave = jest.fn();
        const { user } = setup(<LoginForm saveData={mockSave} />)
        await user.type(
            screen.getByRole("textbox", { name: "Name:" }),
            "Bob"
        )
        await user.type(
            screen.getByRole("textbox", { name: "Email:" }),
            "Bob@bob.com"
        )
        await user.click(screen.getByRole("button"));

        expect(mockSave).toBeCalled();
    })

    it("sends the user to the dog page", async () => {
        mockRouter.push("/dogs")
        const { user } = setup(<LoginForm />);
        await user.click(screen.getByRole("button"));

        expect(mockRouter).toMatchObject({
            asPath: "/dogs"
        })
    })
})