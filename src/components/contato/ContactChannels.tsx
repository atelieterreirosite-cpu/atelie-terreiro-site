import type { SiteAddress, SiteContact, SocialLink } from "@/types/site";

interface ContactChannelsProps {
  siteName: string;
  address: SiteAddress;
  contact: SiteContact;
  social: SocialLink[];
  whatsappNote?: string;
}

export function ContactChannels({
  siteName,
  address,
  contact,
  social,
  whatsappNote,
}: ContactChannelsProps) {
  const addressLines = [
    siteName,
    address.street,
    [address.neighborhood, address.city].filter(Boolean).join(", "),
    address.region,
  ].filter(Boolean);
  const hasAddress = addressLines.length > 0;
  const hasEmail = Boolean(contact.email);
  const hasWhatsapp = Boolean(contact.whatsapp.display || contact.whatsapp.href);
  const hasCommunication = hasEmail || hasWhatsapp;

  return (
    <div className="space-y-12">
      {hasAddress ? (
        <section className="space-y-4">
          <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Endereço</h2>
          <address className="text-base leading-relaxed text-foreground/90 not-italic">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </section>
      ) : null}

      {hasCommunication ? (
        <section className="space-y-4">
          <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Comunicação</h2>
          <ul className="space-y-4">
            {hasEmail ? (
              <li>
                <a href={`mailto:${contact.email}`} className="group block">
                  <span className="text-xs tracking-[0.1em] text-muted-light uppercase">E-mail</span>
                  <p className="link-underline mt-1 text-base text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                    {contact.email}
                  </p>
                </a>
              </li>
            ) : null}
            {hasWhatsapp ? (
              <li>
                {contact.whatsapp.href ? (
                  <a
                    href={contact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="text-xs tracking-[0.1em] text-muted-light uppercase">
                      WhatsApp
                    </span>
                    <p className="link-underline mt-1 text-base text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                      {contact.whatsapp.display || contact.whatsapp.href}
                    </p>
                  </a>
                ) : (
                  <div>
                    <span className="text-xs tracking-[0.1em] text-muted-light uppercase">
                      WhatsApp
                    </span>
                    <p className="mt-1 text-base text-foreground/90">{contact.whatsapp.display}</p>
                  </div>
                )}
                {whatsappNote ? (
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-light">
                    {whatsappNote}
                  </p>
                ) : null}
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

      {social.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Redes</h2>
          <ul className="space-y-3">
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-base text-foreground/85 transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
