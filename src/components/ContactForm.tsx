'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  CircleUserRound,
  MessageSquareText,
  SendHorizontal,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'

interface ContactFormI18n {
  title: string
  description: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  sendingText: string
  sendButtonText: string
  successMessage: string
  errorMessage: string
  nameRequired: string
  emailInvalid: string
  messageRequired: string
  formSubject: string
}

interface ContactFormProps {
  i18n?: Partial<ContactFormI18n>
}

const defaultI18n: ContactFormI18n = {
  title: 'Send a Message',
  description:
    'Feel free to reach out if you have any questions or would like to discuss potential collaborations.',
  namePlaceholder: 'Name',
  emailPlaceholder: 'Email',
  messagePlaceholder: 'Message',
  sendButtonText: 'Send Message',
  sendingText: 'Sending...',
  successMessage: "Your message has been sent successfully. We'll get back to you soon!",
  errorMessage: 'There was an error sending your message. Please try again later.',
  nameRequired: 'Name is required.',
  emailInvalid: 'Please enter a valid email address.',
  messageRequired: 'Message is required',
  formSubject: 'Portfolio User Inquiry',
}

export function ContactForm({ i18n = {} }: ContactFormProps) {
  const strings = { ...defaultI18n, ...i18n }

  const [isLoading, setIsLoading] = useState(false)
  const [formStatus, setFormStatus] = useState<null | { success: boolean; message: string }>(null)

  const FormSchema = z.object({
    name: z.string().min(1, {
      message: strings.nameRequired,
    }),
    email: z.string().email({
      message: strings.emailInvalid,
    }),
    message: z.string().min(1, {
      message: strings.messageRequired,
    }),
  })

  type FormData = z.infer<typeof FormSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    try {
      // Add subject to match original Vue component
      const formData = {
        ...data,
        subject: strings.formSubject,
      }

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbx0Qv17Ym5VNL-dHyeJT_uyLWKkepHGEDPUoUMYy-PZ9ZLTdx1ouu2BQ4QukgEjSP48cQ/exec',
        {
          method: 'POST',
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()

      if (responseData.result === 'success') {
        setFormStatus({
          success: true,
          message: strings.successMessage,
        })
        form.reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setFormStatus({
        success: false,
        message: strings.errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{strings.title}</CardTitle>
        <CardDescription>{strings.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-8 gap-y-4 sm:max-lg:grid-cols-2 xl:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <CircleUserRound className="text-muted-foreground absolute m-2.5 size-6" />
                      <FormControl>
                        <Input
                          placeholder={strings.namePlaceholder}
                          className="h-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <AtSign className="text-muted-foreground absolute m-2.5 size-6" />
                      <FormControl>
                        <Input
                          placeholder={strings.emailPlaceholder}
                          type="email"
                          className="h-11 pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <MessageSquareText className="text-muted-foreground absolute m-2.5 size-6" />{' '}
                    <FormControl>
                      <Textarea
                        placeholder={strings.messagePlaceholder}
                        className="min-h-[120px] resize-y pl-10 break-all whitespace-normal"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-11 w-full" disabled={isLoading}>
              <div className="inline-flex items-center justify-center">
                {isLoading ? (
                  <span>{strings.sendingText}</span>
                ) : (
                  <>
                    <SendHorizontal className="mr-2 size-6" />
                    <span>{strings.sendButtonText}</span>
                  </>
                )}
              </div>
            </Button>
          </form>
        </Form>
      </CardContent>
      {formStatus && (
        <CardFooter
          className={`mx-6 flex rounded-md p-4 ${
            formStatus.success
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
          role="alert"
        >
          <div className="flex">
            {formStatus.success ? (
              <CheckCircle2 className="size-6" />
            ) : (
              <AlertCircle className="size-6" />
            )}
            <span className="ml-2">{formStatus.message}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
