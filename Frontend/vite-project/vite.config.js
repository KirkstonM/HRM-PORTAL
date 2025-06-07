import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@App': path.resolve(__dirname, 'src/App/'),
      '@Components': path.resolve(__dirname, 'src/Components/'),
      '@Constants': path.resolve(__dirname, 'src/Constants/'),
      '@Forms': path.resolve(__dirname, 'src/Forms/'),
      '@Pages': path.resolve(__dirname, 'src/Pages/'),
      '@Redux': path.resolve(__dirname, 'src/Redux/'),
      '@Validations': path.resolve(__dirname, 'src/Validations/'),
      '@Assets': path.resolve(__dirname, 'src/assets/'),
      '@Utils': path.resolve(__dirname, 'src/Utils/')
    }
  }
})
