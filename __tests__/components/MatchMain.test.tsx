import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import MatchMain from '@/components/MatchMain';
import { Dog } from '@/lib/fetch_sdk';

const dog: Dog = {
    id: "1234",
    img: "/svgs/checkmark.svg",
    name: "Bob",
    age: 4,
    zip_code: "60606",
    breed: "Lab"
}

describe("MatchMain component", () => {
    it("renders", () => {
        render(<MatchMain dog={dog}  />)
        const indicator = screen.getByRole("banner");
        expect(indicator).toBeInTheDocument();
    })

    it("properly renders the data", () => {
        render(<MatchMain dog={dog} />);
        const anAges: Array<number> = [8, 11, 18]

        const image = screen.getByRole("img");
        const message = screen.getByText(`${dog.name} is ${anAges.indexOf(dog.age) > -1 ? "an": "a"} ${dog.age} year old ${dog.breed} who lives in the ${dog.zip_code} area, and can't wait to meet you!`)

        expect(image).toHaveAccessibleName(dog.name);
        expect(message).toBeInTheDocument();
    })
})