# RXCA Frontend

This repo is the frontend of RXCA project.

For more information, please refer to the following documents:

## Usage

Please use following command to install dependencies:

```bash
npm install
```

## Setup

1. Configure environment variables. Copy contents of `./env.example` into a new file `./env.local` in the root directory.
2. Setup backend server from [RXCA-Backend repo](https://github.com/AwespireTech/RXCA-Backend). The server should be running on http://localhost:8080.
3. To abide by the Content Security Policy (CSP) setting, enable API request to local backend server by adding following `rewrites()` rule in the `./next/config.js` file:
   ```js
   ...
   async rewrites() {
       return [
       {
           source: "/api/:path*",
           destination: "http://localhost:8080/api/:path*" // Proxy to Backend
       }
       ]
   },
   ...
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your brower.
