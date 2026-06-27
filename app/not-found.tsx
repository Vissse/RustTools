import { ErrorPage } from '@/components/ErrorPage'

export default function NotFound() {
  return (
    <ErrorPage
      title="PAGE NOT FOUND"
      error="The page you're looking for doesn't exist."
    />
  )
}
