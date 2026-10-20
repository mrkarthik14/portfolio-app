"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { useThemeMode } from "@/theme/ThemeProvider";
import { projectEnrichment } from "@/lib/project-enrichment";
import { matchesProjectCategory } from "@/lib/project-categories";
import type { ProjectData } from "@/types";
import "./motion-portfolio.css";
import { useMotionPreference } from "@/hooks/useMotionPreference";

const studies = [
  {
    key: "vision",
    label: "Computer vision",
    title: "From pixels to patterns.",
    note: "Tracing motion. Revealing a signal.",
  },
  {
    key: "classification",
    label: "Classification",
    title: "Finding the boundary.",
    note: "Separating observations into meaningful groups.",
  },
  {
    key: "regression",
    label: "Regression",
    title: "Following the relationship.",
    note: "Exploring how one variable changes with another.",
  },
];
const featuredNames = [
  "SomnoVision",
  "Defect-Detection-in-Hot-Rolling",
  "END-2-END-ML-PROJECT-WITH-DEPLOYMENT",
  "Emerging-Repos-",
  "retail-bigquery-analytics",
  "Credit-Card-Fraud-Risk-Analysis",
];
const initialProjects: ProjectData[] = featuredNames.map((name, i) => ({
  id: name,
  githubId: i,
  name: projectEnrichment[name].title || name,
  description: projectEnrichment[name].description || "",
  url: `https://github.com/mrkarthik14/${name}`,
  homepage: null,
  stars: 0,
  forks: 0,
  language: "Python",
  topics: [],
  skills: projectEnrichment[name].skills,
  order: projectEnrichment[name].order,
  createdAt: "",
  updatedAt: "",
}));
const filters = [
  { key: "data-science", label: "All data work" },
  { key: "ml", label: "Machine learning & AI" },
  { key: "analytics", label: "Analytics" },
  { key: "data-engineering", label: "Data engineering" },
];

function Arrow() {
  return (
    <svg
      className="mp-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19L19 5M5 5H19V19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DataScene({
  kind,
  compact = false,
}: {
  kind: number;
  compact?: boolean;
}) {
  const gradientId = useId();
  return (
    <svg
      className={`data-scene ${compact ? "data-scene-small" : ""}`}
      viewBox="0 0 540 390"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="540"
          y2="390"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a6f3c6" />
          <stop offset="1" stopColor="#649fdb" />
        </linearGradient>
      </defs>
      <g opacity=".13" stroke="currentColor">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`v${i}`} d={`M${45 + i * 50} 25V365`} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`h${i}`} d={`M25 ${45 + i * 50}H520`} />
        ))}
      </g>
      <g className="scene-orbit" stroke="#83cda9" opacity=".2">
        <ellipse cx="270" cy="195" rx="172" ry="140" strokeDasharray="3 9" />
        <ellipse
          cx="270"
          cy="195"
          rx="225"
          ry="80"
          transform="rotate(-28 270 195)"
        />
      </g>
      {kind === 0 ? (
        <>
          <g stroke="#a6f3c6" strokeOpacity=".25">
            {[90, 160, 230, 300].flatMap((y, i) =>
              [100, 180, 260].map((nextY, j) => (
                <path key={`${i}-${j}`} d={`M130 ${y}L270 ${nextY}`} />
              )),
            )}
            {[100, 180, 260].flatMap((y, i) =>
              [140, 240].map((nextY, j) => (
                <path key={`${i}-${j}`} d={`M270 ${y}L410 ${nextY}`} />
              )),
            )}
          </g>
          {[
            ...Array.from({ length: 4 }, (_, i) => [130, 90 + i * 70]),
            ...Array.from({ length: 3 }, (_, i) => [270, 100 + i * 80]),
            [410, 140],
            [410, 240],
          ].map(([x, y], i) => (
            <g
              key={i}
              className="scene-node"
              style={{ animationDelay: `${i * -0.4}s` }}
            >
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="#85e0ba"
                fillOpacity=".07"
                stroke="#85e0ba"
                strokeOpacity=".4"
              />
              <circle cx={x} cy={y} r="5" fill="#baf6d6" />
            </g>
          ))}
          <circle className="signal-particle" r="4" fill="#d5ffe9">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M130 160L270 180L410 140"
            />
          </circle>
        </>
      ) : (
        <>
          {Array.from({ length: 38 }, (_, i) => {
            const x = 65 + ((i * 71) % 410);
            const y =
              kind === 1
                ? 75 + ((i * 53) % 245)
                : 315 - x * 0.48 + Math.sin(i * 2.4) * 36;
            return (
              <circle
                key={i}
                className="scene-dot"
                cx={x}
                cy={y}
                r={i % 4 === 0 ? 6 : 4}
                fill={kind === 1 && x + y > 435 ? "#8aaad8" : "#a6f3c6"}
                style={{ animationDelay: `${i * -0.13}s` }}
              />
            );
          })}
          <path
            className="scene-trace"
            d={
              kind === 1
                ? "M140 330C190 270 245 230 290 185S370 100 410 50"
                : "M55 290C150 245 310 185 485 80"
            }
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeDasharray="6 7"
          />
        </>
      )}
      <path
        d="M50 342H492M50 342V38"
        stroke="currentColor"
        strokeOpacity=".25"
      />
      <text
        x="52"
        y="368"
        fill="currentColor"
        opacity=".4"
        fontSize="10"
        fontFamily="monospace"
      >
        INPUT / OBSERVATIONS
      </text>
      <text
        x="400"
        y="368"
        fill="currentColor"
        opacity=".4"
        fontSize="10"
        fontFamily="monospace"
      >
        OUTPUT →
      </text>
    </svg>
  );
}

export default function HeroSection() {
  const { mode } = useThemeMode();
  const reducedMotion = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const [study, setStudy] = useState(0);
  const [filter, setFilter] = useState("data-science");
  const [projects, setProjects] = useState(initialProjects);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub unavailable");
        return response.json();
      })
      .then((data: ProjectData[]) => {
        setProjects(data);
        setConnected(true);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  const visible = projects
    .filter((project) => matchesProjectCategory(project, filter))
    .slice(0, 6);
  const dataCount = projects.filter((project) =>
    matchesProjectCategory(project, "data-science"),
  ).length;
  const intro = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="motion-portfolio"
        data-theme={mode}
        data-motion={paused || reducedMotion ? "paused" : "running"}
      >
        <section
          className="mp-hero mp-wrap"
          aria-labelledby="portfolio-heading"
        >
          <div className="mp-topline">
            <span>
              <i /> DATA SCIENCE × MACHINE LEARNING
            </span>
            <span>CHARAN KARTHIK / PORTFOLIO</span>
          </div>
          <div className="mp-hero-grid">
            <motion.div {...intro} className="mp-intro">
              <p className="mp-eyebrow">
                A little curiosity. A lot of possibilities.
              </p>
              <h1 id="portfolio-heading">
                Raw data.
                <br />
                <span>Real insight.</span>
                <br />
                What&apos;s next<span className="mp-dot">?</span>
              </h1>
              <p className="mp-lead">
                I&apos;m Charan Karthik Nayakanti, an aspiring data scientist
                exploring the space between{" "}
                <strong>human questions and machine intelligence.</strong>
              </p>
              <p className="mp-subcopy">
                Python, statistics, and a curiosity for how things work.
                Building projects in computer vision, predictive modeling, and
                business analytics.
              </p>
              <div className="mp-actions">
                <a
                  className="mp-button mp-button-primary"
                  href="#selected-work"
                >
                  Explore my work{" "}
                  <span>
                    <Arrow />
                  </span>
                </a>
                <Link className="mp-text-link" href="/about">
                  The person behind the data <span>→</span>
                </Link>
              </div>
              <div className="mp-signature">
                <span className="mp-monogram">CK</span>
                <div>
                  Charan Karthik Nayakanti
                  <small>Data science & machine learning</small>
                </div>
                <a
                  href="https://github.com/mrkarthik14"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Charan Karthik on GitHub"
                >
                  GitHub <Arrow />
                </a>
              </div>
            </motion.div>
            <motion.div
              {...intro}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mp-explorer"
            >
              <div className="mp-explorer-head">
                <span>
                  <i /> THE PATTERN LAB
                </span>
                <button
                  className="mp-pause"
                  onClick={() => setPaused((value) => !value)}
                  aria-pressed={paused}
                  aria-label={
                    paused
                      ? "Resume graphic animations"
                      : "Pause graphic animations"
                  }
                >
                  {paused ? "▷ Play" : "Ⅱ Pause"}
                </button>
              </div>
              <div className="mp-visual">
                <DataScene kind={study} />
                <div className="mp-visual-badge">
                  <span>f(x)</span> a different way to see
                </div>
              </div>
              <div className="mp-study-copy">
                <span className="mp-mono">0{study + 1} / EXPLORATION</span>
                <h2>{studies[study].title}</h2>
                <p>{studies[study].note}</p>
              </div>
              <div
                className="mp-study-controls"
                role="group"
                aria-label="Choose a model visualization"
              >
                {studies.map((item, i) => (
                  <button
                    key={item.key}
                    aria-pressed={study === i}
                    onClick={() => setStudy(i)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mp-visual-caption">
                Interactive illustration · not live model inference
              </p>
            </motion.div>
          </div>
          <div className="mp-hero-bottom">
            <span>SCROLL TO DISCOVER ↓</span>
            <span>Observe. Experiment. Learn. Repeat.</span>
          </div>
        </section>
        <div className="mp-ticker" aria-label="Tools and areas of interest">
          <div>
            {[
              "Python",
              "Machine Learning",
              "SQL",
              "Computer Vision",
              "Data Storytelling",
              "Statistics",
              "Python",
              "Machine Learning",
              "SQL",
              "Computer Vision",
              "Data Storytelling",
              "Statistics",
            ].map((skill, i) => (
              <span key={i} aria-hidden={i >= 6 ? true : undefined}>
                {skill}
                <b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <section
          id="selected-work"
          className="mp-work mp-wrap"
          aria-labelledby="work-heading"
        >
          <div className="mp-section-heading">
            <div>
              <p className="mp-eyebrow">01 / SELECTED EXPERIMENTS</p>
              <h2 id="work-heading">
                Questions worth
                <br />
                <em>exploring.</em>
              </h2>
            </div>
            <div className="mp-work-note">
              <p>
                From a breathing pattern to a business decision.
                <br />A collection of problems I&apos;m learning to solve.
              </p>
              <span className="mp-connection">
                <i />
                {connected
                  ? `${dataCount} data projects · connected to GitHub`
                  : "Selected projects from my GitHub"}
              </span>
            </div>
          </div>
          <div
            className="mp-filters"
            role="group"
            aria-label="Filter selected projects"
          >
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                aria-pressed={filter === item.key}
              >
                {item.label}
              </button>
            ))}
            <Link href="/projects">
              Full project index <Arrow />
            </Link>
          </div>
          <div className="mp-project-grid">
            {visible.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mp-project"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45 }}
              >
                <div className={`mp-project-art mp-art-${i % 3}`}>
                  <span className="mp-project-number">
                    EXPERIMENT / {String(i + 1).padStart(2, "0")}
                  </span>
                  <DataScene kind={i % 3} compact />
                  <span className="mp-project-arrow">
                    <Arrow />
                  </span>
                </div>
                <div className="mp-project-content">
                  <div className="mp-tags">
                    {(project.skills || project.topics)
                      .slice(0, 3)
                      .map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <span className="mp-project-cta">
                    Explore repository{" "}
                    <span>
                      <Arrow />
                    </span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
          {visible.length === 0 && (
            <p className="mp-empty">
              More experiments are on the way.{" "}
              <Link href="/projects">Browse the full project index →</Link>
            </p>
          )}
        </section>
        <section
          className="mp-process mp-wrap"
          aria-labelledby="process-heading"
        >
          <div className="mp-section-heading">
            <div>
              <p className="mp-eyebrow">02 / THE WAY I THINK</p>
              <h2 id="process-heading">
                Less guesswork.
                <br />
                <em>More evidence.</em>
              </h2>
            </div>
            <p className="mp-work-note">
              The model is only one part of the story.
              <br />
              Understanding the problem comes first.
            </p>
          </div>
          <div className="mp-process-grid">
            {[
              [
                "01",
                "Ask a better question.",
                "Start with the context, the people, and the decision the data needs to support.",
                "Understand",
              ],
              [
                "02",
                "Look closer.",
                "Clean, visualize, and explore. Find the patterns, question the assumptions, notice what is missing.",
                "Explore",
              ],
              [
                "03",
                "Build. Test. Refine.",
                "Choose a baseline, evaluate honestly, and turn what I learn into something useful.",
                "Experiment",
              ],
            ].map(([number, title, copy, word]) => (
              <div className="mp-process-step" key={number}>
                <div>
                  <span>{number}</span>
                  <span className="mp-process-symbol">
                    {number === "01" ? "◎" : number === "02" ? "⌁" : <Arrow />}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>{word} →</small>
              </div>
            ))}
          </div>
        </section>
        <section className="mp-toolbox mp-wrap">
          <p className="mp-eyebrow">03 / MY WORKBENCH</p>
          <div className="mp-toolbox-grid">
            <h2>
              Tools change.
              <br />
              <em>Curiosity stays.</em>
            </h2>
            <div>
              {[
                [
                  "Explore & analyze",
                  "Python · SQL · Pandas · NumPy · Jupyter",
                ],
                [
                  "Model & experiment",
                  "Scikit-learn · XGBoost · OpenCV · SciPy",
                ],
                [
                  "Visualize & share",
                  "Power BI · Matplotlib · Seaborn · Streamlit",
                ],
              ].map(([label, tools]) => (
                <div className="mp-tool-row" key={label}>
                  <h3>{label}</h3>
                  <p>{tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mp-contact mp-wrap">
          <p className="mp-eyebrow">HAVE AN INTERESTING PROBLEM?</p>
          <h2>
            Let&apos;s find
            <br />
            <em>the signal.</em>
            <span>
              <Arrow />
            </span>
          </h2>
          <div>
            <p>
              Open to data science, machine learning, and analytics
              opportunities.
              <br />
              Always up for an exchange of ideas.
            </p>
            <Link className="mp-button mp-button-primary" href="/contact">
              Start a conversation <Arrow />
            </Link>
          </div>
          <div className="mp-contact-links">
            <a
              href="https://github.com/mrkarthik14"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a
              href="https://www.linkedin.com/in/charankarthiknayakanti/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
            <Link href="/experience">
              My journey <Arrow />
            </Link>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
