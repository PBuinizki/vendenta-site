export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#C41625" />
      <path
        d="M15 12H23.6C31.2 12 36 16.9 36 24C36 31.1 31.2 36 23.6 36H15V12Z"
        fill="#FFFFFF"
      />
      <path
        d="M21.4 17.5C19.6 17.5 18.6 19.1 18.8 21.3C19 23.5 20.1 26.8 21.2 29C21.6 29.8 22.7 29.7 23 28.8L24.1 25.4C24.4 24.6 25.6 24.6 25.9 25.4L27 28.8C27.3 29.7 28.4 29.8 28.8 29C29.9 26.8 31 23.5 31.2 21.3C31.4 19.1 30.4 17.5 28.6 17.5C27.2 17.5 26.3 18.3 25 18.3C23.7 18.3 22.8 17.5 21.4 17.5Z"
        fill="#C41625"
      />
    </svg>
  );
}

export function BrandWordmark({ dark = false }: { dark?: boolean }) {
  const baseColor = dark ? "text-white" : "text-[#121212]";
  const subColor = dark ? "text-[#A1A1AA]" : "text-[#636267]";

  return (
    <div className="leading-none">
      <div
        className={`font-display text-[17px] font-extrabold tracking-[0.06em] ${baseColor}`}
      >
        <span>VEN</span>
        <span className="text-[#C41625]">D</span>
        <span>ENTA</span>
      </div>
      <div
        className={`mt-1 font-mono text-[9px] tracking-[0.28em] uppercase ${subColor}`}
      >
        STOMATOLOGY
      </div>
    </div>
  );
}
