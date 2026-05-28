/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // emit static HTML/CSS/JS to out/
  images: {
    unoptimized: true // no server-side image optimizer needed; images are served as-is
  }
};
export default nextConfig;
