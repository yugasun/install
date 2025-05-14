# Install Scripts Hub

<p align="center">
  一站式安装脚本集合平台 | One-stop installation script collection platform
</p>

<p align="center">
  <a href="https://github.com/yugasun/install-sveltekit/releases">
    <img src="https://img.shields.io/github/v/release/yugasun/install-sveltekit" alt="GitHub release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/yugasun/install-sveltekit" alt="License">
  </a>
</p>

[English](README.md) | [简体中文](README.zh.md)

## 📖 Introduction

Install Scripts Hub is a centralized platform that provides one-liner installation scripts for various popular development tools and utilities. Built with SvelteKit, this project offers a clean, fast interface for developers to quickly find and use installation commands for tools like Oh My Zsh, fnm, SDKMAN, and more.

## ✨ Features

- 🌐 **Multi-language Support**: Available in English and Chinese with an easy language selector
- 🌙 **Dark/Light Theme**: Supports both dark and light themes for comfortable viewing
- 📋 **Copy-to-Clipboard**: One-click copy for all installation commands
- 📱 **Responsive Design**: Works perfectly on mobile devices and desktops
- 🔍 **Categorized Scripts**: Well-organized installation scripts by category
- 🚀 **Fast and Lightweight**: Built with SvelteKit for optimal performance

## 🚀 Available Installation Scripts

This project currently includes installation scripts for:

- `chsrc.sh` - Change package source for faster downloads
- `fnm.sh` - Fast Node Manager for Node.js version management
- `ghosts.sh` - Shell script installation tool
- `netbird.sh` - Secure networking solution
- `oh-my-zsh.sh` - Oh My Zsh terminal framework
- `sdkman.sh` - Software Development Kit Manager
- `tailscale.sh` - VPN networking service
- `uv.sh` - Python package installer and resolver

## 🛠 Development

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yugasun/install-sveltekit.git
cd install-sveltekit
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

You can preview the production build with:

```bash
pnpm preview
```

## 📁 Project Structure

```
├── src/                 # Source code
│   ├── lib/             # Library code
│   │   ├── components/  # Svelte components
│   │   ├── data/        # Data files
│   │   ├── i18n/        # Internationalization
│   │   ├── services/    # Services
│   │   └── utils/       # Utility functions
│   ├── routes/          # Application routes
│   └── app.html         # HTML template
├── static/              # Static assets
│   └── installs/        # Installation scripts
├── build/               # Production build output
└── ... configuration files
```

## 📝 Adding New Installation Scripts

1. Add your shell script to the `static/installs/` directory
2. Update `src/lib/data/scripts.json` with metadata about your script
3. Update translations in `src/lib/i18n/translations/` if needed
4. Test your changes locally
5. Submit a pull request

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

## 🙏 Acknowledgements

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- All the amazing open-source projects providing installation scripts
