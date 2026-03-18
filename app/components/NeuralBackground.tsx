"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  dPhase: number;
  lit: number;
  isHub: boolean;
  layer: 0 | 1 | 2;
};
type Edge = { a: number; b: number; cpOff: number };
type Flow = { ei: number; t: number; speed: number; fwd: boolean };
type Ping = { ni: number; r: number; alpha: number };
type Quality = { nodes: number; fps: number; knn: number };

const LAYER_SCALE = [0.55, 1.0, 1.25] as const;
const LAYER_SPEED = [0.45, 1.0, 1.55] as const;
const LAYER_ALPHA = [0.38, 1.0, 1.15] as const;

function getQuality(w: number): Quality {
  if (w < 640) return { nodes: 5, fps: 30, knn: 2 };
  if (w < 1024) return { nodes: 7, fps: 60, knn: 2 };
  return { nodes: 9, fps: 60, knn: 3 };
}

function gridJitter(W: number, H: number, n: number): [number, number][] {
  const cols = Math.round(Math.sqrt((n * W) / H));
  const rows = Math.ceil(n / cols);
  const cw = W / cols,
    ch = H / rows;
  const pts: [number, number][] = [];
  for (let r = 0; r < rows && pts.length < n; r++)
    for (let c = 0; c < cols && pts.length < n; c++)
      pts.push([(c + 0.15 + Math.random() * 0.7) * cw, (r + 0.15 + Math.random() * 0.7) * ch]);
  return pts;
}

function knnEdges(nodes: Node[], k: number): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    nodes
      .map((n, j) => ({ j, d: Math.hypot(nodes[i].x - n.x, nodes[i].y - n.y) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j, d }) => {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ a: i, b: j, cpOff: (Math.random() - 0.5) * d * 0.22 });
        }
      });
  }
  return edges;
}

function qBez(ax: number, ay: number, cx: number, cy: number, bx: number, by: number, t: number) {
  const m = 1 - t;
  return {
    x: m * m * ax + 2 * m * t * cx + t * t * bx,
    y: m * m * ay + 2 * m * t * cy + t * t * by,
  };
}

function edgeCp(na: Node, nb: Node, off: number) {
  const dx = nb.x - na.x,
    dy = nb.y - na.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { cpx: (na.x + nb.x) / 2 + (-dy / len) * off, cpy: (na.y + nb.y) / 2 + (dx / len) * off };
}

function makeSprite(size: number, stops: [number, string][]): OffscreenCanvas {
  const oc = new OffscreenCanvas(size, size);
  const cx = size / 2;
  const c = oc.getContext("2d")!;
  const gr = c.createRadialGradient(cx, cx, 0, cx, cx, cx);
  for (const [p, col] of stops) gr.addColorStop(p, col);
  c.fillStyle = gr;
  c.fillRect(0, 0, size, size);
  return oc;
}

function makeFlow(ei: number, fwd: boolean, t = 0): Flow {
  return { ei, t, speed: 0.003 + Math.random() * 0.002, fwd };
}

export default function NeuralBackground({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const _canvas = canvasRef.current;
    if (!_canvas) return;
    const _ctx = _canvas.getContext("2d");
    if (!_ctx) return;
    const canvas: HTMLCanvasElement = _canvas;
    const ctx: CanvasRenderingContext2D = _ctx;

    const nodeGlow = makeSprite(120, [
      [0, "rgba(99,102,241,1)"],
      [0.35, "rgba(99,102,241,0.35)"],
      [0.7, "rgba(99,102,241,0.08)"],
      [1, "rgba(99,102,241,0)"],
    ]);
    const hubGlow = makeSprite(160, [
      [0, "rgba(139,92,246,1)"],
      [0.35, "rgba(120,100,255,0.4)"],
      [0.7, "rgba(99,102,241,0.1)"],
      [1, "rgba(99,102,241,0)"],
    ]);
    const flowGlow = makeSprite(56, [
      [0, "rgba(180,210,255,1)"],
      [0.35, "rgba(130,160,255,0.5)"],
      [1, "rgba(99,102,241,0)"],
    ]);

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let flows: Flow[] = [];
    let pings: Ping[] = [];
    let Q: Quality = getQuality(canvas.width);
    let rafId = 0;
    let lastFrame = 0;

    function dark(): boolean {
      const t = document.documentElement.dataset.theme;
      if (t === "light") return false;
      if (t === "dark") return true;
      return !window.matchMedia("(prefers-color-scheme: light)").matches;
    }

    function build() {
      const W = canvas.width,
        H = canvas.height;
      Q = getQuality(W);

      const pts = gridJitter(W, H, Q.nodes);
      nodes = pts.map(([x, y]) => {
        const layer = (Math.random() < 0.3 ? 0 : Math.random() < 0.57 ? 1 : 2) as 0 | 1 | 2;
        const sp = LAYER_SPEED[layer];
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.0022 * sp,
          vy: (Math.random() - 0.5) * 0.0022 * sp,
          r: (2.8 + Math.random() * 1.6) * LAYER_SCALE[layer],
          phase: Math.random() * Math.PI * 2,
          dPhase: 0.003 + Math.random() * 0.004,
          lit: 0,
          isHub: false,
          layer,
        };
      });
      nodes.sort((a, b) => a.layer - b.layer);

      edges = knnEdges(nodes, Q.knn);

      const deg = Array.from({ length: Q.nodes }, () => 0);
      for (const e of edges) {
        deg[e.a]++;
        deg[e.b]++;
      }
      const hubThresh = [...deg].sort((a, b) => b - a)[Math.min(3, deg.length - 1)];
      nodes.forEach((n, i) => {
        n.isHub = deg[i] >= hubThresh && deg[i] > 1;
      });

      pings = [];
      flows = edges.map((_, ei) => makeFlow(ei, Math.random() < 0.5, Math.random()));
    }

    function spawnFlowFrom(nodeIdx: number, excludeEi: number) {
      const cands: number[] = [];
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        if (i !== excludeEi && (e.a === nodeIdx || e.b === nodeIdx)) cands.push(i);
      }
      if (!cands.length) return;
      const ei = cands[Math.floor(Math.random() * cands.length)];
      let cnt = 0;
      for (const f of flows) if (f.ei === ei) cnt++;
      if (cnt < 1) flows.push(makeFlow(ei, edges[ei].a === nodeIdx));
    }

    function frame(now: number) {
      const W = canvas.width,
        H = canvas.height;

      if (Q.fps < 60 && now - lastFrame < 1000 / Q.fps) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      lastFrame = now;

      ctx.clearRect(0, 0, W, H);
      const d = dark();
      const dm = d ? 1 : 0.55;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) {
          n.vx *= -1;
          n.x = Math.max(0, Math.min(W, n.x));
        }
        if (n.y < 0 || n.y > H) {
          n.vy *= -1;
          n.y = Math.max(0, Math.min(H, n.y));
        }
        n.phase += n.dPhase;
        if (n.lit > 0) n.lit = Math.max(0, n.lit - 0.008);
      }

      // All edges in one batched draw call
      ctx.beginPath();
      for (const { a, b, cpOff } of edges) {
        const { cpx, cpy } = edgeCp(nodes[a], nodes[b], cpOff);
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.quadraticCurveTo(cpx, cpy, nodes[b].x, nodes[b].y);
      }
      ctx.strokeStyle = d ? "rgba(130,145,255,0.028)" : "rgba(80,95,220,0.015)";
      ctx.lineWidth = 0.45;
      ctx.stroke();

      // Node glows — back-to-front (nodes already sorted by layer)
      for (const n of nodes) {
        const s = (n.isHub ? 34 : 22) + n.lit * 14;
        ctx.globalAlpha =
          ((n.isHub ? 0.04 : 0.022) + n.lit * 0.06) * LAYER_ALPHA[n.layer] * (d ? 1 : 0.4);
        ctx.drawImage(n.isHub ? hubGlow : nodeGlow, n.x - s, n.y - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;

      // Node rings + bodies — merged loop, pulse computed once per node
      for (const n of nodes) {
        const la = LAYER_ALPHA[n.layer];
        const pulse = 0.5 + 0.5 * Math.sin(n.phase);

        const ringA = (0.028 + n.lit * 0.07 + pulse * 0.01) * dm * la;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (2.6 + pulse * 0.8 + n.lit * 1.8), 0, Math.PI * 2);
        ctx.strokeStyle = n.isHub
          ? d
            ? `rgba(175,145,255,${ringA})`
            : `rgba(120,80,220,${ringA * 0.6})`
          : d
            ? `rgba(140,155,255,${ringA})`
            : `rgba(80,100,220,${ringA * 0.6})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();

        const a = (0.4 + pulse * 0.12 + n.lit * 0.25) * (d ? 0.32 : 0.18) * la;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (n.isHub ? 1.55 : 1) * (1 + n.lit * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = n.isHub
          ? d
            ? `rgba(200,185,255,${a})`
            : `rgba(100,70,200,${a})`
          : d
            ? `rgba(185,195,255,${a})`
            : `rgba(80,95,210,${a})`;
        ctx.fill();
        if (n.isHub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = d ? `rgba(220,210,255,${a * 0.65})` : `rgba(140,100,240,${a * 0.5})`;
          ctx.fill();
        }
      }

      // Sonar pings — spawn ~1 per hub per 4 s, advance + draw, discard dead
      for (let i = 0; i < nodes.length; i++)
        if (nodes[i].isHub && Math.random() < 0.004)
          pings.push({ ni: i, r: nodes[i].r * 2, alpha: 0.45 });

      pings = pings.filter((p) => {
        p.r += 0.9;
        p.alpha -= 0.011;
        if (p.alpha <= 0) return false;
        const n = nodes[p.ni];
        ctx.beginPath();
        ctx.arc(n.x, n.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = d
          ? `rgba(175,150,255,${p.alpha * dm * 0.45})`
          : `rgba(120,80,220,${p.alpha * dm * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        return true;
      });

      // Flows — wire-light glow + comet trail + core dot
      const toRemove: number[] = [];
      for (let fi = 0; fi < flows.length; fi++) {
        const f = flows[fi];
        f.t += f.speed;

        if (f.t >= 1) {
          const dest = f.fwd ? edges[f.ei].b : edges[f.ei].a;
          nodes[dest].lit = Math.min(1, nodes[dest].lit + 0.5);
          spawnFlowFrom(dest, f.ei);
          toRemove.push(fi);
          continue;
        }

        const { a, b, cpOff } = edges[f.ei];
        const { cpx, cpy } = edgeCp(nodes[a], nodes[b], cpOff);
        const [fx, fy, tx, ty] = f.fwd
          ? [nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y]
          : [nodes[b].x, nodes[b].y, nodes[a].x, nodes[a].y];
        const p = qBez(fx, fy, cpx, cpy, tx, ty, f.t);

        // Wide soft wire-light pass
        ctx.beginPath();
        for (let ti = 10; ti >= 1; ti--) {
          const tp = qBez(fx, fy, cpx, cpy, tx, ty, Math.max(0, f.t - ti * 0.012));
          const tr = Math.max(0.1, 3.5 - ti * 0.3);
          ctx.moveTo(tp.x + tr, tp.y);
          ctx.arc(tp.x, tp.y, tr, 0, Math.PI * 2);
        }
        ctx.fillStyle = d ? "rgba(130,155,255,0.025)" : "rgba(80,100,220,0.014)";
        ctx.fill();

        // Tight comet trail
        ctx.beginPath();
        for (let ti = 7; ti >= 1; ti--) {
          const tp = qBez(fx, fy, cpx, cpy, tx, ty, Math.max(0, f.t - ti * 0.016));
          const tr = Math.max(0.1, 1.7 - ti * 0.2);
          ctx.moveTo(tp.x + tr, tp.y);
          ctx.arc(tp.x, tp.y, tr, 0, Math.PI * 2);
        }
        ctx.fillStyle = d ? "rgba(160,180,255,0.055)" : "rgba(80,100,220,0.03)";
        ctx.fill();

        ctx.globalAlpha = d ? 0.13 : 0.07;
        ctx.drawImage(flowGlow, p.x - 13, p.y - 13, 26, 26);
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = d ? "rgba(220,232,255,0.45)" : "rgba(90,110,230,0.32)";
        ctx.fill();
      }

      for (let i = toRemove.length - 1; i >= 0; i--) flows.splice(toRemove[i], 1);

      // Replenish empty edges — O(flows + edges) via Set
      const activeEdges = new Set<number>();
      for (const f of flows) activeEdges.add(f.ei);
      for (let ei = 0; ei < edges.length; ei++)
        if (!activeEdges.has(ei) && Math.random() < 0.006)
          flows.push(makeFlow(ei, Math.random() < 0.5));

      rafId = requestAnimationFrame(frame);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      build();
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastFrame = 0;
        rafId = requestAnimationFrame(frame);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
