---
description: Build the Docker image and smoke test the healthz endpoint against the running container.
---

# Docker Smoke Test

Build the production runtime container and verify `/healthz` from inside and host:

```bash
docker build -t marketing-site:local .
docker run -d --name marketing-site-local -p 3000:3000 marketing-site:local
curl -sf http://localhost:3000/healthz
docker stop marketing-site-local && docker rm marketing-site-local
```
