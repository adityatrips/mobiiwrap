import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "../constants";

interface FAQ {
  id: number;
  title: string;
  content: string;
}

const FaqPage = () => {
  return (
    <Accordion
      collapsible
      defaultValue="1"
      type="single"
      className="container mx-auto px-2 mt-20 "
    >
      {faqs.map((faq: FAQ) => (
        <AccordionItem value={String(faq.id)} key={faq.id}>
          <AccordionTrigger>
            <h3 className="text-left">{faq.title}</h3>
          </AccordionTrigger>
          <AccordionContent>
            <p>{faq.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqPage;
