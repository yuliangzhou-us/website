import { ContentCard } from "@/components/ui/content-card";
import { PageHero } from "@/components/ui/page-hero";
import type { SimpleCard } from "@/lib/site-data";

type ContentPageProps = {
  title: string;
  description: string;
  cards: SimpleCard[];
};

export function ContentPage({ title, description, cards }: ContentPageProps) {
  return (
    <div className="space-y-8">
      <PageHero title={title} description={description} />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ContentCard key={card.title} title={card.title} description={card.description} />
        ))}
      </section>
    </div>
  );
}
