"use client";
import Typography from '@/components/typography'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateWorkspaceValues } from '@/hooks/create-workspace-values';
import React from 'react'

function CreateWorkSpace() {

    let stepInView = null;

    const { currStep } = useCreateWorkspaceValues()

    switch (currStep) {
        case 1:
            stepInView = <Step1 />
            break;
        case 2:
            stepInView = <Step2 />
            break;
        default:
            stepInView = <Step1 />;
    }
    return (
        <div className='w-screen h-screen grid place-content-center bg-neutral-800 text-white'>
            <div className='p-3 max-w-[550px]'>
                <Typography
                    text={`step ${currStep} of 2`}
                    variant='p'
                    className='text-neutral-400'
                />

                {stepInView}
            </div>
        </div>
    )
}

export default CreateWorkSpace



const Step1 = () => {
    const { name, updateValues, setCurrStep } = useCreateWorkspaceValues()

    return (
        <>
            <Typography
                text='What is the name of your company or team'
                className='my-4'
            />
            <Typography
                text='This will be the name of your Slackv1 workspace - choose something that your team will recognize.'
                className='text-neutral-300'
                variant='p'
            />

            <form className='mt-6'>
                <fieldset>
                    <Input
                        className='bg-neutral-700 text-white border-neutral-600'
                        type='text'
                        value={name}
                        placeholder='Enter your company name'
                        onChange={event => updateValues({
                            name: event.target.value
                        })}

                    />
                </fieldset>

                <Button
                    type='button'
                    disabled={!name}
                    onClick={() => setCurrStep(2)}
                    className='mt-10'
                >
                    <Typography
                        text='Next'
                        variant='p'
                    />
                </Button>
            </form>
        </>
    )


}

const Step2 = () => {


    return (
        <>



        </>
    )


}

