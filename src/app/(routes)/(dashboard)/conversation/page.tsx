"use client"
import { z } from "zod"
import { Heading } from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const Conversation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt:""
    }
  })

  const isLoaded = form.formState.isSubmitted;

  const onSubmit =async (values: z.infer<typeof formSchema>) => {
     console.log(values)
  }
  
  return (
    <div className="px-5">
        <Heading 
            title="conversation" 
            description="our most advanced conversation tool" 
            icon= {MessageSquare}
            bgColor="bg-violet-500/20" 
            iconColor="text-violet-500"
        />
        <div className="px-4 lg:px-8 ">
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full py-4 px-3 md:px-36 focus-within:shadow-sm  grid grid-col-12 gap-2">
              <FormField
                name="prompt"
                render={({field}) => (
                  <FormItem className="col-span-12 w-full lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input className=" border-0 w-full outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoaded} placeholder="Type your prompt here" {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              </form>   
            </Form>
          </div>

        </div>
    </div>

  )
}

export default Conversation