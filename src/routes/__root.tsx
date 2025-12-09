import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string
const convex = new ConvexReactClient(convexUrl);

export const Route = createRootRoute({
  component: () => (
    <>
      <ConvexProvider client={convex}>
        <Outlet />
      </ConvexProvider>
    </>
  ),
})
