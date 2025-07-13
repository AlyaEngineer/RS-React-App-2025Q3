import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types/errorTypes';

function logErrorToMyService(
  error: Error,
  componentStack: string,
  ownerStack?: string | null
): void {
  console.log('Error:', error.message);
  console.log('Stack:', componentStack);

  if (ownerStack) {
    console.log('OwnerStack:', ownerStack);
  }
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logErrorToMyService(error, info.componentStack ?? '');
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
