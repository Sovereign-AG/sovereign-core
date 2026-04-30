import { invoke } from "@tauri-apps/api/core";

const authScreen = document.getElementById("auth-screen") as HTMLElement;
const appScreen = document.getElementById("app") as HTMLElement;
const authBtn = document.getElementById("auth-btn") as HTMLButtonElement;
const authInput = document.getElementById("master-password") as HTMLInputElement;
const authError = document.getElementById("auth-error") as HTMLElement;

const auditLedgerElem = document.getElementById("audit-ledger") as HTMLElement;
const auditDbElem = document.getElementById("audit-db") as HTMLElement;
const integrityStatusElem = document.getElementById("integrity-status") as HTMLElement;
const fleetBody = document.getElementById("fleet-table-body") as HTMLElement;
const fleetEmptyState = document.getElementById("fleet-empty-state") as HTMLElement;
const canvas = document.getElementById("metabolism-chart") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// V2 Tab & Thermometer Bindings
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const sysCpu = document.getElementById("sys-cpu") as HTMLElement;
const sysRam = document.getElementById("sys-ram") as HTMLElement;
const sysLedger = document.getElementById("sys-ledger") as HTMLElement;
const rotateBtn = document.getElementById("rotate-ledger-btn") as HTMLButtonElement;
const drawer = document.getElementById("forensic-drawer") as HTMLElement;
const closeDrawerBtn = document.getElementById("close-drawer-btn") as HTMLButtonElement;
const forensicBody = document.getElementById("forensic-table-body") as HTMLElement;

// Intelligence Bindings
const intelMint = document.getElementById("intel-mint") as HTMLElement;
const intelAction = document.getElementById("intel-action") as HTMLElement;
const intelPulse = document.getElementById("intel-pulse") as HTMLElement;

let isAuthorized = false;

// 0. UI Listeners
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-target')!)?.classList.add('active');
  });
});
closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('open'));
rotateBtn?.addEventListener('click', () => invoke('rotate_ledger'));

// 1. Authentication
authBtn.addEventListener("click", async () => {
  const pwd = authInput.value;
  try {
    const success: boolean = await invoke("verify_auth", { password: pwd });
    if (success) {
      isAuthorized = true;
      authScreen.style.display = "none";
      appScreen.style.display = "flex";
      startGodMode();
    } else {
      authError.style.display = "block";
      authInput.value = "";
    }
  } catch (e) {
    authError.innerText = "BACKEND COMM ERROR";
    authError.style.display = "block";
  }
});

// 2. God-Mode Active loop
function startGodMode() {
  // Sync loop
  setInterval(async () => {
    if (!isAuthorized) return;
    
    // A. Integrity Audit (High Fidelity Breakdown)
    try {
      const audit: any = await invoke("audit_integrity");
      auditLedgerElem.innerText = `$${audit.ledger_yield.toFixed(6)}`;
      auditDbElem.innerText = `$${audit.db_yield.toFixed(6)}`;
      
      // Update Detailed Financial Breakdown from Backend Truth
      intelMint.innerText = `$${(audit.mints * 1.0).toFixed(6)}`;
      intelAction.innerText = `$${(audit.actions * 0.01).toFixed(6)}`;
      intelPulse.innerText = `$${(audit.pulses * 0.0001).toFixed(6)}`;

      const diff = Math.abs(audit.ledger_yield - audit.db_yield);
      if (diff > 0.000001) {
        integrityStatusElem.innerText = `CRITICAL INTEGRITY FAILURE! DELTA: $${diff.toFixed(6)}`;
        integrityStatusElem.className = "integrity-status critical";
      } else {
        integrityStatusElem.innerText = "ALL SYSTEMS NOMINAL";
        integrityStatusElem.className = "integrity-status";
      }
    } catch(e) {
      console.error(e);
    }

    // B. Sysinfo Thermometer & Rotation Radar
    try {
      const stats: any = await invoke("get_system_stats");
      sysCpu.innerText = `${stats.cpu_usage.toFixed(1)}%`;
      sysRam.innerText = `${stats.ram_usage.toFixed(1)} MB`;
      sysLedger.innerText = `${stats.ledger_size_mb.toFixed(2)} MB`;

      // Trigger Rotation Logic if Ledger > 500MB
      if (stats.ledger_size_mb > 500) {
          rotateBtn.innerText = "ROTATION REQUIRED";
          rotateBtn.style.backgroundColor = "var(--accent-crimson)";
          rotateBtn.style.color = "#FFFFFF";
          rotateBtn.style.boxShadow = "0 0 15px rgba(220, 38, 38, 0.4)";
      } else {
          rotateBtn.innerText = "ROTATE LEDGER";
          rotateBtn.style.backgroundColor = "";
          rotateBtn.style.color = "";
          rotateBtn.style.boxShadow = "";
      }
    } catch(e) {}

    // C. Forensic Stream Processing
    try {
      const history: any[] = await invoke("fetch_ledger_history");
      forensicBody.innerHTML = "";
      history.forEach(txn => {
        const row = document.createElement("tr");
        row.style.cursor = "pointer";
        row.innerHTML = `
          <td style="font-size:10px; font-weight:800; opacity:0.8;">${txn.txn_id.substring(0,10)}...</td>
          <td><span class="status-badge" style="background:var(--bg-dark);font-size:10px;">${txn.event}</span></td>
          <td class="cell-right">${txn.latency.toFixed(1)}ms</td>
        `;
        row.onclick = () => {
          document.getElementById("drawer-id")!.innerText = txn.txn_id;
          document.getElementById("drawer-event")!.innerText = txn.event;
          document.getElementById("drawer-ip")!.innerText = txn.ip_address;
          document.getElementById("drawer-latency")!.innerText = `${txn.latency.toFixed(2)}ms`;
          document.getElementById("drawer-sig")!.innerText = txn.crypto_sig;
          drawer.classList.add("open");
        };
        forensicBody.appendChild(row);
      });
    } catch(e){}

    // D. Fleet Mapping
    try {
      const fleet: any[] = await invoke("fetch_fleet");
      
      if (fleet.length === 0) {
        fleetBody.innerHTML = "";
        fleetEmptyState.style.display = "flex";
      } else {
        fleetEmptyState.style.display = "none";
        fleetBody.innerHTML = "";
        fleet.forEach(agent => {
          const row = document.createElement("tr");
          
          if (agent.risk_score && agent.risk_score > 80) {
             row.style.backgroundColor = "var(--accent-crimson)";
             row.style.color = "#FFFFFF";
          }
          
          const idCell = document.createElement("td");
          idCell.innerText = agent.did;
          
          const riskCell = document.createElement("td");
          riskCell.className = "tabular";
          riskCell.innerText = `${agent.risk_score || 0}%`;
          if(agent.risk_score > 80) riskCell.style.color = "#FFFFFF";
          
          const statusCell = document.createElement("td");
          const ledClass = agent.status === 'ACTIVE' ? 'nominal' : 'failure';
          statusCell.innerHTML = `<span class="led ${ledClass}"></span>${agent.status}`;
          
          const yieldCell = document.createElement("td");
          yieldCell.className = "cell-right tabular";
          yieldCell.innerText = `$${(agent.yield || 0).toFixed(4)}`;
          
          const actCell = document.createElement("td");
          actCell.className = "cell-right";
          const killBtn = document.createElement("button");
          killBtn.className = "kill-switch";
          if (agent.risk_score > 80) {
              killBtn.innerText = "REVOKE";
              killBtn.style.color = "#fff";
              killBtn.style.border = "1px solid rgba(255,255,255,0.4)";
          } else {
              killBtn.innerText = "KILL";
          }
          killBtn.onclick = () => invoke("kill_agent", { did: agent.did });
          actCell.appendChild(killBtn);

          row.appendChild(idCell);
          row.appendChild(riskCell);
          row.appendChild(statusCell);
          row.appendChild(yieldCell);
          row.appendChild(actCell);
          fleetBody.appendChild(row);
        });
      }
    } catch(e) {}

  }, 1000); // 1s sync interval
  
  // Modern Area-Fill Graph logic for Canvas
  canvas.width = canvas.parentElement!.clientWidth;
  canvas.height = canvas.parentElement!.clientHeight;
  const data = Array(60).fill(0).map(() => Math.random() * 40);
  
  setInterval(() => {
    data.push(Math.random() * 40 + (Math.random() > 0.95 ? 80 : 0)); // Simulate bursts
    data.shift();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw the top Stroke Edge with Glow
    ctx.beginPath();
    const startY = canvas.height - data[0] - 10;
    ctx.moveTo(0, startY);
    for(let i=1; i<data.length; i++) {
        const x = (i / (data.length - 1)) * canvas.width;
        const y = canvas.height - data[i] - 10;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(30, 41, 59, 1)"; // Deep Navy / Charcoal
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2. Draw the underlying fill Gradient
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0.1, "rgba(30, 41, 59, 0.1)");
    grd.addColorStop(1, "rgba(30, 41, 59, 0.01)");
    
    ctx.fillStyle = grd;
    ctx.fill();
    
  }, 100);
}
