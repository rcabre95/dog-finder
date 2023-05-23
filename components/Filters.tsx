
import { AgeRange, IBreed } from "@/pages/dogs";
import { useFieldArray, useForm } from "react-hook-form";
import { Transition, Listbox } from "@headlessui/react";
import Close from "./shared-ui/Close";
import Image from "next/image";
import { SetStateAction, Dispatch, Fragment } from "react";
import { MapPoint } from "@/lib/utils/distance";

export default function Filters({ location, showFilters, setShowFilters, breeds, ageRange, distance, confirmFilters, saveData }: 
    { location: MapPoint,showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>>, breeds: Array<IBreed>, ageRange: AgeRange, distance: number,
    confirmFilters: (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => Promise<void>, saveData?: (data: any) => void}) {

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

    return (
        <Transition show={showFilters} as="div">
            <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25 z-20" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto z-20 flex justify-center items-center">
                <div className="flex flex-col h-fit w-5/6 md:w-1/3 max-w-lg items-center justify-center p-4">
                    <Transition.Child
                        className={`h-full w-full`}
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <form className={`bg-white h-full w-full z-30 rounded-sm px-2 py-1 flex flex-col`}
                        onSubmit={handleSubmit(async (data) => {
                            // console.log(data)
                            if (saveData) {
                                saveData(data)
                            }
                            await confirmFilters(data.breeds, [data.minAge, data.maxAge], data.distance)
                        })}>
                            <Close setShowFilters={setShowFilters} />
                            <h3 className={`text-xl font-bold w-full text-center`}>Filter</h3>
                            <div className={`rounded-md shadow-sm 
                            ${location.lat === 0 && location.lon === 0 ? "hidden" : null} w-full border px-2 py-2 flex flex-col items-center mb-4`}>
                                <label className={`font-light`} htmlFor="distanceId">Distance </label>
                                <select id="distanceId" className={`w-20 border border-black text-center rounded-sm`}
                                    {...register("distance", {
                                        required: "You must insert a preferred search distance.",
                                        valueAsNumber: true
                                    })}
                                >
                                    <option value={5}>5 km</option>
                                    <option value={10}>10 km</option>
                                    <option value={20}>20 km</option>
                                    <option value={50}>50 km</option>
                                    <option value={0.1}>MAX</option>
                                </select>
                            </div>
                            <div className={`h-fit flex justify-between w-full border shadow-sm rounded-md p-2 mb-4`}>
                                <div className={`flex flex-col w-16`}>
                                    <label className={`font-light`} htmlFor="minAgeId">Min Age</label>
                                    <input
                                        className={`w-full rounded-sm border border-black text-center`}
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

                                <div className={`flex flex-col w-16`}>
                                    <label className={`font-light`} htmlFor="maxAgeId">Max Age</label>
                                    <input
                                        className={`w-full rounded-sm border border-black text-center`}
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
                            </div>

                            <div className={` w-full flex flex-col h-72 rounded-md mb-4`}>
                                <Listbox name="breeds" defaultValue={fields}  multiple>
                                    <Listbox.Button data-testid="breeds-btn" className={`h-1/6 border rounded-md shadow-sm mb-2`}>Select Breeds</Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className={`flex h-5/6 flex-col overflow-scroll border rounded-md shadow-sm`}>
                                            {fields.map((field, index) => {
                                                return (
                                                    <Listbox.Option key={field.id} value="any">
                                                        <div className={`h-10 flex items-center relative bg-blue-300 border-b`}>
                                                            <input
                                                                className={`hidden peer`} 
                                                                id={`breeds.${index}.name`}
                                                                type="checkbox"
                                                                {...register(`breeds.${index}.selected`)}
                                                                onChange={() => {
                                                                    setValue(`breeds.${index}.selected`, !getValues(`breeds.${index}.selected`))
                                                                    // console.log(getValues(`breeds.${index}.selected`))
                                                                }}
                                                            />
                                                            
                                                            <Image className={`hidden peer-checked:block w-4 h-4`} height={16} width={16} src={`/svgs/checkmark.svg`} alt={`checkmark`} />
                                                            
                                                            <label className={`w-full h-full bg-slate-400 peer-checked:bg-green-300 flex items-center peer-checked:pl-2 pl-6`} htmlFor={`breeds.${index}.name`}>
                                                                
                                                                {breeds[index].name}
                                                            </label>
                                                        </div>
                                                    </Listbox.Option>
                                                )
                                            })}
                                        </Listbox.Options>
                                    </Transition>
                                </Listbox>
                            </div>
                            <div className={`w-full h-fit flex justify-center justify-self-end mb-2`}>
                                <button className={`px-4 py-2 border rounded-md shadow-sm`} type="submit">Submit</button>
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    )
}

