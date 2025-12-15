import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // JavaScript Obfuscation - Only applies to production builds
    obfuscatorPlugin({
      options: {
        // ===== IDENTIFIER OBFUSCATION =====
        // Rename variables/functions to hexadecimal names (e.g., _0x3f2a1b)
        identifierNamesGenerator: 'hexadecimal',
        // Don't rename global variables to avoid breaking external libraries
        renameGlobals: false,
        
        // ===== STRING PROTECTION =====
        // Move all strings to a separate array and reference by index
        stringArray: true,
        // Apply to 75% of strings (balance between security and performance)
        stringArrayThreshold: 0.75,
        // Encode strings in base64
        stringArrayEncoding: ['base64'],
        // Shuffle the string array for added confusion
        stringArrayShuffle: true,
        // Rotate string array on each access
        rotateStringArray: true,
        
        // ===== CONTROL FLOW PROTECTION =====
        // Flatten control flow to make logic harder to follow
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        
        // ===== DEAD CODE INJECTION =====
        // Add fake/dead code to confuse reverse engineering
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        
        // ===== DEBUG PROTECTION =====
        // Crash when DevTools debugger is detected (disabled for now)
        debugProtection: false,
        // Remove all console.* calls in production
        disableConsoleOutput: true,
        
        // ===== ANTI-TAMPERING =====
        // Code will break if someone tries to modify/beautify it
        selfDefending: true,
        
        // ===== OUTPUT OPTIMIZATION =====
        // Minify the obfuscated output
        compact: true,
        simplify: true,
        
        // ===== TRANSFORMATION OPTIONS =====
        // Transform object keys to computed properties
        transformObjectKeys: true,
        // Convert unicode escapes
        unicodeEscapeSequence: false,
      },
      // Only apply obfuscation during production build
      apply: 'build',
      // Exclude dependencies from obfuscation (they're already minified)
      exclude: [/node_modules/],
    }),
  ], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // ===== SOURCE MAP SECURITY =====
    // Disable source maps in production to prevent code inspection
    sourcemap: false,
    
    // ===== MINIFICATION WITH TERSER =====
    // Use terser for additional minification and cleanup
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove all console.* statements
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // Remove dead code
        dead_code: true,
        // Additional optimizations
        passes: 2,
      },
      mangle: {
        // Mangle top-level variable names
        toplevel: true,
      },
      format: {
        // Remove comments
        comments: false,
      },
    },
    // Chunk size warning limit (obfuscation increases file size)
    chunkSizeWarningLimit: 1500,
  },
})
