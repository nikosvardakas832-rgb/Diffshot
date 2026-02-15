export async function loadFonts() {
  const [interRegular, interBold, jetBrainsMono] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.woff2"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjOVGNJ6RM.woff2"
    ).then((res) => res.arrayBuffer()),
  ]);

  return [
    { name: "Inter", data: interRegular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: interBold, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: jetBrainsMono, weight: 400 as const, style: "normal" as const },
  ];
}
