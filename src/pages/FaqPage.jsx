import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/constants";

const FaqPage = () => {
  return (
    <Accordion collapsible defaultValue="1" type="single" className="px-2">
      {faqs.map((faq) => (
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
