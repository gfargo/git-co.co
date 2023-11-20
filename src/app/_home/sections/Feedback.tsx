import { Section } from "@/components/Section";

export const FeedbackSection = () => {
  return (
    <Section
      id="feedback"
      className="bg-[#5E8F78] text-white"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
          What Our Users Are Saying
        </h2>
        <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-1 md:gap-12 lg:max-w-5xl lg:grid-cols-2 py-8">
          <div>
            <blockquote className="text-white text-center">
              "This is the best Git assistant I've ever used. It has made my
              workflow so much smoother and faster."
            </blockquote>
            <p className="text-sm font-medium text-white text-center">
              - Jane Doe, Developer
            </p>
          </div>
          <div>
            <blockquote className="text-white text-center">
              "I love how it automates so much of the Git process. It's a game
              changer."
            </blockquote>
            <p className="text-sm font-medium text-white text-center">
              - John Smith, Developer
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
