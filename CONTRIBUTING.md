# Contributing to Inkflux

First off, thank you for considering contributing to Inkflux!. We welcome all contributions, whether it's reporting a bug, suggesting a new feature, or writing code.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **pnpm**: We use `pnpm` as our package manager.
- **Miniflux Server**: You'll need access to a running Miniflux instance to test the client.

### Installation

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally
3.  **Install dependencies**:
    ```bash
    pnpm install
    ```

### Running Locally

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:4321`.

## 🛠 Development Workflow

We have a set of scripts to help with development. Please ensure your code passes these checks before submitting a PR.

- **Testing**: Run the test suite with `pnpm test`.
- **Linting**: Check for code issues with `pnpm lint`.
- **Formatting**: Ensure code style consistency with `pnpm format`.

## 🤝 How to Contribute

### Picking Issues

If you're looking for something to work on, check out the [Issues](https://github.com/corderop/inkflux/issues) tab. Feel free to comment on an issue to let us know you're working on it!

## 📝 Commit Guidelines

We strictly follow the **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** specification. This allows us to automatically generate changelogs and determine semantic versioning.

**Format:**

```
<type>(<scope>): <subject>
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Examples:**

- `feat: add article pagination`
- `fix(auth): handle invalid api tokens gracefully`
- `docs: update contributing guidelines`

## 🎨 Code Style

We use **Prettier** and **ESLint** to maintain code quality.

- Run `pnpm format` to automatically format your code.
- Run `pnpm lint` to catch potential errors.
