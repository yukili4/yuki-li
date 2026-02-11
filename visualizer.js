import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as d3 from "d3";

function Visualizer() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const size = 600;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${size / 2}, ${size / 2})`);

    // Main record disk
    g.append("circle")
      .attr("r", size * 0.45)
      .attr("fill", "#008b8b")
      .attr("class", "spinning-record")
      .style("transform-origin", "center")
      .attr("stroke", "rgba(255,255,255,0.1)")
      .attr("stroke-width", 2);

    // Concentric grooves
    for (let i = 0; i < 20; i++) {
      g.append("circle")
        .attr("r", size * 0.15 + (i * (size * 0.3)) / 20)
        .attr("fill", "none")
        .attr("stroke", "rgba(255, 255, 255, 0.15)")
        .attr("stroke-width", 1);
    }

    // Bright orange center
    g.append("circle")
      .attr("r", size * 0.12)
      .attr("fill", "#ff4500")
      .attr("filter", "drop-shadow(0 0 10px rgba(255, 69, 0, 0.5))");

    // Swimming fish
    const fishData = [
      { r: size * 0.25, speed: 30, size: 30, offset: 0, color: "#ffffff" },
      { r: size * 0.35, speed: 45, size: 25, offset: 120, color: "#ffffff" },
      { r: size * 0.18, speed: 25, size: 20, offset: 240, color: "#ffd700" },
      { r: size * 0.4, speed: 60, size: 15, offset: 60, color: "#ffffff" }
    ];

    const fishGroup = g.append("g");

    fishData.forEach(d => {
      const fishPath =
        "M0,-10 C5,-5 10,-2 15,0 C10,2 5,5 0,10 C-2,5 -5,2 -10,0 C-5,-2 -2,-5 0,-10";

      const container = fishGroup
        .append("g")
        .attr("class", "swimming-fish")
        .style("animation-duration", `${d.speed}s`)
        .style("animation-delay", `-${d.offset}s`);

      container
        .append("path")
        .attr("d", fishPath)
        .attr(
          "transform",
          `translate(${d.r}, 0) rotate(90) scale(${d.size / 10})`
        )
        .attr("fill", d.color)
        .attr("opacity", 1);
    });

    // Tonearm
    const tonearm = svg
      .append("g")
      .attr("transform", `translate(${size * 0.85}, ${size * 0.05})`);

    tonearm
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", -size * 0.4)
      .attr("y2", size * 0.4)
      .attr("stroke", "#e5e7eb")
      .attr("stroke-width", 4);

    tonearm
      .append("rect")
      .attr("x", -size * 0.4 - 12)
      .attr("y", size * 0.4 - 6)
      .attr("width", 30)
      .attr("height", 14)
      .attr("fill", "#e5e7eb")
      .attr("rx", 3)
      .attr("transform", "rotate(-45)");
  }, []);

  return React.createElement("svg", {
    ref: svgRef,
    viewBox: "0 0 600 600",
    preserveAspectRatio: "xMidYMid meet",
    className: "w-full h-full drop-shadow-2xl"
  });
}

function App() {
  return React.createElement(
    "div",
    {
      className: "w-full flex justify-center md:justify-end p-0 bg-transparent"
    },
    React.createElement(
      "div",
      {
        className:
          "relative w-full max-w-full md:max-w-[300px] lg:max-w-[340px] aspect-[3/4] bg-transparent border border-white/20 rounded-[20px] md:rounded-[28px] poster-shadow overflow-hidden flex flex-col justify-center"
      },
      // Texture overlay
      React.createElement("div", {
        className:
          "absolute inset-0 pointer-events-none textured-bg mix-blend-overlay opacity-30 z-20"
      }),
      // Animated disc
      React.createElement(
        "div",
        {
          className:
            "absolute inset-0 z-0 flex items-center justify-center p-0 opacity-80 translate-y-4"
        },
        React.createElement(Visualizer, null)
      ),
      // Foreground content
      React.createElement(
        "div",
        {
          className:
            "relative z-10 w-full h-full px-6 py-6 md:p-8 flex flex-col justify-between pointer-events-none"
        },
        React.createElement(
          "div",
          { className: "flex justify-between items-start" },
          // Artist label (left)
          React.createElement(
            "div",
            { className: "flex flex-col items-center gap-2" },
            React.createElement(
              "span",
              {
                className:
                  "vertical-text text-sm font-medium tracking-[0.3em] text-white/90 font-['Ubuntu'] uppercase"
              },
              "Kenshi Yonezu"
            ),
            React.createElement("div", {
              className: "w-[1px] h-8 bg-white/30"
            }),
            React.createElement(
              "span",
              {
                className:
                  "vertical-text text-[8px] tracking-widest text-white/40 uppercase font-['Ubuntu']"
              },
              "Artist"
            )
          ),
          // Song info (right)
          React.createElement(
            "div",
            { className: "flex flex-col items-end" },
            React.createElement(
              "h2",
              {
                className:
                  "text-4xl md:text-5xl font-bold text-[#ff4500] tracking-tighter font-['Ubuntu'] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              },
              "Lemon"
            ),
            React.createElement(
              "span",
              {
                className:
                  "text-white/40 tracking-[0.3em] text-[10px] mt-1 uppercase font-['Ubuntu'] bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/5"
              },
              "currently listening"
            )
          )
        ),
        React.createElement("div", { className: "flex-1" })
      )
    )
  );
}

const rootEl = document.getElementById("music-visualizer-root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(React.createElement(App));
}

