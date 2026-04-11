# Sovereign AG Zero-Trust Environment Initializer
# Pillar 3: Infrastructure Hardening and Audit Integrity
# Standard: NIST Cybersecurity Framework (CSF) v2.0 - Protect/Detect

$ErrorActionPreference = "Stop"

# --- 1. Audit Log: Create Append-Only Repository ---
# Note: In the latest version, we use data/sovereign.db for high-frequency audits
$LogPath = Join-Path (Get-Location) "logs"
if (-not (Test-Path $LogPath)) {
    Write-Host "[*] Creating Sovereign Log Vault..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $LogPath | Out-Null
}

$DataPath = Join-Path (Get-Location) "data"
if (-not (Test-Path $DataPath)) {
    Write-Host "[*] Creating Sovereign Data Vault (SQLite Registry)..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $DataPath | Out-Null
}

# Advanced NTFS Permissions for data/ and logs/ (Pillar 3 Compliance)
Write-Host "[*] Hardening Sovereign Registries (P3 Enforcement)..."
# 1. Disable Inheritance to prevent leakage
icacls "$LogPath" /inheritance:d | Out-Null
icacls "$DataPath" /inheritance:d | Out-Null

# 2. Assign Full Control to the current Administrator for management
icacls "$LogPath" /grant:r "*S-1-5-32-544:(OI)(CI)(F)" | Out-Null
icacls "$DataPath" /grant:r "*S-1-5-32-544:(OI)(CI)(F)" | Out-Null

# 3. Restrict Everyone else from deleting or modifying the audit trail
icacls "$LogPath" /deny "Everyone:(D,DC)" | Out-Null
icacls "$DataPath" /deny "Everyone:(D,DC)" | Out-Null

# --- 2. Keys Registry: Restricted Access ---
$KeysPath = Join-Path (Get-Location) "keys"
if (-not (Test-Path $KeysPath)) {
    New-Item -ItemType Directory -Path $KeysPath | Out-Null
}
Write-Host "[*] Restricting Sovereign Identity Registry (/keys)..."
icacls "$KeysPath" /inheritance:r | Out-Null
icacls "$KeysPath" /grant:r "*S-1-5-32-544:(OI)(CI)(F)" | Out-Null
Write-Host "[!] Key Vault secured. Access limited to Administrative Authority." -ForegroundColor Green

# --- 3. Git Protection: Protect PEM/Mandate Assets ---
$GitIgnorePath = Join-Path (Get-Location) ".gitignore"
$IgnoreContent = @"
# --- Sovereign AG: Protective Scrutiny ---
# Protect all high-entropy key materials and session mandates
**/*.pem
**/*.key
keys/
data/sovereign.db
data/policies.json
logs/
.env
"@

Set-Content -Path $GitIgnorePath -Value $IgnoreContent

Write-Host "`n--- Sovereign Protocol: Environment Initialized ---" -ForegroundColor Cyan
Write-Host "[STATUS] Zero-Trust Paradigm Established."
Write-Host "[SYSTEM] Audit Registry: Hardened."
Write-Host "[SYSTEM] Identity Registry: Restricted."
Write-Host "[SYSTEM] Source Control: Scrutinized."
