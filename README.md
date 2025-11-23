# TeraPlay - TeraBox Video Downloader

A beautiful, full-stack TeraBox video downloader with an in-built video player. Download and watch TeraBox videos instantly with a stunning, modern UI.

![TeraPlay Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=TeraPlay)

## ✨ Features

- 🎥 **Download & Watch** - Download videos or watch them directly in the browser
- 🎬 **Fluid Player Integration** - Professional video player with advanced controls
- 🔄 **Multi-API Fallback** - Uses 5 different TeraBox APIs for maximum reliability
- 💎 **Premium UI** - Modern design with glassmorphism effects and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Reliable** - Built with Next.js 14+ for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TERAPLAY
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

1. **Copy a TeraBox URL** - Get the share link from TeraBox
2. **Paste the URL** - Enter it in the input field
3. **Click "Get Video"** - Wait for the video information to load
4. **Download or Watch** - Choose to download the video or watch it in the built-in player

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with modern design patterns
- **Video Player**: Fluid Player
- **APIs**: Multiple TeraBox API endpoints for reliability

## 🎨 Design Features

- **Glassmorphism Effects** - Frosted glass UI elements with backdrop blur
- **Gradient Backgrounds** - Beautiful purple-to-blue gradient
- **Smooth Animations** - Micro-interactions and transitions
- **Responsive Design** - Mobile-first approach with breakpoints
- **Modern Typography** - Inter font family for clean readability

## 🔧 API Configuration

The application uses 5 different TeraBox APIs with automatic fallback:

1. TeraBox API 1: `terabox-udayscriptsx-api.smx.workers.dev`
2. TeraBox API 2: `terabox-phi-api.smx.workers.dev`
3. TeraBox API 3: `terabox-teraboxx-api.smx.workers.dev`
4. TeraBox API 5: `terabox-vercel-api.smx.workers.dev`

If one API fails, the system automatically tries the next one.

## 📁 Project Structure

```
TERAPLAY/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── resolve/
│   │   │       └── route.ts          # API route for TeraBox resolution
│   │   ├── globals.css               # Global styles with animations
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page component
│   └── components/
│       └── VideoPlayer.tsx           # Fluid Player component
├── public/                           # Static assets
├── package.json
└── README.md
```

## 🎯 Key Components

### API Route (`/api/resolve`)
- Handles TeraBox URL resolution
- Implements multi-API fallback system
- Returns video metadata (thumbnail, filename, size, download URL)

### Main Page (`page.tsx`)
- URL input form with validation
- Loading states with animated spinner
- Video information display
- Download and Watch buttons

### Video Player (`VideoPlayer.tsx`)
- Fluid Player integration
- Dynamic script loading
- Responsive video container
- Custom playback controls

## 🌟 Features Breakdown

### Multi-API Fallback System
The application tries multiple APIs sequentially until one succeeds, ensuring maximum uptime and reliability.

### Glassmorphism UI
Modern frosted glass effects with:
- Backdrop blur filters
- Semi-transparent backgrounds
- Subtle border highlights
- Shadow depth

### Smooth Animations
- Fade in/out transitions
- Scale animations
- Hover effects
- Loading spinners
- Shake animations for errors

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side buttons
- **Tablet** (≤768px): Adjusted spacing and font sizes
- **Mobile** (≤480px): Stacked layout with full-width buttons

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **APIs**: TeraBox API providers
- **Video Player**: Fluid Player
- **Framework**: Next.js by Vercel
- **Design**: Custom modern UI with glassmorphism

## 💡 Tips

- Use valid TeraBox share URLs for best results
- The app automatically handles API failures with fallbacks
- Video playback requires a stable internet connection
- Download links are temporary and expire after a few hours

---

**Made with ❤️ using Next.js and modern web technologies**
