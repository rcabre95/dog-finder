import { render, screen, cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom';
import LogoutBtn from '@/components/shared-ui/LogoutBtn';

jest.mock('next/router', () => require('next-router-mock'));

afterEach(cleanup);

function setup(jsx: any) {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}

describe("logout button", () => {
    it("renders", () => {
        render(<LogoutBtn needsConf={false} />)
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("logs out the user", async () => {
        mockRouter.push("/")
        const { user } = setup(<LogoutBtn needsConf={false} />);
        await user.click(screen.getByRole("button"));

        expect(mockRouter).toMatchObject({
            asPath: "/"
        })
    })
})