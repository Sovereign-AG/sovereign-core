# Sovereign AG: Cloud-Native Identity Registry
# Standard: NIST 2026 High-Performance Web Bot Auth (v1.2.0)
# Foundation: Python 3.11-Slim

FROM python:3.11-slim

# 1. Environment Optimization (Pillar 3 Traceability)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PRODUCTION=True
ENV LOG_LEVEL=INFO

WORKDIR /app

# 2. System Dependency Pillar (Audit & Verification)
# Install curl for health checking in container runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 3. Application Metadata
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Source & Persistence Isolation
COPY src/ ./src/
COPY data/ ./data/
COPY .well-known/ ./.well-known/
# keys/ and logs/ should be handled via volumes in production, 
# but we copy templates/init if needed.
COPY keys/ ./keys/
COPY logs/ ./logs/

EXPOSE 8000

# 5. NIST-Compliant Health Monitoring
# Pings the well-known discovery endpoint to ensure cryptographic registry is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# 6. Launch Protocol (Pillar 1/2/3 Unified Entry)
CMD ["python", "src/main.py"]
