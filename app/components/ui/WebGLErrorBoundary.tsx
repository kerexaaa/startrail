"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL Error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-[100] text-white font-inter">
          <div className="relative z-10 flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-[90%] text-center">
            <h2 className="text-3xl font-bold mb-4">🌌 3D Engine Failure</h2>
            <p className="text-white/70 mb-6">
              WebGL crashed. This might be due to your GPU or experimental features.
            </p>
            <p className="text-white/40 mb-6 text-sm break-all">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-full transition-colors font-medium border border-white/10"
            >
              Reload Scene
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
