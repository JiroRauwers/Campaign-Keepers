"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

// Constants for star properties
const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

// Type for a Star
interface Star {
  x: number;
  y: number;
  z: number;
}

// Main StarField component
const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars = useRef<Star[]>([]);
  const scale = useRef<number>(1);
  const width = useRef<number>(0);
  const height = useRef<number>(0);
  const velocity = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    z: 0.0001,
  });
  const [starColor, setStarColor] = useState(STAR_COLOR);
  const { theme } = useTheme();

  useEffect(() => {
    setStarColor(theme === "dark" ? "#fff" : "#000");
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    // Function to generate stars
    function generate() {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.current.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    // Function to place a star randomly on the canvas
    function placeStar(star: Star) {
      star.x = Math.random() * width.current;
      star.y = Math.random() * height.current;
    }

    // Function to recycle stars that go out of bounds
    function recycleStar(star: Star) {
      let direction = "z";
      const vx = Math.abs(velocity.current.x);
      const vy = Math.abs(velocity.current.y);

      if (vx > 1 || vy > 1) {
        let axis =
          vx > vy
            ? Math.random() < vx / (vx + vy)
              ? "h"
              : "v"
            : Math.random() < vy / (vx + vy)
              ? "v"
              : "h";
        direction =
          axis === "h"
            ? velocity.current.x > 0
              ? "l"
              : "r"
            : velocity.current.y > 0
              ? "t"
              : "b";
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width.current;
        star.y = Math.random() * height.current;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height.current * Math.random();
      } else if (direction === "r") {
        star.x = width.current + OVERFLOW_THRESHOLD;
        star.y = height.current * Math.random();
      } else if (direction === "t") {
        star.x = width.current * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width.current * Math.random();
        star.y = height.current + OVERFLOW_THRESHOLD;
      }
    }

    // Function to resize the canvas
    function resize() {
      scale.current = window.devicePixelRatio || 1;
      width.current = window.innerWidth * scale.current;
      height.current = window.innerHeight * scale.current;

      if (!canvas) return;
      canvas.width = width.current;
      canvas.height = height.current;

      stars.current.forEach(placeStar);
    }

    // Animation loop
    function step() {
      if (!context) return;
      context.clearRect(0, 0, width.current, height.current);
      update();
      render();
      requestAnimationFrame(step);
    }

    // Update star positions
    function update() {
      velocity.current.tx *= 0.96;
      velocity.current.ty *= 0.96;

      velocity.current.x += (velocity.current.tx - velocity.current.x) * 0.8;
      velocity.current.y += (velocity.current.ty - velocity.current.y) * 0.8;

      stars.current.forEach((star) => {
        star.x += velocity.current.x * star.z;
        star.y += velocity.current.y * star.z;
        star.x += (star.x - width.current / 2) * velocity.current.z * star.z;
        star.y += (star.y - height.current / 2) * velocity.current.z * star.z;
        star.z += velocity.current.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width.current + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height.current + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }

    // Render stars on canvas
    function render() {
      stars.current.forEach((star) => {
        if (!context) return;
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scale.current;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = starColor;

        context.moveTo(star.x, star.y);
        let tailX = velocity.current.x * 2;
        let tailY = velocity.current.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }

    window.addEventListener("resize", resize);

    generate();
    resize();
    step();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [starColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
  );
};

export default StarField;
