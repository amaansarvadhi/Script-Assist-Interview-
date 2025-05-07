import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred: {this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
