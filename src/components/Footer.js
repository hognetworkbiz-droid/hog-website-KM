import React from 'react';

function Footer({ whatsAppNumber, siteName, contactEmail }) {
  const waLink = `https://wa.me/${whatsAppNumber?.replace('+', '')}`;

  return (
    <footer className="bg-gray-900/80 backdrop-blur-md mt-12 py-8 shadow-inner-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg mb-4"
        >
          <svg className="h-6 w-6 mr-3 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.32 20.59C8.77 21.38 10.37 21.8 12.04 21.8H12.05C17.5 21.8 21.95 17.35 21.95 11.91C21.95 9.27 20.92 6.84 19.13 4.97C17.36 3.16 14.89 2.04 12.04 2.04ZM17.96 15.82C17.71 16.48 16.96 16.96 16.32 17.02L16.2 17.33C16.2 17.33 13.46 18.52 11.72 16.78C9.98 15.04 11.17 12.3 11.17 12.3L11.48 12.18C11.54 11.54 12.02 10.79 12.68 10.54C13.56 10.2 14.22 11.08 14.22 11.08C14.22 11.08 15.17 10.74 15.43 10.1C15.69 9.46 15.25 8.76 15.25 8.76C15.25 8.76 14.73 7.8 13.97 7.54C13.21 7.28 12.25 7.72 12.25 7.72C12.25 7.72 9.07 8.92 7.7 11.8C6.33 14.68 7.52 17.86 7.52 17.86C7.52 17.86 8.48 18.82 9.24 19.08C10 19.34 10.96 18.82 10.96 18.82C10.96 18.82 11.66 18.38 12.3 18.12C12.94 17.86 13.28 16.91 13.28 16.91C13.28 16.91 12.4 16.25 12.74 15.37C12.99 14.71 13.74 14.23 14.38 14.17" />
          </svg>
          Contact Admin on WhatsApp
        </a>

        {/* Admin Email */}
        {contactEmail && (
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Email: <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:text-blue-300 transition-colors">{contactEmail}</a>
          </p>
        )}
        
        <p className="mt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
