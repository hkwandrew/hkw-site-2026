import { createElement } from 'react'
import { Navigate, createBrowserRouter } from 'react-router'
import AppLayout from '@/app/layout/AppLayout'
import { getRouteChildrenConfig } from './routeRegistry'

export const createAppRouter = () =>
  createBrowserRouter([
    {
      Component: AppLayout,
      children: [
        ...getRouteChildrenConfig(),
        {
          path: '*',
          element: createElement(Navigate, { to: '/', replace: true }),
        },
      ],
    },
  ], {
    basename: import.meta.env.BASE_URL,
  })
