import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";

// All company/product copy on this page is synthetic placeholder content.
const stats = [
  { value: "4.2x", caption: "Faster deploy cycles reported in placeholder pilot data." },
  { value: "99.98%", caption: "Synthetic uptime figure for staging demonstration only." },
  { value: "38%", caption: "Illustrative cost delta used to exercise this layout." },
];

const capabilities = [
  { title: "Provisioning", body: "Stand up environments from a declarative spec, placeholder copy." },
  { title: "Observability", body: "Trace requests end to end across synthetic services." },
  { title: "Access control", body: "Scope credentials per workload, sample policy language." },
  { title: "Rollback", body: "Revert a release in one step, demo-only description." },
];

const resources = [
  { tag: "WHITE PAPER", title: "Structured platform rollouts", body: "A placeholder resource entry used to test the resource-card pattern." },
  { tag: "WEBINAR", title: "Staging environments at scale", body: "Synthetic session description for layout purposes only." },
  { tag: "BLOG", title: "Notes on angular design systems", body: "Sample editorial teaser text, not a real article." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — asymmetric: copy hugs the left 3/5, decorative panel fills the right */}
        <section className="bg-surface-dark px-6 pb-16 pt-16 md:pb-24 md:pt-20">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-xl lg:grid-cols-5 lg:gap-xxl">
            <div className="lg:col-span-3">
              <span className="text-caption-md font-bold uppercase text-primary">
                Staging build
              </span>
              <h1 className="mt-lg text-display-xl font-bold text-on-dark">
                Infrastructure that ships at the pace of the roadmap.
              </h1>
              <p className="mt-lg max-w-[46ch] text-heading-lg font-normal text-on-dark-mute">
                Wolven Forge is a placeholder company built to stage this
                marketing site&apos;s layout, tone, and component system.
              </p>
              <div className="mt-xl flex flex-wrap items-center gap-lg">
                <CTA href="/contact" variant="primary" size="lg">
                  Talk to us
                </CTA>
                <CTA href="/about" variant="outline-on-dark" size="lg">
                  About the project
                </CTA>
              </div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="grid aspect-square grid-cols-4 gap-xxs">
                {Array.from({ length: 16 }).map((_, i) => {
                  const isAccent = i === 2 || i === 9 || i === 13;
                  const isElevated = i % 5 === 0;
                  return (
                    <div
                      key={i}
                      className={
                        isAccent
                          ? "bg-primary"
                          : isElevated
                            ? "bg-surface-elevated"
                            : "border border-hairline-strong"
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Stat strip — canvas surface, three distinct callouts */}
        <Section tone="canvas">
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-sm border border-hairline bg-surface-elevated p-xxl"
              >
                <span className="text-display-lg font-bold text-primary">{stat.value}</span>
                <p className="mt-sm text-body-md text-body">{stat.caption}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Capabilities — asymmetric 2-column: heading block + list, soft tone */}
        <Section tone="soft">
          <div className="grid grid-cols-1 gap-xxl lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="text-caption-md font-bold uppercase text-mute">Platform</span>
              <h2 className="mt-md text-display-lg font-bold text-on-dark">
                Four primitives, one control plane.
              </h2>
              <p className="mt-lg text-body-md text-body">
                Placeholder description of the underlying capability set used
                to exercise this section&apos;s editorial layout.
              </p>
            </div>
            <div className="lg:col-span-3">
              <ul className="flex flex-col">
                {capabilities.map((item, i) => (
                  <li
                    key={item.title}
                    className={`relative flex items-start gap-lg py-lg ${
                      i !== capabilities.length - 1 ? "border-b border-hairline" : ""
                    }`}
                  >
                    <span className="mt-[6px] h-3 w-3 shrink-0 bg-primary" aria-hidden="true" />
                    <div>
                      <h3 className="text-heading-md font-bold text-on-dark">{item.title}</h3>
                      <p className="mt-xs text-body-sm text-mute">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Resource cards — canvas surface */}
        <Section tone="canvas">
          <span className="text-caption-md font-bold uppercase text-mute">Resources</span>
          <h2 className="mt-md text-display-lg font-bold text-on-dark">Latest write-ups</h2>
          <div className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="relative rounded-sm border border-hairline bg-surface-elevated p-xl"
              >
                <span className="absolute left-0 top-0 h-3 w-3 bg-primary" aria-hidden="true" />
                <span className="text-caption-md font-bold uppercase text-mute">
                  {resource.tag}
                </span>
                <h3 className="mt-md text-card-title font-bold text-on-dark">
                  {resource.title}
                </h3>
                <p className="mt-sm text-body-sm text-mute">{resource.body}</p>
                <div className="mt-lg">
                  <CTA href="/about" variant="ghost">
                    Read more
                  </CTA>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA strip — dark surface, single row bridge before footer */}
        <section className="bg-surface-dark px-6 py-xxl">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-lg md:flex-row md:items-center">
            <h2 className="text-heading-xl font-bold text-on-dark">
              Ready to see it running?
            </h2>
            <CTA href="/contact" variant="primary" size="md">
              Get started
            </CTA>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
