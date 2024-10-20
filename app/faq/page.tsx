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
    <Accordion collapsible defaultValue="1" type="single">
      {faqs.map((faq: FAQ) => (
        <AccordionItem value={String(faq.id)} key={faq.id}>
          <AccordionTrigger>
            <h3>{faq.title}</h3>
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
