import { useState } from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/tanstack-react-start";
import { Logo } from "./Logo";
import { WaitlistModal } from "./WaitlistModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Nav({ light = false }: { light?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#" className={`flex items-center gap-2 text-white`}>
          <Logo className="h-9 w-9" />
          <span className="text-xl font-medium tracking-tight">Medexa Research</span>
        </a>

        {/* Shadcn Navigation Menu (Desktop) */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1 bg-white/10 p-1 rounded-full backdrop-blur-md border border-white/20">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/20 hover:text-white data-[state=open]:bg-white/20 data-[state=open]:text-white focus:bg-white/20">
                  Research
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Logo className="h-6 w-6 mb-2 text-ink" />
                          <div className="mb-2 mt-4 text-lg font-medium text-ink">
                            Clinical Network
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Connect with leading medical researchers and shape the future of
                            medicine.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#about" title="Our Process">
                      How we match specialists with active clinical trials.
                    </ListItem>
                    <ListItem href="#publications" title="Publications">
                      Read peer-reviewed findings from our network.
                    </ListItem>
                    <ListItem href="#pillars" title="Data Ethics">
                      Our commitment to rigorous, secure data practices.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/20 hover:text-white data-[state=open]:bg-white/20 data-[state=open]:text-white focus:bg-white/20">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem title="Biomarker Tracking" href="#">
                      Real-time analysis of cohort expression patterns.
                    </ListItem>
                    <ListItem title="Genomic Mapping" href="#">
                      High-throughput sequencing and variant analysis.
                    </ListItem>
                    <ListItem title="Trial Enrollment" href="#">
                      Streamlined matching and retention tools.
                    </ListItem>
                    <ListItem title="API Integrations" href="#">
                      Secure FHIR-compliant data pipelines.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:bg-white/20 disabled:pointer-events-none disabled:opacity-50"
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <nav className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-white hover:text-white/80 transition-colors cursor-pointer px-3 py-2">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:bg-white/90 cursor-pointer">
                Apply to Network
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </div>
      <WaitlistModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}

const ListItem = ({ className, title, children, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground " +
            (className || "")
          }
          {...props}
        >
          <div className="text-sm font-medium leading-none text-ink">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
