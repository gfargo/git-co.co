import { CopyCommand } from "@/components/CopyCommand"
import { Section } from "@/components/Section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            Use the <code>init</code> command to both install and configure{" "}
            <span className="inline font-semibold">coco</span> for your use case.
          </p>
        </div>
        <div className="mx-auto max-w-xl grid gap-6 sm:grid-cols-1 md:gap-8 lg:max-w-3xl py-6 relative">
          <Tabs
            defaultValue="wizard"
            className="flex flex-col justify-center gap-4 items-center"
          >
            <TabsContent value="project">
              <CopyCommand command="npx git-coco@latest init --l project" />
            </TabsContent>
            <TabsContent value="global">
              <CopyCommand command="npx git-coco@latest init --l global" />
            </TabsContent>
            <TabsContent value="service">
              <CopyCommand command="npx git-coco@latest" />
            </TabsContent>
            <TabsContent value="wizard">
              <CopyCommand command="npx git-coco@latest init" />
            </TabsContent>
            <TabsList className="mx-auto gap-1 bg-oxley-400">
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="service">CI/CD</TabsTrigger>
              <TabsTrigger value="wizard">Wizard 🧙</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </Section>
  )
}
