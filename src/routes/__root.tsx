import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = "https://modest-hawk-185.convex.cloud"
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
