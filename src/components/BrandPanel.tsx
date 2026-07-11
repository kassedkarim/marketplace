export default function BrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-brand-dark p-10 text-paper md:flex">
      {/* نمط بصري مميز: علامات أسعار متناثرة بزاوية، إشارة لطبيعة المنصة التجارية */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 480 640"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const cols = 4;
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = col * 140 + (row % 2 === 0 ? 0 : 60) - 40;
          const y = row * 110 - 40;
          const rotate = (i % 5) * 7 - 14;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rotate})`}>
              <path
                d="M0 10 L30 0 L58 22 L34 54 L0 44 Z"
                fill="none"
                stroke="#E4B343"
                strokeWidth="1.5"
              />
              <circle cx="14" cy="14" r="3" fill="#E4B343" />
            </g>
          );
        })}
      </svg>

      <div className="relative z-10">
        <span className="font-display text-2xl font-extrabold tracking-tight">
          سوقنا
        </span>
      </div>

      <div className="relative z-10 max-w-sm">
        <h1 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
          كل تجارتك، من مكان واحد
        </h1>
        <p className="mt-4 text-paper/70">
          منصة واحدة تجمع بين البائعين والمشترين، من عرض المنتج لتحصيل الفلوس،
          من غير تعقيد.
        </p>

        <div className="mt-10 flex gap-8 border-t border-paper/15 pt-6 text-sm">
          <div>
            <div className="font-display text-xl font-bold text-accent">+12K</div>
            <div className="text-paper/60">بائع نشط</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-accent">+340K</div>
            <div className="text-paper/60">طلب شهريًا</div>
          </div>
        </div>
      </div>
    </div>
  );
}
