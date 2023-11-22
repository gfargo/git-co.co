import { CopyCommand } from "@/components/CopyCommand";
import { Section } from "@/components/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InstallSection = () => {
  return (
    <Section
      id="install"
      className="text-white bg-gradient-to-b from-primary to-[#3d6455] md:pb-12"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center drop-shadow">
            install
          </h2>
          <p className="text-center text-xl font-extralight items-center">
            Install <span className="inline font-semibold">coco</span> with your
            favorite package manager.
          </p>
        </div>
        <div className="mx-auto max-w-xl grid gap-6 sm:grid-cols-1 md:gap-8 lg:max-w-3xl py-6 relative">
          <Tabs
            defaultValue="global"
            className="flex flex-col justify-center gap-4 items-center"
          >
            <TabsContent value="project">
              <CopyCommand command="npm install --save-dev git-coco" />
            </TabsContent>
            <TabsContent value="global">
              <CopyCommand command="npm install -g git-coco" />
            </TabsContent>
            <TabsContent value="service">
              <CopyCommand command="npx git-coco" />
            </TabsContent>
            <TabsList className="mx-auto bg-oxley-400">
              <TabsTrigger value="project" className="cursor-pointer">Project</TabsTrigger>
              <TabsTrigger value="global">System</TabsTrigger>
              <TabsTrigger value="service">CI/CD</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </Section>
  );
};
