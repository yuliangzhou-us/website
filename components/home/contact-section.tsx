import { addressLines, department, email, mapsUrl, phone, school, university } from "@/lib/site-data";
import { CopyButton } from "@/components/ui/copy-button";
import { EmailIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-bg py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        <SectionHeading kicker="Get in touch" title="Contact" />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="grid gap-5">
            <div data-reveal className="card flex items-start gap-5 p-6">
              <ContactIcon>
                <EmailIcon className="h-5 w-5" />
              </ContactIcon>
              <div className="min-w-0">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a href={`mailto:${email}`} className="text-link break-all text-[1.02rem]">
                    {email}
                  </a>
                  <CopyButton value={email} label="Copy email address" showLabel />
                </p>
              </div>
            </div>

            <div data-reveal className="card flex items-start gap-5 p-6">
              <ContactIcon>
                <PhoneIcon className="h-5 w-5" />
              </ContactIcon>
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">Phone</h3>
                <a href={`tel:+1${phone.replace(/\D/g, "")}`} className="text-link mt-2 inline-block text-[1.02rem]">
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div data-reveal className="card flex flex-col p-6">
            <ContactIcon>
              <MapPinIcon className="h-5 w-5" />
            </ContactIcon>
            <h3 className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">Office</h3>
            <address className="mt-2 text-[0.98rem] not-italic leading-7 text-ink-2">
              {department}
              <br />
              {school}, {university}
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 font-sans text-xs font-medium text-muted transition hover:text-brand"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand ring-1 ring-brand/15">
      {children}
    </span>
  );
}
