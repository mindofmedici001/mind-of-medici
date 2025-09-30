import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mind of Medici",
  description: "Free: Cover, Planner, Watchlist & Alerts • Pro: Coach, Signals, Live, Community, Partners, Ads, News"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding:"12px 16px", background:"#0f172a", color:"#fff", display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap"}}>
          <img src="/logo.svg" alt="Mind of Medici" style={{height:32, width:32}} />
          <strong style={{fontSize:18}}>Mind of Medici</strong>
          <span style={{fontSize:12, opacity:0.85}}>Free: Cover, Planner, Watchlist | Pro: Coach, Signals, Live, Community, Partners, Ads, News</span>
        </header>
        {children}
      </body>
    </html>
  );
}
