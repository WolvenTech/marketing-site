import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Wolven Forge, a synthetic placeholder company.",
};

// Static contact page — mailto only, no form, no third-party form backend.
export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-surface-dark px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <span className="text-caption-md font-bold uppercase text-primary">
              Contact
            </span>
            <h1 className="mt-lg max-w-[20ch] text-display-lg font-bold text-on-dark">
              Reach the placeholder team.
            </h1>
          </div>
        </section>
        <Section tone="canvas">
          <div className="max-w-[60ch] rounded-sm border border-hairline bg-surface-elevated p-xxl">
            <h2 className="text-heading-md font-bold text-on-dark">Email us</h2>
            <p className="mt-sm text-body-md text-body">
              This is a staging placeholder — no form is wired up. Send mail
              directly instead.
            </p>
            <div className="mt-lg">
              <CTA
                href="mailto:hello@staging-marketing-site.wolven.com.br"
                variant="primary"
              >
                hello@staging-marketing-site.wolven.com.br
              </CTA>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
