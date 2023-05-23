import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom';
import Filters from '@/components/Filters';
import { SetStateAction, Dispatch } from 'react';

function setup(jsx: any) {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}

const setShowFilters: Dispatch<SetStateAction<boolean>> = () => {}
const confirmFilters = async () => {}

beforeEach(() => {
    render(
    <Filters
        location={{ lat: 41.8776203, lon: -87.6299944023091 }}
        showFilters={true}
        setShowFilters={setShowFilters}
        breeds={[
            { name: "Border Collie", selected: false },
            { name: "Shih-Tzu", selected: false },
            { name: "German Shepard", selected: false }
        ]}
        ageRange={[0, 100]}
        distance={20}
        confirmFilters={confirmFilters}
    />)
})

describe("Filters component", () => {
    it("renders", () => {
        const header = screen.getByRole("button", { name: "close svg" })
        expect(header).toBeInTheDocument();
    })

    it("renders an input for distance", () => {
        const distance = screen.getByRole("combobox", { name: "Distance" })
        expect(distance).toBeInTheDocument();
    })

    it("renders both inputs for age range", () => {
        const ageMin = screen.getByRole("spinbutton", { name: "Min Age"})
        const ageMax = screen.getByRole("spinbutton", { name: "Max Age"})
        expect(ageMin).toBeInTheDocument();
        expect(ageMax).toBeInTheDocument();
    })

    it("renders a button that will render the list of breeds when selected", () => {
        const breedsBtn = screen.getByRole("button", { name: "Select Breeds" });
        expect(breedsBtn).toBeInTheDocument();
    })

    it("renders a list of breeds when the \"Select Breeds\" button is clicked", async () => {
        const { user } = setup(
        <Filters
            location={{ lat: 41.8776203, lon: -87.6299944023091 }}
            showFilters={true}
            setShowFilters={setShowFilters}
            breeds={[
                { name: "Border Collie", selected: false },
                { name: "Shih-Tzu", selected: false },
                { name: "", selected: false }
            ]}
            ageRange={[0, 100]}
            distance={20}
            confirmFilters={confirmFilters}
        />)
        await user.click(screen.getAllByRole("button", { name: "Select Breeds" })[0])
        const breedsBox = screen.getByLabelText("Shih-Tzu")
        expect(breedsBox).toBeInTheDocument();
    })

    it("submits the form when the submit button is clicked", async () => {
        const mockSave = jest.fn();
        const { user } = setup(
        <Filters
            location={{ lat: 41.8776203, lon: -87.6299944023091 }}
            showFilters={true}
            setShowFilters={setShowFilters}
            breeds={[
                { name: "Border Collie", selected: false },
                { name: "Shih-Tzu", selected: false },
                { name: "", selected: false }
            ]}
            ageRange={[0, 100]}
            distance={20}
            confirmFilters={confirmFilters}
            saveData={mockSave}
        />)
        await user.click(screen.getAllByRole("button", { name: "Submit" })[1])
        expect(mockSave).toBeCalled();
    })
})