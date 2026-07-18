const columns = [
  {
    title: "Product",
    links: ["Platform", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Support", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark px-6 py-section text-on-dark-mute">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-xl md:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-body-strong font-bold text-on-dark">
                {column.title}
              </h3>
              <ul className="mt-lg flex flex-col gap-md">
                {column.links.map((link) => (
                  <li key={link}>
                    {/* Placeholder links — no routes exist for these yet. */}
                    <span className="text-body-sm text-on-dark-mute">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-section flex flex-col gap-md border-t border-hairline-strong pt-xl md:flex-row md:items-center md:justify-between">
          <span className="text-utility-xs font-bold uppercase text-mute">
            &copy; {new Date().getFullYear()} Wolven Forge (staging placeholder). All rights
            reserved.
          </span>
          <span className="inline-block h-3 w-3 bg-primary" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
