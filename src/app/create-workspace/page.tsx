'use client';
import ImageUpload from '@/components/image-upload';
import Typography from '@/components/typography'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateWorkspaceValues } from '@/hooks/create-workspace-values';
import React, { useState } from 'react'
import slugify from 'slugify'
import { v4 as uuid } from 'uuid'
import { createWorkSpace } from '@/actions/create-workspace';
import { error } from 'console';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    const { setCurrStep, updateImageUrl, imageUrl, name } = useCreateWorkspaceValues()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()
    const handleSubmit = async () => {
        setIsSubmitting(true)
        const slug = slugify(name)
        const invite_code = uuid();
        const error = await createWorkSpace({ imageUrl, name, slug, invite_code });
        setIsSubmitting(false);
        if (error?.error) {
            console.log(error);
            return toast.error("Couldn't create workspace. Please try again.");
        }
        toast.success('Workspace created successfully');
        router.push('/');
    }
    return (
        <>
            <Button
                type='button'
                size={'sm'}
                className='text-white'
                variant='link'
                onClick={() => setCurrStep(1)}

            >
                <Typography text='Back' variant='p' />
            </Button>

            <form>
                <Typography text='Add workspace avatar' className='my-4' />
                <Typography
                    text='This image can be changed later in your workspace settings.'
                    className='text-neutral-300'
                    variant='p'
                />
                <fieldset disabled={isSubmitting} className='mt-6 flex flex-col items-center sapce-y-9'>

                    <ImageUpload />
                    <div className='space-x-5'>
                        <Button onClick={() => {
                            updateImageUrl('');
                            handleSubmit();
                        }}>

                            <Typography text='Skip for now' variant='p' />

                        </Button>

                        {imageUrl ? (
                            <Button
                                type='button'
                                onClick={handleSubmit}
                                size='sm'
                                variant='destructive'
                            >
                                <Typography text='Submit' variant='p' />
                            </Button>
                        ) : (
                            <Button
                                type='button'
                                size='sm'
                                className='text-white bg-gray-500'
                            >
                                <Typography text='Select an Image' variant='p' />
                            </Button>
                        )}
                    </div>
                </fieldset>
            </form>


        </>
    )


}

