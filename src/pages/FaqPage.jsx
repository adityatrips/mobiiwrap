import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { faqs } from "../lib/constants";

const FaqPage = () => {
  return (
    <Accordion collapsible defaultValue="1" type="single" className="px-2">
      {faqs.map((faq) => (
        <AccordionItem value={String(faq.id)} key={faq.id}>
          <AccordionTrigger aria-expanded={faq.id === 1 ? "true" : "false"}>
            <h4 className="heading text-left leading-6">{faq.title}</h4>
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
