const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/places/gothenburg", permanent: true },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
