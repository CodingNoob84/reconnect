import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { authQueries } from "#/query/auth";
import { NotFoundComponent } from "#/components/layout/not-found";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const authState = await context.queryClient.ensureQueryData(
      authQueries.user(),
    );
    return { authState };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "color-scheme",
        content: "light",
      },
      {
        title: "ReConnect",
      },

      // SEO description
      {
        name: "description",
        content:
          "ReConnect is an alumni network platform to preserve memories, reconnect classmates, and build lasting professional relationships.",
      },

      // Open Graph
      {
        property: "og:title",
        content: "ReConnect",
      },
      {
        property: "og:description",
        content:
          "Reconnect with classmates, explore memories, and build your alumni network.",
      },
      {
        property: "og:image",
        content: "/images/ogimage.png",
      },
      {
        property: "og:type",
        content: "website",
      },

      // Twitter card (optional but recommended)
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "ReConnect",
      },
      {
        name: "twitter:description",
        content: "Reconnect with classmates and explore shared memories.",
      },
      {
        name: "twitter:image",
        content: "/images/ogimage.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (() => {
          const d = document.documentElement;
          d.classList.remove('dark');
          d.classList.add('light');
          d.style.colorScheme = 'light';
        })();
      `,
          }}
        />
        <meta name="color-scheme" content="light" />
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
