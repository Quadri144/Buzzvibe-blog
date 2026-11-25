import { ArrowRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BuzzVibeShell, SectionHeading, StoryByline, StoryCard, TrendingTag } from "@/components/buzzvibe-site";
import { stories } from "@/lib/buzzvibe-content";
import { buzzVibeMeta } from "@/lib/seo";

const feature = stories[0];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buzzVibeMeta(
      "BuzzVibe — The internet, in the group chat",
      "Meet BuzzVibe: viral lists, pop-culture stories, and quizzes that make the scroll worth it.",
    ),
  }),
  component: HomePage,
});

function HomePage() {
  if (!feature) return null;

  return (
    <BuzzVibeShell>
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pt-10">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <TrendingTag />
            <span className="text-xs font-bold uppercase text-muted-foreground">The daily scroll</span>
          </div>
          <span className="hidden text-xs font-bold uppercase text-muted-foreground sm:inline">
            Good stories travel
          </span>
        </div>

        <section className="grid overflow-hidden rounded-md border border-border bg-card lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            to="/story/$slug"
            params={{ slug: feature.slug }}
            search={{ page: 1 }}
            aria-label={`Read featured story: ${feature.title}`}
            className="group relative block aspect-[4/3] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[440px]"
          >
            <img
              src={feature.image}
              alt="Friends sharing a laugh around a phone in a diner booth"
              fetchPriority="high"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-4 left-4 rounded-sm bg-trending px-3 py-1.5 text-xs font-extrabold uppercase text-trending-foreground">
              The story everyone is sending
            </span>
          </Link>
          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <TrendingTag />
            <p className="mt-5 text-xs font-extrabold uppercase text-primary">The group chat edit</p>
            <h1 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl xl:text-5xl">
              {feature.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{feature.summary}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <StoryByline story={feature} />
              <Button size="lg" asChild className="h-12 font-extrabold">
                <Link to="/story/$slug" params={{ slug: feature.slug }} search={{ page: 1 }}>
                  Read the story <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <SectionHeading eyebrow="The latest" title="Stories worth the scroll" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {stories.map((story, index) => (
              <StoryCard key={story.slug} story={story} number={index + 1} />
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-col items-start justify-between gap-4 border-y border-border py-8 sm:mt-16 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase text-primary">Your next rabbit hole</p>
            <h2 className="mt-2 text-2xl text-foreground">Pick a corner of the internet.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Quizzes", "quizzes"],
              ["Lifestyle", "lifestyle"],
              ["Tech", "tech"],
            ].map(([name, category]) => (
              <Button key={category} variant="outline" asChild className="font-bold">
                <Link to="/category/$category" params={{ category }}>
                  {name} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            ))}
          </div>
        </section>
      </main>
    </BuzzVibeShell>
  );
}
