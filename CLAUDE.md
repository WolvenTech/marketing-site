# Claude Adapter

Follow the canonical workflow in [AGENTS.md](./AGENTS.md).

Claude-specific guidance:

- This repo builds and publishes the app image only — it holds no deploy secrets, SSH keys, or production credentials, and never triggers a production deploy.
- Do not add workflows or scripts that connect to `wolven-prod` or any production host.
- Keep this file thin — policy lives only in `AGENTS.md`.
