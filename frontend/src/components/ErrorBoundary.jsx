import { Component } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Button from "./ui/Button";

// Class component is required here — React error boundaries can only be
// implemented with getDerivedStateFromError / componentDidCatch, there's
// no hook equivalent (as of React 19).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Logged to the console for now; swap for a real error-tracking
    // service (Sentry, LogRocket, etc.) later if needed.
    console.error("Uncaught render error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-3 px-4">
          <HiOutlineExclamationTriangle className="w-10 h-10 text-text-secondary" />
          <h1 className="text-lg font-semibold text-text">Something went wrong</h1>
          <p className="text-sm text-text-secondary max-w-sm">
            An unexpected error occurred while loading this page. Try going back
            to your dashboard.
          </p>
          <Button className="mt-2" onClick={this.handleReset}>
            Back to dashboard
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}