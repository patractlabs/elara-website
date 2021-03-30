import { useMemo } from 'react'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
// import qs from 'qs'

// https://usehooks.com/useRouter/
export default function useRouter() {
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(
    () => ({
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      // query: {
      //   ...qs.parse(location.search.slice(1)), // Convert string to object
      //   ...params,
      // },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    }),
    [match, location, history],
  )
}
