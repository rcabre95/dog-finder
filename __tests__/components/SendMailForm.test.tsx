import { render, screen, cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import SendMailForm from '@/components/SendMailForm';
import { Dog } from '@/lib/fetch_sdk';

afterEach(cleanup);

jest.mock('next/router', () => require('next-router-mock'));
window.alert = jest.fn();

function setup(jsx: any) {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}

const dog: Dog = {
    id: "1234",
    img: "/svgs/checkmark.svg",
    name: "Bob",
    age: 4,
    zip_code: "60606",
    breed: "Lab"
}

describe("Login Form", () => {
    it("renders a heading", () => {
        render(<SendMailForm dog={dog} />)
        const nameInput = screen.getByRole("textbox", { name: "Name:" });
        expect(nameInput).toBeInTheDocument();
    });

    it("renders all form components", () => {
        render(<SendMailForm dog={dog} />)
        const nameInput = screen.getByRole("textbox", { name: "Name:" })
        const emailInput = screen.getByRole("textbox", { name: "Email:"})
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    it("validates the name field", async () => {
        const mockSave = jest.fn();
        const { user } = setup(<SendMailForm dog={dog} saveData={mockSave} />);
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
        const { user } = setup(<SendMailForm dog={dog} saveData={mockSave} />)
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
        const { user } = setup(<SendMailForm dog={dog} saveData={mockSave} />)
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
        // @ts-ignore
        window.alert.mockClear();
        mockRouter.push("/")
        const { user } = setup(<SendMailForm dog={dog} />);
        await user.click(screen.getByRole("button"));
        
        expect(mockRouter).toMatchObject({
            asPath: "/"
        })
})
})