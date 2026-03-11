// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(useShallow(selector));
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, edges }),
        });
        const data = await response.json();
        setResult(data);
      } catch (err) {
        alert('Error connecting to backend: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
        <>
          <div className="submit-section">
              <button
                className="submit-btn"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Analyzing…' : 'Submit Pipeline'}
              </button>
          </div>

          {/* ── Result Modal ─────────────────────── */}
          {result && (
            <div className="alert-overlay" onClick={() => setResult(null)}>
              <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
                <h3>⚡ Pipeline Analysis</h3>
                <div className="stat-grid">
                  <div className="stat-card">
                    <div className="stat-label">Nodes</div>
                    <div className="stat-value">{result.num_nodes}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Edges</div>
                    <div className="stat-value">{result.num_edges}</div>
                  </div>
                  <div className="stat-card full-width">
                    <div className="stat-label">Directed Acyclic Graph</div>
                    <div className={`stat-value ${result.is_dag ? 'is-dag-true' : 'is-dag-false'}`}>
                      {result.is_dag ? '✓ Yes — Valid DAG' : '✗ No — Contains Cycles'}
                    </div>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setResult(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
    );
}
