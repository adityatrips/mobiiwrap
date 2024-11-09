import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/services";
import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const { toast } = useToast();

  const submitContactForm = useSubmitContactForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate email and phone number
  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/; // Simple validation for 10-digit phone number
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    const isValid = name && email && phone && message && validateForm();
    setIsFormValid(isValid);
  }, [name, email, phone, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactForm.mutate(
      { name, email, phone, message },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Message sent successfully",
          });

          // Reset form fields
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

          // Reset form fields
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
      }
    );
  };

  return (
    <section className="px-2 flex flex-col md:flex-row justify-center items-center gap-4">
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
          aria-label="Name"
        />
        <Input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter your email"
          aria-label="Email"
        />
        <Input
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="text"
          placeholder="Enter your phone"
          aria-label="Phone"
        />
        <Textarea
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={10}
          placeholder="Enter your message"
          aria-label="Message"
        />

        <Button
          type="submit"
          disabled={!isFormValid || submitContactForm.isLoading}
        >
          {submitContactForm.isLoading ? "Submitting..." : "Submit"}
        </Button>

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
      <img
        alt="Contact Us page image"
        src="https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-nav-full w-full object-cover object-left-center  max-w-full md:max-w-[50%] rounded-lg"
      />
    </section>
  );
};

export default ContactUs;
