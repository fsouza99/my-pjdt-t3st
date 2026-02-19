'use client';

import { useState } from 'react';


export default function CopyUrlButton({ className }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying URL:", err);
    }
  }

  return (
    <button
      title="Copiar link da página."
      className={`${className} btn bg-site-2nd`}
      disabled={copied}
      onClick={handleCopyUrl}>
      {copied ? "LINK COPIADO" : "🔗"}
    </button>
  );
}

