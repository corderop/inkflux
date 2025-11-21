# <img src="public/favicon.svg" width="30" height="30" alt="Inkflux Logo"> Inkflux

**A minimalist, E-Ink optimized client for [Miniflux](https://miniflux.app/).**

<p align="center">
  <img src="docs/assets/screenshot.png" alt="Inkflux Screenshot" width="600">
</p>

## 📖 Summary

Inkflux is a lightweight, web-based RSS reader client designed specifically for E-Ink devices (Kindle, Kobo, etc.) and low-power environments. Built on top of the Miniflux API, it strips away all distractions to focus purely on reading.

The interface is high-contrast, touch-friendly, and avoids animations or complex layouts that cause ghosting on E-Ink screens.

## 💡 Why Inkflux?

E-Ink devices are not optimized for modern websites, they are slow and drain battery fast. Inkflux is built with three core principles:

1.  **Network Efficiency**: Data transfer optimized to be as small as possible. Minimal Javascript, no dependencies. Loading a list of 50 articles will download only around **50kb**.
2.  **Minimal Runtime**: By using Server-Side Rendering (SSR) with Astro, we ship minimal JavaScript to the client. This ensures snappy performance even on older hardware with limited processing power.
3.  **E-Ink First**: The UI is designed to respect the limitations and strengths of electronic paper displays—no animations, high contrast, and clear typography.

## ✨ Features

- **Miniflux Integration**: Seamlessly connects to your existing Miniflux server.
- **Read Unread**: Focus on what's new.
- **Pagination**: Efficiently browse through your feed.
- **Article View**: Distraction-free reading experience.
- **High Contrast UI**: Optimized for E-Ink readability.
- **Responsive**: Works on various screen sizes, but optimized for tablets/readers.

## 🚀 Installation & Usage

### Prerequisites

- A running [Miniflux](https://miniflux.app/) server.
- Node.js (if running locally).

### Running Locally

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/inkflux.git
    cd inkflux
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Start the development server:

    ```bash
    pnpm dev
    ```

4.  Open `http://localhost:4321` in your browser.

### Docker

You can run Inkflux using Docker:

```bash
docker build -t inkflux .
docker run -p 4321:4321 inkflux
```

## ❓ FAQ

**Q: Why Astro?**
A: Astro allows us to render everything on the server and send pure HTML to the client. This is crucial for keeping the client-side footprint minimal, which is our #1 goal.

**Q: Can I use this with other RSS services?**
A: No, Inkflux is specifically built as a client for the Miniflux API.

**Q: How do I login?**
A: You will need your Miniflux server URL and your API Token. You can generate an API Token in your Miniflux settings.
