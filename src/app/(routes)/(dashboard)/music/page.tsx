"use client";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import {Download, Music } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { amountOptions, resolutionOptions, formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/Empty";
import { Card, CardFooter } from "@/components/ui/card";

// Define a type for images
type ImageResponse = {
  role: "user" | "assistant";
  content: string;
};

const MucisGeneration = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string | null>(null);
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

      setMusic("");

      const response = await axios.post("/api/music", values);
     
      console.log("Response received:", response.data.audio);


      setMusic(response.data.audio);

      form.reset(); 
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setError(error.response.data.message || "An error occurred while sending your message. Please try again.");
      } else {
        setError("An error occurred while sending your message. Please try again.");
      }
    } finally {
      router.refresh();
    }
  };

  // Function to render message content safely
  const renderMessageContent = (content: string) => {
    if (!content) return <span>No content available</span>;
    return <img src={content} alt="Generated" className="w-full" />; // Assuming content is an image URL
  };

  return (
    <div className="px-5 text-black dark:text-white">
      <Heading
        title="Music Generation"
        description="Generate music based on your prompts."
        icon={Music}
        bgColor="bg-violet-500/20"
        iconColor="text-violet-500"
      />
      <div className="lg:px-8 py-6 flex flex-col gap-4">
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
                      placeholder="Generate music based on your prompt"
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
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          <div className="flex flex-col-reverse gap-y-4">
            {!music && <Empty label="No Music Generated!" />}
            {music && (
              <audio controls className="w-full">
                <source src={music} type="audio/mpeg" />
              </audio>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};


export default MucisGeneration;