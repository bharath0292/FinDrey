import { createRootRoute, HeadContent } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import globalsCss from '@findrey/styles/globals.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'FinDrey' },
    ],
    links: [
      { rel: 'stylesheet', href: globalsCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
    <body className="antialiased [overflow-wrap:anywhere]">
        <Outlet />
      </body>
    </html>
  );
}
