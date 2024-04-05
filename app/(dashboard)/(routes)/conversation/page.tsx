'use client';

import axios from 'axios';
import * as z from 'zod';
import { Heading } from '@/components/heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<
    ChatCompletionMessageParam[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post(
        '/api/conversation',
        {
          messages: newMessages
        }
      );

      console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n', response);

      setMessages((current) => [
        ...current,
        userMessage,
        response.data
      ]);
      form.reset();
    } catch (error: any) {
      // TODO: Open Pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation engine model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:right-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {/* {messages.map((message, index) => (
  <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
    {message.role === 'user' ? null : (
      <div className='flex-shrink-0'>
        <MessageSquare className='w-6 h-6' />
      </div>
    )}
    <div className={`flex-grow p-3 rounded-lg ${message.role === 'user' ? 'bg-violet-100 text-violet-900' : 'bg-gray-100 text-gray-900'}`}>
      {typeof message.content === 'string' ? (
        message.content // Render directly if it's a string
      ) : (
        message.content.map((part, partIndex) => (
          // Render each part individually
          <span key={partIndex}>{part.type === 'text' ? part.text : part.type}</span>
        ))
      )} */}
            {/* </div>
  </div>
))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConversationPage;
