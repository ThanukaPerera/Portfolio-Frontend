// import type { Metadata } from "next";
// import "./globals.css";
// import Script from 'next/script';
// import { Toaster } from 'sonner';



// export const metadata: Metadata = {
//   title: "Thanuka Perera",
//   description: "Personal Portfolio",
// };

// export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
//   return (
//     <html lang="en">
//       <body className=''>
//       <Script
//         src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
//         strategy="beforeInteractive"
//       />
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';



export const metadata: Metadata = {
  title: "Thanuka Perera",
  description: "Personal Portfolio",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="beforeInteractive"
      />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          expand={false}
          visibleToasts={3}
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: 
                'group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-lg',
              description: 'group-[.toast]:text-slate-400',
              actionButton: 
                'group-[.toast]:bg-slate-800 group-[.toast]:text-slate-50',
              cancelButton: 
                'group-[.toast]:bg-slate-800 group-[.toast]:text-slate-50',
              success: 'group-[.toast]:border-emerald-500/20',
              error: 'group-[.toast]:border-red-500/20',
              warning: 'group-[.toast]:border-amber-500/20',
              info: 'group-[.toast]:border-blue-500/20',
            },
            unstyled: false,
          }}
          icons={{
            success: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-emerald-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ),
            error: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle text-red-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="m15 9-6 6"/>
                <path d="m9 9 6 6"/>
              </svg>
            ),
            warning: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle text-amber-400">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
            ),
            info: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-blue-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            )
          }}
        />
      </body>
    </html>
  );
}