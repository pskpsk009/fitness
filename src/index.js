import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Default import

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  // Fallback for environments where the root container is not present
  console.warn("Root element not found: unable to mount React app.");
}
