import { render, screen, act, cleanup } from '@testing-library/react'
import ReactDOM from 'react-dom/client';
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom';
import DogsSection from '@/components/DogsSection';
import { SetStateAction, Dispatch } from 'react';
import { Dog } from '@/lib/fetch_sdk';

const DogsInfo: Array<Dog> = [
    {
        id: "abcda",
        img: "/img",
        name: "Fido",
        age: 7,
        zip_code: "60606",
        breed: "German Shepard"
    },
    {
        id: "abcdb",
        img: "/img",
        name: "Bob",
        age: 7,
        zip_code: "60606",
        breed: "German Shepard"
    },
    {
        id: "abcdc",
        img: "/img",
        name: "Sam", 
        age: 7,
        zip_code: "60606",
        breed: "German Shepard"
    },
    
]

describe("dog card component", () => {
    it("renders dog cards when loadingDogs is false", () => {
        render(
        <DogsSection
            loadingDogs={false}
            dogs={DogsInfo}
            favorites={[]}
            handleFavorites={() => {}}
        />)
        const dogsSection = screen.getAllByRole("heading")
        expect(dogsSection).toHaveLength(3);
    });

    it("renders loader when loadingDogs is true", () => {
        render(
        <DogsSection
            loadingDogs={true}
            dogs={DogsInfo}
            favorites={[]}
            handleFavorites={() => {}}
        />)
        const loader = screen.getByRole("status")
        expect(loader).toBeInTheDocument();
    })
})