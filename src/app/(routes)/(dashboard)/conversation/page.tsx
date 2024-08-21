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
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const Conversation = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // Send the user message to the API
      const response = await axios.post("/api/conversation", { message: newMessages });

      // Assuming the API returns a structured response
      const assistantMessage: ChatCompletionMessageParam = {
        role: "assistant",
        content: response.data.message.content, // Adjust this based on your API response structure
      };

      // Update messages state
      setMessages((current) => [...current, userMessage, assistantMessage]);
      form.reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
    } finally {
      router.refresh();
    }
  };

  // Function to render message content safely
  const renderMessageContent = (content: string | ChatCompletionMessageParam[] | null | undefined) => {
    if (!content) {
      return <span>No content available</span>; // Handle null or undefined content
    }

    if (Array.isArray(content)) {
      // If content is an array, map through and render each part
      return content.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }
        // Handle other types if necessary
        return null; // Handle cases where part is not a string
      });
    }

    return <span>{content}</span>; // Render as a string
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
      <div className="px-4 lg:px-8 py-6">
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
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>
                {renderMessageContent(message.content)} {/* Call the render function */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;