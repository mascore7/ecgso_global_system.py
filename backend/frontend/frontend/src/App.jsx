import React, { useState } from 'react';

export default function EcgsoFrontend() {
  const [question, setQuestion] = useState('');
  const [communityId, setCommunityId] = useState('market_node_garowe_01');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOfflineQuery = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/offline-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ community_id: communityId, question })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ status: "ERROR", response: "Could not connect to ECGSO Backend. Ensure FastAPI is running." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center py-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-black tracking-wider text-white">ECGSO<span className="text-cyan-400">.COM</span></h1>
          <p className="text-xs text-slate-400">EVOLVERA CORE GLOBAL SYSTEM ONLINE.COM + OFFLINE COMMUNITIES LIVE</p>
        </div>
        <div className="text-xs bg-cyan-950 border border-cyan-800 text-cyan-400 px-3 py-1 rounded-full font-mono">
          Meta AI Llama 3.2 + Sovereignty AI
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The First AI System Working <span className="text-cyan-400">100% OFFLINE</span> in Villages & Markets
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Syncs securely via Zero-Trust HMAC when online. No external data leakage, absolute sovereignty.
          </p>
        </div>

        {/* INTERACTIVE LIVE DEMO BOX */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold mb-4 text-cyan-400">Live Offline Node Simulator</h3>
          <form onSubmit={handleOfflineQuery} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Community / Village Node ID</label>
              <input 
                type="text" 
                value={communityId} 
                onChange={(e) => setCommunityId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Ask Offline Node (e.g. mushaarka_suuqa)</label>
              <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Tusaale: Maxaa ka jira mushaarka_suuqa?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition text-sm disabled:opacity-50"
            >
              {loading ? "Executing Local Llama 3.2..." : "Execute Offline Query"}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-slate-950 border border-cyan-900/50 rounded-xl font-mono text-xs">
              <p className="text-cyan-400 font-bold mb-1">STATUS: {result.status}</p>
              <p className="text-slate-300">{result.response || JSON.stringify(result, null, 2)}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
