import React from "react";
import { Cpu, ShieldCheck, Zap, Server } from "lucide-react";

export function SnapdragonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">Snapdragon Ready Architecture</h3>
            <p className="text-sm text-zinc-400">Optimized for Snapdragon X Elite & HP AI PCs</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          NPU ACCELERATED PATH
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
          <div className="text-cyan-400 font-mono text-xs mb-1">STEP 01</div>
          <h4 className="font-medium text-zinc-200 text-sm mb-1">Qualcomm AI Hub</h4>
          <p className="text-xs text-zinc-400">Models compiled and quantized specifically for Hexagon NPU target execution.</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
          <div className="text-cyan-400 font-mono text-xs mb-1">STEP 02</div>
          <h4 className="font-medium text-zinc-200 text-sm mb-1">Isolated Inference</h4>
          <p className="text-xs text-zinc-400">LocalInferenceProvider abstraction cleanly decouples UI from hardware runtimes.</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
          <div className="text-cyan-400 font-mono text-xs mb-1">STEP 03</div>
          <h4 className="font-medium text-zinc-200 text-sm mb-1">Zero Cloud Transit</h4>
          <p className="text-xs text-zinc-400">Raw frames are processed in-memory; only lightweight JSON events travel out.</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
          <div className="text-cyan-400 font-mono text-xs mb-1">STEP 04</div>
          <h4 className="font-medium text-zinc-200 text-sm mb-1">Identical Pipeline</h4>
          <p className="text-xs text-zinc-400">Switch from Demo Provider to Qualcomm AI Hub seamlessly without altering dashboards.</p>
        </div>
      </div>
    </div>
  );
}
