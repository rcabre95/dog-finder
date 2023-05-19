
import { AgeRange, IBreed } from "@/pages/dogs";
import { useFieldArray, useForm } from "react-hook-form";
import { Transition } from "@headlessui/react";
import { SetStateAction, Dispatch, useEffect } from "react";

export function Filters({ showFilters, setShowFilters, breeds, ageRange, distance, confirmFilters }: 
    { showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>>, breeds: Array<IBreed>, ageRange: AgeRange, distance: number,
    confirmFilters: (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => Promise<void>}) {

    const { register, handleSubmit, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            breeds: breeds,
            minAge: ageRange[0],
            maxAge: ageRange[1],
            distance: distance
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "breeds"
    })

    useEffect(() => {
        console.log(breeds);
    })

    return (
        <Transition appear show={showFilters}>
            <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto z-20">
                <div className="flex flex-col min-h-full items-center justify-center p-4">
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <form className={`bg-white h-full w-5/6 z-30`}
                        onSubmit={handleSubmit(async (data) => {
                            console.log(data)
                            await confirmFilters(data.breeds, [data.minAge, data.maxAge], data.distance)
                        })}>
                            <div><button type="button" onClick={() => { setShowFilters(false) }}>x</button></div>
                            <div className={``}>
                                <label htmlFor="distanceId">Distance</label>
                                <input id="distanceId" className={``}
                                    {...register("distance", {
                                        required: "You must insert a preferred search distance.",
                                        valueAsNumber: true
                                    })}
                                    type="number"
                                />
                            </div>
                            <div>
                                <label htmlFor="minAgeId">Min Age</label>
                                <input
                                    id="minAgeId"
                                    {...register("minAge", {
                                        required: "You must enter a minimum age for your dog.",
                                        valueAsNumber: true,
                                        min: {
                                            value: 0,
                                            message: "You cannot adopt a dog that has not been born yet! Please set this value to 0 or higher."
                                        }
                                    })}
                                    type="number"
                                />
                            </div>

                            <div>
                                <label htmlFor="maxAgeId">Max Age</label>
                                <input
                                    id="maxAgeId"
                                    {...register("maxAge", {
                                        required: "You must enter a minimum age for your dog.",
                                        valueAsNumber: true,
                                        max: {
                                            value: 100,
                                            message: "I really wish they did, but I don't think dogs can live that long. Please enter a smaller number"
                                        }
                                    })}
                                    type="number"
                                />
                            </div>

                            <div className={`h-1/3 w-full bg-blue-100 flex flex-wrap`}>
                                {fields.map((field, index) => {
                                    return (
                                        <div className={`h-fit w-96 flex flex-col bg-lime-200`} key={field.id}>
                                            <input
                                                className={`hidden peer`} 
                                                id={`breeds.${index}.name`}
                                                type="checkbox"
                                                {...register(`breeds.${index}.selected`)}
                                                onChange={() => {
                                                    setValue(`breeds.${index}.selected`, !getValues(`breeds.${index}.selected`))
                                                    console.log(getValues(`breeds.${index}.selected`))
                                                }}
                                            />
                                            <label className={`h-10 w-fit bg-slate-400 peer-checked:bg-green-300`} htmlFor={`breeds.${index}.name`}>{breeds[index].name}</label>
                                        </div>
                                    )
                                    })}
                                {JSON.stringify(fields, null, 4)}
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    )
}

