import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { ErrorPage } from '../components/ErrorPage'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} />
  ),
  notFoundComponent: () => (
    <ErrorPage
      title="PAGE NOT FOUND"
      error="The page you're looking for doesn't exist."
    />
  ),
})

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
