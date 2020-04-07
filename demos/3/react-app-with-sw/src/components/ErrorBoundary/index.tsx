import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import { Button } from 'reactstrap';

type ErrorBoundaryProps = {};
type ErrorBoundaryState = {
  hasError: boolean;
  eventId?: string;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Button
          onClick={() =>
            Sentry.showReportDialog({ eventId: this.state.eventId })
          }
        >
          Report feedback
        </Button>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
