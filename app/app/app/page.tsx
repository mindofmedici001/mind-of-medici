"use client";
import { useState } from "react";

const defaultChecklist = [
  { group: "News & Catalysts", items: ["Breaking news checked (earnings/Fed/CPI/jobs)", "Scheduled data (8:30/10:00/2:00) reviewed", "Company-specific catalysts identified"] },
  { group: "Pre-Market Context", items: ["Index futures & sector tone (risk-on/off)", "Gap vs prior close noted", "IV, IV Rank, IV Percentile logged"] },
  { group: "VWAP & Levels", items: ["Above/below VWAP bias set", "Key support/resistance with volume", "Pattern fit vs 100+ chart set"] }
];

export default function Home() {
  const [tab, setTab] = useState<
    "cover"|"planner"|"watchlist"|
    "coach"|"signals"|"live"|"community"|"partners"|"ads"|"news"
  >("cover");

  // Watchlist/Alerts (free)
  const [symbol, setSymbol] = useState("SPY");
  const [watchlist, setWatchlist] = useState<string[]>(["SPY", "AAPL", "NVDA"]);
  const [alertPx, setAlertPx] = useState("");
  const [alerts, setAlerts] = useState<{sym:string; px:number}[]>([]);
  const addSymbol = () => { const s = symbol.trim().toUpperCase(); if(s && !watchlist.includes(s)) setWatchlist(w=>[...w,s]); setSymbol(""); };
  const addAlert = () => { const n = Number(alertPx); if(Number.isFinite(n)) setAlerts(a=>[...a,{sym:watchlist[0]||"SPY", px:n}]); setAlertPx(""); };

  // Planner notes (free)
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");

  // Coach (Pro placeholder)
  const [ticker, setTicker] = useState("SPY");
  const [coachOut, setCoachOut] = useState("");
  const [loadingCoach, setLoadingCoach] = useState(false);
  async function runCoach() {
    setLoadingCoach(true); setCoachOut("");
    try {
      const res = await fetch("/api/medici"); // GET
      const data = await res.json();
      setCoachOut(`Coach placeholder active. API says: ${JSON.stringify(data)}`);
    } catch {
      setCoachOut("Coach error.");
    } finally { setLoadingCoach(false); }
  }

  return (
    <main>
      {/* Tabs */}
      <div className="btnbar">
        <button className={tab==="cover"?"":"secondary"} onClick={()=>setTab("cover")}>Cover</button>
        <button className={tab==="planner"?"":"secondary"} onClick={()=>setTab("planner")}>Planner</button>
        <button className={tab==="watchlist"?"":"secondary"} onClick={()=>setTab("watchlist")}>Watchlist & Alerts</button>
        <button className="secondary" onClick={()=>setTab("coach")}>Medici Coach<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("signals")}>Trade Signals<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("live")}>Live Rooms (10)<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("community")}>Community & DMs<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("partners")}>Partners<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("ads")}>Ads<span className="lock">Pro</span></button>
        <button className="secondary" onClick={()=>setTab("news")}>Live News<span className="lock">Pro</span></button>
      </div>

      {tab==="cover" && (
        <section className="card">
          <h2>Market Cover Page</h2>
          <p className="muted">Heatmap, Indices, Currencies, Futures (placeholder — wire data later).</p>
          <div className="grid grid-2">
            <div className="card"><strong>Indices</strong><div className="muted">SPX +0.4%, NDX +0.6% (mock)</div></div>
            <div className="card"><strong>Currencies</strong><div className="muted">DXY 104.6 (mock)</div></div>
            <div className="card"><strong>Futures</strong><div className="muted">ES, NQ, CL, GC (mock)</div></div>
            <div className="card"><strong>Heatmap</strong><div className="muted">Grid placeholder…</div></div>
          </div>
        </section>
      )}

      {tab==="planner" && (
        <section className="grid grid-2">
          <div className="card">
            <h3>Pre-Trade Checklist</h3>
            {defaultChecklist.map(group=>(
              <div key={group.group} style={{margin:"8px 0", padding:"8px", border:"1px solid #e5e7eb", borderRadius:8}}>
                <div style={{fontWeight:600}}>{group.group}</div>
                {group.items.map(item=>{
                  const key = `${group.group}:${item}`; const on = !!checks[key];
                  return (
                    <label key={key} style={{display:"flex", justifyContent:"space-between", padding:"4px 0"}}>
                      <span style={{textDecoration:on?"line-through":"none", color:on?"#94a3b8":"inherit"}}>{item}</span>
                      <input type="checkbox" checked={on} onChange={()=>setChecks(c=>({...c,[key]:!c[key]}))} />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Notes & Bias</h3>
            <textarea rows={12} placeholder="Thesis, risk, invalidation, catalysts…" value={notes} onChange={(e)=>setNotes(e.target.value)} />
          </div>
        </section>
      )}

      {tab==="watchlist" && (
        <section className="grid grid-2">
          <div className="card">
            <h3>Watchlist</h3>
            <div style={{display:"flex", gap:8}}>
              <input placeholder="Add symbol" value={symbol} onChange={(e)=>setSymbol(e.target.value)} />
              <button onClick={addSymbol}>Add</button>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
              {watchlist.map(s=>(<div key={s} className="card" style={{margin:0, textAlign:"center"}}><strong>{s}</strong></div>))}
            </div>
          </div>
          <div className="card">
            <h3>Create Price Alert</h3>
            <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:8}}>
              <div>
                <div className="muted">Alert when {watchlist[0] || "SPY"} hits…</div>
                <input placeholder="e.g., 447.50" value={alertPx} onChange={(e)=>setAlertPx(e.target.value)} />
              </div>
              <button onClick={addAlert}>Add Alert</button>
            </div>
            <div style={{marginTop:8}}>
              {alerts.length===0 ? (<div className="muted">No alerts yet.</div>) : alerts.map((a,i)=>(
                <div key={i} style={{display:"flex", justifyContent:"space-between", border:"1px solid #e5e7eb", borderRadius:8, padding:"6px 8px", margin:"6px 0"}}>
                  <span><strong>{a.sym}</strong> @ {a.px}</span>
                  <span className="muted">(Local only)</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab==="coach" && (
        <section className="card">
          <h3>Medici Coach (Pro)</h3>
          <p className="muted">Owner/Pro only — we’ll wire OpenAI later.</p>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <input value={ticker} onChange={(e)=>setTicker(e.target.value.toUpperCase())} placeholder="e.g., SPY, AAPL, BTCUSD" style={{maxWidth:220}} />
            <button onClick={runCoach} disabled={loadingCoach}>{loadingCoach?"Analyzing…":"Analyze"}</button>
          </div>
          {coachOut && <div style={{marginTop:8, padding:8, border:"1px solid #e5e7eb", borderRadius:8, background:"#f8fafc"}}>{coachOut}</div>}
        </section>
      )}

      {tab==="signals" && (
        <section className="card"><h3>Trade Signals (Pro)</h3><p className="muted">Paid members only — manual & auto signals appear here later.</p></section>
      )}
      {tab==="live" && (
        <section className="card"><h3>Live Rooms (Pro)</h3><p className="muted">Up to 10 participants via WebRTC (placeholder).</p></section>
      )}
      {tab==="community" && (
        <section className="card"><h3>Community & DMs (Pro)</h3><p className="muted">Rooms for Crypto/Stocks/Forex + anti-spam + private messages (placeholder).</p></section>
      )}
      {tab==="partners" && (
        <section className="card"><h3>Recommended Partners (Pro)</h3><p className="muted">Banks/brokers/education with affiliate disclosures (placeholder).</p></section>
      )}
      {tab==="ads" && (
        <section className="card"><h3>In-App Advertising (Pro)</h3><p className="muted">Your self-serve ad placements appear here (placeholder).</p></section>
      )}
      {tab==="news" && (
        <section className="card"><h3>Live Video News (Pro)</h3><p className="muted">CNBC/CNN/Fox Business embeds (must respect provider terms; placeholder).</p></section>
      )}
    </main>
  );
}
