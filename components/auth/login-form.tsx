"use client"

import * as z from 'zod'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { LoginSchema } from '@/schemas'
import { 
  Form,
  FormControl,  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormSuccess from '../form-success'
import FormError from '../form-error'
import { login } from '@/actions/login'

const LoginForm = () => {

  const SearchParams = useSearchParams();
  const urlError = SearchParams.get('error') === 'OAuthAccountNotLinked'
    ? "Email already in use with different provider!" : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      login(values)
        .then((data) => {
            setError(data?.error); 
            // TODO: Add when we add 2FA
            // setSuccess(data?.success as string);   
        })
    })  
  } 

  return (
    <CardWrapper
      headerLabel='Welcome Back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='themightyjohn@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='*********'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button 
            type='submit' 
            disabled={isPending} 
            className='w-full bg-gradient-to-r from-pink-500 via-teal-400 to-pink-500 hover:from-black hover:via-pink-500 hover:to-black-400 transition-all ease-in duration-200 text-black hover:text-teal-400'>
            <span className='font-semibold'>Login</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm