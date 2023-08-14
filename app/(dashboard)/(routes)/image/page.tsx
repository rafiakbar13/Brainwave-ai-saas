"use client";

import * as z from "zod";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";


import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


const ImagePage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [image, setImage] = useState<string>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: '1',
            resolution: '512x512',
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImage(undefined)
            const response = await axios.post('/api/image', values);
            setImage(response.data[0]);
            console.log(response.data[0])
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Generate images from text."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="p-0 m-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a cat"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="p-0 m-0">
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="p-0 m-0">
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                            <Button className="w-full col-span-12 lg:col-span-2" type="submit" disabled={isLoading} size="icon">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-4 space-y-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {!image?.length && !isLoading && (
                        <Empty label="No Images Generated." />
                    )}
                    <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {image && (
                            <Card>
                                <div className="relative w-full h-48">
                                    <Image
                                        src={image!}
                                        fill
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                        alt="Generated Image"
                                    />
                                </div>
                                <CardFooter>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Button onClick={() => window.open(image!)} variant="secondary" className="w-full">
                                                <Download className="w-5 h-5" />
                                                <span>Download</span>
                                            </Button>

                                        </div>
                                        <Button
                                            className={cn("text-sm", "px-4 py-1", "rounded-md")}
                                            size="icon"
                                            onClick={() => {
                                                navigator.clipboard.writeText(image!);
                                                toast.success("Copied to clipboard.");
                                            }}
                                        >
                                            Copy URL
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;
