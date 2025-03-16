import {createRoot} from "react-dom/client";
import React, {StrictMode} from "react";
import '../node_modules/normalize.css'
import './index.css';
import {App} from "./components/App"

const root = document.getElementById('root')!;

createRoot(root).render(
    <StrictMode>
        <App/>
    </StrictMode>
)


