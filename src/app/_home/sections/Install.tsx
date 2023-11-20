import { CopyCommand } from "@/components/CopyCommand";
import { Section } from "@/components/Section";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InstallSection = () => {
  return (
    <Section id="install" className="text-white bg-gradient-to-t from-[#709f8b] to-[#3d6455]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-2">

          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center drop-shadow">
            install
          </h2>
          <p className="text-center text-xl font-extralight flex items-center">
            Install <span className="font-bold px-1">coco</span> with your favorite package manager.
          </p>
        </div>
        <div className="mx-auto max-w-xl grid gap-6 sm:grid-cols-1 md:gap-8 lg:max-w-3xl py-8">
          <Tabs
            defaultValue="project"
            className="flex flex-col justify-center gap-3 items-center"
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
            <TabsList className="mx-auto ">
              <TabsTrigger value="project">Project Level</TabsTrigger>
              <TabsTrigger value="global">System Wide</TabsTrigger>
              <TabsTrigger value="service">CI/CD</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </Section>
  );
};
