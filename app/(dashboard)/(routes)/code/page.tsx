"use client";

import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { set, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import ReactMarkdown from "react-markdown";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/empty";


import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const CodePage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // using replicated api/code

            const { data } = await axios.post("/api/code", {
                prompt: values.prompt
            });

            setMessages(data.join(""));
            console.log(data.join(""));


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
                title="Code Generation"
                description="Generate code using descriptive text"
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="p-0 m-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Simple Toogle Button using react hooks"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full col-span-12 lg:col-span-2" type="submit" disabled={isLoading} size="icon">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-4 space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!messages?.length && !isLoading && (
                        <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col gap-y-4 bg-zinc-400">
                        <span className="px-4">
                            {messages}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CodePage;
