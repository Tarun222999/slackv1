/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
        },
       
      ],
    },
  };
  
  export default nextConfig;

//   {
//     protocol: 'https',
//     hostname: 'cdn.pixabay.com',
//   },
//   {
//     protocol: 'https',
//     hostname: 'hnfetimxhezkhdgcdshw.supabase.co',
//   },
//   {
//     protocol: 'https',
//     hostname: 'lh3.googleusercontent.com',
//   },