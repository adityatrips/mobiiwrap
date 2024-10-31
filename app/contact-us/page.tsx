'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSubmitContactForm } from '@/services/mutations';
import Image from 'next/image';
import React, { useState } from 'react';

const ContactUs = () => {
  const { toast } = useToast();

  const submitContactForm = useSubmitContactForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactForm.mutate(
      {
        name,
        email,
        phone,
        message,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Message sent successfully',
          });

          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.name ?? 'Internal server error',
            variant: 'destructive',
          });

          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
        },
      }
    );
  };

  return (
    <section className='flex flex-col md:flex-row justify-center items-center gap-4'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-start justify-center w-full gap-4'
      >
        <h1>Contact Us</h1>
        <Input
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type='text'
          placeholder='Enter your name'
        />
        <Input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type='text'
          placeholder='Enter your email'
        />
        <Input
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type='text'
          placeholder='Enter your phone'
        />
        <Textarea
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={10}
          placeholder='Enter your message'
        />

        <Button type='submit'>Submit</Button>

        <b className='mt-5'>
          Address: Shop no 38, Gaffar market, Karol Bagh, New Delhi, Delhi
        </b>

        <b className='mt-5'>Phone no: 7838880955</b>
      </form>
      <Image
        alt='Login page image'
        src='https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={2070}
        height={1380}
        className='h-nav-full w-full object-cover object-left-center  max-w-full md:max-w-[50%] rounded-lg'
      />
    </section>
  );
};

export default ContactUs;
