import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('elden-ring-tracker-state');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-elden-950 text-slate-100 p-4 font-sans">
          <div className="max-w-md w-full bg-elden-900 border border-amber-600/40 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Ocurrió un problema al cargar
            </h2>
            <p className="text-xs text-slate-400">
              Se ha detectado un error inesperado al renderizar la aplicación. Pulsa el botón para restablecer la vista.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-red-300 bg-black/40 p-2.5 rounded-lg text-left overflow-x-auto max-h-32 custom-scrollbar font-mono">
                {String(this.state.error?.message || this.state.error)}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-elden-gold hover:bg-amber-400 text-elden-950 font-serif font-bold text-sm shadow-gold-glow transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer y Recargar</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
