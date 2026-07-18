import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description: "About Wolven Forge, a synthetic placeholder company.",
};

// Synthetic placeholder copy — this page exists to test the layout only.
export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-surface-dark px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <span className="text-caption-md font-bold uppercase text-primary">About</span>
            <h1 className="mt-lg max-w-[24ch] text-display-lg font-bold text-on-dark">
              A staging placeholder, dressed up like a real company.
            </h1>
          </div>
        </section>
        <Section tone="canvas">
          <div className="grid grid-cols-1 gap-xxl lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="text-heading-lg font-normal text-on-dark">
                Wolven Forge does not exist. This page holds placeholder prose
                so the marketing-site scaffold has real content to lay out.
              </p>
              <p className="mt-lg text-body-md text-body">
                The copy below is deliberately generic: a synthetic origin
                story, a synthetic mission statement, and a synthetic set of
                values, none of which describe an actual product or team.
              </p>
            </div>
            <div className="border-t border-hairline pt-lg lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-xxl lg:pt-0">
              <h2 className="text-heading-sm font-bold text-on-dark">Placeholder facts</h2>
              <dl className="mt-lg flex flex-col gap-md">
                <div className="flex justify-between border-b border-hairline pb-sm">
                  <dt className="text-body-sm text-mute">Founded</dt>
                  <dd className="text-body-sm text-body">2026 (synthetic)</dd>
                </div>
                <div className="flex justify-between border-b border-hairline pb-sm">
                  <dt className="text-body-sm text-mute">Team</dt>
                  <dd className="text-body-sm text-body">Placeholder-only</dd>
                </div>
                <div className="flex justify-between pb-sm">
                  <dt className="text-body-sm text-mute">Status</dt>
                  <dd className="text-body-sm text-body">Staging</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
