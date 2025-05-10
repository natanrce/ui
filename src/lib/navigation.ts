interface Navigation {
  name: string;
  children: {
    name: string;
    href: string;
    canary?: boolean;
  }[];
  shouldOpen?: boolean;
}

export const navigation = [
  {
    name: "Componentes",
    shouldOpen: true,
    children: [
      {
        name: "3D Book",
        href: "/docs/components/3d-book",
      },
      {
        name: "Animated Pixel Icon",
        href: "/docs/components/animated-pixel-icon",
      },
      {
        name: "Animated ASCII Computer",
        href: "/docs/components/animated-ascii-computer",
      },
      {
        name: "Globe",
        href: "/docs/components/globe",
      },
      {
        name: "Intellisense",
        href: "/docs/components/intellisense",
      },
      {
        name: "Powered By",
        href: "/docs/components/powered-by",
      },
    ],
  },
] satisfies Navigation[];
