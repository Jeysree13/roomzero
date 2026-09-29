"import client";
import React, { useState, useEffect } from "react";
import { SnapdragonCard } from "@/components/SnapdragonCard";
import { DemoInferenceProvider } from "@/lib/ai/demo-provider";
import { AIEvent, InferenceResult } from "@/types";
import { ShieldCheck, Cpu, Play, Activity, Video, Lock, BarChart3, Settings as SettingsIcon } from "lucide-react";

const inferenceProvider = new DemoInferenceProvider();

export default function Home() {
  const [activeTab, setActiveTab] = useState<"monitor" | "timeline" | "privacy" | "analytics" | "settings">("monitor");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [inferenceResult, setInferenceResult] = useState<InferenceResult | null>(null);
  const [events, setEvents] = useState<AIEvent[]>([]);
  const [stats, setStats] = useState({ eventsToday: 14, rawVideoUploadedBytes: 0, identitiesStored: 0, localInferencePercentage: 94 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await inferenceProvider.detect();
      setInferenceResult(res);
      if (res.events.length > 0) {
        setEvents((prev) => [...res.events, ...prev]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider">ROOMZERO</h1>
            <p className="text-xs text-zinc-400">Private AI that understands events, not identities.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>LOCAL AI ACTIVE</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>CAMERA DATA STAYS ON DEVICE</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-800 px-6 bg-zinc-900/20">
        {[
          { id: "monitor", label: "Live Monitor", icon: Video },
          { id: "timeline", label: "Event Timeline", icon: Activity },
          { id: "privacy", label: "Privacy Center", icon: ShieldCheck },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "settings", label: "Settings", icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-cyan-500 text-cyan-400 bg-cyan-500/5"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {activeTab === "monitor" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulated Camera Feed / Live Monitor */}
              <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Edge Camera Feed (Local RAM Only)
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Latency: {inferenceResult?.inferenceTimeMs || 14}ms</span>
                </div>
                <div className="aspect-video bg-zinc-950 rounded-xl my-4 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                  <div className="text-center z-10">
                    <div className="text-emerald-400 font-mono text-sm mb-1">● LOCAL NPU PROCESSING</div>
                    <p className="text-xs text-zinc-500">No external stream or cloud recording</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-cyan-400">
                      Current Event: {inferenceResult?.currentEventDesc || "Normal activity"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                  <span>Provider: {inferenceResult?.provider || "local-demo"}</span>
                  <button
                    onClick={async () => {
                      const res = await inferenceProvider.detect();
                      setInferenceResult(res);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-zinc-950 font-semibold hover:bg-cyan-400 transition"
                  >
                    Run Safety Scenario
                  </button>
                </div>
              </div>

              {/* Room Status Widget */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Room State</h3>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">Status</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">{inferenceResult?.roomStatus || "NORMAL"}</div>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"></span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <div className="text-xs text-zinc-500">People Count</div>
                      <div className="text-xl font-bold text-zinc-100 mt-1">{inferenceResult?.peopleCount || 1}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <div className="text-xs text-zinc-500">Objects Tracked</div>
                      <div className="text-xl font-bold text-zinc-100 mt-1">{inferenceResult?.objectCount || 3}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SnapdragonCard />
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-200">Event Timeline</h2>
            <div className="space-y-3">
              {events.length === 0 ? (
                <p className="text-sm text-zinc-500">No events recorded yet. Run a safety scenario from the Live Monitor.</p>
              ) : (
                events.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-100">{evt.type}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {evt.severity}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">Source: {evt.source} • Confidence: {Math.round(evt.confidence * 100)}%</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-zinc-400">{evt.timestamp}</div>
                      <div className="text-[10px] text-emerald-400 mt-1">Raw Video: Not Uploaded ✓</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-zinc-200">Privacy Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-500">Raw Video Uploaded</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">0 MB</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-500">Events Logged</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">{events.length + 14}</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-500">Identities Stored</div>
                <div className="text-2xl font-bold text-zinc-100 mt-1">0</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-500">Local Inference</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">ENABLED</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-200">Analytics & Efficiency</h2>
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-zinc-200">AI Efficiency Metric</h4>
                <p className="text-xs text-zinc-500 mt-1">Proportion of workload computed locally on NPU vs cloud transfer.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-cyan-400">94%</div>
                <div className="text-xs text-zinc-500 mt-0.5">Local Edge Processing</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-200">System Settings</h2>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm text-zinc-200">Inference Mode</div>
                  <p className="text-xs text-zinc-500">Target hardware execution provider</p>
                </div>
                <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">Local AI (Demo)</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                <div>
                  <div className="font-medium text-sm text-zinc-200">Raw Video Retention</div>
                  <p className="text-xs text-zinc-500">Store raw frame buffers on device</p>
                </div>
                <span className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono">NEVER</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
