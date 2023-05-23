import { render, screen, act, cleanup } from '@testing-library/react'
import ReactDOM from 'react-dom/client';
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom';
import DogCard from '@/components/shared-ui/DogCard';
import { SetStateAction, Dispatch } from 'react';
import { Dog } from '@/lib/fetch_sdk';

const DogInfo: Dog = {
    id: "abcde",
    img: "/img",
    name: "Fido",
    age: 7,
    zip_code: "60606",
    breed: "German Shepard"
}

beforeEach(() => {
    render(
    <DogCard
        id={DogInfo.id}
        img={DogInfo.img}
        name={DogInfo.name}
        age={DogInfo.age}
        zip_code={DogInfo.zip_code}
        breed={DogInfo.breed}
        favorites={[]}
        handleFavorites={() => {}}
    />
    )
})

describe("dog card component", () => {
    it("renders", () => {
        const nameHeading = screen.getByRole("heading", { name: DogInfo.name })
        expect(nameHeading).toBeInTheDocument();
    });
})