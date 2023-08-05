"use client"
import * as z from 'zod'
import { Heading } from '@/components/heading'
import React from 'react'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Heading
                title="Conversation"
                description='Chat with an AI.'
                iconColor='text-violet-500'
                icon={MessageSquare}
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-4'>
                <div>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className='grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm'>
                            <FormField name='promp' render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='p-0 m-0'>
                                        <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ' disabled={isLoading} placeholder='How do I Calculate the radius of a circle' {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className='w-full col-span-12 lg:col-span-2' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className='space-y-4'></div>
        </div>
    )
}

export default ConversationPage