import { Component } from 'react'
import theme from '@/styles/theme'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: theme.font.family,
            color: theme.colors.blue.dark,
            backgroundColor: theme.colors.yellow.light,
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: theme.typography.h4.size, marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: theme.typography.bodyMedium.size,
              marginBottom: '2rem',
              opacity: 0.7,
            }}
          >
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              fontSize: theme.typography.smallButton.size,
              fontWeight: theme.typography.smallButton.weight,
              color: theme.colors.yellow.light,
              backgroundColor: theme.colors.orange.base,
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
