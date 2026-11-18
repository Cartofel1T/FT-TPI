import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SesionProvider } from './contexto/SesionContexto'
import './estilos/colores.css'
import './estilos/base.css'
import './estilos/avisos.css'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SesionProvider>
            <App />
        </SesionProvider>
    </React.StrictMode>
)