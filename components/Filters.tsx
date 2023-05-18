
import { AgeRange, IBreed } from "@/pages/dogs";
import { useFieldArray, useForm } from "react-hook-form";

export interface IFetchProps {
    breeds: Array<IBreed>;
    ageRange: AgeRange;
    distance: number;
    confirmFilters: (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => Promise<void>;
}

export function Filters(props: IFetchProps) {
    const { breeds, ageRange, distance, confirmFilters } = props;

    const { register, handleSubmit, setValue, control, getValues,formState: { errors } } = useForm({
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
        <div className={`z-30 h-screen w-full bg-blue-400`}>
            <form className={``}
            onSubmit={handleSubmit(async (data) => {
                console.log(data)
                await confirmFilters(data.breeds, [data.minAge, data.maxAge], data.distance)
            })}>
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
        </div>
    )
}

