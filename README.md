#  Project Management Integration Platform

A full-stack application demonstrating integration between GitHub and Jira for seamless project management and issue tracking.

## Project Overview

This project showcases a modern application architecture with:
- **Backend**: REST API built with Node.js/Express
- **Frontend**: React-based dashboard
- **Integration**: GitHub-to-Jira sync for issue management
- **Documentation**: Complete setup and deployment guides

## Quick Start

### Prerequisites
- Node.js 16+
- Python 3.9+
- Docker & Docker Compose
- Jira instance access (for integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/marsjensen-code/Sample-Code.git
cd Sample-Code

# Install dependencies
npm install
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your Jira credentials
```

### Running Locally

```bash
# Start backend
npm run dev

# Start frontend
npm run frontend:dev

# Start Jira sync service
python jira_sync/main.py
```

## Architecture

```
Sample-Code/
├── backend/           # Node.js REST API
├── frontend/          # React dashboard
├── jira_sync/         # Jira integration service
├── docs/              # Documentation
└── tests/             # Test suites
```

## Jira Integration

This project maintains bidirectional sync between GitHub Issues and Jira tickets. See [JIRA_INTEGRATION.md](./docs/JIRA_INTEGRATION.md) for detailed setup instructions.

## Contributing

Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

MIT
