import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/31611929392"
      aria-label="WhatsApp contact"
      title="Stuur ons een WhatsApp bericht"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.37 0 .01 5.36.01 12c0 2.11.55 4.17 1.6 6.01L0 24l6.3-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.84 0-3.63-.5-5.2-1.45l-.37-.22-3.75.98.98-3.66-.24-.38A9.96 9.96 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.17 1.04 7.07 2.94A9.96 9.96 0 0 1 22 12c0 5.52-4.48 10-10 10z" />
        <path d="M17.29 14.23c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.19.29-.74.95-.91 1.15-.16.19-.33.22-.62.07-.28-.15-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.35-.02-.5-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.19 0-.5.07-.76.35-.27.29-1.03 1.01-1.03 2.46s1.05 2.86 1.19 3.06c.14.19 2.06 3.17 5 4.44 3.06 1.29 3.06.86 3.61.81.57-.05 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.07-.12-.27-.19-.57-.34z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
