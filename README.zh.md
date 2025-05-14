# Install Scripts Hub

<p align="center">
  一站式安装脚本集合平台 | One-stop installation script collection platform
</p>

<p align="center">
  <a href="https://github.com/yugasun/install/releases">
    <img src="https://img.shields.io/github/v/release/yugasun/install" alt="GitHub release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/yugasun/install" alt="License">
  </a>
</p>

[English](README.md) | [简体中文](README.zh.md)

## 📖 项目简介

Install Scripts Hub 是一个集中式平台，提供各种流行开发工具和实用程序的一键安装脚本。该项目基于 SvelteKit 构建，为开发者提供了清晰、快速的界面，方便快速查找和使用 Oh My Zsh、fnm、SDKMAN 等工具的安装命令。

## ✨ 功能特点

- 🌐 **多语言支持**：提供英文和中文版本，并配有便捷的语言选择器
- 🌙 **暗/亮主题**：支持暗色和亮色主题，提供舒适的浏览体验
- 📋 **一键复制**：所有安装命令支持一键复制功能
- 📱 **响应式设计**：在移动设备和桌面上都能完美运行
- 🔍 **分类脚本**：安装脚本按类别组织，条理清晰
- 🚀 **快速轻量**：使用 SvelteKit 构建，性能优异

## 🚀 可用安装脚本

本项目目前包含以下安装脚本：

- `chsrc.sh` - 更改软件包源以加速下载
- `fnm.sh` - Fast Node Manager，用于 Node.js 版本管理
- `ghosts.sh` - Shell 脚本安装工具
- `netbird.sh` - 安全网络解决方案
- `oh-my-zsh.sh` - Oh My Zsh 终端框架
- `sdkman.sh` - 软件开发工具包管理器
- `tailscale.sh` - VPN 网络服务
- `uv.sh` - Python 包安装器和解析器

## 🛠 开发指南

### 前置条件

- Node.js (版本 18 或更高)
- pnpm 包管理器

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/yugasun/install.git
cd install-sveltekit
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
pnpm dev
```

4. 打开浏览器并访问 `http://localhost:5173`

### 构建生产版本

创建优化的生产构建：

```bash
pnpm build
```

预览生产构建：

```bash
pnpm preview
```

## 📁 项目结构

```
├── src/                 # 源代码
│   ├── lib/             # 库代码
│   │   ├── components/  # Svelte 组件
│   │   ├── data/        # 数据文件
│   │   ├── i18n/        # 国际化
│   │   ├── services/    # 服务
│   │   └── utils/       # 实用函数
│   ├── routes/          # 应用路由
│   └── app.html         # HTML 模板
├── static/              # 静态资源
│   └── installs/        # 安装脚本
├── build/               # 生产构建输出
└── ... 配置文件
```

## 📝 添加新的安装脚本

1. 将你的 shell 脚本添加到 `static/installs/` 目录
2. 在 `src/lib/data/scripts.json` 中添加脚本的元数据
3. 如有需要，更新 `src/lib/i18n/translations/` 中的翻译
4. 在本地测试你的更改
5. 提交拉取请求

## 🤝 贡献指南

欢迎贡献！随时提交 Pull Request。

1. Fork 仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE) 授权。

## 🙏 致谢

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- 所有提供安装脚本的优秀开源项目