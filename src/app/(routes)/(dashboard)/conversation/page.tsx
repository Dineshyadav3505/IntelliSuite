// frontend/pages/conversation.tsx
"use client";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Empty} from "@/components/Empty";

// Define a type for messages
type Message = {
  role: "user" | "assistant";
  content: string;
};

const Conversation = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // Clear previous error
      setError(null);

      // Send the user message to the API
      const response = await axios.post("/api/conversation", { message: userMessage.content });

      if (response.data.error) {
        setError(response.data.error);
        console.log("response.data.error");
      } else {
        // Assuming the API returns a structured response
        const assistantMessage: Message = {
          role: "assistant",
          content: response.data || "No response generated", // Adjust based on your API response
        };
        console.log(response);

        // Update messages state
        setMessages((current) => [...current, userMessage, assistantMessage]);
        form.reset();
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      router.refresh();
    }
  };

  // Function to render message content safely
  const renderMessageContent = (content: string) => {
    if (!content) return <span>No content available</span>;
    return <span>{content}</span>;
  };

  return (
    <div className="px-5 text-black dark:text-white">
      <Heading
        title="Conversation"
        description="Our most advanced conversation tool"
        icon={MessageSquare}
        bgColor="bg-violet-500/20"
        iconColor="text-violet-500"
      />
      <div className="px-4 lg:px-8 py-6 flex flex-col gap-4">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full py-4 px-3 md:px-3 focus-within:shadow-sm flex flex-col lg:flex-row gap-2">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-[78%]">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 text-black dark:text-white w-full outline-none px-2 focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isSubmitting}
                        placeholder="How do I calculate the radius of the circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:w-[20%] bg-violet-500 rounded-lg py-2 hover:bg-violet-600 text-black dark:text-white"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.length === 0 ? (
              <div className="text-center">
                <Empty lable="No Conversation started." />
              </div>
            ) : (
              messages.map((message, index) => (
                <div className="message" key={index}>
                  {error && index === messages.length - 1 && (
                    <div className="text-red-500">{error}</div>
                  )}
                  <div className="flex gap-2">
                    <strong className="text-gray-500 dark:text-gray-400">{message.role === "user" ? "You: " : "Assistant: "}</strong>
                    <div>{renderMessageContent(message.content)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;