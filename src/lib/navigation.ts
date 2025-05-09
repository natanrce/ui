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
    name: 'Componentes',
    shouldOpen: true,
    children: [
      {
        name: 'Animated Pixel Icon',
        href: '/docs/components/animated-pixel-icon',
      }
    ]
  },
] satisfies Navigation[];