import { createRoot } from "react-dom/client";
import { Component, type ErrorInfo, type ReactNode } from "react";
import App from "./App.tsx";
import "./index.css";

interface RootErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends Component<{ children: ReactNode }, RootErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: unknown): RootErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : "Unknown application error",
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Root render error:", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-background px-6 py-10 text-foreground">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/50 bg-card/90 p-6">
          <h1 className="mb-3 text-2xl font-heading font-bold">SmartByte Website Error</h1>
          <p className="mb-2 text-muted-foreground">
            The app hit a runtime error during startup. Please refresh once and if this persists, contact support.
          </p>
          <pre className="overflow-auto rounded-lg bg-background/70 p-3 text-sm text-red-300">
            {this.state.errorMessage}
          </pre>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
