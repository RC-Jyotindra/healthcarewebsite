import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-cream-deep py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
        <div className="flex items-center gap-3 text-ink">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg">Medexa Research</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Medexa Research Institute. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-ink">
            Privacy
          </a>
          <a href="#" className="hover:text-ink">
            Terms
          </a>
          <a href="#" className="hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
