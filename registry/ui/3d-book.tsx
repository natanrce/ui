import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

interface ColorProps {
  color: string;
}

function BookPages() {
  return (
    <div
      className="absolute top-[3px] h-[calc(100%-2*3px)] w-[42px]"
      style={{
        background:
          "linear-gradient(90deg,#999 0,transparent 30%),linear-gradient(#fff,#fafafa)",
        transform:
          "translateX(calc(150* 1px - 44px / 2 - 3px)) rotateY(90deg) translateX(calc(44px / 2))",
      }}
    />
  );
}

function BookBack({ color }: ColorProps) {
  return (
    <div
      style={{ "--back-cover-bg": color } as CSSProperties}
      className="absolute left-0 h-[183px] w-[150px] rounded-[5.4px_1.8px_1.8px_5.4px] bg-[var(--back-cover-bg)] [transform:translateZ(calc(-1*44px))]"
    />
  );
}

interface BookProps extends ColorProps {
  title: string;
  subtitle?: string;
  href: string;
  children: ReactNode;
}

function Book({ color, title, subtitle, href, children }: BookProps) {
  return (
    <Link href={href} className="mr-[1em] [perspective:900px]">
      <div className="relative h-[183px] w-[150px] rotate-0 [transform-style:preserve-3d] [transition:transform_600ms_ease_0ms] hover:[transform:rotateY(-20deg)_scale(1.066)_translateX(-8px)]">
        <div
          className="absolute flex size-full flex-1 items-stretch justify-between gap-0 rounded-[5.4px_1.8px_1.8px_5.4px]"
          style={{
            background: `linear-gradient(180deg,hsla(0,0%,100%,.1) 0,hsla(0,0%,100%,0) 50%,hsla(0,0%,100%,0) 100%),${color}`,
            boxShadow: `
              0 1.8px 3.6px rgba(0,0,0,.05),
              0 10.8px 21.6px rgba(0,0,0,.08),
              inset 0 -0.9px 0 rgba(0,0,0,.1),
              inset 0 1.8px 1.8px hsla(0,0%,100%,.1),
              inset 3.6px 0 3.6px rgba(0,0,0,.1)
            `,
          }}
        >
          <div
            className="h-full w-[14px] opacity-[.5]"
            style={{
              background:
                "linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0) 12%,hsla(0,0%,100%,.25) 29.25%,hsla(0,0%,100%,0) 50.5%,hsla(0,0%,100%,0) 75.25%,hsla(0,0%,100%,.25) 91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,.03),rgba(0,0,0,.1) 12%,transparent 30%,rgba(0,0,0,.02) 50%,rgba(0,0,0,.2) 73.5%,rgba(0,0,0,.5) 75.25%,rgba(0,0,0,.15) 85.25%,transparent)",
            }}
          />
          <div className="m-0 flex flex-1 flex-col items-stretch justify-between gap-0 px-5">
            <div>
              <h3 className="mt-4 text-sm font-bold leading-5 text-white/95">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm leading-[20px] text-[#666] [text-shadow:0px_1px_0px_rgba(255,255,255,0.2)]">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </Link>
  );
}

export { Book, BookPages, BookBack };
