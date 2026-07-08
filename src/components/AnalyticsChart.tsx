import React from 'react';

export const AnalyticsChart: React.FC = () => {
  // Weekly scan count mock data: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  const weeklyScans = [12, 19, 8, 15, 22, 14, 25];
  const maxVal = Math.max(...weeklyScans);
  
  // Coordinates calculation for SVG Line
  const width = 500;
  const height = 150;
  const paddingLeft = 30;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 20;
  
  const points = weeklyScans.map((val, index) => {
    const x = paddingLeft + (index * (width - paddingLeft - paddingRight) / (weeklyScans.length - 1));
    const y = height - paddingBottom - (val * (height - paddingTop - paddingBottom) / maxVal);
    return { x, y, val };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scams Analyzed This Week</h4>
          <span className="text-xs text-brand-blue font-medium bg-brand-blue/10 py-1 px-2.5 rounded-full">+18% vs Last Week</span>
        </div>
        <div className="w-full relative h-[160px] dark:bg-slate-950/20 light:bg-slate-100/50 rounded-xl p-2 border dark:border-white/5 light:border-slate-200">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3" />
            <line x1={paddingLeft} y1={(height - paddingTop - paddingBottom) / 2 + paddingTop} x2={width - paddingRight} y2={(height - paddingTop - paddingBottom) / 2 + paddingTop} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3" />
            <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
            
            {/* Area under the line */}
            <path d={areaPath} fill="url(#chartGradient)" opacity="0.15" />
            
            {/* Line plot */}
            <path d={linePath} fill="none" stroke="var(--color-brand-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points & Tooltips */}
            {points.map((p, i) => (
              <g key={i} className="group cursor-pointer">
                <circle cx={p.x} cy={p.y} r="5" fill="var(--color-brand-blue)" className="hover:r-7 transition-all duration-150" />
                <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="var(--color-brand-blue-light)" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-all duration-150" />
                
                {/* Tooltip value */}
                <rect x={p.x - 15} y={p.y - 25} width="30" height="18" rx="4" fill="var(--color-brand-blue-dark)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                <text x={p.x} y={p.y - 13} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {p.val}
                </text>
              </g>
            ))}

            {/* X Axis Labels */}
            {days.map((day, i) => (
              <text key={i} x={points[i].x} y={height - 4} textAnchor="middle" fontSize="10" className="fill-slate-400 dark:fill-slate-500 font-medium">
                {day}
              </text>
            ))}

            {/* Y Axis Labels */}
            <text x="5" y={paddingTop + 4} fontSize="9" className="fill-slate-400 dark:fill-slate-500 font-medium">{maxVal}</text>
            <text x="5" y={(height - paddingTop - paddingBottom) / 2 + paddingTop + 3} fontSize="9" className="fill-slate-400 dark:fill-slate-500 font-medium">{Math.round(maxVal / 2)}</text>
            <text x="5" y={height - paddingBottom + 3} fontSize="9" className="fill-slate-400 dark:fill-slate-500 font-medium">0</text>

            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-blue)" />
                <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Grid of secondary statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-950/30 light:bg-slate-50/50 flex flex-col justify-between">
          <span className="text-xs dark:text-slate-400 light:text-slate-500 font-medium">Total Scams Detected</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold dark:text-white light:text-slate-900">142</span>
            <span className="text-xs font-semibold text-brand-green">🟢 Verified</span>
          </div>
        </div>
        <div className="p-4 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-950/30 light:bg-slate-50/50 flex flex-col justify-between">
          <span className="text-xs dark:text-slate-400 light:text-slate-500 font-medium">Community Reports Vetted</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold dark:text-white light:text-slate-900">47</span>
            <span className="text-xs font-semibold text-brand-blue">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
