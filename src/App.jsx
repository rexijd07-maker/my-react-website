import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [devices, setDevices] = useState(128);
  const [traffic, setTraffic] = useState(64);
  const [alerts, setAlerts] = useState(3);
  const [trafficData, setTrafficData] = useState([35, 55, 25, 70, 45, 60, 30, 75, 50, 65, 40, 80]);
const [selectedNode, setSelectedNode] = useState(null);
const [activePage, setActivePage] = useState("Dashboard");
const [monitoring, setMonitoring] = useState(true);
const [liveUpdates, setLiveUpdates] = useState(true);
const [alertSystem, setAlertSystem] = useState(true);
const [refreshInterval, setRefreshInterval] = useState(3);
const nodeDetails = {
  "Internet": {
    devices: "—",
    status: "Connected",
    traffic: "Normal",
    response: "—"
  },

  "Main Router": {
    devices: "—",
    status: "Healthy",
    traffic: "Normal",
    response: "18 ms"
  },

  "Computer Lab A": {
    devices: 42,
    status: "Healthy",
    traffic: "Normal",
    response: "18 ms"
  },

  "Library": {
    devices: 31,
    status: "Healthy",
    traffic: "Normal",
    response: "18 ms"
  },

  "Computer Lab B": {
    devices: 55,
    status: "Warning",
    traffic: "High",
    response: "18 ms"
  }
};
  useEffect(() => {
  if (!loggedIn || !monitoring || !liveUpdates) return;
  const timer = setInterval(() => {
    setDevices((value) =>
      Math.max(0, value + (Math.random() > 0.5 ? 1 : -1))
    );

    setTraffic(Math.floor(Math.random() * 30) + 55);

    if (alertSystem) {
      setAlerts(Math.floor(Math.random() * 5));
    }

    setTrafficData((prev) =>
      [...prev.slice(1), Math.floor(Math.random() * 30) + 55]
    );
  }, refreshInterval * 1000);

  return () => clearInterval(timer);
}, [loggedIn, monitoring, liveUpdates, alertSystem, refreshInterval]);
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@college.com" && password === "admin123") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo">◈</div>

          <h1>NetWatch</h1>
          <p>College Network Administration Portal</p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@college.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="error">{error}</div>}

            <button type="submit">Sign In →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>◈ NetWatch</h2>

        <div
  className={`nav ${activePage === "Dashboard" ? "active" : ""}`}
  onClick={() => setActivePage("Dashboard")}
>
  Dashboard
</div>

<div
  className={`nav ${activePage === "Devices" ? "active" : ""}`}
  onClick={() => setActivePage("Devices")}
>
  Devices
</div>

<div
  className={`nav ${activePage === "Traffic" ? "active" : ""}`}
  onClick={() => setActivePage("Traffic")}
>
  Traffic
</div>

<div
  className={`nav ${activePage === "Alerts" ? "active" : ""}`}
  onClick={() => setActivePage("Alerts")}
>
  Alerts
</div>

<div
  className={`nav ${activePage === "Settings" ? "active" : ""}`}
  onClick={() => setActivePage("Settings")}
>
  Settings
</div>

        <button
          className="logout"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>
      </aside>

      <main className="main-content">
       {activePage === "Devices" ? (
 <section className="devices-page">

  <div className="section-title">
    <div>
      <h2>Devices</h2>
      <p>Manage and monitor connected network devices</p>
    </div>

    <span className="live-badge">● LIVE</span>
  </div>

  <div className="cards">

    <div className="card">
      <small>TOTAL DEVICES</small>
      <h2>128</h2>
      <p>Registered network devices</p>
    </div>

    <div className="card">
      <small>ONLINE</small>
      <h2>117</h2>
      <p>Currently connected</p>
    </div>

    <div className="card">
      <small>OFFLINE</small>
      <h2>11</h2>
      <p>Currently unavailable</p>
    </div>

    <div className="card">
      <small>NETWORK HEALTH</small>
      <h2>98%</h2>
      <p>Overall device health</p>
    </div>

  </div>

  <div className="card">
    <h3>Connected Devices</h3>
    <p>Computer Lab A — 42 devices</p>
    <p>Library — 31 devices</p>
    <p>Computer Lab B — 55 devices</p>
  </div>
<section className="traffic-section">
  <div className="section-title">
    <div>
      <h2>Live Device Activity</h2>
      <p>Real-time device activity</p>
    </div>

    <span className="live-badge">● LIVE</span>
  </div>

  <div className="chart">
    {trafficData.map((value, index) => (
      <div
        key={index}
        className={`bar b${index + 1}`}
        style={{ height: `${value}%` }}
      ></div>
    ))}
  </div>
</section>
</section>
       ) : activePage === "Traffic" ? (
        <section className="traffic-page">
  <div className="section-title">
    <div>
      <h2>Traffic Monitor</h2>
      <p>Real-time network traffic overview</p>
    </div>
    <span className="live-badge">● LIVE</span>
  </div>

  <div className="cards">
    <div className="card">
      <small>CURRENT TRAFFIC</small>
      <h2>{traffic}%</h2>
      <p>Network traffic load</p>
    </div>

    <div className="card">
      <small>DOWNLOAD</small>
      <h2>180 Mbps</h2>
      <p>Current download speed</p>
    </div>

    <div className="card">
      <small>UPLOAD</small>
      <h2>52 Mbps</h2>
      <p>Current upload speed</p>
    </div>

    <div className="card">
      <small>RESPONSE</small>
      <h2>18 ms</h2>
      <p>Network response time</p>
    </div>
  </div>
  <section className="traffic-section">
  <div className="section-title">
    <div>
      <h2>Live Traffic Monitor</h2>
      <p>Network activity in real time</p>
    </div>

    <span className="live-badge">● LIVE</span>
  </div>

  <div className="chart">
    {trafficData.map((value, index) => (
      <div
        key={index}
        className={`bar b${index + 1}`}
        style={{ height: `${value}%` }}
      ></div>
    ))}
  </div>
</section>
</section>
) : activePage === "Settings" ? (

  <section className="settings-page">

    <div className="section-title">
      <div>
        <h2>Settings</h2>
        <p>Manage network dashboard settings</p>
      </div>
    </div>

    <div className="settings-list">

      <div className="setting-row">
        <div>
          <h3>Network Monitoring</h3>
          <p>Enable real-time network monitoring</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={monitoring}
            onChange={(e) => setMonitoring(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>


      <div className="setting-row">
        <div>
          <h3>Live Updates</h3>
          <p>Automatically update network data</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={liveUpdates}
            onChange={(e) => setLiveUpdates(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>


      <div className="setting-row">
        <div>
          <h3>Alert System</h3>
          <p>Receive network alert notifications</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={alertSystem}
            onChange={(e) => setAlertSystem(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>


      <div className="setting-row">
        <div>
          <h3>Refresh Interval</h3>
          <p>Choose how often data refreshes</p>
        </div>

        <select
          value={refreshInterval}
          onChange={(e) =>
            setRefreshInterval(Number(e.target.value))
          }
        >
          <option value="3">3 seconds</option>
          <option value="5">5 seconds</option>
          <option value="10">10 seconds</option>
          <option value="30">30 seconds</option>
        </select>
      </div>

    </div>

  </section>

) : activePage === "Alerts" ? (
  <section className="alerts-page">
    <div className="section-title">
      <div>
        <h2>Alerts</h2>
        <p>Network alerts and notifications</p>
      </div>
      <span className="live-badge">● LIVE</span>
    </div>
      <div className="card">
        <small>NETWORK STATUS</small>
        <h2>Healthy</h2>
        <p>Overall network condition</p>
      </div>
    
</section>
       ) : (
  <>
        <header>
          <div>
            <h1>Network Dashboard</h1>
            <p>Real-time college network overview</p>
          </div>

          <div className="online">
            <span></span>
            Network Online
          </div>
        </header>

        <section className="health-panel dashboard-stats">

  <div className="stat-card">
    <span className="stat-label">NETWORK HEALTH</span>
    <strong className="stat-value">94<span>/100</span></strong>
    <small className="stat-good">Excellent</small>
  </div>

  <div className="stat-card">
    <span className="stat-label">UPTIME</span>
    <strong className="stat-value">99.9%</strong>
    <small>This month</small>
  </div>

  <div className="stat-card">
    <span className="stat-label">TOTAL DEVICES</span>
    <strong className="stat-value">128</strong>
    <small>117 online · 11 offline</small>
  </div>

  <div className="stat-card">
    <span className="stat-label">NETWORK STATUS</span>
    <strong className="stat-status">● ONLINE</strong>
    <small className="stat-good">All systems operational</small>
  </div>

</section>
<section className="network-map">
  <div className="section-title">
    <div>
      <h2>Live Network Map</h2>
      <p>Current connection status across campus</p>
    </div>

    <span className="live-badge">● LIVE</span>
  </div>

  <div className="network-map-area">

    <div className="network-node internet" onClick={() => setSelectedNode("Internet")}>
      <div className="node-icon">🌐</div>
      <strong>Internet</strong>
      <small>Connected</small>
    </div>

    <div className="connection line-main"></div>

    <div className="network-node router" onClick={() => setSelectedNode("Main Router")}>
      <div className="node-icon">📡</div>
      <strong>Main Router</strong>
      <small>18 ms • Healthy</small>
    </div>

    <div className="connection line-left"></div>
    <div className="connection line-center"></div>
    <div className="connection line-right"></div>

    <div className="network-node lab-a" onClick={() => setSelectedNode("Computer Lab A")}>
      <div className="node-icon">🖥️</div>
      <strong>Computer Lab A</strong>
      <small className="healthy">● 42 Devices</small>
    </div>

    <div className="network-node library" onClick={() => setSelectedNode("Library")}>
      <div className="node-icon">📚</div>
      <strong>Library</strong>
      <small className="healthy">● 31 Devices</small>
    </div>

    <div className="network-node lab-b" onClick={() => setSelectedNode("Computer Lab B")}>
      <div className="node-icon">💻</div>
      <strong>Computer Lab B</strong>
      <small className="warning">● High Traffic</small>
    </div>

  </div>
</section>

{selectedNode && (
  <div className="node-details">

    <div className="details-header">
      <div>
        <span>SELECTED NETWORK NODE</span>
        <h2>{selectedNode}</h2>
      </div>

      <button
        className="close-details"
        onClick={() => setSelectedNode(null)}
      >
        ✕ Close
      </button>
    </div>

    <div className="details-grid">

      <div>
        <small>STATUS</small>
        <strong
          className={
            nodeDetails[selectedNode]?.status === "Warning"
              ? "warning"
              : "healthy"
          }
        >
          ● {nodeDetails[selectedNode]?.status || "—"}
        </strong>
      </div>

      <div>
        <small>DEVICES</small>
        <strong>
          {nodeDetails[selectedNode]?.devices || "—"}
        </strong>
      </div>

      <div>
        <small>TRAFFIC</small>
        <strong
          className={
            nodeDetails[selectedNode]?.traffic === "High"
              ? "warning"
              : "healthy"
          }
        >
          {nodeDetails[selectedNode]?.traffic || "—"}
        </strong>
      </div>

      <div>
        <small>RESPONSE</small>
        <strong>
          {nodeDetails[selectedNode]?.response || "—"}
        </strong>
      </div>

    </div>
  </div>
)}
          <section className="activity">
  <h2>Recent Network Activity</h2>

  <div className="activity-row">
    <span className="dot green"></span>
    <div>
      <strong>Computer Lab A</strong>
      <p>{devices} devices connected</p>
    </div>
    <time>Just now</time>
  </div>

  <div className="activity-row">
    <span className="dot blue"></span>
    <div>
      <strong>Library Network</strong>
      <p>Traffic level: {traffic}%</p>
    </div>
    <time>Just now</time>
  </div>

  <div className="activity-row">
    <span className="dot orange"></span>
    <div>
      <strong>Computer Lab B</strong>
      <p>{traffic > 70 ? "High traffic detected" : "Network operating normally"}</p>
    </div>
    <time>Just now</time>
  </div>
 </section>
  </>
       )
      }
     </main>
    </div>
  );
}

export default App;