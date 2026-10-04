# APIPhi

A small, static API catalog scaffold for Phi Studio and Create Phi. It includes a shared JSON catalog and a quick-search page that can be hosted alongside other Phi Studio creations.

## Run locally

Serve this directory with any static web server, then open its root page. For example:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. The page loads `catalog.json` from the same origin, so opening `index.html` directly as a file is not supported.

## Catalog and search

`catalog.json` is the shared source of truth. Each entry has an `id`, `name`, `category`, `provider`, `description`, `docsUrl`, `auth`, and `tags`. Add or update entries there; the quick search matches names, providers, categories, descriptions, and tags. The initial entries cover eBay Browse, stock-market data, and metals pricing.

The catalog describes APIs; it does not call them or store credentials. Add provider-specific integration code in the consuming Phi Studio tool, and keep API keys in that environment's secret store.

## Phi Studio / Create Phi integration

Use `catalog.json` as the reusable data source and `index.html` as a standalone search tool or embedded page. A Phi Studio/Create Phi integration can pass a query and return matching catalog entries (including their documentation links). The repository does not assume a particular host tool-manifest format; adapt the wrapper to the host's current contract.

## Deployment

The scaffold has no server-side dependencies and can be deployed to any static web host by publishing the repository files together. Preserve the relative paths between `index.html`, `app.js`, and `catalog.json`. No deployment target or credentials are configured in this repository.
