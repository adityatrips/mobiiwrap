"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/services/mutations";
import Image from "next/image";
import React, { useState } from "react";

const ContactUs = () => {
  const { toast } = useToast();

  const submitContactForm = useSubmitContactForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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
            title: "Success",
            description: "Message sent successfully",
          });

          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.name ?? "Internal server error",
            variant: "destructive",
          });

          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
      }
    );
  };

  return (
    <section className="container mx-auto px-2 mt-20 flex flex-col md:flex-row justify-center items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center w-full gap-4"
      >
        <h1>Contact Us</h1>
        <Input
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Enter your name"
        />
        <Input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter your email"
        />
        <Input
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="text"
          placeholder="Enter your phone"
        />
        <Textarea
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={10}
          placeholder="Enter your message"
        />

        <Button type="submit">Submit</Button>

        <a
          href="https://www.google.com/maps/place/Mobiiwrap/@28.649645,77.1884415,17z/data=!3m1!4b1!4m6!3m5!1s0x390d039b553f8ac1:0x1a410a3d3ff4d368!8m2!3d28.649645!4d77.1910164!16s%2Fg%2F11kcr31tpt?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
          className="text-blue-500 underline mt-5"
        >
          Mobiiwrap, shop no. 38, near Narang shoes, Ghaffar Market, Block 24N,
          Karol Bagh, New Delhi, Delhi 110005
        </a>

        <a href="tel:+917838880955" className="text-blue-500 underline">
          +91 7838880955
        </a>
      </form>
      <Image
        alt="Login page image"
        src="https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={2070}
        height={1380}
        className="h-nav-full w-full object-cover object-left-center  max-w-full md:max-w-[50%] rounded-lg"
      />
    </section>
  );
};

export default ContactUs;
