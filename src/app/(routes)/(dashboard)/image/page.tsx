"use client";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import {Download, ImageIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";

// Define a type for images
type ImageResponse = {
  role: "user" | "assistant";
  content: string;
};

const Image = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);

      setImages([]);

      const response = await axios.post("/api/image", { message: values });
      // Log the response for debugging
      console.log("Response received:", response.data);

      // Assuming the API returns an array of image objects
      const data = response.data.map((image: { url: string }) => ({
        role: "assistant",
        content: image.url,
      }));

      setImages(data); // Update images state with the new images

      form.reset(); // Reset the form after successful submission
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log detailed error response
        setError(error.response.data.message || "An error occurred while sending your message. Please try again.");
      } else {
        setError("An error occurred while sending your message. Please try again.");
      }
    } finally {
      router.refresh(); // Refresh the router if needed
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
        title="Image Generation"
        description="Generate images based on your prompts."
        icon={ImageIcon}
        bgColor="bg-pink-500/20"
        iconColor="text-pink-500"
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
                      placeholder="Describe the image you want to generate..."
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
                <FormItem className="w-full lg:w-36">
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="w-full lg:w-36">
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            {images.length === 0 ? (
              <div className="text-center">
                <Empty label="No Image Generated." />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images.map((src, i) => (
                <Card key={i} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={src} alt={`Generated image ${i + 1}`} fill />
                  </div>
  
                  <CardFooter className="p-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(src)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;