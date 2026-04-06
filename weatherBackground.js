(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const STAR_COUNT = 388;
  const CLOUD_COUNT = 7;
  const DEFAULT_INPUT = {
    isDay: true,
    phase: "day",
    tone: "soft",
    variant: "clear",
    phenomenonVariant: "",
    season: "auto",
    precipitationLocked: false,
    windSpeed: 0,
    windGustSpeed: 0,
    windDirection: null,
    windCategory: "calm",
    temperature: null,
    apparentTemperature: null,
    humidity: null,
    precipitationAmount: 0,
    rainAmount: 0,
    showersAmount: 0,
    snowfallAmount: 0,
    precipitationProbability: null,
    cloudCover: null,
    cloudCoverLow: null,
    cloudCoverMid: null,
    cloudCoverHigh: null,
    cloudLocked: false,
    visibility: null,
    pressureMsl: null,
    surfacePressure: null,
    hasThunder: false,
    hasHail: false,
    moonPhase: "auto"
  };

  const state = {
    root: null,
    host: null,
    skyCanvas: null,
    skyCtx: null,
    treeCanvas: null,
    treeCtx: null,
    celestialLayer: null,
    precipCanvas: null,
    precipCtx: null,
    fxCanvas: null,
    fxCtx: null,
    debugBadge: null,
    sunWrap: null,
    moonWrap: null,
    moonShade: null,
    cssWidth: 0,
    cssHeight: 0,
    headerHeight: 0,
    skyHeight: 0,
    stars: [],
    clouds: [],
    treeProfile: null,
    treeParticles: [],
    rainFar: [],
    rainMid: [],
    rainNear: [],
    snowFar: [],
    snowMid: [],
    snowNear: [],
    snowGroundCover: 0,
    snowGroundProfile: [],
    snowGroundSeeds: [],
    waterGroundCover: 0,
    waterGroundProfile: [],
    waterGroundSeeds: [],
    hailMid: [],
    hailNear: [],
    hailGroundCover: 0,
    hailGroundProfile: [],
    hailGroundSeeds: [],
    windTrails: [],
    splashes: [],
    lightningValue: 0,
    lightningBolt: null,
    activeSceneKey: "",
    activePeriod: "day",
    activePhase: "day",
    activePhenomenon: "none",
    activeCloudPreset: "clear",
    activeElectricityLevel: 0,
    activeWindSpeed: 0,
    activeWindGustSpeed: 0,
    activeWindDirection: null,
    activeTemperature: null,
    activeApparentTemperature: null,
    activeHumidity: null,
    activeVisibility: null,
    activeCloudCover: null,
    activePrecipitationAmount: 0,
    activeRainAmount: 0,
    activeShowersAmount: 0,
    activeSnowfallAmount: 0,
    activePrecipitationProbability: null,
    activeMoonPhase: "gibbous",
    activePrecipitationLocked: false,
    activeParticleProfile: "",
    activeSeason: "spring",
    activeDebugLabel: "",
    rafId: 0,
    paused: false,
    pausedAt: 0,
    startTs: 0,
    lastFrameTs: 0,
    lastSkyDrawTs: 0,
    lastTreeDrawTs: 0,
    frameScale: 1,
    time: 0,
    forceSkyRedraw: true,
    forceTreeRedraw: true,
    precipFrameActive: false,
    resizeBound: false,
    resizeObserver: null,
    resizeHost: null,
    layoutSyncRaf: 0
  };

  function ensureRoot() {
    const host = document.body;
    if (!host) return null;

    if (!state.root) {
      const root = document.createElement("div");
      root.className = "weather-bg-engine weather-bg-engine--volumetric";
      root.setAttribute("aria-hidden", "true");
      root.dataset.period = "day";
      root.dataset.scene = "clear_day";
      root.style.position = "fixed";
      root.style.inset = "0 auto auto 0";
      root.style.zIndex = "0";
      root.style.pointerEvents = "none";
      root.style.background = "transparent";
      root.innerHTML = `
        <canvas class="weather-bg-engine__shader-canvas"></canvas>
        <canvas class="weather-bg-engine__layer weather-bg-engine__tree-canvas"></canvas>
        <div class="weather-bg-engine__debug-badge"></div>
        <div class="weather-bg-engine__celestial">
          <div class="weather-bg-engine__sun-wrap">
            <div class="weather-bg-engine__sun-halo weather-bg-engine__sun-halo--far"></div>
            <div class="weather-bg-engine__sun-halo weather-bg-engine__sun-halo--mid"></div>
            <div class="weather-bg-engine__sun-halo weather-bg-engine__sun-halo--near"></div>
            <div class="weather-bg-engine__sun-disc"></div>
          </div>
          <div class="weather-bg-engine__moon-wrap">
            <div class="weather-bg-engine__moon-glow"></div>
            <div class="weather-bg-engine__moon-disc">
              <div class="weather-bg-engine__moon-shade"></div>
            </div>
          </div>
        </div>
        <canvas class="weather-bg-engine__layer weather-bg-engine__precip-canvas"></canvas>
        <canvas class="weather-bg-engine__layer weather-bg-engine__fx-canvas"></canvas>
      `;
      state.root = root;
      state.skyCanvas = root.querySelector(".weather-bg-engine__shader-canvas");
      state.skyCtx = state.skyCanvas.getContext("2d", { alpha: false, desynchronized: true });
      state.treeCanvas = root.querySelector(".weather-bg-engine__tree-canvas");
      state.treeCtx = state.treeCanvas.getContext("2d", { alpha: true, desynchronized: true });
      state.celestialLayer = root.querySelector(".weather-bg-engine__celestial");
      state.precipCanvas = root.querySelector(".weather-bg-engine__precip-canvas");
      state.precipCtx = state.precipCanvas.getContext("2d", { alpha: true, desynchronized: true });
      state.fxCanvas = root.querySelector(".weather-bg-engine__fx-canvas");
      state.fxCtx = state.fxCanvas.getContext("2d", { alpha: true, desynchronized: true });
      state.debugBadge = root.querySelector(".weather-bg-engine__debug-badge");
      state.sunWrap = root.querySelector(".weather-bg-engine__sun-wrap");
      state.moonWrap = root.querySelector(".weather-bg-engine__moon-wrap");
      state.moonShade = root.querySelector(".weather-bg-engine__moon-shade");
    }

    if (state.root.parentElement !== host) {
      host.insertBefore(state.root, host.firstChild);
    }

    state.host = host;
    bindResize();
    syncLayout();
    return state.root;
  }

  function requestSyncLayout() {
    if (state.layoutSyncRaf) return;
    state.layoutSyncRaf = window.requestAnimationFrame(() => {
      state.layoutSyncRaf = 0;
      syncLayout();
    });
  }

  function syncResizeObserverHost() {
    if (!state.resizeObserver) return;
    const nextHost = document.querySelector(".page-shell") || document.body;
    if (!nextHost || nextHost === state.resizeHost) return;
    if (state.resizeHost) {
      try {
        state.resizeObserver.unobserve(state.resizeHost);
      } catch (_error) {
        // Ignore stale observer targets during host swaps.
      }
    }
    state.resizeHost = nextHost;
    state.resizeObserver.observe(nextHost);
  }

  function bindResize() {
    if (state.resizeBound) return;
    state.resizeBound = true;
    window.addEventListener("resize", requestSyncLayout, { passive: true });
    if ("ResizeObserver" in window) {
      state.resizeObserver = new ResizeObserver(() => requestSyncLayout());
      syncResizeObserverHost();
    }
  }

  function syncLayout() {
    if (!state.root || !state.host) return;
    syncResizeObserverHost();
    const anchor = document.querySelector(".page-shell");
    const rect = anchor?.getBoundingClientRect?.();
    const heroRect = document.querySelector(".hero")?.getBoundingClientRect?.();
    const viewportWidth = Math.max(1, Math.round(window.innerWidth || document.documentElement.clientWidth || 1));
    const viewportHeight = Math.max(1, Math.round(window.innerHeight || document.documentElement.clientHeight || 1));
    const width = Math.max(1, Math.round(rect?.width || viewportWidth));
    const left = Math.max(0, Math.round(rect?.left || 0));
    const topInset = 0;
    const sceneHeight = Math.max(1, viewportHeight);
    const headerHeight = Math.max(
      184,
      Math.min(
        220,
        Math.round(Math.max(148, (heroRect?.height || 0) * 0.55))
      )
    );
    const previousWidth = Math.max(1, state.cssWidth || width);
    const previousHeight = Math.max(1, state.cssHeight || sceneHeight);
    const previousHeaderHeight = Math.max(1, state.headerHeight || headerHeight);
    const initialLayout = !state.cssWidth || !state.cssHeight || !state.headerHeight;
    const widthChanged = initialLayout || Math.abs(previousWidth - width) >= 2;
    const heightChanged = initialLayout || Math.abs(previousHeight - sceneHeight) >= 2;
    const headerChanged = initialLayout || Math.abs(previousHeaderHeight - headerHeight) >= 2;

    state.root.style.left = `${left}px`;
    state.root.style.top = `${topInset}px`;
    state.root.style.width = `${width}px`;
    state.root.style.height = `${sceneHeight}px`;
    state.root.style.setProperty("--mobile-weather-header-height", `${headerHeight}px`);
    state.root.style.setProperty("--mobile-weather-top-inset", `${topInset}px`);

    state.cssWidth = width;
    state.cssHeight = sceneHeight;
    state.headerHeight = headerHeight;
    state.skyHeight = sceneHeight;
    if (widthChanged || heightChanged) {
      resizeCanvas(state.skyCanvas, state.skyCtx, state.cssWidth, state.cssHeight, false);
      resizeCanvas(state.treeCanvas, state.treeCtx, state.cssWidth, state.cssHeight, true);
      resizeCanvas(state.precipCanvas, state.precipCtx, state.cssWidth, state.cssHeight, true);
      resizeCanvas(state.fxCanvas, state.fxCtx, state.cssWidth, state.cssHeight, true);
      state.forceSkyRedraw = true;
      state.forceTreeRedraw = true;
    }
    if (state.skyCanvas) state.skyCanvas.style.height = `${state.cssHeight}px`;
    if (state.treeCanvas) state.treeCanvas.style.height = `${state.cssHeight}px`;
    if (state.celestialLayer) state.celestialLayer.style.height = `${state.cssHeight}px`;
    if (!state.stars.length) buildStars();
    else if (widthChanged || heightChanged) rescaleStars(previousWidth, previousHeight, state.cssWidth, state.cssHeight);

    if (!state.clouds.length) {
      buildClouds();
      state.forceSkyRedraw = true;
    } else if (widthChanged || headerChanged) {
      rescaleCloudField(previousWidth, previousHeaderHeight, state.cssWidth, state.headerHeight);
      state.forceSkyRedraw = true;
    }

    if (!state.treeProfile || widthChanged || heightChanged || headerChanged) {
      buildTreeProfile();
      state.forceTreeRedraw = true;
    }

    if (!hasParticleField()) buildParticles();
    else if (widthChanged || heightChanged) rescaleParticleField(previousWidth, previousHeight, state.cssWidth, state.cssHeight);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function scaleIfFinite(value, factor) {
    return Number.isFinite(value) ? value * factor : value;
  }

  function rescaleStars(previousWidth, previousHeight, nextWidth, nextHeight) {
    const scaleX = nextWidth / Math.max(1, previousWidth);
    const scaleY = nextHeight / Math.max(1, previousHeight);
    for (const star of state.stars) {
      star.x = clamp(scaleIfFinite(star.x, scaleX), 0, nextWidth);
      star.y = clamp(scaleIfFinite(star.y, scaleY), 0, nextHeight * 0.84);
    }
  }

  function rescaleCloudNodes(nodes, scaleX, scaleY) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      node.ox = scaleIfFinite(node.ox, scaleX);
      node.oy = scaleIfFinite(node.oy, scaleY);
      node.rx = Math.max(8, scaleIfFinite(node.rx, scaleX));
      node.ry = Math.max(6, scaleIfFinite(node.ry, scaleY));
    }
  }

  function rescaleCloudField(previousWidth, previousHeaderHeight, nextWidth, nextHeaderHeight) {
    const scaleX = nextWidth / Math.max(1, previousWidth);
    const scaleY = nextHeaderHeight / Math.max(1, previousHeaderHeight);
    const widthScale = clamp(scaleX, 0.84, 1.28);
    const heightScale = clamp(scaleY, 0.88, 1.22);
    const cloudBottom = cloudFieldBottomLimit();
    for (const cloud of state.clouds) {
      cloud.originX = scaleIfFinite(cloud.originX, scaleX);
      cloud.y = clamp(scaleIfFinite(cloud.y, scaleY), 14, Math.max(18, cloudBottom - 44));
      cloud.w = Math.max(88, scaleIfFinite(cloud.w, widthScale));
      cloud.h = Math.max(44, scaleIfFinite(cloud.h, heightScale));
      cloud.bobAmount = Math.max(1.4, scaleIfFinite(cloud.bobAmount, clamp(scaleY, 0.92, 1.12)));
      cloud.spriteCanvas = null;
      cloud.spriteKey = "";
      rescaleCloudNodes(cloud.nodes, widthScale, heightScale);
      rescaleCloudNodes(cloud.shadowNodes, widthScale, heightScale);
      rescaleCloudNodes(cloud.veilNodes, widthScale, heightScale);
    }
  }

  function rescaleParticleLayer(items, scaleX, scaleY, nextWidth, nextHeight) {
    for (const item of items) {
      const margin = Number.isFinite(item.wrapMargin) ? Math.max(20, item.wrapMargin * clamp(scaleX, 0.88, 1.18)) : 96;
      item.x = clamp(scaleIfFinite(item.x, scaleX), -margin, nextWidth + margin);
      item.y = clamp(scaleIfFinite(item.y, scaleY), -nextHeight * 0.32, nextHeight + 56);
      if (Number.isFinite(item.spawnOffsetX)) item.spawnOffsetX *= clamp(scaleX, 0.88, 1.18);
      if (Number.isFinite(item.spawnOffsetY)) item.spawnOffsetY *= clamp(scaleY, 0.88, 1.18);
      if (Number.isFinite(item.len)) item.len *= clamp(scaleY, 0.92, 1.10);
      if (Number.isFinite(item.bounceDx)) item.bounceDx *= clamp(scaleX, 0.88, 1.14);
      if (Number.isFinite(item.bounceVy)) item.bounceVy *= clamp(scaleY, 0.92, 1.10);
      if (Number.isFinite(item.wrapMargin)) item.wrapMargin = margin;
    }
  }

  function rescaleWindTrails(previousWidth, previousHeight, nextWidth, nextHeight) {
    const scaleX = nextWidth / Math.max(1, previousWidth);
    const scaleY = nextHeight / Math.max(1, previousHeight);
    for (const trail of state.windTrails) {
      trail.x = clamp(scaleIfFinite(trail.x, scaleX), -24, nextWidth + 24);
      trail.y = clamp(scaleIfFinite(trail.y, scaleY), 22, nextHeight + 18);
      trail.len = Math.max(18, scaleIfFinite(trail.len, clamp(scaleX, 0.92, 1.18)));
      trail.lift = Math.max(6, scaleIfFinite(trail.lift, clamp(scaleY, 0.92, 1.14)));
    }
  }

  function rescaleSplashes(previousWidth, previousHeight, nextWidth, nextHeight) {
    const scaleX = nextWidth / Math.max(1, previousWidth);
    const scaleY = nextHeight / Math.max(1, previousHeight);
    for (const splash of state.splashes) {
      splash.x = clamp(scaleIfFinite(splash.x, scaleX), -18, nextWidth + 18);
      splash.y = clamp(scaleIfFinite(splash.y, scaleY), -18, nextHeight + 18);
      if (Number.isFinite(splash.r)) splash.r = Math.max(0.8, scaleIfFinite(splash.r, clamp((scaleX + scaleY) * 0.5, 0.92, 1.12)));
    }
  }

  function rescaleParticleField(previousWidth, previousHeight, nextWidth, nextHeight) {
    const scaleX = nextWidth / Math.max(1, previousWidth);
    const scaleY = nextHeight / Math.max(1, previousHeight);
    rescaleParticleLayer(state.rainFar, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.rainMid, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.rainNear, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.snowFar, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.snowMid, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.snowNear, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.hailMid, scaleX, scaleY, nextWidth, nextHeight);
    rescaleParticleLayer(state.hailNear, scaleX, scaleY, nextWidth, nextHeight);
    rescaleWindTrails(previousWidth, previousHeight, nextWidth, nextHeight);
    rescaleSplashes(previousWidth, previousHeight, nextWidth, nextHeight);
  }

  function canvasRenderDpr(canvas) {
    const deviceDpr = Math.max(1, Number(window.devicePixelRatio) || 1);
    const isMobileShell = isMobileWeatherShell();
    const lowPerformanceMobile = isLowPerformanceMobileWeatherMode();
    const warmEdgePhase = state.activePhase === "dawn" || state.activePhase === "sunset";
    if (canvas === state.skyCanvas) {
      if (isMobileShell) {
        if (lowPerformanceMobile) return 1;
        if (warmEdgePhase) {
          if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, 1.16);
          if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, 1.22);
          if (state.activeCloudPreset === "partly") return Math.min(deviceDpr, 1.28);
          return Math.min(deviceDpr, 1.32);
        }
        if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, 1);
        if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, 1);
        if (state.activeCloudPreset === "partly") return Math.min(deviceDpr, 1.02);
        return Math.min(deviceDpr, 1.04);
      }
      if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, 1.12);
      if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, 1.22);
      if (state.activeCloudPreset === "partly") return Math.min(deviceDpr, 1.36);
      return Math.min(deviceDpr, 1.52);
    }

    if (canvas === state.precipCanvas || canvas === state.fxCanvas) {
      const isHeavySky = state.activeCloudPreset === "overcast" || state.activeCloudPreset === "cloudy";
      const isPrecipScene = state.activePhenomenon === "rain"
        || state.activePhenomenon === "storm"
        || state.activePhenomenon === "snow"
        || state.activePhenomenon === "sleet"
        || state.activePhenomenon === "hail";
      if (isMobileShell) {
        if (lowPerformanceMobile) return 1;
        if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, 1);
        if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, isPrecipScene ? 1.01 : 1);
        if (isHeavySky) return Math.min(deviceDpr, 1.01);
        return Math.min(deviceDpr, isPrecipScene ? 1.02 : 1);
      }
      if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, isPrecipScene ? 1.30 : 1.24);
      if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, isPrecipScene ? 1.38 : 1.30);
      if (isHeavySky) return Math.min(deviceDpr, 1.42);
      return Math.min(deviceDpr, 1.58);
    }

    if (canvas === state.treeCanvas) {
      if (isMobileShell) return 1;
      if (state.activeCloudPreset === "overcast") return Math.min(deviceDpr, 1.02);
      if (state.activeCloudPreset === "cloudy") return Math.min(deviceDpr, 1.06);
      return Math.min(deviceDpr, 1.12);
    }

    return Math.min(deviceDpr, 2);
  }

  function resizeCanvas(canvas, ctx, width, height, alpha) {
    if (!canvas || !ctx) return;
    const dpr = canvasRenderDpr(canvas);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality = "high";
    if (!alpha) {
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function normaliseInput(input) {
    const merged = { ...DEFAULT_INPUT, ...(input || {}) };
    const variant = String(merged.variant || merged.condition || "clear").trim().toLowerCase();
    const phenomenonVariant = String(merged.phenomenonVariant || merged.conditionVariant || variant || "none").trim().toLowerCase();
    const tone = String(merged.tone || "soft").trim().toLowerCase();
    const period = merged.period === "night" || merged.isDay === false ? "night" : "day";
    const phase = String(merged.phase || period).trim().toLowerCase() || period;
    const windSpeed = Number.isFinite(Number(merged.windSpeed)) ? Number(merged.windSpeed) : 0;
    const windGustSpeed = Number.isFinite(Number(merged.windGustSpeed)) ? Number(merged.windGustSpeed) : 0;
    const windDirection = Number.isFinite(Number(merged.windDirection)) ? Number(merged.windDirection) : null;
    const windCategory = merged.windCategory || windCategoryFromSpeed(windSpeed);
    return {
      ...merged,
      variant,
      phenomenonVariant,
      tone,
      period,
      phase,
      precipitationLocked: Boolean(merged.precipitationLocked),
      windSpeed,
      windGustSpeed,
      windDirection,
      windCategory,
      temperature: Number.isFinite(Number(merged.temperature)) ? Number(merged.temperature) : null,
      apparentTemperature: Number.isFinite(Number(merged.apparentTemperature)) ? Number(merged.apparentTemperature) : null,
      humidity: Number.isFinite(Number(merged.humidity)) ? Number(merged.humidity) : null,
      precipitationAmount: Number.isFinite(Number(merged.precipitationAmount)) ? Number(merged.precipitationAmount) : 0,
      rainAmount: Number.isFinite(Number(merged.rainAmount)) ? Number(merged.rainAmount) : 0,
      showersAmount: Number.isFinite(Number(merged.showersAmount)) ? Number(merged.showersAmount) : 0,
      snowfallAmount: Number.isFinite(Number(merged.snowfallAmount)) ? Number(merged.snowfallAmount) : 0,
      precipitationProbability: Number.isFinite(Number(merged.precipitationProbability)) ? Number(merged.precipitationProbability) : null,
      cloudCover: Number.isFinite(Number(merged.cloudCover)) ? Number(merged.cloudCover) : null,
      cloudCoverLow: Number.isFinite(Number(merged.cloudCoverLow)) ? Number(merged.cloudCoverLow) : null,
      cloudCoverMid: Number.isFinite(Number(merged.cloudCoverMid)) ? Number(merged.cloudCoverMid) : null,
      cloudCoverHigh: Number.isFinite(Number(merged.cloudCoverHigh)) ? Number(merged.cloudCoverHigh) : null,
      cloudLocked: Boolean(merged.cloudLocked),
      visibility: Number.isFinite(Number(merged.visibility)) ? Number(merged.visibility) : null,
      pressureMsl: Number.isFinite(Number(merged.pressureMsl)) ? Number(merged.pressureMsl) : null,
      surfacePressure: Number.isFinite(Number(merged.surfacePressure)) ? Number(merged.surfacePressure) : null,
      hasThunder: Boolean(merged.hasThunder || tone === "storm" || variant === "storm"),
      hasHail: Boolean(merged.hasHail || variant === "hail")
    };
  }

  function windCategoryFromSpeed(speed) {
    if (speed >= 45) return "gale";
    if (speed >= 20) return "strong";
    if (speed >= 4) return "breeze";
    return "calm";
  }

  function windStrengthFactor() {
    return Math.max(0, Math.min(1.2, state.activeWindSpeed / 58));
  }

  function gustStrengthFactor() {
    return Math.max(windStrengthFactor(), Math.max(0, Math.min(1.3, state.activeWindGustSpeed / 72)));
  }

  function isPrecipitationCalm() {
    const wind = Math.max(0, Number(state.activeWindSpeed) || 0);
    const gust = Math.max(0, Number(state.activeWindGustSpeed) || 0);
    return wind <= 14 && gust <= 20;
  }

  function areWindTrailsActive(windSpeed = state.activeWindSpeed, windGustSpeed = state.activeWindGustSpeed) {
    return Math.max(0, Number(windSpeed) || 0) >= 18 || Math.max(0, Number(windGustSpeed) || 0) >= 26;
  }

  function cloudDriftFactor() {
    const wind = Math.max(0, Number(state.activeWindGustSpeed) || 0, Number(state.activeWindSpeed) || 0);
    if (wind <= 8) return 0;
    return Math.min(1.4, Math.pow((wind - 8) / 18, 0.90));
  }

  function cloudMotionCompensation(preset = state.activeCloudPreset, coverage = cloudCoverageRatio(), width = 160) {
    const presetBoost = preset === "overcast"
      ? 1.56
      : preset === "cloudy"
        ? 1.34
        : preset === "partly"
          ? 1.16
          : 1.00;
    const widthBoost = clamp(width / 158, 0.94, 1.52);
    const coverageBoost = 1 + Math.max(0, coverage - 0.18) * 0.36;
    return Math.min(2.05, presetBoost * widthBoost * coverageBoost);
  }

  function precipitationDirectionalFactor() {
    const wind = Math.max(0, Number(state.activeWindSpeed) || 0);
    if (wind <= 14) return 0;
    return Math.min(1.55, Math.pow((wind - 14) / 22, 0.92));
  }

  function precipitationChaosFactor() {
    const gust = Math.max(0, Number(state.activeWindGustSpeed) || 0, Number(state.activeWindSpeed) || 0);
    const gustDelta = Math.max(0, (Number(state.activeWindGustSpeed) || 0) - (Number(state.activeWindSpeed) || 0));
    if (gust <= 22 && gustDelta < 12) return 0;
    const gustRamp = Math.max(0, (gust - 22) / 20);
    const deltaRamp = Math.max(0, (gustDelta - 10) / 16);
    return Math.min(1.9, Math.pow(gustRamp, 0.96) + Math.pow(deltaRamp, 1.06) * 0.86);
  }

  function precipitationWindResponse() {
    return Math.max(precipitationDirectionalFactor(), precipitationChaosFactor() * 0.92);
  }

  function windFlowDirectionX() {
    if (!Number.isFinite(state.activeWindDirection)) return 0;
    const flowRad = ((state.activeWindDirection + 180) * Math.PI) / 180;
    const x = Math.sin(flowRad);
    if (Math.abs(x) < 0.06) return 0;
    const softened = Math.sign(x) * Math.pow(Math.abs(x), 0.78);
    const limit = state.activePhenomenon === "snow"
      ? 0.52
      : state.activePhenomenon === "sleet"
        ? 0.66
        : 0.84;
    return Math.max(-limit, Math.min(limit, softened));
  }

  function windDrivenPhenomenonKey() {
    if (state.activeSceneKey === "hail") return "hail";
    if (state.activeSceneKey === "storm" || state.activePhenomenon === "storm") return "storm";
    return state.activePhenomenon || "none";
  }

  function activeRainParticlePhenomenonKey() {
    if (state.activeSceneKey === "hail") return "hail";
    if (state.activePhenomenon === "storm" || state.activeSceneKey === "storm") return "storm";
    if (state.activePhenomenon === "sleet" || state.activeSceneKey === "sleet") return "sleet";
    return "rain";
  }

  function windParticleDriftLimit(phenomenon = windDrivenPhenomenonKey()) {
    const strength = gustStrengthFactor();
    if (phenomenon === "storm") return 8.2 + strength * 2.8;
    if (phenomenon === "rain") return 7.0 + strength * 2.5;
    if (phenomenon === "hail") return 6.2 + strength * 2.4;
    if (phenomenon === "sleet") return 5.2 + strength * 2.0;
    if (phenomenon === "snow") return 4.2 + strength * 1.8;
    return 5.8 + strength * 1.8;
  }

  function windParticleTrailLimit(phenomenon = windDrivenPhenomenonKey()) {
    const strength = gustStrengthFactor();
    if (phenomenon === "storm") return 52 + strength * 20;
    if (phenomenon === "rain") return 42 + strength * 18;
    if (phenomenon === "hail") return 32 + strength * 16;
    if (phenomenon === "sleet") return 28 + strength * 14;
    if (phenomenon === "snow") return 22 + strength * 12;
    return 24 + strength * 12;
  }

  function gustBurstStrengthAt(y, time = state.time, phase = 0) {
    const gust = gustStrengthFactor();
    const chaosFactor = precipitationChaosFactor();
    const gustDelta = Math.max(0, state.activeWindGustSpeed - state.activeWindSpeed);
    if (chaosFactor <= 0.01 || (gust < 0.28 && gustDelta < 6)) return 0;
    const pulseA = Math.max(0, Math.sin(time * (0.82 + gust * 0.74) + phase * 0.72 + y * 0.006));
    const pulseB = Math.max(0, Math.sin(time * (1.56 + gust * 0.84) - phase * 1.18 + y * 0.003 + 1.1));
    const envelope = Math.pow(pulseA, 5) * (0.55 + pulseB * 0.45);
    const stormBoost = state.activeSceneKey === "storm" || state.activeSceneKey === "hail" ? 0.14 : 0;
    const intensity = clamp(((gust - 0.20) * 1.24 + Math.min(1.2, gustDelta / 24) * 0.56 + stormBoost) * chaosFactor, 0, 1.9);
    return Math.min(1.9, envelope * intensity);
  }

  function chaoticWindBiasAt(x = 0, y = 0, time = state.time, phase = 0) {
    const strength = gustStrengthFactor();
    const directionSeed = Number.isFinite(state.activeWindDirection) ? (state.activeWindDirection * Math.PI) / 180 : 0;
    const waveA = Math.sin(time * (0.98 + strength * 0.82) + phase * 1.24 + y * 0.017 + x * 0.002 + directionSeed);
    const waveB = Math.sin(time * (1.74 + strength * 0.66) - phase * 1.42 - y * 0.029 + x * 0.003 - directionSeed * 0.7);
    const waveC = Math.sin(time * (2.36 + strength * 0.48) + phase * 0.92 + y * 0.011 - x * 0.0017 + directionSeed * 1.3);
    return clamp(waveA * 0.48 + waveB * 0.32 + waveC * 0.20, -1, 1);
  }

  function precipitationLaneBiasAt(x = 0, y = 0, phase = 0) {
    const flow = windFlowDirectionX();
    const laneA = Math.sin(y * 0.010 + phase * 1.16 + x * 0.0014 + flow * 1.2);
    const laneB = Math.sin(y * 0.022 - phase * 0.74 + x * 0.0009 - flow * 0.9);
    const mixed = laneA * 0.66 + laneB * 0.34;
    if (Math.abs(flow) <= 0.04) return clamp(mixed * 0.60, -0.62, 0.62);
    return clamp(flow * 0.78 + mixed * 0.18, -1, 1);
  }

  function windBurstOffsetAt(y, time = state.time, phase = 0, phenomenon = windDrivenPhenomenonKey(), mode = "move") {
    const burst = gustBurstStrengthAt(y, time, phase);
    if (burst <= 0.001) return 0;
    const strength = gustStrengthFactor();
    const chaosFactor = precipitationChaosFactor();
    const limit = mode === "trail" ? windParticleTrailLimit(phenomenon) : windParticleDriftLimit(phenomenon);
    const lowerFactor = clamp((Number(y) || 0) / Math.max(1, state.cssHeight || 1), 0.16, 1);
    const phenomenonBoost = phenomenon === "storm"
      ? 1.18
      : phenomenon === "rain"
        ? 1.08
        : phenomenon === "hail"
        ? 1.12
          : phenomenon === "sleet"
            ? 0.96
            : 0.88;
    const laneBias = precipitationLaneBiasAt(0, y, phase);
    const chaoticBias = chaoticWindBiasAt(0, y, time, phase);
    const pulseNoise = Math.sin(time * (3.4 + strength * 0.9) + phase * 1.4 + y * 0.009) * limit * 0.04 * chaosFactor;
    const sweep = limit * (0.12 + burst * (0.46 + strength * 0.12)) * phenomenonBoost * chaosFactor;
    const directionalSweep = clamp(laneBias + chaoticBias * (0.10 + chaosFactor * 0.10), -1, 1) * sweep * (0.34 + lowerFactor * 0.24);
    return clamp(directionalSweep + pulseNoise, -limit * 0.86, limit * 0.86);
  }

  function windScatterOffsetAt(y, time = state.time, phase = 0, phenomenon = windDrivenPhenomenonKey(), mode = "move") {
    const strength = gustStrengthFactor();
    const chaosFactor = precipitationChaosFactor();
    if (chaosFactor <= 0.01 || (strength <= 0.08 && state.activeWindSpeed < 8)) return 0;
    const limit = mode === "trail" ? windParticleTrailLimit(phenomenon) : windParticleDriftLimit(phenomenon);
    const burst = gustBurstStrengthAt(y, time, phase);
    const lowerFactor = clamp((Number(y) || 0) / Math.max(1, state.cssHeight || 1), 0.18, 1);
    const turbulenceBoost = phenomenon === "storm"
      ? 1
      : phenomenon === "rain"
        ? 0.94
        : phenomenon === "hail"
          ? 0.90
          : phenomenon === "sleet"
            ? 0.84
            : 0.78;
    const laneBias = precipitationLaneBiasAt(0, y, phase);
    const bandA = Math.sin(y * (0.022 + strength * 0.005) + time * (1.24 + strength * 0.74) + phase * 0.84);
    const bandB = Math.sin(y * (0.044 + strength * 0.008) - time * (0.92 + strength * 0.48) + phase * 1.64);
    const bandC = Math.sin(y * (0.078 + strength * 0.012) + time * (2.18 + strength * 0.92) - phase * 1.12);
    const mixedBands = bandA * 0.38 + bandB * 0.24 + bandC * 0.14 + laneBias * 0.24;
    const amplitude = limit
      * (mode === "trail" ? 0.12 : 0.07)
      * (0.52 + strength * 0.92 + burst * 0.54)
      * turbulenceBoost
      * chaosFactor
      * (0.68 + lowerFactor * (0.40 + chaosFactor * 0.16));
    const directionalWobble = laneBias * limit * (mode === "trail" ? 0.06 : 0.04) * (0.34 + burst * 0.24) * chaosFactor;
    const scatterLimit = limit * (mode === "trail" ? 0.78 : 0.66);
    return clamp(mixedBands * amplitude + directionalWobble, -scatterLimit, scatterLimit);
  }

  function clampWindParticleOffset(value, scale = 1, phenomenon = windDrivenPhenomenonKey(), mode = "move") {
    const limit = mode === "trail" ? windParticleTrailLimit(phenomenon) : windParticleDriftLimit(phenomenon);
    return clamp((Number(value) || 0) * scale, -limit, limit);
  }

  function frameStepScale() {
    return clamp(Number(state.frameScale) || 1, 0.7, 2.4);
  }

  function animationFrameIntervalMs() {
    if (!isMobileWeatherShell()) return 0;
    if (isLowPerformanceMobileWeatherMode()) {
      if (state.activeSceneKey === "hail" || state.activePhenomenon === "storm") return 52;
      if (
        state.activePhenomenon === "rain"
        || state.activePhenomenon === "snow"
        || state.activePhenomenon === "sleet"
        || state.activeCloudPreset === "overcast"
        || state.activeCloudPreset === "cloudy"
      ) {
        return 44;
      }
      return 40;
    }
    if (state.activeSceneKey === "hail" || state.activePhenomenon === "storm") return 40;
    if (
      state.activePhenomenon === "rain"
      || state.activePhenomenon === "snow"
      || state.activePhenomenon === "sleet"
      || state.activeCloudPreset === "overcast"
      || state.activeCloudPreset === "cloudy"
    ) {
      return 38;
    }
    return 36;
  }

  function skyRedrawIntervalMs() {
    if (state.activeElectricityLevel > 0.04 || state.lightningValue > 0.02) return 16;
    if (isLowPerformanceMobileWeatherMode()) {
      if (state.activeCloudPreset === "overcast") return 120;
      if (state.activeCloudPreset === "cloudy") return 96;
      if (state.activeCloudPreset === "partly") return 76;
      return 56;
    }
    if (state.activeCloudPreset === "overcast") return 42;
    if (state.activeCloudPreset === "cloudy") return 34;
    if (state.activeCloudPreset === "partly") return 26;
    return 16;
  }

  function treeRedrawIntervalMs() {
    if (isLowPerformanceMobileWeatherMode()) return 140;
    const wind = gustStrengthFactor();
    if (wind >= 0.88) return 24;
    if (wind >= 0.42) return 30;
    return 38;
  }

  function isTreeEnabled() {
    return typeof document !== "undefined"
      && Boolean(document.body?.classList.contains("app-mobile-shell"))
      && !isLowPerformanceMobileWeatherMode();
  }

  function clearTreeLayer() {
    if (!state.treeCtx) return;
    state.treeCtx.clearRect(0, 0, state.cssWidth, state.cssHeight);
  }

  function applyFrameDecay(value, factorPerFrame) {
    const safeValue = Number(value) || 0;
    const safeFactor = clamp(Number(factorPerFrame) || 0, 0, 1);
    return safeValue * Math.pow(safeFactor, frameStepScale());
  }

  function precipitationFloorY(padding = 6) {
    const fallback = Math.max(0, (state.cssHeight || 0) - Math.max(0, Number(padding) || 0));
    if (!isMobileWeatherShell() || typeof document === "undefined") return fallback;
    const nav = document.getElementById("mobile-bottom-nav") || document.querySelector(".mobile-bottom-nav");
    const navRect = nav?.getBoundingClientRect?.();
    if (!navRect || !Number.isFinite(navRect.top)) return fallback;
    return clamp(navRect.top - Math.max(0, Number(padding) || 0), 0, fallback);
  }

  function precipitationVisibleTopY() {
    if (!isMobileWeatherShell()) return 0;
    return 0;
  }

  function isLowPerformanceMobileWeatherMode() {
    if (!isMobileWeatherShell()) return false;
    const narrowScreen = Math.min(
      Math.max(0, Number(window.innerWidth) || 0),
      Math.max(0, Number(state.cssWidth) || 0) || Math.max(0, Number(window.innerWidth) || 0)
    ) <= 820;
    const coarsePointer = typeof window.matchMedia === "function"
      ? window.matchMedia("(pointer: coarse)").matches
      : false;
    return coarsePointer || narrowScreen;
  }

  function shouldUseStaticMobileWeatherScene() {
    if (!isLowPerformanceMobileWeatherMode()) return false;
    const animatedPrecipitationScene = (
      state.activePhenomenon === "rain"
      || state.activePhenomenon === "storm"
      || state.activePhenomenon === "snow"
      || state.activePhenomenon === "sleet"
      || state.activeSceneKey === "hail"
    );
    return !animatedPrecipitationScene;
  }

  function mobileParticleBudgetFactor() {
    if (!isMobileWeatherShell()) return 1;
    if (isLowPerformanceMobileWeatherMode()) {
      if (
        state.activeSceneKey === "hail"
        || state.activePhenomenon === "storm"
        || state.activePhenomenon === "rain"
        || state.activePhenomenon === "snow"
        || state.activePhenomenon === "sleet"
      ) {
        return 0.42;
      }
      if (state.activeCloudPreset === "overcast" || state.activeCloudPreset === "cloudy") return 0.52;
      return 0.62;
    }
    if (
      state.activeSceneKey === "hail"
      || state.activePhenomenon === "storm"
      || state.activePhenomenon === "rain"
      || state.activePhenomenon === "snow"
      || state.activePhenomenon === "sleet"
    ) {
      return 0.68;
    }
    if (state.activeCloudPreset === "overcast" || state.activeCloudPreset === "cloudy") return 0.76;
    return 0.84;
  }

  function ensureSnowGroundSeeds() {
    const desiredCount = Math.max(10, Math.round((state.cssWidth || 320) / 16));
    if (Array.isArray(state.snowGroundSeeds) && state.snowGroundSeeds.length === desiredCount) return;
    state.snowGroundSeeds = Array.from({ length: desiredCount }, () => ({
      xRatio: Math.random(),
      depth: Math.random(),
      yBias: Math.random(),
      size: 0.9 + Math.random() * 1.5,
      stretch: 0.8 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2
    })).sort((a, b) => a.xRatio - b.xRatio);
  }

  function ensureSnowGroundProfile() {
    const desiredBins = Math.max(16, Math.round((state.cssWidth || 320) / 14));
    if (!Array.isArray(state.snowGroundProfile) || !state.snowGroundProfile.length) {
      state.snowGroundProfile = Array.from({ length: desiredBins }, () => 0);
      return;
    }
    if (state.snowGroundProfile.length === desiredBins) return;
    const previous = state.snowGroundProfile.slice();
    const previousLast = Math.max(1, previous.length - 1);
    state.snowGroundProfile = Array.from({ length: desiredBins }, (_entry, index) => {
      const ratio = desiredBins <= 1 ? 0 : index / (desiredBins - 1);
      const mapped = ratio * previousLast;
      const left = Math.floor(mapped);
      const right = Math.min(previous.length - 1, left + 1);
      const blend = mapped - left;
      const leftValue = Number(previous[left]) || 0;
      const rightValue = Number(previous[right]) || 0;
      return leftValue + (rightValue - leftValue) * blend;
    });
  }

  function snowGroundProfileStrength() {
    if (!Array.isArray(state.snowGroundProfile) || !state.snowGroundProfile.length) return 0;
    let sum = 0;
    let peak = 0;
    for (const value of state.snowGroundProfile) {
      const safe = Math.max(0, Number(value) || 0);
      sum += safe;
      if (safe > peak) peak = safe;
    }
    const avg = sum / Math.max(1, state.snowGroundProfile.length);
    return clamp(avg * 0.94 + peak * 0.28, 0, 1);
  }

  function depositSnowGroundAt(x, amount = 0.0048, spread = 1.3) {
    if (!isMobileWeatherShell()) return;
    ensureSnowGroundProfile();
    const bins = state.snowGroundProfile;
    const count = bins.length;
    if (!count) return;
    const width = Math.max(1, state.cssWidth || 1);
    const clampedX = clamp(Number(x) || 0, 0, width);
    const center = (clampedX / width) * Math.max(1, count - 1);
    const radiusBins = Math.max(1, spread * count / width * 9.2);
    const start = Math.max(0, Math.floor(center - radiusBins));
    const end = Math.min(count - 1, Math.ceil(center + radiusBins));
    for (let index = start; index <= end; index += 1) {
      const distance = Math.abs(index - center);
      const influence = Math.max(0, 1 - distance / radiusBins);
      if (influence <= 0) continue;
      bins[index] = clamp(
        bins[index] + amount * (0.34 + influence * 0.66),
        0,
        1.4
      );
    }
    for (let index = 1; index < count - 1; index += 1) {
      bins[index] = bins[index] * 0.84 + (bins[index - 1] + bins[index] + bins[index + 1]) / 3 * 0.16;
    }
    state.snowGroundCover = Math.max(state.snowGroundCover, snowGroundProfileStrength());
  }

  function ensureWaterGroundSeeds() {
    const desiredCount = Math.max(9, Math.round((state.cssWidth || 320) / 22));
    if (Array.isArray(state.waterGroundSeeds) && state.waterGroundSeeds.length === desiredCount) return;
    state.waterGroundSeeds = Array.from({ length: desiredCount }, () => ({
      xRatio: Math.random(),
      depth: Math.random(),
      yBias: Math.random(),
      size: 1.2 + Math.random() * 2.1,
      stretch: 1.4 + Math.random() * 3.2,
      phase: Math.random() * Math.PI * 2
    })).sort((a, b) => a.xRatio - b.xRatio);
  }

  function ensureWaterGroundProfile() {
    const desiredBins = Math.max(18, Math.round((state.cssWidth || 320) / 13));
    if (!Array.isArray(state.waterGroundProfile) || !state.waterGroundProfile.length) {
      state.waterGroundProfile = Array.from({ length: desiredBins }, () => 0);
      return;
    }
    if (state.waterGroundProfile.length === desiredBins) return;
    const previous = state.waterGroundProfile.slice();
    const previousLast = Math.max(1, previous.length - 1);
    state.waterGroundProfile = Array.from({ length: desiredBins }, (_entry, index) => {
      const ratio = desiredBins <= 1 ? 0 : index / (desiredBins - 1);
      const mapped = ratio * previousLast;
      const left = Math.floor(mapped);
      const right = Math.min(previous.length - 1, left + 1);
      const blend = mapped - left;
      const leftValue = Number(previous[left]) || 0;
      const rightValue = Number(previous[right]) || 0;
      return leftValue + (rightValue - leftValue) * blend;
    });
  }

  function waterGroundProfileStrength() {
    if (!Array.isArray(state.waterGroundProfile) || !state.waterGroundProfile.length) return 0;
    let sum = 0;
    let peak = 0;
    for (const value of state.waterGroundProfile) {
      const safe = Math.max(0, Number(value) || 0);
      sum += safe;
      if (safe > peak) peak = safe;
    }
    const avg = sum / Math.max(1, state.waterGroundProfile.length);
    return clamp(avg * 0.86 + peak * 0.42, 0, 1);
  }

  function depositWaterGroundAt(x, amount = 0.00105, spread = 1.2) {
    if (!isMobileWeatherShell()) return;
    ensureWaterGroundProfile();
    const bins = state.waterGroundProfile;
    const count = bins.length;
    if (!count) return;
    const width = Math.max(1, state.cssWidth || 1);
    const clampedX = clamp(Number(x) || 0, 0, width);
    const center = (clampedX / width) * Math.max(1, count - 1);
    const radiusBins = Math.max(1, spread * count / width * 10.4);
    const start = Math.max(0, Math.floor(center - radiusBins));
    const end = Math.min(count - 1, Math.ceil(center + radiusBins));
    for (let index = start; index <= end; index += 1) {
      const distance = Math.abs(index - center);
      const influence = Math.max(0, 1 - distance / radiusBins);
      if (influence <= 0) continue;
      bins[index] = clamp(
        bins[index] + amount * (0.22 + influence * 0.78),
        0,
        1.3
      );
    }
    for (let index = 1; index < count - 1; index += 1) {
      bins[index] = bins[index] * 0.78 + (bins[index - 1] + bins[index] + bins[index + 1]) / 3 * 0.22;
    }
    state.waterGroundCover = Math.max(state.waterGroundCover, waterGroundProfileStrength());
  }

  function groundContourOffset(xRatio = 0, cover = 0, kind = "snow") {
    const safeRatio = clamp(Number(xRatio) || 0, 0, 1);
    const safeCover = clamp(Number(cover) || 0, 0, 1);
    const phase = kind === "hail" ? 1.14 : 0.42;
    const waveA = Math.sin(safeRatio * Math.PI * (2.8 + phase) + phase);
    const waveB = Math.sin(safeRatio * Math.PI * (6.2 + phase * 0.5) - phase * 1.7);
    const waveC = Math.sin(safeRatio * Math.PI * (11.4 + phase * 0.28) + 1.6);
    const mixed = waveA * 0.52 + waveB * 0.30 + waveC * 0.18;
    return mixed * (0.34 + safeCover * 0.46);
  }

  function drawWeatherFloor(time = state.time) {
    if (!isMobileWeatherShell() || !state.fxCtx) return;
    const w = state.cssWidth;
    const floorY = precipitationFloorY(8);
    const rainLike = state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "drizzle";
    const fogLike = state.activePhenomenon === "fog";
    const sleetLike = state.activePhenomenon === "sleet";
    const snowLike = state.activePhenomenon === "snow";
    const hailLike = state.activeSceneKey === "hail";
    const activeWetSurface = (rainLike || sleetLike) && (state.rainFar.length || state.rainMid.length || state.rainNear.length);
    ensureWaterGroundProfile();
    if (activeWetSurface) {
      for (let index = 1; index < state.waterGroundProfile.length - 1; index += 1) {
        state.waterGroundProfile[index] = state.waterGroundProfile[index] * 0.76
          + (state.waterGroundProfile[index - 1] + state.waterGroundProfile[index] + state.waterGroundProfile[index + 1]) / 3 * 0.24;
      }
      const target = waterGroundProfileStrength();
      state.waterGroundCover += (target - state.waterGroundCover) * 0.12 * frameStepScale();
    } else {
      state.waterGroundCover = 0;
      for (let index = 0; index < state.waterGroundProfile.length; index += 1) {
        state.waterGroundProfile[index] = 0;
      }
    }
    const waterCover = clamp(Math.max(state.waterGroundCover, waterGroundProfileStrength()), 0, 1);
    const precipitationAmount = Math.max(
      0,
      Number(state.activePrecipitationAmount) || 0,
      Number(state.activeSnowfallAmount) || 0
    );
    const wetStrength = rainLike || sleetLike
      ? clamp(0.12 + precipitationAmount / 10, 0.14, sleetLike ? 0.56 : 0.62)
      : fogLike
        ? 0.16
        : snowLike || hailLike
          ? 0.08
          : 0.11;
    const surfaceStrength = Math.max(wetStrength, waterCover * (sleetLike ? 0.94 : 0.88));
    const bandHeight = rainLike || sleetLike
      ? 18 + surfaceStrength * 18
      : fogLike
        ? 16
        : 14;
    const topY = floorY - bandHeight;
    const phaseWarm = state.activePhase === "dawn" || state.activePhase === "sunset";
    const contourKind = sleetLike ? "hail" : "snow";
    const mediumOnlySurface = rainLike || sleetLike || snowLike || hailLike;

    if (!mediumOnlySurface) {
      const floorBase = state.fxCtx.createLinearGradient(0, topY, 0, floorY + 2);
      if (fogLike) {
        floorBase.addColorStop(0, "rgba(242,246,250,0.02)");
        floorBase.addColorStop(1, "rgba(222,230,240,0.12)");
      } else {
        floorBase.addColorStop(0, "rgba(230,236,244,0.02)");
        floorBase.addColorStop(1, phaseWarm ? "rgba(188,178,190,0.10)" : "rgba(164,176,194,0.10)");
      }
      state.fxCtx.fillStyle = floorBase;
      state.fxCtx.fillRect(0, topY, w, floorY + 2 - topY);
    }

    const floorPoints = [];
    const pointCount = 16;
    for (let index = 0; index <= pointCount; index += 1) {
      const xRatio = index / pointCount;
      const contour = groundContourOffset(xRatio, 0.18 + surfaceStrength * 0.40 + waterCover * 0.26, contourKind);
      const baseRise = rainLike
        ? contour * (0.10 + waterCover * 0.08)
        : sleetLike
          ? contour * (0.12 + waterCover * 0.08)
          : contour * 0.10;
      floorPoints.push({
        x: xRatio * w,
        y: floorY - bandHeight * clamp(0.05 + baseRise, 0.01, 0.26)
      });
    }

    if (!mediumOnlySurface) {
      const edge = state.fxCtx.createLinearGradient(0, floorY - bandHeight * 0.34, 0, floorY + 2);
      edge.addColorStop(0, "rgba(244,248,252,0.12)");
      edge.addColorStop(1, "rgba(214,224,236,0.05)");
      state.fxCtx.strokeStyle = edge;
      state.fxCtx.lineWidth = 1.4;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(0, floorPoints[0].y);
      for (let i = 0; i < floorPoints.length - 1; i += 1) {
        const current = floorPoints[i];
        const next = floorPoints[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const crestY = Math.min(current.y, next.y) - bandHeight * 0.008;
        state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
      }
      state.fxCtx.stroke();
    }

    if (rainLike || sleetLike) {
      const dropletCount = rainLike ? 7 : 5;
      for (let index = 0; index < dropletCount; index += 1) {
        const xRatio = (index + 0.5) / dropletCount;
        const contour = groundContourOffset(xRatio + time * 0.0012, surfaceStrength + waterCover * 0.5, contourKind);
        const x = w * xRatio + Math.sin(time * 0.0008 + index * 1.7) * 6;
        const y = floorY - (1.2 + bandHeight * 0.06 + Math.max(0, contour) * bandHeight * 0.04);
        const rx = 5 + surfaceStrength * 7 + waterCover * 5 + (index % 2) * 1.8;
        const ry = 0.9 + surfaceStrength * 1.4 + waterCover * 0.8;
        state.fxCtx.fillStyle = rainLike
          ? `rgba(208,230,255,${(0.08 + surfaceStrength * 0.05 + waterCover * 0.08).toFixed(2)})`
          : `rgba(238,244,250,${(0.06 + surfaceStrength * 0.04 + waterCover * 0.05).toFixed(2)})`;
        state.fxCtx.beginPath();
        state.fxCtx.ellipse(x, y, rx, ry, Math.sin(index * 1.2) * 0.10, 0, Math.PI * 2);
        state.fxCtx.fill();
      }
    }

    if (waterCover > 0.01 && (rainLike || sleetLike)) {
      ensureWaterGroundSeeds();
      const waterBand = Math.max(7, Math.min(24, 5 + waterCover * 18));
      const puddlePoints = [];
      for (let index = 0; index < state.waterGroundProfile.length; index += 1) {
        const value = Math.max(0, Number(state.waterGroundProfile[index]) || 0);
        if (value <= 0.01) continue;
        const xRatio = state.waterGroundProfile.length <= 1 ? 0 : index / (state.waterGroundProfile.length - 1);
        const contour = groundContourOffset(xRatio, waterCover * 0.42, contourKind);
        puddlePoints.push({
          x: xRatio * w,
          y: floorY - waterBand * clamp(0.04 + value * 0.24 + contour * 0.04, 0.02, 0.42),
          reveal: value
        });
      }

      if (puddlePoints.length >= 2 && waterCover > 0.12) {
        const puddleFill = state.fxCtx.createLinearGradient(0, floorY - waterBand, 0, floorY + 1);
        if (sleetLike) {
          puddleFill.addColorStop(0, `rgba(214,222,232,${(0.08 + waterCover * 0.08).toFixed(2)})`);
          puddleFill.addColorStop(0.56, `rgba(176,188,202,${(0.12 + waterCover * 0.12).toFixed(2)})`);
          puddleFill.addColorStop(1, `rgba(148,162,182,${(0.16 + waterCover * 0.16).toFixed(2)})`);
        } else {
          puddleFill.addColorStop(0, `rgba(178,214,255,${(0.10 + waterCover * 0.10).toFixed(2)})`);
          puddleFill.addColorStop(0.54, `rgba(116,170,232,${(0.12 + waterCover * 0.14).toFixed(2)})`);
          puddleFill.addColorStop(1, `rgba(68,126,192,${(0.16 + waterCover * 0.18).toFixed(2)})`);
        }
        state.fxCtx.fillStyle = puddleFill;
        state.fxCtx.beginPath();
        state.fxCtx.moveTo(0, floorY);
        state.fxCtx.lineTo(0, puddlePoints[0].y);
        for (let i = 0; i < puddlePoints.length - 1; i += 1) {
          const current = puddlePoints[i];
          const next = puddlePoints[i + 1];
          const midX = (current.x + next.x) * 0.5;
          const crestY = Math.min(current.y, next.y) - waterBand * 0.020 * Math.min(1, current.reveal + next.reveal);
          state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
        }
        state.fxCtx.lineTo(w, floorY);
        state.fxCtx.closePath();
        state.fxCtx.fill();

        state.fxCtx.strokeStyle = sleetLike
          ? `rgba(248,250,252,${(0.12 + waterCover * 0.12).toFixed(2)})`
          : `rgba(222,242,255,${(0.14 + waterCover * 0.16).toFixed(2)})`;
        state.fxCtx.lineWidth = 1.2 + waterCover * 1.0;
        state.fxCtx.beginPath();
        state.fxCtx.moveTo(0, puddlePoints[0].y);
        for (let i = 0; i < puddlePoints.length - 1; i += 1) {
          const current = puddlePoints[i];
          const next = puddlePoints[i + 1];
          const midX = (current.x + next.x) * 0.5;
          const crestY = Math.min(current.y, next.y) - waterBand * 0.012;
          state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
        }
        state.fxCtx.stroke();
      }

      const seedStep = waterCover < 0.18 ? 1 : waterCover < 0.42 ? 1 : 2;
      for (let i = 0; i < state.waterGroundSeeds.length; i += seedStep) {
        const seed = state.waterGroundSeeds[i];
        const profileIndex = Math.min(
          state.waterGroundProfile.length - 1,
          Math.max(0, Math.round(seed.xRatio * Math.max(1, state.waterGroundProfile.length - 1)))
        );
        const localPool = Math.max(0, Number(state.waterGroundProfile[profileIndex]) || 0);
        const reveal = localPool * (waterCover > 0.18 ? 1.18 : 0.92) - seed.depth * (waterCover > 0.18 ? 0.40 : 0.22);
        if (reveal <= 0.01) continue;
        const contour = groundContourOffset(seed.xRatio, waterCover * 0.34, contourKind);
        const x = seed.xRatio * w;
        const y = floorY - waterBand * (0.04 + localPool * 0.16 + contour * 0.02);
        const radiusX = seed.size * seed.stretch * (0.68 + waterCover * 1.8 + reveal * 0.9);
        const radiusY = 0.55 + waterCover * 1.9 + reveal * 1.4 + seed.yBias * 0.14;
        state.fxCtx.fillStyle = sleetLike
          ? `rgba(214,222,232,${Math.min(0.44, 0.06 + reveal * 0.22 + waterCover * 0.18).toFixed(2)})`
          : `rgba(132,186,244,${Math.min(0.54, 0.08 + reveal * 0.26 + waterCover * 0.18).toFixed(2)})`;
        state.fxCtx.beginPath();
        state.fxCtx.ellipse(x, y, radiusX, radiusY, Math.sin(seed.phase) * 0.08, 0, Math.PI * 2);
        state.fxCtx.fill();

        state.fxCtx.fillStyle = sleetLike
          ? `rgba(250,252,255,${Math.min(0.22, 0.04 + reveal * 0.12 + waterCover * 0.08).toFixed(2)})`
          : `rgba(228,244,255,${Math.min(0.28, 0.05 + reveal * 0.14 + waterCover * 0.10).toFixed(2)})`;
        state.fxCtx.beginPath();
        state.fxCtx.ellipse(
          x - radiusX * 0.16,
          y - radiusY * 0.18,
          Math.max(0.6, radiusX * 0.28),
          Math.max(0.18, radiusY * 0.34),
          Math.sin(seed.phase) * 0.04,
          0,
          Math.PI * 2
        );
        state.fxCtx.fill();
      }
    }
  }

  function ensureHailGroundSeeds() {
    const desiredCount = Math.max(12, Math.round((state.cssWidth || 320) / 14));
    if (Array.isArray(state.hailGroundSeeds) && state.hailGroundSeeds.length === desiredCount) return;
    state.hailGroundSeeds = Array.from({ length: desiredCount }, () => ({
      xRatio: Math.random(),
      depth: Math.random(),
      yBias: Math.random(),
      size: 0.8 + Math.random() * 1.6,
      stretch: 0.7 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2
    })).sort((a, b) => a.xRatio - b.xRatio);
  }

  function ensureHailGroundProfile() {
    const desiredBins = Math.max(18, Math.round((state.cssWidth || 320) / 12));
    if (!Array.isArray(state.hailGroundProfile) || !state.hailGroundProfile.length) {
      state.hailGroundProfile = Array.from({ length: desiredBins }, () => 0);
      return;
    }
    if (state.hailGroundProfile.length === desiredBins) return;
    const previous = state.hailGroundProfile.slice();
    const previousLast = Math.max(1, previous.length - 1);
    state.hailGroundProfile = Array.from({ length: desiredBins }, (_entry, index) => {
      const ratio = desiredBins <= 1 ? 0 : index / (desiredBins - 1);
      const mapped = ratio * previousLast;
      const left = Math.floor(mapped);
      const right = Math.min(previous.length - 1, left + 1);
      const blend = mapped - left;
      const leftValue = Number(previous[left]) || 0;
      const rightValue = Number(previous[right]) || 0;
      return leftValue + (rightValue - leftValue) * blend;
    });
  }

  function hailGroundProfileStrength() {
    if (!Array.isArray(state.hailGroundProfile) || !state.hailGroundProfile.length) return 0;
    let sum = 0;
    let peak = 0;
    for (const value of state.hailGroundProfile) {
      const safe = Math.max(0, Number(value) || 0);
      sum += safe;
      if (safe > peak) peak = safe;
    }
    const avg = sum / Math.max(1, state.hailGroundProfile.length);
    return clamp(avg * 0.86 + peak * 0.44, 0, 1);
  }

  function depositHailGroundAt(x, amount = 0.0056, spread = 1.1) {
    if (!isMobileWeatherShell()) return;
    ensureHailGroundProfile();
    const bins = state.hailGroundProfile;
    const count = bins.length;
    if (!count) return;
    const width = Math.max(1, state.cssWidth || 1);
    const clampedX = clamp(Number(x) || 0, 0, width);
    const center = (clampedX / width) * Math.max(1, count - 1);
    const radiusBins = Math.max(1, spread * count / width * 8.5);
    const start = Math.max(0, Math.floor(center - radiusBins));
    const end = Math.min(count - 1, Math.ceil(center + radiusBins));
    for (let index = start; index <= end; index += 1) {
      const distance = Math.abs(index - center);
      const influence = Math.max(0, 1 - distance / radiusBins);
      if (influence <= 0) continue;
      bins[index] = clamp(
        bins[index] + amount * (0.26 + influence * 0.74),
        0,
        1.2
      );
    }
    for (let index = 1; index < count - 1; index += 1) {
      bins[index] = bins[index] * 0.84 + (bins[index - 1] + bins[index] + bins[index + 1]) / 3 * 0.16;
    }
    state.hailGroundCover = Math.max(state.hailGroundCover, hailGroundProfileStrength());
  }

  function skyLayerHeight() {
    return Math.max(180, Number(state.cssHeight) || Number(state.skyHeight) || 180);
  }

  function headerLayerHeight() {
    return Math.max(160, Math.min(Number(state.headerHeight) || 0, Number(state.cssHeight) || Number(state.headerHeight) || 160));
  }

  function isMobileWeatherShell() {
    return typeof document !== "undefined" && Boolean(document.body?.classList.contains("app-mobile-shell"));
  }

  function cloudFieldBottomLimit(preset = state.activeCloudPreset) {
    const header = headerLayerHeight();
    const viewport = Math.max(header + 80, Number(state.cssHeight) || header + 80);
    if (!isMobileWeatherShell() || preset === "clear") return header + 28;
    if (preset === "partly") return clamp(viewport * 0.32, header + 48, header + 116);
    if (preset === "cloudy") return clamp(viewport * 0.38, header + 72, header + 176);
    return clamp(viewport * 0.43, header + 92, header + 206);
  }

  function liquidAmountFromInput(input, phenomenonHint = "") {
    const explicitLiquid = Math.max(0, Number(input?.rainAmount) || 0, Number(input?.showersAmount) || 0);
    if (explicitLiquid > 0.03) return explicitLiquid;

    const totalPrecipitation = Math.max(0, Number(input?.precipitationAmount) || 0);
    if (totalPrecipitation <= 0.03) return 0;

    const hint = String(phenomenonHint || input?.phenomenonVariant || input?.conditionVariant || "").trim().toLowerCase();
    if (["rain", "drizzle", "light-rain", "heavy-rain", "freezing-rain", "storm", "hail"].includes(hint)) {
      return totalPrecipitation;
    }
    return 0;
  }

  function snowAmountFromInput(input, phenomenonHint = "") {
    const explicitSnow = Math.max(0, Number(input?.snowfallAmount) || 0);
    const totalPrecipitation = Math.max(0, Number(input?.precipitationAmount) || 0);
    const hint = String(phenomenonHint || input?.phenomenonVariant || input?.conditionVariant || "").trim().toLowerCase();
    const derivedSnow = totalPrecipitation > 0.03 && ["snow", "light-snow", "dense-snow", "blizzard", "frost"].includes(hint)
      ? totalPrecipitation * 1.18
      : 0;

    if (explicitSnow > 0.03) {
      return derivedSnow > 0.03 ? Math.max(explicitSnow, derivedSnow) : explicitSnow;
    }
    return derivedSnow > 0.03 ? derivedSnow : 0;
  }

  function hasMixedPrecipitationInput(input) {
    const explicitLiquid = Math.max(0, Number(input?.rainAmount) || 0, Number(input?.showersAmount) || 0);
    const explicitSnow = Math.max(0, Number(input?.snowfallAmount) || 0);
    return explicitLiquid > 0.04 && explicitSnow > 0.03;
  }

  function resolveCloudCover(input) {
    if (Number.isFinite(input?.cloudCover)) return input.cloudCover;
    const low = Number.isFinite(input?.cloudCoverLow) ? input.cloudCoverLow * 0.46 : null;
    const mid = Number.isFinite(input?.cloudCoverMid) ? input.cloudCoverMid * 0.34 : null;
    const high = Number.isFinite(input?.cloudCoverHigh) ? input.cloudCoverHigh * 0.20 : null;
    const weighted = [low, mid, high].filter((value) => value !== null);
    if (!weighted.length) return null;
    const total = weighted.reduce((sum, value) => sum + value, 0);
    const divisor = (low !== null ? 0.46 : 0) + (mid !== null ? 0.34 : 0) + (high !== null ? 0.20 : 0);
    return divisor > 0 ? total / divisor : null;
  }

  function cloudPresetFromCover(cover) {
    if (!Number.isFinite(cover)) return "clear";
    if (cover >= 90) return "overcast";
    if (cover >= 68) return "cloudy";
    if (cover >= 28) return "partly";
    return "clear";
  }

  function cloudPresetRank(preset = "clear") {
    if (preset === "overcast") return 3;
    if (preset === "cloudy") return 2;
    if (preset === "partly") return 1;
    return 0;
  }

  function angularDifference(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
    const diff = Math.abs(a - b) % 360;
    return diff > 180 ? 360 - diff : diff;
  }

  function hasParticleField() {
    return Boolean(
      state.rainFar.length ||
      state.rainMid.length ||
      state.rainNear.length ||
      state.snowFar.length ||
      state.snowMid.length ||
      state.snowNear.length ||
      state.hailMid.length ||
      state.hailNear.length ||
      state.windTrails.length ||
      state.splashes.length
    );
  }

  function mapWeatherState(input) {
    const period = input.period;
    const cloudVariant = String(input.variant || "clear").trim().toLowerCase();
    const phenomenonVariant = String(input.phenomenonVariant || cloudVariant || "none").trim().toLowerCase();
    let sceneKey = period === "night" ? "clear_night" : "clear_day";
    const resolvedCloudCover = resolveCloudCover(input);
    const cloudLocked = Boolean(input.cloudLocked);
    const hasExplicitCloudData = Number.isFinite(input?.cloudCover)
      || Number.isFinite(input?.cloudCoverLow)
      || Number.isFinite(input?.cloudCoverMid)
      || Number.isFinite(input?.cloudCoverHigh);
    let cloudPreset = cloudPresetFromCover(resolvedCloudCover);
    let phenomenon = "none";
    let electricityLevel = 0;
    const precipitationProbability = Number.isFinite(input.precipitationProbability) ? input.precipitationProbability : null;
    const precipitationSuppressed = Boolean(input.precipitationLocked)
      && phenomenonVariant === "none"
      && Math.max(
        0,
        Number(input.precipitationAmount) || 0,
        Number(input.rainAmount) || 0,
        Number(input.showersAmount) || 0,
        Number(input.snowfallAmount) || 0
      ) <= 0.03;
    const hailMode = !precipitationSuppressed && (input.hasHail || phenomenonVariant === "hail");
    const thunderMode = !precipitationSuppressed && (input.hasThunder || phenomenonVariant === "storm" || hailMode);

    const variantCloudPreset = cloudVariant === "mostly-clear" || cloudVariant === "partly-cloudy"
      ? "partly"
      : cloudVariant === "cloudy"
        ? "cloudy"
        : cloudVariant === "overcast"
          ? "overcast"
          : "clear";
    if (cloudPresetRank(variantCloudPreset) > cloudPresetRank(cloudPreset)) cloudPreset = variantCloudPreset;
    if (!hasExplicitCloudData && !cloudLocked) {
      if (precipitationProbability !== null && precipitationProbability >= 70 && cloudPresetRank(cloudPreset) < 2) cloudPreset = "cloudy";
      else if (precipitationProbability !== null && precipitationProbability >= 45 && cloudPresetRank(cloudPreset) < 1) cloudPreset = "partly";
    }

    const rainAmount = liquidAmountFromInput(input, phenomenonVariant);
    const snowfallAmount = snowAmountFromInput(input, phenomenonVariant);
    const visualPrecipitationAmount = precipitationSuppressed
      ? 0
      : precipitationVisualAmountFromValues(input, phenomenonVariant, hailMode ? "hail" : "");
    const mixedByAmount = hasMixedPrecipitationInput(input);
    const heavyRainByAmount = visualPrecipitationAmount >= 1.8 || Math.max(0, input.showersAmount || 0) >= 1.0;
    const heavySnowByAmount = visualPrecipitationAmount >= 1.8
      || (snowfallAmount >= 0.55 && (input.windSpeed || 0) >= 30)
      || (snowfallAmount >= 0.45 && (input.windGustSpeed || 0) >= 46)
      || snowfallAmount >= 0.8;
    const snowLikePhenomenon = (
      phenomenonVariant === "light-snow"
      || phenomenonVariant === "snow"
      || phenomenonVariant === "frost"
      || phenomenonVariant === "dense-snow"
      || phenomenonVariant === "blizzard"
      || snowfallAmount >= 0.08
    );
    const rainLikePhenomenon = (
      phenomenonVariant === "drizzle"
      || phenomenonVariant === "light-rain"
      || phenomenonVariant === "rain"
      || phenomenonVariant === "freezing-rain"
      || phenomenonVariant === "heavy-rain"
      || rainAmount > 0.04
    );

    if (precipitationSuppressed) phenomenon = "none";
    else if (hailMode || phenomenonVariant === "storm") phenomenon = "storm";
    else if (phenomenonVariant === "sleet" || mixedByAmount) phenomenon = "sleet";
    else if (snowLikePhenomenon) phenomenon = "snow";
    else if (rainLikePhenomenon) phenomenon = "rain";
    else if (phenomenonVariant === "fog" || phenomenonVariant === "mist") phenomenon = "fog";

    if (phenomenon === "fog") {
      sceneKey = "fog";
      if (!cloudLocked && cloudPreset === "clear") cloudPreset = "overcast";
    } else if (phenomenon === "rain") {
      sceneKey = phenomenonVariant === "heavy-rain" || heavyRainByAmount ? "rain_heavy" : "rain_light";
      if (!cloudLocked && cloudPreset === "clear") {
        cloudPreset = heavyRainByAmount ? "cloudy" : "partly";
      } else if (!cloudLocked && heavyRainByAmount && cloudPresetRank(cloudPreset) < 2) {
        cloudPreset = "cloudy";
      }
    } else if (phenomenon === "snow") {
      sceneKey = phenomenonVariant === "dense-snow" || phenomenonVariant === "blizzard" || heavySnowByAmount ? "snow_heavy" : "snow_light";
      if (!cloudLocked && cloudPreset === "clear") {
        cloudPreset = heavySnowByAmount ? "cloudy" : "partly";
      } else if (!cloudLocked && heavySnowByAmount && cloudPresetRank(cloudPreset) < 2) {
        cloudPreset = "cloudy";
      }
    } else if (phenomenon === "sleet") {
      sceneKey = "sleet";
      if (!cloudLocked && cloudPreset === "clear") {
        cloudPreset = "partly";
      } else if (!cloudLocked && cloudPresetRank(cloudPreset) < 2) {
        cloudPreset = "cloudy";
      }
    } else if (phenomenon === "storm") {
      sceneKey = hailMode ? "hail" : "storm";
      if (!cloudLocked) cloudPreset = "overcast";
    } else if (cloudPreset === "partly") {
      sceneKey = period === "night" ? "partly_cloudy_night" : "partly_cloudy_day";
    } else if (cloudPreset === "cloudy") {
      sceneKey = period === "night" ? "cloudy_night" : "cloudy_day";
    } else if (cloudPreset === "overcast") {
      sceneKey = period === "night" ? "overcast_night" : "overcast_day";
    }

    if (sceneKey === "storm") electricityLevel = 1;
    else if (sceneKey === "hail") electricityLevel = 0;
    else if (sceneKey === "rain_heavy" && thunderMode) electricityLevel = 0.28;
    else if (sceneKey === "rain_light" && thunderMode) electricityLevel = 0.16;

    return { sceneKey, cloudPreset, phenomenon, electricityLevel };
  }

  function resolveMoonPhase(rawPhase) {
    const value = String(rawPhase || "auto").trim().toLowerCase();
    const map = {
      new: "new",
      waxing_crescent: "crescent",
      waning_crescent: "crescent",
      first_quarter: "quarter",
      last_quarter: "quarter",
      waxing_gibbous: "gibbous",
      waning_gibbous: "gibbous",
      full: "full"
    };
    return map[value] || "gibbous";
  }

  function precipitationVisualAmountFromValues(values = {}, phenomenon = "", sceneKey = "") {
    const rawTotal = Math.max(0, Number(values?.precipitationAmount) || 0);
    if (rawTotal > 0.03) return rawTotal;

    const explicitLiquid = Math.max(0, Number(values?.rainAmount) || 0, Number(values?.showersAmount) || 0);
    const explicitSnowMm = Math.max(0, Number(values?.snowfallAmount) || 0) / 1.18;
    const explicitAmount = Math.max(explicitLiquid, explicitSnowMm);
    if (explicitAmount > 0.03) return explicitAmount;

    if (sceneKey === "storm") return 4.2;
    if (sceneKey === "hail") return 3.6;
    if (phenomenon === "sleet" || sceneKey === "sleet") return 2.4;
    if (phenomenon === "snow") return sceneKey === "snow_heavy" ? 3.2 : 1.1;
    if (phenomenon === "rain") return sceneKey === "rain_heavy" ? 3.0 : 1.0;
    return 0;
  }

  function precipitationIntensityBand(amount = 0) {
    const value = Math.max(0, Number(amount) || 0);
    if (value <= 0.03) return "dry";
    if (value >= 5.2) return "extreme";
    if (value >= 3.4) return "heavy";
    if (value >= 1.8) return "mid";
    if (value >= 0.7) return "light";
    return "trace";
  }

  function precipitationIntensityStep(amount = 0) {
    const value = Math.max(0, Number(amount) || 0);
    if (value <= 0.03) return 0;
    return Math.min(72, Math.round(value * (value >= 5.2 ? 7 : value >= 3.4 ? 6 : 5)));
  }

  function precipitationIntensityCurve(amount = 0) {
    const value = Math.max(0, Number(amount) || 0);
    if (value <= 0.03) {
      return { amount: 0, band: "dry", step: 0, strength: 0, overdrive: 0 };
    }

    let strength = 0.62 + value * 0.56;
    if (value >= 0.7) strength = 1.18 + (value - 0.7) * 1.48;
    if (value >= 1.8) strength = 2.81 + (value - 1.8) * 1.86;
    if (value >= 3.4) strength = 5.79 + (value - 3.4) * 1.98;
    if (value >= 5.2) strength = 9.35 + (value - 5.2) * 2.34;

    return {
      amount: value,
      band: precipitationIntensityBand(value),
      step: precipitationIntensityStep(value),
      strength,
      overdrive: value >= 5.2
        ? Math.min(4.8, 0.92 + (value - 5.2) * 0.62)
        : value >= 3.4
          ? Math.min(0.92, (value - 3.4) * 0.20)
          : 0
    };
  }

  function currentPrecipitationIntensityCurve() {
    return precipitationIntensityCurve(precipitationVisualAmountFromValues({
      precipitationAmount: state.activePrecipitationAmount,
      rainAmount: state.activeRainAmount,
      showersAmount: state.activeShowersAmount,
      snowfallAmount: state.activeSnowfallAmount
    }, state.activePhenomenon, state.activeSceneKey));
  }

  function cloudCoverageRatio() {
    const baseCoverage = state.activeCloudPreset === "clear"
      ? 0.10
      : state.activeCloudPreset === "partly"
        ? 0.46
        : state.activeCloudPreset === "cloudy"
          ? 0.84
          : 0.98;
    return Number.isFinite(state.activeCloudCover)
      ? Math.max(baseCoverage, Math.min(1, state.activeCloudCover / 100))
      : baseCoverage;
  }

  function warmEdgeDramaFactor() {
    if (state.activePeriod === "night" || (state.activePhase !== "dawn" && state.activePhase !== "sunset")) return 0;
    const coverage = cloudCoverageRatio();
    const humidity = Number.isFinite(state.activeHumidity) ? state.activeHumidity : null;
    const presetBoost = state.activeCloudPreset === "overcast"
      ? 1
      : state.activeCloudPreset === "cloudy"
        ? 0.86
        : state.activeCloudPreset === "partly"
          ? 0.60
          : 0.34;
    const coverageBoost = clamp((coverage - 0.18) / 0.72, 0.18, 1);
    const humidityBoost = Number.isFinite(humidity)
      ? clamp((humidity - 58) / 34, 0, 0.22)
      : 0.10;
    const precipitationDamp = state.activePhenomenon === "storm"
      ? 0.14
      : state.activePhenomenon === "rain"
        ? 0.18
        : 0;
    return clamp(presetBoost * 0.72 + coverageBoost * 0.22 + humidityBoost - precipitationDamp, 0.24, 1);
  }

  function fogDensityFactor() {
    const visibility = Number.isFinite(state.activeVisibility) ? state.activeVisibility : null;
    const humidity = Number.isFinite(state.activeHumidity) ? state.activeHumidity : null;
    const explicitFog = state.activePhenomenon === "fog";
    let density = explicitFog ? 0.44 : 0;

    if (Number.isFinite(visibility)) {
      const visibilityDensity = explicitFog
        ? visibility <= 220
          ? 0.84
          : visibility <= 420
            ? 0.76
            : visibility <= 700
              ? 0.64
            : visibility <= 1200
              ? 0.50
            : visibility <= 2200
                  ? 0.28
                  : visibility <= 4200
                    ? 0.12
                    : 0
        : visibility <= 260
          ? 0.04
          : visibility <= 420
            ? 0.02
            : visibility <= 700 && Number.isFinite(humidity) && humidity >= 98
              ? 0.01
                : 0;
      density = Math.max(density, visibilityDensity);
    }

    if (Number.isFinite(humidity)) {
      const humidityDensity = explicitFog
        ? clamp((humidity - 91) / 8, 0, 0.14)
        : clamp((humidity - 99) / 1, 0, Number.isFinite(visibility) && visibility <= 420 ? 0.02 : 0);
      density = Math.max(density, humidityDensity);
    }

    if (explicitFog && state.activePhase === "dawn") {
      density = Math.min(1, density + 0.04);
    }

    return clamp(density, 0, 1);
  }

  function sunPlacementMetrics() {
    const wrapSize = 132;
    const defaultLeft = Math.max(8, Math.round(state.cssWidth * 0.05));
    const defaultTop = 50;

    if (state.activePhase === "dawn") {
      const left = Math.round(clamp(state.cssWidth * 0.08, 12, 34));
      const top = Math.round(clamp(headerLayerHeight() * 0.50, 84, 112));
      return {
        left,
        top,
        centerX: left + wrapSize * 0.5,
        centerY: top + wrapSize * 0.5
      };
    }

    if (state.activePhase === "sunset") {
      const minLeft = Math.max(44, Math.round(state.cssWidth * 0.50));
      const maxLeft = Math.max(minLeft, state.cssWidth - 148);
      const left = Math.round(clamp(state.cssWidth * 0.60, minLeft, maxLeft));
      const top = Math.round(clamp(headerLayerHeight() * 0.56, 92, 124));
      return {
        left,
        top,
        centerX: left + wrapSize * 0.5,
        centerY: top + wrapSize * 0.5
      };
    }

    return {
      left: defaultLeft,
      top: defaultTop,
      centerX: defaultLeft + wrapSize * 0.5,
      centerY: defaultTop + wrapSize * 0.5
    };
  }

  function particleProfileKey(sceneKey, phenomenon, values = {}) {
    const precipitationMode = values?.precipitationLocked ? "locked" : "auto";
    const windSpeed = Math.max(0, Number(values.windSpeed) || 0);
    const windGustSpeed = Math.max(0, Number(values.windGustSpeed) || 0);
    const precipCalm = windSpeed <= 14 && windGustSpeed <= 20;
    const windBucket = precipCalm
      ? "still"
      : windGustSpeed >= 54 || windSpeed >= 42
      ? "gale"
      : windGustSpeed >= 42 || windSpeed >= 30
        ? "strong"
        : windGustSpeed >= 24 || windSpeed >= 16
          ? "breeze"
          : "calm";
    const profileAmount = precipitationVisualAmountFromValues(values, phenomenon, sceneKey);
    const precipitationBucket = precipitationIntensityBand(profileAmount);
    const intensityStep = precipitationIntensityStep(profileAmount);

    return `${sceneKey}|${phenomenon}|${precipitationBucket}|step-${intensityStep}|${windBucket}|${precipitationMode}`;
  }

  function apply(input) {
    const root = ensureRoot();
    if (!root) return;
    const normalized = normaliseInput(input);
    const mapped = mapWeatherState(normalized);
    const resolvedSeason = resolveActiveSeason(normalized.season);
    const resolvedCloudCover = resolveCloudCover(normalized);
    const previousSceneKey = state.activeSceneKey;
    const previousPhenomenon = state.activePhenomenon;
    const previousCloudPreset = state.activeCloudPreset;
    const previousPeriod = state.activePeriod;
    const previousPhase = state.activePhase;
    const previousWindSpeed = state.activeWindSpeed;
    const previousWindGustSpeed = state.activeWindGustSpeed;
    const previousWindDirection = state.activeWindDirection;
    const previousParticleProfile = state.activeParticleProfile;
    const previousSeason = state.activeSeason;
    const previousWindTrailsEnabled = areWindTrailsActive(previousWindSpeed, previousWindGustSpeed);
    const nextWindTrailsEnabled = areWindTrailsActive(normalized.windSpeed, normalized.windGustSpeed);
    const nextParticleProfile = particleProfileKey(mapped.sceneKey, mapped.phenomenon, normalized);
    const needsCloudRebuild = !state.clouds.length
      || mapped.cloudPreset !== previousCloudPreset
      || normalized.period !== previousPeriod
      || normalized.phase !== previousPhase;
    const needsTreeRebuild = !state.treeProfile || resolvedSeason !== previousSeason;
    const needsParticleRebuild = !hasParticleField()
      || mapped.sceneKey !== previousSceneKey
      || mapped.phenomenon !== previousPhenomenon
      || nextParticleProfile !== previousParticleProfile
      || nextWindTrailsEnabled !== previousWindTrailsEnabled
      || Math.abs(normalized.windSpeed - previousWindSpeed) >= 16
      || Math.abs(normalized.windGustSpeed - previousWindGustSpeed) >= 20
      || angularDifference(normalized.windDirection, previousWindDirection) >= 70;

    state.activeSceneKey = mapped.sceneKey;
    state.activePeriod = normalized.period;
    state.activePhase = normalized.phase;
    state.activePhenomenon = mapped.phenomenon;
    state.activeCloudPreset = mapped.cloudPreset;
    state.activeElectricityLevel = mapped.electricityLevel;
    state.activeWindSpeed = normalized.windSpeed;
    state.activeWindGustSpeed = normalized.windGustSpeed;
    state.activeWindDirection = normalized.windDirection;
    state.activeTemperature = normalized.temperature;
    state.activeApparentTemperature = normalized.apparentTemperature;
    state.activeHumidity = normalized.humidity;
    state.activeVisibility = normalized.visibility;
    state.activeCloudCover = resolvedCloudCover;
    state.activePrecipitationAmount = normalized.precipitationAmount;
    state.activeRainAmount = normalized.rainAmount;
    state.activeShowersAmount = normalized.showersAmount;
    state.activeSnowfallAmount = normalized.snowfallAmount;
    state.activePrecipitationProbability = normalized.precipitationProbability;
    state.activePrecipitationLocked = Boolean(normalized.precipitationLocked);
    state.activeMoonPhase = resolveMoonPhase(normalized.moonPhase);
    state.activeParticleProfile = nextParticleProfile;
    state.activeSeason = resolvedSeason;

    root.dataset.period = normalized.period;
    root.dataset.phase = normalized.phase;
    root.dataset.scene = mapped.sceneKey;
    root.dataset.phenomenon = mapped.phenomenon;
    root.dataset.cloudPreset = mapped.cloudPreset;
    root.dataset.season = resolvedSeason;

    updateDebugLabel(`${mapped.sceneKey} | ${normalized.period} | canvas`);
    updateCelestial();
    if (needsCloudRebuild) buildClouds();
    state.forceSkyRedraw = true;
    if (needsTreeRebuild) buildTreeProfile();
    state.forceTreeRedraw = true;
    if (needsParticleRebuild) buildParticles();
    ensureAnimation();
  }

  function updateDebugLabel(text) {
    state.activeDebugLabel = text;
    if (state.debugBadge) state.debugBadge.textContent = text;
  }

  function updateCelestial() {
    if (!state.sunWrap || !state.moonWrap || !state.moonShade) return;
    const isNight = state.activePeriod === "night";
    const preset = state.activeCloudPreset;
    const isWarmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const cloudCover = cloudCoverageRatio();
    const fogDensity = fogDensityFactor();
    const sunPlacement = sunPlacementMetrics();
    const palette = getSkyPalette();
    const explicitFog = state.activePhenomenon === "fog";
    const precipitationMask = state.activePhenomenon === "storm"
      ? 0.42
      : state.activePhenomenon === "rain"
        ? 0.24
        : state.activePhenomenon === "sleet"
          ? 0.20
          : state.activePhenomenon === "snow"
            ? 0.16
            : 0;
    const defaultCelestialLeft = `${Math.max(8, Math.round(state.cssWidth * 0.05))}px`;
    const defaultCelestialTop = "50px";

    if (isNight) {
      state.sunWrap.style.opacity = "0";
      state.sunWrap.style.transform = "scale(0.92)";
      state.sunWrap.style.left = defaultCelestialLeft;
      state.sunWrap.style.top = defaultCelestialTop;
      const moonOpacity = Math.max(
        0.06,
        (preset === "overcast" ? 0.20 : preset === "cloudy" ? 0.44 : preset === "partly" ? 0.82 : 1) - cloudCover * 0.12 - precipitationMask * 0.34
      );
      state.moonWrap.style.opacity = moonOpacity.toFixed(2);
      state.moonWrap.style.transform = preset === "clear" ? "scale(1.16)" : preset === "partly" ? "scale(1.08)" : preset === "overcast" ? "scale(0.94)" : "scale(1.00)";
      state.moonWrap.style.filter = preset === "overcast" ? "blur(1px)" : preset === "cloudy" ? "blur(0.4px)" : "none";
      state.moonWrap.style.right = "auto";
      state.moonWrap.style.left = defaultCelestialLeft;
      state.moonWrap.style.top = defaultCelestialTop;
    } else {
      const sunOpacity = Math.max(
        0.02,
        (preset === "overcast" ? (isWarmEdge ? 0.18 : 0.08) : preset === "cloudy" ? (isWarmEdge ? 0.42 : 0.28) : preset === "partly" ? (isWarmEdge ? 0.94 : 0.86) : 1)
          - cloudCover * (isWarmEdge ? 0.08 : 0.10)
          - precipitationMask * 0.44
          - fogDensity * (explicitFog ? (isWarmEdge ? 0.76 : 0.58) : (isWarmEdge ? 0.72 : 0.46))
      );
      const baseScale = isWarmEdge
        ? (preset === "clear" ? 1.16 : preset === "partly" ? 1.08 : preset === "overcast" ? 0.94 : 1.00)
        : (preset === "clear" ? 1.14 : preset === "partly" ? 1.06 : preset === "overcast" ? 0.90 : 0.96);
      const scale = Math.max(0.76, baseScale - fogDensity * (explicitFog ? (isWarmEdge ? 0.22 : 0.18) : (isWarmEdge ? 0.18 : 0.12)));
      const blurAmount = isWarmEdge
        ? (preset === "overcast" ? 0.7 : preset === "cloudy" ? 0.35 : 0)
        : (preset === "overcast" ? 1 : preset === "cloudy" ? 0.5 : 0);
      state.sunWrap.style.opacity = sunOpacity.toFixed(2);
      state.sunWrap.style.transform = `scale(${scale.toFixed(2)})`;
      state.sunWrap.style.filter = blurAmount + fogDensity * (explicitFog ? (isWarmEdge ? 3.4 : 2.6) : (isWarmEdge ? 2.5 : 1.8)) > 0.08
        ? `blur(${(blurAmount + fogDensity * (explicitFog ? (isWarmEdge ? 3.4 : 2.6) : (isWarmEdge ? 2.5 : 1.8))).toFixed(2)}px)`
        : "none";
      state.sunWrap.style.right = "auto";
      state.sunWrap.style.left = `${isWarmEdge ? sunPlacement.left : parseInt(defaultCelestialLeft, 10)}px`;
      state.sunWrap.style.top = `${isWarmEdge ? sunPlacement.top : parseInt(defaultCelestialTop, 10)}px`;
      state.moonWrap.style.opacity = "0";
      state.moonWrap.style.transform = "scale(0.9)";
    }

    const moonSkyMask = `radial-gradient(circle at 44% 50%, ${palette.top} 0 64%, ${palette.mid} 80%, ${palette.bottom} 92%, rgba(255,255,255,0) 100%)`;
    const moonDarkMask = "radial-gradient(circle at 46% 50%, rgba(4,8,16,.99) 0 68%, rgba(4,8,16,.94) 84%, rgba(4,8,16,.58) 92%, rgba(4,8,16,0) 100%)";
    const moonPhaseVisuals = {
      new: { shift: 0, scale: 1.02, opacity: 0.96, background: moonDarkMask },
      crescent: { shift: 12, scale: 1.04, opacity: 1, background: moonSkyMask },
      quarter: { shift: 24, scale: 1.05, opacity: 1, background: moonSkyMask },
      gibbous: { shift: 38, scale: 1.05, opacity: 1, background: moonSkyMask },
      full: { shift: 70, scale: 1.04, opacity: 0, background: moonSkyMask }
    };
    const moonPhaseVisual = moonPhaseVisuals[state.activeMoonPhase] || moonPhaseVisuals.gibbous;
    state.moonShade.style.opacity = String(moonPhaseVisual.opacity);
    state.moonShade.style.transform = `translateX(${moonPhaseVisual.shift}px) scale(${moonPhaseVisual.scale})`;
    state.moonShade.style.background = moonPhaseVisual.opacity <= 0
      ? "rgba(5, 11, 20, 0)"
      : moonPhaseVisual.background;
  }

  function buildStars() {
    state.stars = [];
    const h = skyLayerHeight() * 0.84;
    const lowerBandStart = Math.round(STAR_COUNT * 0.42);
    const horizonBandStart = Math.round(STAR_COUNT * 0.74);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const lowerBand = i >= lowerBandStart;
      const horizonBand = i >= horizonBandStart;
      state.stars.push({
        x: Math.random() * state.cssWidth,
        y: horizonBand
          ? (h * (0.54 + Math.random() * 0.30))
          : lowerBand
            ? (h * (0.18 + Math.random() * 0.64))
            : (Math.random() * (h * 0.54)),
        r: horizonBand
          ? (0.18 + Math.random() * 0.46)
          : lowerBand
            ? (0.24 + Math.random() * 0.74)
            : (0.34 + Math.random() * 1.06),
        a: horizonBand
          ? (0.12 + Math.random() * 0.24)
          : lowerBand
            ? (0.16 + Math.random() * 0.40)
            : (0.18 + Math.random() * 0.68),
        p: Math.random() * Math.PI * 2,
        low: lowerBand,
        horizon: horizonBand,
        bright: !horizonBand && Math.random() < (lowerBand ? 0.12 : 0.18)
      });
    }
  }

  function buildClouds() {
    state.clouds = [];
    const windStrength = gustStrengthFactor();
    const isPrecip = state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "snow" || state.activePhenomenon === "sleet";
    const skyHeight = headerLayerHeight();
    const mobileLowerClouds = isMobileWeatherShell();
    const preset = state.activeCloudPreset;
    const coverage = cloudCoverageRatio();
    const warmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const sunsetEdge = state.activePhase === "sunset";
    const topPriorityClouds = mobileLowerClouds && (preset === "cloudy" || preset === "overcast");
    const denseDayNightClouds = mobileLowerClouds && !warmEdge && (preset === "cloudy" || preset === "overcast");
    const cloudBottom = cloudFieldBottomLimit(preset);
    const profile = preset === "clear"
      ? { count: coverage >= 0.16 ? 3 : 2, widthMin: 108, widthMax: 162, heightMin: 42, heightMax: 66, yMin: 16, yMax: 86, nodeMin: 7, nodeMax: 9, shadowMin: 1, shadowMax: 2, veilMin: 0, veilMax: 0, emitterSpan: 0.40, emitterBaseMin: 0.56, emitterBaseMax: 0.64, precipBoost: 0, rowCount: 2, jitterX: 34, jitterY: 16, crownBias: 0.74, toweriness: 0.10, baseLift: 0.40, contrast: 0.98, frontShare: 0.10 }
      : preset === "partly"
        ? { count: 10 + Math.round(Math.max(0, coverage - 0.46) * 6), widthMin: 132, widthMax: 198, heightMin: 60, heightMax: 94, yMin: 18, yMax: 126, nodeMin: 9, nodeMax: 13, shadowMin: 2, shadowMax: 3, veilMin: 0, veilMax: 0, emitterSpan: 0.56, emitterBaseMin: 0.60, emitterBaseMax: 0.68, precipBoost: 1, rowCount: 3, jitterX: 42, jitterY: 34, crownBias: 0.82, toweriness: 0.18, baseLift: 0.38, contrast: 1.08, frontShare: 0.22 }
        : preset === "cloudy"
          ? { count: 15 + Math.round(Math.max(0, coverage - 0.84) * 10), widthMin: 148, widthMax: 224, heightMin: 88, heightMax: 130, yMin: 22, yMax: 156, nodeMin: 10, nodeMax: 13, shadowMin: 2, shadowMax: 4, veilMin: 0, veilMax: 0, emitterSpan: 0.64, emitterBaseMin: 0.62, emitterBaseMax: 0.72, precipBoost: 2, rowCount: 3, jitterX: 42, jitterY: 42, crownBias: 0.86, toweriness: 0.28, baseLift: 0.35, contrast: 1.18, frontShare: 0.38 }
          : { count: 18 + Math.round(Math.max(0, coverage - 0.98) * 12), widthMin: 164, widthMax: 242, heightMin: 104, heightMax: 148, yMin: 24, yMax: 170, nodeMin: 11, nodeMax: 14, shadowMin: 3, shadowMax: 4, veilMin: 0, veilMax: 0, emitterSpan: 0.68, emitterBaseMin: 0.64, emitterBaseMax: 0.76, precipBoost: 3, rowCount: 4, jitterX: 44, jitterY: 54, crownBias: 0.88, toweriness: 0.34, baseLift: 0.33, contrast: 1.24, frontShare: 0.50 };
    const profileCeiling = mobileLowerClouds && preset !== "clear"
      ? cloudBottom - 12
      : skyHeight - 12;
    if (warmEdge && preset !== "clear") {
      profile.yMin += sunsetEdge ? 10 : 4;
      profile.yMax = Math.min(profileCeiling - 6, profile.yMax + (sunsetEdge ? 18 : 10));
      profile.heightMin += sunsetEdge ? 8 : 4;
      profile.heightMax += sunsetEdge ? 14 : 8;
      profile.contrast += sunsetEdge ? 0.12 : 0.08;
      profile.toweriness += sunsetEdge ? 0.10 : 0.05;
      profile.baseLift = Math.max(0.22, profile.baseLift - (sunsetEdge ? 0.04 : 0.02));
      profile.veilMin = Math.max(profile.veilMin, preset === "partly" ? 1 : 2);
      profile.veilMax = Math.max(profile.veilMax, preset === "partly" ? 2 : 3);
      profile.frontShare = Math.min(0.74, (profile.frontShare || 0) + (sunsetEdge ? 0.14 : 0.08));
      if (sunsetEdge && (preset === "cloudy" || preset === "overcast")) {
        profile.yMin += 6;
        profile.yMax = Math.min(profileCeiling, profile.yMax + 16);
        profile.heightMin += 8;
        profile.heightMax += 14;
        profile.toweriness += 0.08;
        profile.veilMin = Math.max(profile.veilMin, 2);
        profile.veilMax = Math.max(profile.veilMax, 4);
        profile.frontShare = Math.min(0.84, (profile.frontShare || 0) + 0.10);
        profile.rowCount = Math.min(5, (profile.rowCount || 3) + 1);
        profile.count += 1;
      }
    }
    if (mobileLowerClouds && preset !== "clear") {
      profile.crownBias = Math.max(0.64, profile.crownBias - (preset === "partly" ? 0.10 : 0.14));
      profile.toweriness = Math.max(0.06, profile.toweriness * (preset === "partly" ? 0.74 : 0.66));
      profile.baseLift = Math.min(0.48, profile.baseLift + (preset === "partly" ? 0.03 : 0.05));
      profile.veilMin = Math.max(profile.veilMin, preset === "partly" ? 1 : 2);
      profile.veilMax = Math.max(profile.veilMax, preset === "partly" ? 2 : 4);
      profile.yMax = Math.max(profile.yMax, cloudBottom - (preset === "partly" ? 82 : preset === "cloudy" ? 64 : 48));
      profile.jitterY += preset === "partly" ? 10 : preset === "cloudy" ? 18 : 24;
      profile.frontShare = Math.min(0.88, (profile.frontShare || 0) + (preset === "partly" ? 0.06 : 0.10));
    }
    if (denseDayNightClouds) {
      profile.count += preset === "overcast" ? 10 : 6;
      profile.rowCount = Math.min(6, (profile.rowCount || 3) + (preset === "overcast" ? 2 : 1));
      profile.frontShare = Math.min(0.985, (profile.frontShare || 0) + (preset === "overcast" ? 0.28 : 0.24));
      profile.yMin = Math.max(12, profile.yMin - (preset === "overcast" ? 10 : 6));
      profile.yMax = Math.max(profile.yMax, cloudBottom - (preset === "overcast" ? 14 : 26));
      profile.veilMin = Math.max(profile.veilMin, preset === "overcast" ? 4 : 3);
      profile.veilMax = Math.max(profile.veilMax, preset === "overcast" ? 7 : 6);
      profile.jitterY += preset === "overcast" ? 22 : 14;
    }
    const count = profile.count + (isPrecip ? profile.precipBoost : 0);

    for (let i = 0; i < count; i += 1) {
      const width = profile.widthMin + Math.random() * (profile.widthMax - profile.widthMin) + windStrength * 108;
      const height = Math.max(56, profile.heightMin + Math.random() * (profile.heightMax - profile.heightMin) - windStrength * 18);
      const motionCompensation = cloudMotionCompensation(preset, coverage, width);
      const nodes = [];
      const shadowNodes = [];
      const veilNodes = [];
      const nodeCount = profile.nodeMin + Math.floor(Math.random() * (profile.nodeMax - profile.nodeMin + 1));
      const shadowCount = profile.shadowMin + Math.floor(Math.random() * (profile.shadowMax - profile.shadowMin + 1));
      const veilCount = profile.veilMin + Math.floor(Math.random() * (profile.veilMax - profile.veilMin + 1));
      const crownCount = Math.max(4, Math.round(nodeCount * profile.crownBias));
      const bodyCount = Math.max(2, nodeCount - crownCount);

      for (let j = 0; j < crownCount; j += 1) {
        const ratioBase = crownCount <= 1 ? 0.5 : j / (crownCount - 1);
        const ratio = mobileLowerClouds && preset !== "clear"
          ? clamp(ratioBase + (Math.random() - 0.5) * 0.08, 0.04, 0.96)
          : ratioBase;
        const arc = mobileLowerClouds && preset !== "clear"
          ? Math.pow(Math.sin(ratio * Math.PI), 0.82)
          : Math.sin(ratio * Math.PI);
        const crownLift = mobileLowerClouds && preset !== "clear"
          ? (0.22 + profile.toweriness * 0.44 + Math.random() * 0.05)
          : (0.38 + profile.toweriness + Math.random() * 0.06);
        nodes.push({
          ox: (0.12 + ratio * 0.76 + (Math.random() - 0.5) * 0.06) * width,
          oy: (0.30 - arc * crownLift + (Math.random() - 0.5) * 0.03) * height,
          rx: width * ((mobileLowerClouds && preset !== "clear") ? (0.14 + Math.random() * 0.09) : (0.12 + Math.random() * 0.08)),
          ry: height * ((mobileLowerClouds && preset !== "clear") ? (0.26 + Math.random() * 0.12 + profile.toweriness * 0.06) : (0.24 + Math.random() * 0.14 + profile.toweriness * 0.08)),
          alpha: 0.52 + Math.random() * 0.30
        });
      }

      for (let j = 0; j < bodyCount; j += 1) {
        const ratio = bodyCount <= 1 ? 0.5 : j / (bodyCount - 1);
        nodes.push({
          ox: (0.18 + ratio * 0.64 + (Math.random() - 0.5) * 0.08) * width,
          oy: (profile.baseLift + Math.random() * 0.10) * height,
          rx: width * (0.18 + Math.random() * 0.10),
          ry: height * (0.16 + Math.random() * 0.08),
          alpha: 0.40 + Math.random() * 0.22
        });
      }

      for (let j = 0; j < shadowCount; j += 1) {
        const ratio = shadowCount <= 1 ? 0.5 : j / (shadowCount - 1);
        shadowNodes.push({
          ox: (0.18 + ratio * 0.64 + (Math.random() - 0.5) * 0.08) * width,
          oy: (0.58 + Math.random() * 0.10) * height,
          rx: width * (0.16 + Math.random() * 0.14),
          ry: height * (0.08 + Math.random() * 0.05),
          alpha: 0.20 + Math.random() * 0.18
        });
      }

      for (let j = 0; j < veilCount; j += 1) {
        veilNodes.push({
          ox: (0.02 + Math.random() * 0.96) * width,
          oy: (0.08 + Math.random() * 0.10) * height,
          rx: width * (0.24 + Math.random() * 0.22),
          ry: height * (0.06 + Math.random() * 0.06),
          alpha: 0.12 + Math.random() * 0.10
        });
      }

      const scatteredField = preset !== "clear";
      const rowCount = Math.max(1, profile.rowCount || 1);
      const perRow = Math.max(1, Math.ceil(count / rowCount));
      const row = i % rowCount;
      const lane = Math.floor(i / rowCount);
      const laneRatio = scatteredField
        ? (0.06 + Math.random() * 0.88)
        : (perRow <= 1 ? 0.5 : lane / (perRow - 1));
      const rowRatioRaw = scatteredField
        ? (0.08 + Math.random() * 0.84)
        : (rowCount <= 1 ? 0.5 : row / (rowCount - 1));
      const rowRatio = topPriorityClouds
        ? Math.pow(rowRatioRaw, preset === "overcast" ? 1.90 : 1.55)
        : rowRatioRaw;
      const xJitter = (Math.random() - 0.5) * profile.jitterX;
      const rowOffset = scatteredField
        ? (Math.random() - 0.5) * width * 0.30
        : (rowRatio - 0.5) * width * 0.34 + (Math.random() - 0.5) * width * 0.18;
      const originX = scatteredField
        ? (-width * 0.34) + laneRatio * (state.cssWidth + width * 0.68) + xJitter + rowOffset
        : laneRatio * (state.cssWidth + width * 0.22) - width * 0.12 + xJitter + rowOffset;
      const lowerCloud = mobileLowerClouds && preset !== "clear" && Math.random() < (
        preset === "partly"
          ? 0.18
          : denseDayNightClouds
            ? (preset === "overcast" ? 0.10 : 0.16)
            : (preset === "cloudy" ? 0.28 : 0.36)
      );
      const ySpanCap = mobileLowerClouds && preset !== "clear"
        ? Math.max(64, cloudBottom - profile.yMin)
        : Math.max(42, skyHeight * 0.42);
      const ySpan = Math.min(profile.yMax - profile.yMin, ySpanCap);
      const lowerAnchor = lowerCloud
        ? profile.yMin + ySpan * (
          preset === "partly"
            ? 0.62
            : denseDayNightClouds
              ? (preset === "overcast" ? 0.54 : 0.58)
              : (preset === "cloudy" ? 0.68 : 0.72)
        ) + Math.random() * Math.max(12, ySpan * 0.08)
        : null;
      const yBase = lowerCloud
        ? Math.max(profile.yMin + rowRatio * ySpan, lowerAnchor)
        : profile.yMin + rowRatio * ySpan;
      const foreground = preset !== "clear" && (
        scatteredField
          ? (rowRatio >= 0.56 || Math.random() < Math.min(0.88, (profile.frontShare || 0) * (0.70 + rowRatio * 0.66)))
          : (
            row >= Math.max(1, rowCount - 2)
            || Math.random() < Math.min(0.88, (profile.frontShare || 0) * (0.72 + rowRatio * 0.58))
          )
      );

      state.clouds.push({
        originX,
        y: clamp(
          yBase + (Math.random() - 0.5) * (lowerCloud ? (profile.jitterY || 10) * 1.24 : (profile.jitterY || 10)),
          profile.yMin - 10,
          cloudBottom - 10
        ),
        w: width,
        h: height,
        depth: 0.44 + Math.random() * 0.78,
        driftSpeed: (2.8 + Math.random() * 5.4 + windStrength * 6.6) * motionCompensation,
        bobAmount: Math.max(1.2, 3.4 + Math.random() * 3.8 - windStrength * 2.1),
        lean: 0.06 + windStrength * (0.18 + Math.random() * 0.10),
        emitterSpan: profile.emitterSpan,
        emitterBase: profile.emitterBaseMin + Math.random() * (profile.emitterBaseMax - profile.emitterBaseMin),
        contrast: profile.contrast,
        foreground,
        seed: Math.random() * Math.PI * 2,
        spriteCanvas: null,
        spriteKey: "",
        spriteLogicalWidth: 0,
        spriteLogicalHeight: 0,
        spriteBaseW: width,
        spriteBaseH: height,
        spritePadX: 0,
        spritePadY: 0,
        nodes,
        shadowNodes,
        veilNodes
      });
    }
    state.clouds.sort((a, b) => (a.y + a.depth * 18) - (b.y + b.depth * 18));
  }

  function normaliseSeasonName(value = "") {
    const next = String(value || "").trim().toLowerCase();
    if (next === "spring" || next === "summer" || next === "autumn" || next === "winter") return next;
    return "";
  }

  function resolveActiveSeason(explicit = "") {
    const direct = normaliseSeasonName(explicit);
    if (direct) return direct;
    const datasetSeason = normaliseSeasonName(document.body?.dataset?.mobileWeatherSeason);
    if (datasetSeason) return datasetSeason;
    const month = Number(new Date().getMonth());
    if (month === 11 || month <= 1) return "winter";
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    return "autumn";
  }

  function seededUnit(seed = 1) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return value - Math.floor(value);
  }

  function mixRgb(base = [0, 0, 0], target = [255, 255, 255], amount = 0) {
    const mix = clamp(Number(amount) || 0, 0, 1);
    return [
      Math.round(clamp(base[0] + (target[0] - base[0]) * mix, 0, 255)),
      Math.round(clamp(base[1] + (target[1] - base[1]) * mix, 0, 255)),
      Math.round(clamp(base[2] + (target[2] - base[2]) * mix, 0, 255))
    ];
  }

  function scaleRgb(base = [0, 0, 0], factor = 1) {
    const nextFactor = Math.max(0, Number(factor) || 0);
    return [
      Math.round(clamp(base[0] * nextFactor, 0, 255)),
      Math.round(clamp(base[1] * nextFactor, 0, 255)),
      Math.round(clamp(base[2] * nextFactor, 0, 255))
    ];
  }

  function currentLiquidPrecipitationAmount() {
    const baseLiquid = Math.max(0, Number(state.activeRainAmount) || 0, Number(state.activeShowersAmount) || 0);
    if (baseLiquid > 0.02) return baseLiquid;
    if (state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "hail") {
      return Math.max(0, Number(state.activePrecipitationAmount) || 0);
    }
    if (state.activePhenomenon === "sleet") {
      return Math.max(0, (Number(state.activePrecipitationAmount) || 0) * 0.46);
    }
    return 0;
  }

  function treeWeatherProfile() {
    const season = state.activeSeason || resolveActiveSeason();
    const wind = gustStrengthFactor();
    const chaos = Math.max(0, precipitationChaosFactor() * 0.72, Math.max(0, wind - 0.18) * 0.44);
    const liquidAmount = currentLiquidPrecipitationAmount();
    const precipAmount = Math.max(0, Number(state.activePrecipitationAmount) || 0);
    const snowfallAmount = Math.max(0, Number(state.activeSnowfallAmount) || 0);
    const snowBase = state.activePhenomenon === "snow"
      ? 0.30
      : state.activePhenomenon === "sleet"
        ? 0.18
        : 0;
    const snowLoad = clamp(
      snowBase
      + Math.min(0.34, snowfallAmount / 9)
      + ((state.activePhenomenon === "snow" || state.activePhenomenon === "sleet") ? Math.min(0.18, precipAmount / 18) : 0),
      0,
      0.84
    );
    const wetBase = state.activePhenomenon === "rain"
      ? 0.22
      : state.activePhenomenon === "storm"
        ? 0.34
        : state.activePhenomenon === "hail"
          ? 0.18
          : state.activePhenomenon === "sleet"
            ? 0.24
            : 0;
    const wetness = clamp(wetBase + Math.min(0.38, liquidAmount / 9), 0, 0.88);
    const fogMask = clamp(Math.max(
      state.activePhenomenon === "fog"
        ? 0.52
        : Number.isFinite(state.activeVisibility) && state.activeVisibility < 1400
          ? clamp((1400 - state.activeVisibility) / 2600, 0, 0.26)
          : 0,
      fogDensityFactor() * (state.activePhenomenon === "fog" ? 0.76 : 0.32)
    ), 0, 0.82);
    return {
      season,
      wind,
      chaos,
      liquidAmount,
      snowLoad,
      wetness,
      fogMask,
      isNight: state.activePeriod === "night",
      warmEdge: state.activePhase === "dawn" || state.activePhase === "sunset"
    };
  }

  function treePalette(meta = treeWeatherProfile()) {
    const season = meta.season;
    let trunk = season === "winter"
      ? [76, 64, 58]
      : season === "spring"
        ? [82, 60, 50]
        : [76, 56, 44];
    let bark = season === "winter"
      ? [118, 108, 102]
      : season === "spring"
        ? [126, 92, 82]
        : [106, 84, 66];
    let canopyBack = season === "spring"
      ? [208, 174, 186]
      : season === "summer"
        ? [92, 122, 62]
        : season === "autumn"
          ? [184, 96, 32]
          : [214, 222, 230];
    let canopyFront = season === "spring"
      ? [244, 212, 218]
      : season === "summer"
        ? [128, 160, 76]
        : season === "autumn"
          ? [236, 126, 30]
          : [246, 248, 252];
    let accentA = season === "spring" ? [246, 206, 214] : season === "summer" ? [188, 60, 46] : season === "autumn" ? [244, 148, 44] : [244, 246, 250];
    let accentB = season === "spring" ? [255, 238, 232] : season === "summer" ? [208, 180, 96] : season === "autumn" ? [208, 84, 22] : [224, 232, 240];
    let particleA = season === "spring" ? [248, 214, 222] : season === "summer" ? [122, 148, 82] : season === "autumn" ? [238, 148, 52] : [232, 238, 244];
    let particleB = season === "spring" ? [255, 240, 234] : season === "summer" ? [90, 116, 64] : season === "autumn" ? [192, 80, 26] : [214, 224, 236];
    let rim = meta.warmEdge ? [246, 194, 150] : season === "winter" ? [220, 228, 238] : [210, 222, 234];
    if (meta.isNight) {
      trunk = mixRgb(scaleRgb(trunk, 0.68), [82, 102, 128], 0.16);
      bark = mixRgb(scaleRgb(bark, 0.70), [130, 144, 170], 0.15);
      canopyBack = mixRgb(scaleRgb(canopyBack, 0.66), [78, 98, 126], 0.20);
      canopyFront = mixRgb(scaleRgb(canopyFront, 0.62), [72, 90, 116], 0.16);
      accentA = mixRgb(scaleRgb(accentA, 0.78), [218, 228, 244], 0.16);
      accentB = mixRgb(scaleRgb(accentB, 0.72), [196, 214, 236], 0.18);
      particleA = mixRgb(scaleRgb(particleA, 0.76), [210, 224, 242], 0.12);
      particleB = mixRgb(scaleRgb(particleB, 0.72), [190, 208, 232], 0.18);
      rim = [202, 214, 232];
    }
    if (meta.wetness > 0.02) {
      const dampFactor = Math.max(0.46, 1 - meta.wetness * 0.34);
      trunk = mixRgb(scaleRgb(trunk, dampFactor), [84, 104, 124], meta.wetness * 0.12);
      bark = mixRgb(scaleRgb(bark, Math.max(0.54, dampFactor + 0.08)), [116, 144, 172], meta.wetness * 0.12);
      canopyBack = mixRgb(scaleRgb(canopyBack, Math.max(0.52, dampFactor + 0.02)), [84, 112, 132], meta.wetness * 0.14);
      canopyFront = mixRgb(scaleRgb(canopyFront, Math.max(0.48, dampFactor)), [70, 102, 126], meta.wetness * 0.12);
    }
    return {
      trunk,
      bark,
      canopyBack,
      canopyFront,
      accentA,
      accentB,
      particleA,
      particleB,
      rim,
      snow: [240, 244, 248],
      frost: [212, 222, 234],
      silhouetteAlpha: clamp((meta.isNight ? 0.38 : season === "winter" ? 0.28 : 0.19) - meta.fogMask * 0.14, 0.09, 0.42),
      canopyAlpha: clamp((meta.isNight ? 0.52 : season === "winter" ? 0.36 : 0.46) - meta.fogMask * 0.10, 0.18, 0.60)
    };
  }

  function buildTreeProfile() {
    if (!isTreeEnabled()) {
      state.treeProfile = null;
      state.treeParticles = [];
      clearTreeLayer();
      return;
    }
      const season = state.activeSeason || resolveActiveSeason();
      const width = Math.max(1, Number(state.cssWidth) || 360);
      const height = Math.max(1, Number(state.cssHeight) || 720);
      const header = headerLayerHeight();
      const celestialOnRight = state.activePeriod !== "night" && state.activePhase === "sunset";
      const treeOnRight = !celestialOnRight;
      const sideInset = clamp(width * 0.06, 18, 28);
      const crownWidth = season === "winter"
        ? clamp(width * 0.34, 126, 162)
        : season === "summer"
          ? clamp(width * 0.40, 148, 182)
          : season === "spring"
            ? clamp(width * 0.42, 154, 188)
            : clamp(width * 0.38, 144, 176);
      const crownHeight = season === "winter"
        ? clamp(height * 0.18, 106, 128)
        : season === "summer"
          ? clamp(height * 0.20, 116, 138)
          : season === "spring"
            ? clamp(height * 0.21, 122, 146)
            : clamp(height * 0.19, 112, 134);
      const trunkHeight = clamp(height * 0.34, 210, 270);
      const trunkWidth = clamp(width * 0.032, 9, 13);
      const baseX = treeOnRight ? width - sideInset : sideInset + trunkWidth * 1.6;
      const baseY = height + 12;
      const crownCenterX = treeOnRight
        ? baseX - crownWidth * 0.18
        : baseX + crownWidth * 0.16;
      const crownCenterY = clamp(baseY - trunkHeight * 0.72, header + 18 + crownHeight * 0.04, height * 0.31);
      const canopyCount = season === "summer" ? 62 : season === "spring" ? 72 : season === "autumn" ? 56 : 28;
      const detailCount = season === "spring" ? 132 : season === "summer" ? 108 : season === "autumn" ? 94 : 42;
      const accentCount = season === "spring" ? 14 : season === "summer" ? 4 : season === "autumn" ? 8 : 0;
    const canopy = [];
    const details = [];
    const accents = [];
    const baseSeed = width * 0.031 + height * 0.019 + (season === "summer" ? 22 : season === "autumn" ? 46 : season === "winter" ? 68 : 11);
    const crownAnchors = season === "winter"
      ? [
        { x: -0.20, y: -0.08, scale: 0.82 },
        { x: -0.06, y: -0.22, scale: 0.92 },
        { x: 0.14, y: -0.14, scale: 0.84 },
        { x: -0.14, y: 0.12, scale: 0.74 },
        { x: 0.10, y: 0.14, scale: 0.72 }
      ]
      : [
        { x: -0.28, y: 0.10, scale: 1.00 },
        { x: -0.18, y: -0.04, scale: 1.02 },
        { x: -0.02, y: -0.18, scale: 1.06 },
        { x: 0.18, y: -0.06, scale: 1.00 },
        { x: 0.30, y: 0.10, scale: 0.94 },
        { x: 0.04, y: 0.20, scale: 0.92 },
        { x: -0.12, y: 0.20, scale: 0.88 }
      ];
    const branchSpecs = [
      { start: 0.08, len: 0.46, side: -1, spread: 0.88, rise: 0.56, curve: 0.34, flex: 0.54, width: 0.98, twig: 0.34, seed: 0.2 },
      { start: 0.10, len: 0.44, side: 1, spread: 0.84, rise: 0.58, curve: 0.34, flex: 0.52, width: 0.96, twig: 0.34, seed: 0.6 },
      { start: 0.18, len: 0.36, side: -1, spread: 0.64, rise: 0.64, curve: 0.24, flex: 0.42, width: 0.76, twig: 0.26, seed: 1.0 },
      { start: 0.20, len: 0.34, side: 1, spread: 0.62, rise: 0.66, curve: 0.22, flex: 0.42, width: 0.74, twig: 0.26, seed: 1.4 },
      { start: 0.30, len: 0.28, side: -1, spread: 0.46, rise: 0.74, curve: 0.16, flex: 0.30, width: 0.52, twig: 0.20, seed: 1.8 },
      { start: 0.32, len: 0.28, side: 1, spread: 0.44, rise: 0.76, curve: 0.16, flex: 0.30, width: 0.50, twig: 0.20, seed: 2.2 }
    ];
    for (let i = 0; i < canopyCount; i += 1) {
      const unitA = seededUnit(baseSeed + i * 1.17);
      const unitB = seededUnit(baseSeed + i * 1.83 + 8.4);
      const unitC = seededUnit(baseSeed + i * 2.29 + 17.2);
      const unitD = seededUnit(baseSeed + i * 2.91 + 29.6);
      const anchor = crownAnchors[Math.floor(unitD * crownAnchors.length)] || crownAnchors[0];
      const spreadX = crownWidth * (season === "winter" ? 0.14 : 0.18) * anchor.scale;
      const spreadY = crownHeight * (season === "winter" ? 0.12 : 0.16) * anchor.scale;
      const rx = crownWidth * (season === "winter" ? 0.050 : 0.050) * anchor.scale + unitC * crownWidth * 0.014;
      const ry = crownHeight * (season === "winter" ? 0.052 : 0.060) * anchor.scale + unitA * crownHeight * 0.018;
      const x = crownCenterX
        + anchor.x * crownWidth
        + (unitA - 0.5) * spreadX * 1.9
        + Math.sin(i * 1.18 + unitB * 2.1) * crownWidth * 0.016;
      const y = clamp(
        crownCenterY
          + anchor.y * crownHeight
          + (unitB - 0.5) * spreadY * 1.55
          + Math.cos(i * 0.94 + unitC * 2.2) * crownHeight * 0.016,
        header - 12 + ry,
        height * 0.82
      );
      canopy.push({
        x,
        y,
        rx,
        ry,
        depth: 0.34 + unitC * 0.66,
        front: unitD > 0.28,
        alpha: season === "winter" ? 0.11 + unitB * 0.08 : 0.14 + unitB * 0.16,
        tilt: (unitA - 0.5) * 0.14,
        wobble: 0.48 + unitC * 0.80,
        seed: unitA * Math.PI * 2 + i * 0.72
      });
    }
    for (let i = 0; i < accentCount; i += 1) {
      const parentIndex = Math.floor(seededUnit(baseSeed + i * 4.17 + 41) * Math.max(1, canopy.length));
      const parent = canopy[parentIndex] || null;
      if (!parent) continue;
      const unitA = seededUnit(baseSeed + i * 2.23 + 57);
      const unitB = seededUnit(baseSeed + i * 2.81 + 63);
      accents.push({
        parentIndex,
        offsetX: (unitA - 0.5) * parent.rx * 1.04,
        offsetY: (unitB - 0.5) * parent.ry * 0.82,
        size: season === "summer" ? 1.4 + unitA * 0.6 : season === "spring" ? 0.9 + unitA * 0.6 : 1.3 + unitA * 0.8,
        kind: season === "spring" ? "blossom" : season === "summer" ? "apple" : "leaf",
        tint: unitB > 0.5 ? "a" : "b",
        front: parent.front,
        seed: unitA * Math.PI * 2 + unitB * 3.8
      });
    }
    for (let i = 0; i < detailCount; i += 1) {
      const parentIndex = Math.floor(seededUnit(baseSeed + i * 3.31 + 141) * Math.max(1, canopy.length));
      const parent = canopy[parentIndex] || null;
      if (!parent) continue;
      const unitA = seededUnit(baseSeed + i * 1.71 + 167);
      const unitB = seededUnit(baseSeed + i * 2.13 + 193);
      const unitC = seededUnit(baseSeed + i * 2.57 + 227);
      details.push({
        parentIndex,
        offsetX: (unitA - 0.5) * parent.rx * 1.18,
        offsetY: (unitB - 0.5) * parent.ry * 1.10,
        size: season === "winter"
          ? 0.9 + unitA * 0.9
          : season === "spring"
            ? 0.7 + unitA * 0.8
            : season === "summer"
              ? 0.8 + unitA * 0.7
              : 0.9 + unitA * 0.9,
        stretch: 0.72 + unitB * 0.62,
        alpha: season === "winter" ? 0.16 + unitC * 0.18 : 0.12 + unitC * 0.16,
        front: parent.front,
        kind: season === "winter" ? "frost" : season === "spring" ? "blossom" : "leaf",
        tint: unitC > 0.54 ? "a" : unitC < 0.20 ? "canopy" : "b",
        tilt: (unitA - 0.5) * 0.56,
        seed: unitA * Math.PI * 2 + unitB * 4.8
      });
    }
    state.treeProfile = {
      season,
      baseX,
      baseY,
      trunkHeight,
      trunkWidth,
      crownCenterX,
      crownCenterY,
      crownWidth,
      crownHeight,
      branches: branchSpecs,
      canopy,
      details,
      accents,
      seedA: seededUnit(baseSeed + 91) * Math.PI * 2,
      seedB: seededUnit(baseSeed + 103) * Math.PI * 2,
      seedC: seededUnit(baseSeed + 117) * Math.PI * 2,
      seedD: seededUnit(baseSeed + 133) * Math.PI * 2
    };
    state.treeParticles = [];
    syncTreeParticles();
  }

    function desiredTreeParticleCount() {
      const season = state.activeSeason || resolveActiveSeason();
      const wind = gustStrengthFactor();
      const chaos = precipitationChaosFactor();
      if (season === "winter") return 0;
      if (season === "summer") return wind < 0.40 ? 0 : Math.min(2, Math.round(wind * 1.6 + chaos * 0.8));
      if (season === "spring") return Math.min(6, Math.round(1 + wind * 2.2 + chaos * 1.4));
      if (season === "autumn") return Math.min(8, Math.round(1 + wind * 2.6 + chaos * 1.6));
      return 0;
    }

  function spawnTreeParticle() {
    const profile = state.treeProfile;
    if (!profile || !profile.canopy.length) return null;
    const season = profile.season;
    const source = profile.canopy[Math.floor(Math.random() * profile.canopy.length)];
    const x = source.x + (Math.random() - 0.5) * source.rx * 1.2;
    const y = source.y + (Math.random() - 0.5) * source.ry * 0.8 - Math.random() * 18;
    return {
      x,
      y,
      r: season === "autumn" ? 2.8 + Math.random() * 2.0 : season === "spring" ? 2.0 + Math.random() * 1.6 : 2.2 + Math.random() * 1.4,
      alpha: 0.16 + Math.random() * 0.24,
      speed: 0.7 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 1.2,
      wobble: 0.4 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.10,
      kind: season === "spring" ? "petal" : "leaf",
      tint: Math.random() > 0.5 ? "a" : "b"
    };
  }

  function refreshTreeParticle(particle) {
    const next = spawnTreeParticle();
    if (!particle || !next) return next;
    Object.assign(particle, next);
    return particle;
  }

  function syncTreeParticles() {
    const target = desiredTreeParticleCount();
    if (!state.treeProfile || target <= 0) {
      state.treeParticles = [];
      return;
    }
    while (state.treeParticles.length < target) {
      const particle = spawnTreeParticle();
      if (!particle) break;
      state.treeParticles.push(particle);
    }
    if (state.treeParticles.length > target) state.treeParticles.length = target;
  }

  function drawTreeCurve(ctx, startX, startY, ctrlX, ctrlY, endX, endY, width, color, alpha) {
    ctx.strokeStyle = toRgba(color[0], color[1], color[2], alpha);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
    ctx.stroke();
  }

  function drawTreeDetailMark(ctx, detail, x, y, palette, meta) {
    const tintBase = detail.tint === "a"
      ? palette.accentA
      : detail.tint === "b"
        ? palette.accentB
        : palette.canopyFront;
    const alpha = Math.max(0.04, (Number(detail.alpha) || 0.12) - meta.fogMask * 0.10);
    if (detail.kind === "frost") {
      const frostBase = mixRgb(palette.snow, palette.frost, detail.tint === "a" ? 0.18 : 0.42);
      ctx.fillStyle = toRgba(frostBase[0], frostBase[1], frostBase[2], alpha);
      ctx.beginPath();
      ctx.arc(x, y, detail.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = toRgba(255, 255, 255, alpha * 0.46);
      ctx.beginPath();
      ctx.arc(x - detail.size * 0.18, y - detail.size * 0.16, detail.size * 0.32, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (detail.kind === "blossom") {
      ctx.fillStyle = toRgba(tintBase[0], tintBase[1], tintBase[2], alpha);
      ctx.beginPath();
      ctx.ellipse(x, y, detail.size * detail.stretch, detail.size, detail.tilt, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = toRgba(255, 246, 236, alpha * 0.42);
      ctx.beginPath();
      ctx.arc(x + detail.size * 0.06, y - detail.size * 0.04, detail.size * 0.22, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    const leafBase = mixRgb(tintBase, palette.canopyFront, detail.tint === "canopy" ? 0.70 : 0.26);
    ctx.fillStyle = toRgba(leafBase[0], leafBase[1], leafBase[2], alpha);
    ctx.beginPath();
    ctx.ellipse(x, y, detail.size * detail.stretch, detail.size * 0.78, detail.tilt, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = toRgba(palette.rim[0], palette.rim[1], palette.rim[2], alpha * 0.18);
    ctx.beginPath();
    ctx.ellipse(x - detail.size * 0.10, y - detail.size * 0.12, detail.size * 0.38, detail.size * 0.16, detail.tilt, Math.PI, Math.PI * 2);
    ctx.fill();
  }

  function drawTree(time) {
    if (!isTreeEnabled()) {
      clearTreeLayer();
      return;
    }
    const ctx = state.treeCtx;
    const profile = state.treeProfile;
    if (!ctx) return;
    ctx.clearRect(0, 0, state.cssWidth, state.cssHeight);
    if (!profile) return;
    syncTreeParticles();
    const meta = treeWeatherProfile();
    const palette = treePalette(meta);
    const wind = meta.wind;
    const chaos = meta.chaos;
    const trunkSway = wind <= 0.06
      ? 0
      : Math.sin(time * (0.62 + wind * 0.58) + profile.seedA) * (1.5 + wind * 7.6)
        + chaoticWindBiasAt(profile.baseX * 0.42, profile.crownCenterY, time, profile.seedB) * (0.6 + chaos * 5.2);
    const crownSway = trunkSway * 1.28
      + Math.sin(time * (1.10 + wind * 0.72) + profile.seedC) * (0.7 + wind * 5.8 + chaos * 3.0);
    const branchChaos = wind <= 0.08 ? 0 : Math.sin(time * (2.06 + chaos * 0.44) + profile.seedD) * (0.3 + chaos * 2.4);
    const trunkTopX = profile.baseX - profile.trunkWidth * 0.52 + trunkSway * 0.54;
    const trunkTopY = profile.baseY - profile.trunkHeight;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (profile.canopy.length) {
      for (const blob of profile.canopy) {
        if (blob.front) continue;
        const blobSway = crownSway * (0.36 + blob.depth * 0.24) + chaoticWindBiasAt(blob.x, blob.y, time, blob.seed) * (0.3 + chaos * 2.0);
        const x = blob.x + blobSway;
        const y = blob.y + Math.abs(Math.sin(time * (0.74 + blob.depth * 0.20) + blob.seed)) * wind * 0.9;
        ctx.fillStyle = toRgba(palette.canopyBack[0], palette.canopyBack[1], palette.canopyBack[2], palette.canopyAlpha * blob.alpha * 0.72);
        ctx.beginPath();
        ctx.ellipse(x, y, blob.rx, blob.ry, blob.tilt + blobSway * 0.008, 0, Math.PI * 2);
        ctx.fill();
        if (profile.season !== "winter") {
          ctx.fillStyle = toRgba(palette.canopyFront[0], palette.canopyFront[1], palette.canopyFront[2], palette.canopyAlpha * blob.alpha * 0.18);
          ctx.beginPath();
          ctx.ellipse(
            x - blob.rx * 0.12,
            y - blob.ry * 0.10,
            blob.rx * 0.58,
            blob.ry * 0.44,
            blob.tilt + blobSway * 0.008,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      ctx.save();
      ctx.filter = `blur(${3.8 + wind * 1.8}px)`;
      ctx.fillStyle = toRgba(
        palette.canopyBack[0],
        palette.canopyBack[1],
        palette.canopyBack[2],
        palette.canopyAlpha * (profile.season === "winter" ? 0.22 : 0.18)
      );
      ctx.beginPath();
      ctx.ellipse(
        profile.crownCenterX + crownSway * 0.34,
        profile.crownCenterY + Math.sin(time * 0.42 + profile.seedA) * wind * 0.6,
        profile.crownWidth * 0.46,
        profile.crownHeight * 0.38,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    }
    if (profile.details?.length) {
      for (const detail of profile.details) {
        if (detail.front) continue;
        const parent = profile.canopy[detail.parentIndex];
        if (!parent) continue;
        const detailSway = crownSway * (0.32 + parent.depth * 0.22)
          + chaoticWindBiasAt(parent.x, parent.y, time, detail.seed) * (0.14 + chaos * 1.1);
        drawTreeDetailMark(
          ctx,
          detail,
          parent.x + detailSway + detail.offsetX,
          parent.y + detail.offsetY + Math.sin(time * 0.84 + detail.seed) * wind * 0.34,
          palette,
          meta
        );
      }
    }
    ctx.save();
    ctx.filter = `blur(${5.8 + wind * 1.6}px)`;
    ctx.fillStyle = toRgba(
      palette.trunk[0],
      palette.trunk[1],
      palette.trunk[2],
      profile.season === "winter"
        ? palette.silhouetteAlpha * 0.16
        : palette.silhouetteAlpha * 0.08
    );
    ctx.beginPath();
    ctx.ellipse(
      trunkTopX - profile.crownWidth * 0.03 + crownSway * 0.10,
      trunkTopY + profile.crownHeight * 0.30,
      profile.crownWidth * 0.14,
      profile.crownHeight * 0.22,
      -0.04,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    if (profile.canopy.length) {
      for (const blob of profile.canopy) {
        if (!blob.front) continue;
        const blobSway = crownSway * (0.44 + blob.depth * 0.36) + chaoticWindBiasAt(blob.x, blob.y, time, blob.seed) * (0.4 + chaos * 2.8);
        const x = blob.x + blobSway;
        const y = blob.y + Math.abs(Math.sin(time * (0.86 + blob.depth * 0.22) + blob.seed)) * wind * 1.1;
        ctx.fillStyle = toRgba(palette.canopyFront[0], palette.canopyFront[1], palette.canopyFront[2], palette.canopyAlpha * blob.alpha);
        ctx.beginPath();
        ctx.ellipse(x, y, blob.rx, blob.ry, blob.tilt + blobSway * 0.010, 0, Math.PI * 2);
        ctx.fill();
        if (profile.season !== "winter") {
          ctx.fillStyle = toRgba(palette.rim[0], palette.rim[1], palette.rim[2], Math.min(0.10, palette.canopyAlpha * blob.alpha * 0.18));
          ctx.beginPath();
          ctx.ellipse(
            x - blob.rx * 0.10,
            y - blob.ry * 0.16,
            blob.rx * 0.42,
            blob.ry * 0.20,
            blob.tilt,
            Math.PI,
            Math.PI * 2
          );
          ctx.fill();
        }
        if (meta.wetness > 0.04) {
          ctx.fillStyle = toRgba(palette.rim[0], palette.rim[1], palette.rim[2], Math.min(0.16, meta.wetness * 0.18) * blob.alpha);
          ctx.beginPath();
          ctx.ellipse(x - blob.rx * 0.12, y - blob.ry * 0.14, blob.rx * 0.48, blob.ry * 0.22, blob.tilt, Math.PI, Math.PI * 2);
          ctx.fill();
        }
        if (meta.snowLoad > 0.04) {
          ctx.fillStyle = toRgba(palette.snow[0], palette.snow[1], palette.snow[2], (0.16 + meta.snowLoad * 0.18) * blob.alpha);
          ctx.beginPath();
          ctx.ellipse(x, y - blob.ry * 0.18, blob.rx * 0.66, blob.ry * (0.14 + meta.snowLoad * 0.04), blob.tilt, Math.PI, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.save();
      ctx.filter = `blur(${3.1 + wind * 1.4}px)`;
      ctx.fillStyle = toRgba(
        palette.canopyFront[0],
        palette.canopyFront[1],
        palette.canopyFront[2],
        palette.canopyAlpha * (profile.season === "winter" ? 0.18 : 0.15)
      );
      ctx.beginPath();
      ctx.ellipse(
        profile.crownCenterX + crownSway * 0.44,
        profile.crownCenterY - profile.crownHeight * 0.02,
        profile.crownWidth * 0.40,
        profile.crownHeight * 0.32,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
      if (profile.season !== "winter") {
        ctx.fillStyle = toRgba(palette.canopyFront[0], palette.canopyFront[1], palette.canopyFront[2], palette.canopyAlpha * 0.18);
        ctx.beginPath();
        ctx.ellipse(
          trunkTopX - profile.crownWidth * 0.10 + crownSway * 0.18,
          trunkTopY + profile.crownHeight * 0.26,
          profile.crownWidth * 0.22,
          profile.crownHeight * 0.17,
          -0.18,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          trunkTopX + profile.crownWidth * 0.08 + crownSway * 0.12,
          trunkTopY + profile.crownHeight * 0.24,
          profile.crownWidth * 0.18,
          profile.crownHeight * 0.15,
          0.20,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
    if (profile.details?.length) {
      for (const detail of profile.details) {
        if (!detail.front) continue;
        const parent = profile.canopy[detail.parentIndex];
        if (!parent) continue;
        const detailSway = crownSway * (0.42 + parent.depth * 0.30)
          + chaoticWindBiasAt(parent.x, parent.y, time, detail.seed) * (0.18 + chaos * 1.4);
        drawTreeDetailMark(
          ctx,
          detail,
          parent.x + detailSway + detail.offsetX,
          parent.y + detail.offsetY + Math.sin(time * 0.98 + detail.seed) * wind * 0.44,
          palette,
          meta
        );
      }
    }

    for (const accent of profile.accents) {
      const parent = profile.canopy[accent.parentIndex];
      if (!parent) continue;
      const blobSway = crownSway * (0.44 + parent.depth * 0.36) + chaoticWindBiasAt(parent.x, parent.y, time, parent.seed) * (0.3 + chaos * 1.8);
      const x = parent.x + blobSway + accent.offsetX;
      const y = parent.y + accent.offsetY;
      const baseColor = accent.tint === "a" ? palette.accentA : palette.accentB;
      if (accent.kind === "apple") {
        ctx.fillStyle = toRgba(baseColor[0], baseColor[1], baseColor[2], 0.48 - meta.fogMask * 0.18);
        ctx.beginPath();
        ctx.ellipse(x, y, accent.size * 0.96, accent.size * 1.04, 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = toRgba(255, 244, 218, 0.18);
        ctx.beginPath();
        ctx.ellipse(x - accent.size * 0.22, y - accent.size * 0.18, accent.size * 0.24, accent.size * 0.18, -0.34, 0, Math.PI * 2);
        ctx.fill();
        const stemColor = scaleRgb(palette.trunk, 0.74);
        ctx.strokeStyle = toRgba(stemColor[0], stemColor[1], stemColor[2], 0.24);
        ctx.lineWidth = 0.45;
        ctx.beginPath();
        ctx.moveTo(x, y - accent.size * 0.8);
        ctx.lineTo(x + 0.5, y - accent.size * 1.4);
        ctx.stroke();
      } else if (accent.kind === "blossom") {
        ctx.fillStyle = toRgba(baseColor[0], baseColor[1], baseColor[2], 0.42 - meta.fogMask * 0.16);
        for (let i = 0; i < 5; i += 1) {
          const angle = accent.seed + i * (Math.PI * 0.4);
          ctx.beginPath();
          ctx.ellipse(
            x + Math.cos(angle) * accent.size * 0.26,
            y + Math.sin(angle) * accent.size * 0.20,
            accent.size * 0.60,
            accent.size * 0.42,
            angle * 0.36,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.fillStyle = "rgba(255,245,232,0.44)";
        ctx.beginPath();
        ctx.arc(x, y, accent.size * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = toRgba(baseColor[0], baseColor[1], baseColor[2], 0.38 - meta.fogMask * 0.14);
        ctx.beginPath();
        ctx.ellipse(x, y, accent.size * 0.86, accent.size * 0.46, accent.seed * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const frameScale = frameStepScale();
    for (const particle of state.treeParticles) {
      const drift = gustStrengthFactor() <= 0.08
        ? 0
        : chaoticWindBiasAt(particle.x, particle.y, time, particle.phase) * (0.2 + wind * 2.8 + chaos * 1.6)
          + Math.sin(time * (1.34 + particle.wobble) + particle.phase) * (0.08 + wind * 0.46)
          + particle.drift;
      particle.x += drift * frameScale;
      particle.y += (particle.speed + Math.abs(Math.sin(time * 0.92 + particle.phase)) * 0.08) * frameScale;
      particle.rotation += particle.spin * frameScale;
      if (particle.y > state.cssHeight + 20 || particle.x < -24 || particle.x > state.cssWidth + 24) {
        refreshTreeParticle(particle);
      }
      const particleColor = particle.tint === "a" ? palette.particleA : palette.particleB;
      ctx.fillStyle = toRgba(particleColor[0], particleColor[1], particleColor[2], particle.alpha * (0.62 - meta.fogMask * 0.22));
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      if (particle.kind === "petal") {
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.r * 0.92, particle.r * 0.56, 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.r, particle.r * 0.54, 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    const fadeStart = Math.max(headerLayerHeight() + 8, profile.crownCenterY - profile.crownHeight * 0.82);
    const fadeMid = Math.min(state.cssHeight, profile.crownCenterY + profile.crownHeight * 1.64);
    const fade = ctx.createLinearGradient(0, fadeStart, 0, fadeMid);
    fade.addColorStop(0, "rgba(255,255,255,0)");
    fade.addColorStop(0.06, "rgba(255,255,255,0)");
    fade.addColorStop(0.24, "rgba(255,255,255,0.22)");
    fade.addColorStop(0.66, "rgba(255,255,255,0.74)");
    fade.addColorStop(1, "rgba(255,255,255,1)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, state.cssWidth, state.cssHeight);

    ctx.restore();
  }

  function cloudPositionAt(cloud, index, time = state.time) {
    const windStrength = gustStrengthFactor();
    const directionX = windFlowDirectionX();
    const driftFactor = cloudDriftFactor();
    const span = state.cssWidth + cloud.w * 1.8;
    const travel = cloud.originX + directionX * time * (cloud.driftSpeed + windStrength * 5.8) * driftFactor + index * 48;
    const drift = ((travel % span) + span) % span;
    const gustShift = Math.sin(time * (0.42 + windStrength * 0.52) + cloud.seed) * (windStrength * 34) * directionX * driftFactor;
    return {
      x: drift - cloud.w * 0.84 + gustShift,
      y: cloud.y + Math.sin(time * (0.08 + windStrength * 0.12) + cloud.seed) * cloud.bobAmount * Math.max(0.48, 1 - windStrength * 0.24)
    };
  }

  function pickCloudEmitter(time = state.time) {
    if (!state.clouds.length) {
      return {
        x: Math.random() * state.cssWidth,
        y: 68 + Math.random() * 28
      };
    }
    const index = Math.floor(Math.random() * state.clouds.length);
    const cloud = state.clouds[index];
    const position = cloudPositionAt(cloud, index, time);
    return {
      x: position.x + cloud.w * (0.12 + Math.random() * Math.max(0.28, cloud.emitterSpan)),
      y: position.y + cloud.h * cloud.emitterBase - Math.max(10, cloud.h * 0.12) + Math.random() * Math.max(12, cloud.h * 0.10)
    };
  }

  function createParticleEmitterSeed() {
    return {
      sourceCloudIndex: state.clouds.length ? Math.floor(Math.random() * state.clouds.length) : -1,
      sourceSpanRatio: 0.12 + Math.random() * 0.62,
      sourceVerticalRatio: Math.random(),
      sourceTimeOffset: (Math.random() - 0.5) * 140
    };
  }

  function refreshParticleEmitterSeed(particle, options = {}) {
    if (!particle) return;
    const seed = createParticleEmitterSeed();
    particle.sourceCloudIndex = seed.sourceCloudIndex;
    particle.sourceSpanRatio = seed.sourceSpanRatio;
    particle.sourceVerticalRatio = seed.sourceVerticalRatio;
    particle.sourceTimeOffset = seed.sourceTimeOffset;

    const spawnOffsetXRange = Math.max(6, Number(options.spawnOffsetXRange) || 24);
    const spawnOffsetYRange = Math.max(4, Number(options.spawnOffsetYRange) || 18);
    particle.spawnOffsetX = (Math.random() - 0.5) * spawnOffsetXRange;
    particle.spawnOffsetY = Math.random() * spawnOffsetYRange;

    if (Number.isFinite(particle.phase)) particle.phase = Math.random() * Math.PI * 2;
    if (Number.isFinite(particle.sway)) particle.sway = Math.random() * Math.PI * 2;
    if (Number.isFinite(particle.sizeBias)) particle.sizeBias = 0.72 + Math.random() * 0.92;
    if (Number.isFinite(particle.shine)) particle.shine = 0.38 + Math.random() * 0.48;
  }

  function pickSeededCloudEmitter(particle, time = state.time) {
    if (!state.clouds.length || !particle || !Number.isFinite(particle.sourceCloudIndex) || particle.sourceCloudIndex < 0) {
      return pickCloudEmitter(time);
    }

    const index = particle.sourceCloudIndex % state.clouds.length;
    const cloud = state.clouds[index];
    const sampleTime = Number.isFinite(particle.sourceTimeOffset) ? time + particle.sourceTimeOffset : time;
    const position = cloudPositionAt(cloud, index, sampleTime);
    const spanRatio = Number.isFinite(particle.sourceSpanRatio) ? particle.sourceSpanRatio : 0.34;
    const verticalRatio = Number.isFinite(particle.sourceVerticalRatio) ? particle.sourceVerticalRatio : 0.5;
    return {
      x: position.x + cloud.w * spanRatio,
      y: position.y + cloud.h * cloud.emitterBase - Math.max(10, cloud.h * 0.12) + verticalRatio * Math.max(12, cloud.h * 0.10)
    };
  }

  function primeRainDrop(drop, travelRatio = Math.random()) {
    const travel = travelRatio * (state.cssHeight + 48);
    const frames = travel / Math.max(0.2, drop.speed);
    drop.y += travel - state.cssHeight * 0.18;
    drop.x += clamp(
      ((drop.drift + drop.curve * 0.4) * 0.14 * frames) + (Math.random() - 0.5) * 10,
      -state.cssWidth * 0.24,
      state.cssWidth * 0.24
    );
  }

  function redistributedPrecipSpawnX(baseX, phenomenon = windDrivenPhenomenonKey(), extraSpread = 0) {
    const strength = gustStrengthFactor();
    const flow = windFlowDirectionX();
    const margin = (phenomenon === "snow" ? 56 : 72) + strength * 110;
    const spread = (phenomenon === "snow" ? 26 : 34) + strength * 46 + Math.max(0, Number(extraSpread) || 0);
    const upwindCompensation = -flow * (18 + strength * 28);
    return wrapValue(baseX + upwindCompensation + (Math.random() - 0.5) * spread, -margin, state.cssWidth + margin);
  }

  function wrapValue(value, min, max) {
    const range = max - min;
    if (!Number.isFinite(value) || !Number.isFinite(range) || range <= 0) return min;
    let wrapped = (value - min) % range;
    if (wrapped < 0) wrapped += range;
    return min + wrapped;
  }

  function primeSnowFlake(flake, travelRatio = Math.random()) {
    const margin = Number.isFinite(flake.wrapMargin) ? flake.wrapMargin : 52;
    const travel = travelRatio * (state.cssHeight + 54);
    const frames = travel / Math.max(0.2, flake.speed);
    flake.y += travel - state.cssHeight * 0.16;
    flake.x += clamp(
      (flake.drift * 0.10 * frames) + (Math.random() - 0.5) * (8 + flake.r * 3),
      -state.cssWidth * 0.18,
      state.cssWidth * 0.18
    );
    flake.x = wrapValue(flake.x, -margin, state.cssWidth + margin);
  }

  function primeHailStone(stone, travelRatio = Math.random()) {
    const travel = travelRatio * (state.cssHeight + 36);
    const frames = travel / Math.max(0.2, stone.speed);
    stone.y += travel - state.cssHeight * 0.14;
    stone.x += clamp(
      (stone.drift * 0.13 * frames) + (Math.random() - 0.5) * (8 + stone.r * 3),
      -state.cssWidth * 0.20,
      state.cssWidth * 0.20
    );
  }

  function effectiveLiquidAmount() {
    const explicitLiquid = Math.max(0, state.activeRainAmount, state.activeShowersAmount);
    if (explicitLiquid > 0.03) return explicitLiquid;
    const genericTotal = Math.max(0, state.activePrecipitationAmount);
    if (genericTotal > 0.03 && (state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activeSceneKey === "hail")) {
      return genericTotal;
    }
    if (state.activePrecipitationLocked) return 0;
    if (state.activeSceneKey === "storm") return 1.1;
    if (state.activeSceneKey === "hail") return 0.72;
    if (state.activeSceneKey === "sleet") return 0.58;
    if (state.activePhenomenon === "rain") return state.activeSceneKey === "rain_heavy" ? 1.3 : 0.34;
    return 0;
  }

  function effectiveSnowAmount() {
    const explicitSnow = Math.max(0, state.activeSnowfallAmount);
    const genericTotal = Math.max(0, state.activePrecipitationAmount);
    const derivedSnow = genericTotal > 0.03
      ? state.activePhenomenon === "snow"
        ? genericTotal * 1.18
        : state.activePhenomenon === "sleet" || state.activeSceneKey === "sleet"
          ? genericTotal * 0.62
          : 0
      : 0;
    if (explicitSnow > 0.03) {
      return derivedSnow > 0.03 ? Math.max(explicitSnow, derivedSnow) : explicitSnow;
    }
    if (derivedSnow > 0.03) return derivedSnow;
    if (state.activePrecipitationLocked) return 0;
    if (state.activePhenomenon !== "snow" && state.activePhenomenon !== "sleet") return 0;
    if (state.activeSceneKey === "sleet") return 0.72;
    return state.activeSceneKey === "snow_heavy" ? 1.6 : 0.58;
  }

  function precipitationStrengthFactor(intensityMeta = currentPrecipitationIntensityCurve()) {
    const mobileRainLikeDensity = isMobileWeatherShell()
      && (state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "sleet");
    const windBoost = mobileRainLikeDensity
      ? 0
      : Math.min(0.8, windStrengthFactor() * 0.28 + gustStrengthFactor() * 0.22);
    if (intensityMeta.amount <= 0.03) return 0;
    if (state.activeSceneKey === "hail") {
      return Math.min(16.2, intensityMeta.strength * 1.16 + intensityMeta.overdrive * 0.20 + windBoost * 0.46);
    }
    if (state.activeSceneKey === "storm" || state.activePhenomenon === "storm") {
      return Math.min(17.0, intensityMeta.strength * 1.20 + intensityMeta.overdrive * 0.24 + windBoost * 0.64);
    }
    if (state.activePhenomenon === "rain") {
      return Math.min(15.4, intensityMeta.strength * 1.12 + (state.activeSceneKey === "rain_heavy" ? 0.54 : 0) + intensityMeta.overdrive * 0.18 + windBoost * 0.32);
    }
    if (state.activePhenomenon === "snow") {
      return Math.min(15.8, intensityMeta.strength * 1.14 + (state.activeSceneKey === "snow_heavy" ? 0.72 : 0) + intensityMeta.overdrive * 0.20 + windBoost * (state.activeSceneKey === "snow_heavy" ? 0.54 : 0.36));
    }
    if (state.activePhenomenon === "sleet") {
      return Math.min(15.6, intensityMeta.strength * 1.14 + intensityMeta.overdrive * 0.20 + windBoost * 0.38);
    }
    return 0;
  }

  function weightedRangeSample(ranges = [], fallbackMin = 0, fallbackMax = 1) {
    const validRanges = Array.isArray(ranges) ? ranges.filter((range) => Number(range?.weight) > 0) : [];
    if (!validRanges.length) return fallbackMin + Math.random() * Math.max(0, fallbackMax - fallbackMin);
    const totalWeight = validRanges.reduce((sum, range) => sum + Number(range.weight || 0), 0);
    if (totalWeight <= 0) return fallbackMin + Math.random() * Math.max(0, fallbackMax - fallbackMin);
    let threshold = Math.random() * totalWeight;
    for (const range of validRanges) {
      threshold -= Number(range.weight || 0);
      if (threshold <= 0) {
        const min = Number.isFinite(Number(range.min)) ? Number(range.min) : fallbackMin;
        const max = Number.isFinite(Number(range.max)) ? Number(range.max) : fallbackMax;
        return min + Math.random() * Math.max(0, max - min);
      }
    }
    return fallbackMin + Math.random() * Math.max(0, fallbackMax - fallbackMin);
  }

  function rainSizeBiasForIntensity(intensityMeta = currentPrecipitationIntensityCurve(), layer = "mid") {
    const band = String(intensityMeta?.band || "light");
    const overdrive = Math.max(0, Number(intensityMeta?.overdrive) || 0);
    const layerBoost = layer === "near" ? 0.18 : layer === "mid" ? 0.08 : -0.04;
    if (band === "trace" || band === "light") {
      return weightedRangeSample([
        { min: 0.42, max: 0.76 + layerBoost * 0.40, weight: 0.84 },
        { min: 0.72, max: 0.98 + layerBoost * 0.48, weight: 0.14 },
        { min: 0.96, max: 1.16 + layerBoost * 0.52, weight: 0.02 }
      ], 0.52, 0.88);
    }
    if (band === "mid") {
      return weightedRangeSample([
        { min: 0.52, max: 0.90 + layerBoost * 0.52, weight: 0.42 },
        { min: 0.86, max: 1.20 + layerBoost * 0.58, weight: 0.38 },
        { min: 1.18, max: 1.54 + layerBoost * 0.64, weight: 0.20 }
      ], 0.64, 1.12);
    }
    if (band === "heavy") {
      return weightedRangeSample([
        { min: 0.58, max: 0.98 + layerBoost * 0.54, weight: 0.26 },
        { min: 0.96, max: 1.34 + layerBoost * 0.60, weight: 0.40 },
        { min: 1.30, max: 1.86 + layerBoost * 0.72, weight: 0.34 }
      ], 0.76, 1.34);
    }
    return weightedRangeSample([
      { min: 0.64, max: 1.06 + layerBoost * 0.56, weight: 0.18 },
      { min: 1.04, max: 1.52 + layerBoost * 0.66, weight: 0.34 },
      { min: 1.46, max: 2.10 + layerBoost * 0.84 + Math.min(0.20, overdrive * 0.03), weight: 0.48 }
    ], 0.92, 1.68);
  }

  function snowRadiusForIntensity(rMin, rMax, intensityMeta = currentPrecipitationIntensityCurve(), layer = "mid") {
    const band = String(intensityMeta?.band || "light");
    const overdrive = Math.max(0, Number(intensityMeta?.overdrive) || 0);
    const layerBias = layer === "near" ? 0.10 : layer === "mid" ? 0.03 : -0.03;
    const ranges = band === "trace" || band === "light"
      ? [
        { min: 0.04, max: 0.28, weight: 0.84 },
        { min: 0.24, max: 0.52, weight: 0.14 },
        { min: 0.50, max: 0.74, weight: 0.02 }
      ]
      : band === "mid"
        ? [
          { min: 0.08, max: 0.34, weight: 0.42 },
          { min: 0.30, max: 0.64, weight: 0.38 },
          { min: 0.58, max: 0.84, weight: 0.20 }
        ]
        : band === "heavy"
          ? [
            { min: 0.10, max: 0.36, weight: 0.24 },
            { min: 0.32, max: 0.70, weight: 0.40 },
            { min: 0.64, max: 0.96, weight: 0.36 }
          ]
          : [
            { min: 0.12, max: 0.40, weight: 0.18 },
            { min: 0.38, max: 0.76, weight: 0.34 },
            { min: 0.70, max: 1.00, weight: 0.48 }
          ];
    const rawRatio = weightedRangeSample(ranges, 0.18, 0.64);
    const ratio = clamp(rawRatio + layerBias + Math.min(0.08, overdrive * 0.012), 0, 1);
    return rMin + (Math.max(0.06, rMax - rMin) * ratio);
  }

  function buildParticles() {
    state.rainFar = [];
    state.rainMid = [];
    state.rainNear = [];
    state.snowFar = [];
    state.snowMid = [];
    state.snowNear = [];
    state.hailMid = [];
    state.hailNear = [];
    state.windTrails = [];
    state.splashes = [];

    const intensityMeta = currentPrecipitationIntensityCurve();
    const strength = precipitationStrengthFactor(intensityMeta);
    const windBoost = 1 + gustStrengthFactor() * 0.38;
    const liquidAmount = effectiveLiquidAmount();
    const snowAmount = effectiveSnowAmount();
    const mobileBudget = mobileParticleBudgetFactor();
    const stageBoost = intensityMeta.band === "extreme"
      ? 2.05
      : intensityMeta.band === "heavy"
        ? 1.22
        : intensityMeta.band === "mid"
          ? 0.82
          : intensityMeta.band === "light"
            ? 0.42
            : intensityMeta.band === "trace"
            ? 0.16
            : 0;
    const presenceBoost = isMobileWeatherShell()
      ? intensityMeta.band === "trace"
        ? 1.72
        : intensityMeta.band === "light"
          ? 1.42
          : intensityMeta.band === "mid"
            ? 1.14
            : 1.06
      : intensityMeta.band === "trace"
        ? 1.18
        : intensityMeta.band === "light"
          ? 1.10
          : 1;
    const chaosDensityBoost = 1 + precipitationChaosFactor() * 0.12;
    const countBoost = intensityMeta.band === "extreme"
      ? Math.min(4.8, (1 + stageBoost * 0.72 + intensityMeta.overdrive * 0.42) * chaosDensityBoost * presenceBoost * mobileBudget)
      : Math.min(4.0, (1 + stageBoost * 0.58 + intensityMeta.overdrive * 0.32) * (1 + precipitationChaosFactor() * 0.06) * presenceBoost * mobileBudget);
    const capBoost = intensityMeta.band === "extreme"
      ? Math.min(3.0, (1 + stageBoost * 0.34 + intensityMeta.overdrive * 0.22) * Math.min(1.22, presenceBoost) * Math.min(1, mobileBudget + 0.08))
      : Math.min(2.6, (1 + stageBoost * 0.28 + intensityMeta.overdrive * 0.18) * Math.min(1.18, presenceBoost) * Math.min(1, mobileBudget + 0.08));
    if (areWindTrailsActive() && !isLowPerformanceMobileWeatherMode()) {
      state.windTrails = makeWindLayer();
    }
    if (strength <= 0.02) return;

    if (state.activePhenomenon === "rain") {
      const isHeavyRain = state.activeSceneKey === "rain_heavy";
      const rainDensity = (isHeavyRain ? 1.24 : 0.92) * (1 + stageBoost * 0.08);
      const farCap = Math.round((isHeavyRain ? 140 : 88) * capBoost);
      const midCap = Math.round((isHeavyRain ? 166 : 104) * capBoost);
      const nearCap = Math.round((isHeavyRain ? 120 : 72) * capBoost);
      state.rainFar = makeRainLayer(Math.min(farCap, Math.round((isHeavyRain ? 78 : 46) * strength * rainDensity * countBoost)), isHeavyRain ? 5.4 : 4.2, isHeavyRain ? 8.8 : 6.4, isHeavyRain ? 14 : 10, isHeavyRain ? 24 : 17, 0.08, isHeavyRain ? 0.16 : 0.11, isHeavyRain ? 0.96 : 0.78, { layer: "far", intensityMeta });
      state.rainMid = makeRainLayer(Math.min(midCap, Math.round((isHeavyRain ? 96 : 60) * strength * rainDensity * countBoost)), isHeavyRain ? 7.2 : 5.8, isHeavyRain ? 11.4 : 8.6, isHeavyRain ? 18 : 13, isHeavyRain ? 31 : 22, isHeavyRain ? 0.14 : 0.10, isHeavyRain ? 0.24 : 0.18, isHeavyRain ? 1.18 : 0.94, { layer: "mid", intensityMeta });
      state.rainNear = makeRainLayer(Math.min(nearCap, Math.round((isHeavyRain ? 74 : 36) * strength * rainDensity * countBoost)), isHeavyRain ? 10.8 : 8.8, isHeavyRain ? 15.8 : 12.8, isHeavyRain ? 22 : 17, isHeavyRain ? 40 : 28, isHeavyRain ? 0.18 : 0.12, isHeavyRain ? 0.30 : 0.20, isHeavyRain ? 1.46 : 1.10, { layer: "near", intensityMeta });
    }
    if (state.activePhenomenon === "storm") {
      const stormDensity = 1.12 + stageBoost * 0.10;
      const farCap = Math.round(156 * capBoost);
      const midCap = Math.round(190 * capBoost);
      const nearCap = Math.round(132 * capBoost);
      state.rainFar = makeRainLayer(Math.min(farCap, Math.round(84 * strength * stormDensity * countBoost)), 6.2, 9.4, 14, 24, 0.08, 0.16, 0.96, { layer: "far", intensityMeta });
      state.rainMid = makeRainLayer(Math.min(midCap, Math.round(108 * strength * stormDensity * countBoost)), 8.2, 12.2, 18, 31, 0.14, 0.24, 1.18, { layer: "mid", intensityMeta });
      state.rainNear = makeRainLayer(Math.min(nearCap, Math.round(82 * strength * stormDensity * countBoost)), 11.2, 16.2, 22, 40, 0.18, 0.30, 1.46, { layer: "near", intensityMeta });
    }
    if (state.activeSceneKey === "hail") {
      const hailMidCap = Math.round(72 * capBoost);
      const hailNearCap = Math.round(48 * capBoost);
      state.rainFar = [];
      state.rainMid = [];
      state.rainNear = [];
      state.hailMid = makeHailLayer(Math.min(hailMidCap, Math.round(36 * strength * countBoost)), 7.8, 12.0, 1.1, 2.3, 0.28, 0.48);
      state.hailNear = makeHailLayer(Math.min(hailNearCap, Math.round(24 * strength * countBoost)), 10.6, 15.8, 1.6, 3.2, 0.34, 0.68);
    }
    if (state.activePhenomenon === "sleet") {
      const mixTotal = Math.max(0, state.activePrecipitationAmount, liquidAmount, snowAmount);
      const extremeMix = mixTotal >= 5.2;
      const mixDensity = 1 + stageBoost * 0.06;
      const rainFarCap = Math.round((extremeMix ? 86 : 64) * capBoost);
      const rainMidCap = Math.round((extremeMix ? 100 : 74) * capBoost);
      const rainNearCap = Math.round((extremeMix ? 64 : 46) * capBoost);
      const snowFarCap = Math.round((extremeMix ? 144 : 102) * capBoost);
      const snowMidCap = Math.round((extremeMix ? 122 : 84) * capBoost);
      const snowNearCap = Math.round((extremeMix ? 74 : 52) * capBoost);
      state.rainFar = makeRainLayer(Math.min(rainFarCap, Math.round((extremeMix ? 24 : 22) * strength * mixDensity * countBoost)), 4.2, extremeMix ? 7.2 : 6.6, 9, extremeMix ? 17 : 15, 0.05, extremeMix ? 0.12 : 0.10, extremeMix ? 0.74 : 0.68, { layer: "far", intensityMeta });
      state.rainMid = makeRainLayer(Math.min(rainMidCap, Math.round((extremeMix ? 30 : 26) * strength * mixDensity * countBoost)), 5.4, extremeMix ? 8.8 : 8.0, 11, extremeMix ? 21 : 18, 0.08, extremeMix ? 0.18 : 0.16, extremeMix ? 0.88 : 0.82, { layer: "mid", intensityMeta });
      state.rainNear = makeRainLayer(Math.min(rainNearCap, Math.round((extremeMix ? 19 : 16) * strength * mixDensity * countBoost)), 7.2, extremeMix ? 11.4 : 10.2, 14, extremeMix ? 26 : 22, 0.12, extremeMix ? 0.24 : 0.20, extremeMix ? 1.06 : 0.98, { layer: "near", intensityMeta });
      state.snowFar = makeSnowLayer(Math.min(snowFarCap, Math.round((extremeMix ? 56 : 46) * strength * mixDensity * countBoost)), 0.54, extremeMix ? 1.08 : 0.96, 0.72, extremeMix ? 1.7 : 1.4, 0.18, extremeMix ? 0.38 : 0.34, extremeMix ? 0.28 : 0.24, { layer: "far", intensityMeta });
      state.snowMid = makeSnowLayer(Math.min(snowMidCap, Math.round((extremeMix ? 46 : 38) * strength * mixDensity * countBoost)), 0.78, extremeMix ? 1.44 : 1.30, 1.0, extremeMix ? 2.4 : 2.0, 0.24, extremeMix ? 0.50 : 0.44, extremeMix ? 0.46 : 0.40, { layer: "mid", intensityMeta });
      state.snowNear = makeSnowLayer(Math.min(snowNearCap, Math.round((extremeMix ? 28 : 22) * strength * mixDensity * countBoost)), 0.96, extremeMix ? 1.70 : 1.52, 1.3, extremeMix ? 2.9 : 2.4, 0.30, extremeMix ? 0.60 : 0.54, extremeMix ? 0.64 : 0.56, { layer: "near", intensityMeta });
      if (extremeMix) {
        state.rainFar.push(...makeRainLayer(Math.round(14 + intensityMeta.overdrive * 7), 4.8, 7.4, 10, 17, 0.05, 0.10, 0.60, { layer: "far", intensityMeta }));
        state.rainMid.push(...makeRainLayer(Math.round(12 + intensityMeta.overdrive * 7), 5.8, 8.6, 12, 19, 0.06, 0.12, 0.72, { layer: "mid", intensityMeta }));
        state.snowFar.push(...makeSnowLayer(Math.round(28 + intensityMeta.overdrive * 12), 0.48, 0.92, 0.52, 1.08, 0.14, 0.26, 0.18, { layer: "far", intensityMeta }));
        state.snowMid.push(...makeSnowLayer(Math.round(22 + intensityMeta.overdrive * 10), 0.64, 1.10, 0.74, 1.46, 0.16, 0.30, 0.24, { layer: "mid", intensityMeta }));
      }
    }
    if (state.activePhenomenon === "snow") {
      const isDenseSnow = state.activeSceneKey === "snow_heavy";
      const extremeSnow = intensityMeta.band === "extreme";
      const snowAmountBoost = 1 + Math.min(extremeSnow ? 1.12 : 0.56, Math.max(0, snowAmount - 0.08) * (extremeSnow ? 0.10 : 0.06));
      const windDensityBoost = 1 + gustStrengthFactor() * (isDenseSnow ? 0.44 : 0.28) + windStrengthFactor() * 0.12;
      const snowDensity = (isDenseSnow ? 1.14 : 0.94) * windDensityBoost * snowAmountBoost * (1 + stageBoost * 0.16 + intensityMeta.overdrive * 0.10);
      const farCap = Math.round((isDenseSnow ? 188 : 112) * capBoost);
      const midCap = Math.round((isDenseSnow ? 172 : 96) * capBoost);
      const nearCap = Math.round((isDenseSnow ? 118 : 72) * capBoost);
      const farCount = Math.max(
        extremeSnow && isDenseSnow ? 128 : 0,
        Math.min(farCap, Math.round((isDenseSnow ? 74 : 44) * strength * snowDensity * countBoost))
      );
      const midCount = Math.max(
        extremeSnow && isDenseSnow ? 118 : 0,
        Math.min(midCap, Math.round((isDenseSnow ? 66 : 36) * strength * snowDensity * countBoost))
      );
      const nearCount = Math.max(
        extremeSnow && isDenseSnow ? 84 : 0,
        Math.min(nearCap, Math.round((isDenseSnow ? 46 : 24) * strength * snowDensity * windBoost * countBoost))
      );
      state.snowFar = makeSnowLayer(farCount, isDenseSnow ? 0.68 : 0.48, isDenseSnow ? 1.08 : 0.84, isDenseSnow ? 0.9 : 0.82, isDenseSnow ? 2.0 : 1.8, isDenseSnow ? 0.24 : 0.18, isDenseSnow ? 0.42 : 0.34, isDenseSnow ? 0.38 : 0.22, { layer: "far", intensityMeta });
      state.snowMid = makeSnowLayer(midCount, isDenseSnow ? 0.92 : 0.72, isDenseSnow ? 1.72 : 1.24, isDenseSnow ? 1.5 : 1.3, isDenseSnow ? 3.2 : 3.0, isDenseSnow ? 0.34 : 0.24, isDenseSnow ? 0.62 : 0.50, isDenseSnow ? 0.70 : 0.40, { layer: "mid", intensityMeta });
      state.snowNear = makeSnowLayer(nearCount, isDenseSnow ? 1.24 : 0.90, isDenseSnow ? 2.00 : 1.52, isDenseSnow ? (extremeSnow ? 1.9 : 2.4) : 2.0, isDenseSnow ? (extremeSnow ? 4.4 : 5.2) : 4.5, isDenseSnow ? 0.42 : 0.30, isDenseSnow ? (extremeSnow ? 0.76 : 0.82) : 0.60, isDenseSnow ? 0.92 : 0.66, { layer: "near", intensityMeta });
      if (extremeSnow && isDenseSnow) {
        state.snowFar.push(...makeSnowLayer(Math.round(76 + intensityMeta.overdrive * 22), 0.58, 0.92, 0.52, 1.12, 0.14, 0.26, 0.20, { layer: "far", intensityMeta }));
        state.snowMid.push(...makeSnowLayer(Math.round(58 + intensityMeta.overdrive * 18), 0.74, 1.18, 0.82, 1.56, 0.18, 0.34, 0.28, { layer: "mid", intensityMeta }));
        state.snowNear.push(...makeSnowLayer(Math.round(20 + intensityMeta.overdrive * 9), 0.94, 1.36, 1.10, 2.10, 0.22, 0.42, 0.40, { layer: "near", intensityMeta }));
      }
    }
  }

  function makeRainLayer(count, speedMin, speedMax, lenMin, lenMax, alphaMin, alphaMax, width, options = {}) {
    const items = [];
    const windStrength = gustStrengthFactor();
    const directionalFactor = precipitationDirectionalFactor();
    const chaosFactor = precipitationChaosFactor();
    const windResponse = precipitationWindResponse();
    const intensityMeta = options?.intensityMeta || currentPrecipitationIntensityCurve();
    const layer = options?.layer || "mid";
    const rainPhenomenon = activeRainParticlePhenomenonKey();
    const mobileRainLike = isMobileWeatherShell()
      && (rainPhenomenon === "rain" || rainPhenomenon === "storm" || rainPhenomenon === "sleet");
    const lateralFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.24 : rainPhenomenon === "sleet" ? 0.20 : 0.22)
      : 1;
    const speedWindBoost = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.058 : rainPhenomenon === "sleet" ? 0.044 : 0.050)
      : 0.025;
    const lengthWindBoost = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.010 : rainPhenomenon === "sleet" ? 0.008 : 0.009)
      : 0.05;
    const widthWindBoost = mobileRainLike ? 0.10 : 0.22;
    const curveFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.20 : rainPhenomenon === "sleet" ? 0.16 : 0.18)
      : 1;
    const visibilityBias = isMobileWeatherShell()
      ? intensityMeta.band === "trace"
        ? 1.34
        : intensityMeta.band === "light"
          ? 1.20
          : 1.08
      : 1;
    for (let i = 0; i < count; i += 1) {
      const emitterSeed = createParticleEmitterSeed();
      const emitter = pickSeededCloudEmitter(emitterSeed);
      const spawnOffsetX = (Math.random() - 0.5) * 24;
      const spawnOffsetY = Math.random() * 26;
      const baseDrift = directionalFactor <= 0.01
        ? 0
        : (state.activeWindSpeed * (0.10 + windStrength * 0.08) + Math.random() * (0.9 + windStrength * 1.2)) * directionalFactor;
      const driftSeed = (Math.random() * 2 - 1) * (0.58 + chaosFactor * 0.34);
      const drop = {
        x: emitter.x + spawnOffsetX,
        y: emitter.y + spawnOffsetY,
        speed: speedMin + Math.random() * (speedMax - speedMin) + state.activeWindSpeed * speedWindBoost,
        len: lenMin + Math.random() * (lenMax - lenMin) + state.activeWindSpeed * lengthWindBoost,
        alpha: clamp((alphaMin + Math.random() * (alphaMax - alphaMin)) * visibilityBias, 0, 0.98),
        drift: directionalFactor <= 0.01
          ? 0
          : (driftSeed * baseDrift + (Math.random() - 0.5) * (0.42 + windStrength * 0.24) * chaosFactor) * lateralFactor,
        width: width * (0.9 + windStrength * widthWindBoost),
        phase: Math.random() * Math.PI * 2,
        sizeBias: rainSizeBiasForIntensity(intensityMeta, layer),
        curve: (Math.random() - 0.5) * (1.4 + windStrength * 2.2) * windResponse * curveFactor,
        spawnOffsetX,
        spawnOffsetY,
        ...emitterSeed
      };
      primeRainDrop(drop);
      items.push(drop);
    }
    return items;
  }

  function makeSnowLayer(count, speedMin, speedMax, rMin, rMax, alphaMin, alphaMax, swayAmp, options = {}) {
    const items = [];
    const windStrength = gustStrengthFactor();
    const directionalFactor = precipitationDirectionalFactor();
    const chaosFactor = precipitationChaosFactor();
    const intensityMeta = options?.intensityMeta || currentPrecipitationIntensityCurve();
    const layer = options?.layer || "mid";
    const wrapMargin = 44 + windStrength * 92;
    const visibilityBias = isMobileWeatherShell()
      ? intensityMeta.band === "trace"
        ? 1.30
        : intensityMeta.band === "light"
          ? 1.18
          : 1.08
      : 1;
    for (let i = 0; i < count; i += 1) {
      const emitterSeed = createParticleEmitterSeed();
      const emitter = pickSeededCloudEmitter(emitterSeed);
      const spawnOffsetX = (Math.random() - 0.5) * 34;
      const spawnOffsetY = Math.random() * 22;
      const baseDrift = directionalFactor <= 0.01
        ? 0
        : (state.activeWindSpeed * 0.035 + Math.random() * (0.42 + windStrength * 0.46)) * directionalFactor;
      const driftSeed = (Math.random() * 2 - 1) * (0.56 + chaosFactor * 0.30);
      const flake = {
        x: emitter.x + spawnOffsetX,
        y: emitter.y + spawnOffsetY,
        speed: speedMin + Math.random() * (speedMax - speedMin) + state.activeWindSpeed * 0.01,
        r: snowRadiusForIntensity(rMin, rMax, intensityMeta, layer),
        alpha: clamp((alphaMin + Math.random() * (alphaMax - alphaMin)) * visibilityBias, 0, 0.98),
        drift: directionalFactor <= 0.01
          ? 0
          : driftSeed * baseDrift + (Math.random() - 0.5) * (0.28 + windStrength * 0.18) * chaosFactor,
        sway: Math.random() * Math.PI * 2,
        swayAmp: swayAmp + windStrength * 1.8 * Math.max(0.04, chaosFactor),
        wrapMargin,
        spawnOffsetX,
        spawnOffsetY,
        ...emitterSeed
      };
      primeSnowFlake(flake);
      items.push(flake);
    }
    return items;
  }

  function makeHailLayer(count, speedMin, speedMax, rMin, rMax, alphaMin, alphaMax) {
    const items = [];
    const windStrength = gustStrengthFactor();
    const directionalFactor = precipitationDirectionalFactor();
    const chaosFactor = precipitationChaosFactor();
    for (let i = 0; i < count; i += 1) {
      const emitterSeed = createParticleEmitterSeed();
      const emitter = pickSeededCloudEmitter(emitterSeed);
      const spawnOffsetX = (Math.random() - 0.5) * 28;
      const spawnOffsetY = Math.random() * 18;
      const baseDrift = directionalFactor <= 0.01
        ? 0
        : (state.activeWindSpeed * 0.04 + Math.random() * (0.4 + windStrength * 0.5)) * directionalFactor;
      const driftSeed = (Math.random() * 2 - 1) * (0.56 + chaosFactor * 0.34);
      const stone = {
        x: emitter.x + spawnOffsetX,
        y: emitter.y + spawnOffsetY,
        speed: speedMin + Math.random() * (speedMax - speedMin) + windStrength * 1.2,
        r: rMin + Math.random() * (rMax - rMin),
        alpha: alphaMin + Math.random() * (alphaMax - alphaMin),
        drift: directionalFactor <= 0.01
          ? 0
          : driftSeed * baseDrift + (Math.random() - 0.5) * (0.26 + windStrength * 0.18) * chaosFactor,
        phase: Math.random() * Math.PI * 2,
        shine: 0.38 + Math.random() * 0.48,
        bounceCount: 0,
        bounceEnabled: Math.random() < 0.5,
        bounceLiftFactor: 0.62 + Math.random() * 0.76,
        bounceSpeedFactor: 0.68 + Math.random() * 0.56,
        bounceDx: 0,
        bounceVy: null,
        spawnOffsetX,
        spawnOffsetY,
        ...emitterSeed
      };
      primeHailStone(stone);
      items.push(stone);
    }
    return items;
  }

  function makeWindLayer() {
    const items = [];
    const strength = gustStrengthFactor();
    const gustDelta = Math.max(0, state.activeWindGustSpeed - state.activeWindSpeed);
    const mobileBudget = mobileParticleBudgetFactor();
    const count = state.activePhenomenon === "snow"
      ? Math.max(2, Math.round((3 + strength * 5 + gustDelta / 10) * mobileBudget))
      : Math.max(5, Math.round((8 + strength * 14 + gustDelta / 8) * mobileBudget));
    for (let i = 0; i < count; i += 1) {
      items.push({
        x: Math.random() * state.cssWidth,
        y: 34 + Math.random() * Math.max(90, state.cssHeight * 0.80),
        len: 28 + Math.random() * 44 + strength * 40 + gustDelta * 0.5,
        speed: 1.6 + Math.random() * 3.4 + strength * 5.2 + gustDelta * 0.08,
        alpha: (state.activePhenomenon === "snow" ? 0.008 : 0.02) + Math.random() * (state.activePhenomenon === "snow" ? 0.018 : 0.04) + strength * (state.activePhenomenon === "snow" ? 0.02 : 0.05),
        thickness: 0.7 + Math.random() * 1.5,
        curve: Math.random() * Math.PI * 2,
        lift: 8 + Math.random() * 18
      });
    }
    return items;
  }

  function windDriftAt(x, y, time, phase = 0) {
    const strength = gustStrengthFactor();
    const directionalFactor = precipitationDirectionalFactor();
    const chaosFactor = precipitationChaosFactor();
    const phenomenon = windDrivenPhenomenonKey();
    const driftLimit = windParticleDriftLimit(phenomenon);
    if (directionalFactor <= 0.01 && chaosFactor <= 0.01) return 0;
    const lowerFactor = clamp((Number(y) || 0) / Math.max(1, state.cssHeight || 1), 0.16, 1);
    const basePush = Math.min(
      driftLimit * 0.64,
      state.activeWindSpeed * (phenomenon === "snow" ? 0.045 : phenomenon === "hail" ? 0.055 : 0.062) * directionalFactor
    );
    const laneBias = precipitationLaneBiasAt(x, y, phase);
    const chaoticBias = chaoticWindBiasAt(x, y, time, phase);
    const gustWave = Math.sin(time * (0.92 + strength * 1.2) + y * 0.013 + phase)
      * (0.8 + strength * (phenomenon === "storm" ? 2.2 : phenomenon === "snow" ? 1.6 : 1.9))
      * chaosFactor;
    const eddy = Math.sin(time * 2.2 - x * 0.004 + phase * 1.7)
      * (0.32 + strength * (phenomenon === "snow" ? 0.84 : 1.02))
      * chaosFactor;
    const directionalPush = basePush * clamp(laneBias + chaoticBias * (0.08 + chaosFactor * 0.10), -1, 1) * (0.56 + lowerFactor * 0.22);
    const crossTurbulence = (gustWave * (0.20 + lowerFactor * 0.18) + eddy * (0.16 + lowerFactor * 0.14));
    return clamp(directionalPush + crossTurbulence, -driftLimit * 0.88, driftLimit * 0.88);
  }

  function addSplash(x, y, alpha) {
    state.splashes.push({ x, y, life: 1, alpha, r: 1.5 + Math.random() * 2.2 });
    const maxSplashes = isMobileWeatherShell() ? 56 : 120;
    if (state.splashes.length > maxSplashes) state.splashes.shift();
  }

  function stopAnimationLoop() {
    if (!state.rafId) return;
    window.cancelAnimationFrame(state.rafId);
    state.rafId = 0;
  }

  function ensureAnimation(options = {}) {
    const preserveTimeline = Boolean(options?.preserveTimeline);
    if (state.paused) {
      stopAnimationLoop();
      return;
    }
    if (shouldUseStaticMobileWeatherScene()) {
      stopAnimationLoop();
      const now = performance.now();
      if (!preserveTimeline || !state.startTs) {
        state.startTs = now;
      }
      state.lastFrameTs = 0;
      state.lastSkyDrawTs = 0;
      state.lastTreeDrawTs = 0;
      state.frameScale = 1;
      renderFrame(now);
      return;
    }
    if (state.rafId) return;
    if (!preserveTimeline || !state.startTs) {
      state.startTs = performance.now();
    }
    state.lastFrameTs = 0;
    state.lastSkyDrawTs = 0;
    state.lastTreeDrawTs = 0;
    state.frameScale = 1;
    state.forceSkyRedraw = true;
    state.forceTreeRedraw = true;
    const step = (ts) => {
      state.rafId = window.requestAnimationFrame(step);
      const frameInterval = animationFrameIntervalMs();
      if (frameInterval > 0 && state.lastFrameTs && (ts - state.lastFrameTs) < frameInterval) return;
      renderFrame(ts);
    };
    state.rafId = window.requestAnimationFrame(step);
  }

  function pauseAnimation() {
    if (state.paused) return;
    state.paused = true;
    state.pausedAt = performance.now();
    stopAnimationLoop();
  }

  function resumeAnimation() {
    if (!state.paused) return;
    const now = performance.now();
    const pauseDelta = state.pausedAt ? Math.max(0, now - state.pausedAt) : 0;
    state.paused = false;
    state.pausedAt = 0;
    if (state.startTs) {
      state.startTs += pauseDelta;
    } else {
      state.startTs = now;
    }
    state.lastFrameTs = 0;
    state.lastSkyDrawTs = 0;
    state.lastTreeDrawTs = 0;
    state.frameScale = 1;
    state.forceSkyRedraw = true;
    state.forceTreeRedraw = true;
    if (!state.root) return;
    ensureAnimation({ preserveTimeline: true });
  }

  function renderFrame(ts) {
    const elapsedSeconds = Math.max(0, (ts - state.startTs) / 1000);
    const deltaMs = state.lastFrameTs ? clamp(ts - state.lastFrameTs, 8, 40) : (1000 / 60);
    state.lastFrameTs = ts;
    state.frameScale = deltaMs / (1000 / 60);
    state.time = elapsedSeconds;
    maybeLightning();
    if (state.forceSkyRedraw || !state.lastSkyDrawTs || (ts - state.lastSkyDrawTs) >= skyRedrawIntervalMs() || state.lightningValue > 0.02) {
      drawSky(elapsedSeconds);
      state.lastSkyDrawTs = ts;
      state.forceSkyRedraw = false;
    }
    if (isTreeEnabled()) {
      if (state.forceTreeRedraw || !state.lastTreeDrawTs || (ts - state.lastTreeDrawTs) >= treeRedrawIntervalMs()) {
        drawTree(elapsedSeconds);
        state.lastTreeDrawTs = ts;
        state.forceTreeRedraw = false;
      }
    } else {
      clearTreeLayer();
      state.lastTreeDrawTs = ts;
      state.forceTreeRedraw = false;
    }
    animatePrecip(elapsedSeconds);
  }

  function drawSky(time) {
    const ctx = state.skyCtx;
    if (!ctx) return;
    const w = state.cssWidth;
    const h = skyLayerHeight();
    const fogDensity = fogDensityFactor();
    const warmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const mobileOvercastBlanket = isMobileWeatherShell() && state.activeCloudPreset === "overcast";
    const mobileCloudBlanket = isMobileWeatherShell() && (state.activeCloudPreset === "cloudy" || state.activeCloudPreset === "overcast");
    ctx.clearRect(0, 0, w, h);

    const palette = getSkyPalette();
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, palette.top);
    base.addColorStop(0.48, palette.mid);
    base.addColorStop(1, palette.bottom);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    const horizon = ctx.createLinearGradient(0, h * 0.44, 0, h);
    horizon.addColorStop(0, "rgba(255,255,255,0)");
    horizon.addColorStop(1, palette.haze);
    ctx.save();
    ctx.globalAlpha = clamp(
      state.activePhenomenon === "fog"
        ? 0.96
        : warmEdge
          ? 0.04 + fogDensity * 0.08
          : 0.01 + fogDensity * 0.04,
      0,
      1
    );
    ctx.fillStyle = horizon;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    if (mobileOvercastBlanket) {
      const overcastWash = ctx.createLinearGradient(0, 0, 0, h);
      if (state.activePeriod === "night") {
        overcastWash.addColorStop(0, "rgba(24,32,44,0.20)");
        overcastWash.addColorStop(0.42, "rgba(30,40,54,0.16)");
        overcastWash.addColorStop(1, "rgba(46,58,72,0.14)");
      } else if (warmEdge && state.activePhase === "sunset") {
        overcastWash.addColorStop(0, "rgba(36,22,64,0.18)");
        overcastWash.addColorStop(0.44, "rgba(84,38,94,0.16)");
        overcastWash.addColorStop(1, "rgba(126,74,92,0.12)");
      } else if (warmEdge) {
        overcastWash.addColorStop(0, "rgba(74,78,116,0.18)");
        overcastWash.addColorStop(0.46, "rgba(112,108,138,0.15)");
        overcastWash.addColorStop(1, "rgba(150,138,142,0.11)");
      } else {
        overcastWash.addColorStop(0, "rgba(116,126,140,0.32)");
        overcastWash.addColorStop(0.46, "rgba(144,154,168,0.24)");
        overcastWash.addColorStop(1, "rgba(180,190,200,0.18)");
      }
      ctx.save();
      ctx.fillStyle = overcastWash;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    drawAtmosphereFilters(ctx, palette);
    drawGlow(ctx, palette);
    drawWarmEdgeRays(ctx);
    drawWarmEdgeMountains(ctx);
    drawCloudBands(ctx, time, palette, "back");
    if (mobileCloudBlanket) {
      const coverFromData = cloudCoverageRatio();
      const precipitationDarkness = state.activePhenomenon === "storm" ? 0.48 : state.activePhenomenon === "rain" ? 0.32 : state.activePhenomenon === "sleet" ? 0.28 : state.activePhenomenon === "snow" ? 0.22 : 0;
      const cloudDarkness = (state.activeCloudPreset === "overcast" ? 0.72 : state.activeCloudPreset === "cloudy" ? 0.46 : state.activeCloudPreset === "partly" ? 0.18 : 0.06) + precipitationDarkness;
      drawCloudVeil(ctx, time, coverFromData, cloudDarkness);
    }
    drawStars(ctx, time);
    if ((warmEdgeDramaFactor() > 0.34 || mobileCloudBlanket) && state.activeCloudPreset !== "clear") {
      drawCloudBands(ctx, time, palette, "front");
    }
    if (state.activePhenomenon === "fog") drawFog(ctx);
    if (state.activeElectricityLevel > 0.04) drawLightningGlow(ctx);
  }

  function getSkyPalette() {
    const isNight = state.activePeriod === "night";
    const preset = state.activeCloudPreset;
    const phase = state.activePhase;
    const temp = Number.isFinite(state.activeApparentTemperature) ? state.activeApparentTemperature : state.activeTemperature;
    const isHot = Number.isFinite(temp) && temp >= 28;
    const isCold = Number.isFinite(temp) && temp <= 2;
    if (isNight) {
      if (preset === "overcast") return { top: "#0a0f17", mid: "#1f2734", bottom: "#4b5663", haze: "rgba(206,214,224,0.06)", glow: "rgba(228,234,244,0.05)" };
      if (preset === "cloudy") return { top: "#0c1627", mid: "#24364d", bottom: "#617289", haze: "rgba(210,220,236,0.08)", glow: "rgba(224,232,246,0.10)" };
      if (preset === "partly") {
        if (isCold) return { top: "#07152a", mid: "#1d3a61", bottom: "#6284a5", haze: "rgba(214,232,255,0.08)", glow: "rgba(226,238,255,0.18)" };
        return { top: "#08162b", mid: "#1b395e", bottom: "#5a7c9f", haze: "rgba(208,225,248,0.06)", glow: "rgba(226,236,255,0.18)" };
      }
      if (preset === "clear") {
        if (isCold) return { top: "#04111f", mid: "#15365d", bottom: "#6a8fb4", haze: "rgba(210,232,255,0.06)", glow: "rgba(236,244,255,0.24)" };
        if (isHot) return { top: "#06111f", mid: "#143152", bottom: "#5c7da0", haze: "rgba(212,228,255,0.04)", glow: "rgba(255,231,188,0.18)" };
        return { top: "#05111f", mid: "#133152", bottom: "#5f82a6", haze: "rgba(194,220,255,0.04)", glow: "rgba(230,240,255,0.22)" };
      }
      if (Number.isFinite(temp) && temp <= -3) return { top: "#0a1528", mid: "#1c3557", bottom: "#547190", haze: "rgba(214,232,255,0.08)", glow: "rgba(218,230,255,0.16)" };
      return { top: "#0a1527", mid: "#1d3453", bottom: "#557190", haze: "rgba(208,225,255,0.06)", glow: "rgba(213,225,255,0.14)" };
    }
    if (phase === "dawn") {
      if (preset === "overcast") return { top: "#4b5678", mid: "#b98b76", bottom: "#d7c0a2", haze: "rgba(214,184,156,0.28)", glow: "rgba(255,166,98,0.26)" };
      if (preset === "cloudy") return { top: "#5c73a6", mid: "#d49a76", bottom: "#efcfaa", haze: "rgba(236,190,140,0.34)", glow: "rgba(255,178,96,0.34)" };
      return { top: "#6e8fe3", mid: "#f0b05c", bottom: "#ffe1a2", haze: "rgba(255,206,130,0.38)", glow: "rgba(255,170,76,0.48)" };
    }
    if (phase === "sunset") {
      if (preset === "overcast") return { top: "#251f4c", mid: "#713566", bottom: "#bf6d64", haze: "rgba(214,122,126,0.28)", glow: "rgba(255,90,152,0.30)" };
      if (preset === "cloudy") return { top: "#2c2758", mid: "#84396f", bottom: "#df7558", haze: "rgba(248,126,108,0.34)", glow: "rgba(255,92,162,0.38)" };
      return { top: "#30295d", mid: "#962f78", bottom: "#ff8b52", haze: "rgba(255,146,112,0.40)", glow: "rgba(255,86,152,0.52)" };
    }
    if (preset === "overcast") return { top: "#3b4651", mid: "#677681", bottom: "#bbc4cc", haze: "rgba(210,217,223,0.22)", glow: "rgba(228,232,236,0.05)" };
    if (preset === "cloudy") return { top: "#486783", mid: "#7f98ab", bottom: "#c8d5de", haze: "rgba(224,232,238,0.16)", glow: "rgba(244,222,176,0.08)" };
    if (preset === "partly") {
      if (isHot) return { top: "#3d8fe0", mid: "#8fc0ea", bottom: "#dde9ee", haze: "rgba(255,240,206,0.12)", glow: "rgba(255,210,126,0.26)" };
      if (isCold) return { top: "#4a97e0", mid: "#9bc4e7", bottom: "#e3edf3", haze: "rgba(238,247,255,0.12)", glow: "rgba(255,235,194,0.18)" };
      return { top: "#3f8fdf", mid: "#88bce6", bottom: "#dde8ef", haze: "rgba(255,255,255,0.10)", glow: "rgba(255,223,150,0.20)" };
    }
    if (preset === "clear") {
      if (isHot) return { top: "#2f87dc", mid: "#73b8eb", bottom: "#dceaf1", haze: "rgba(255,237,196,0.10)", glow: "rgba(255,206,120,0.28)" };
      if (isCold) return { top: "#3d93e3", mid: "#7ebce7", bottom: "#e0edf3", haze: "rgba(236,247,255,0.10)", glow: "rgba(255,240,205,0.18)" };
      return { top: "#327fd6", mid: "#6fb1e3", bottom: "#dce9f1", haze: "rgba(255,255,255,0.06)", glow: "rgba(255,219,138,0.24)" };
    }
    if (isHot) return { top: "#6fa8da", mid: "#b7cedf", bottom: "#e9edf0", haze: "rgba(255,233,191,0.12)", glow: "rgba(255,194,118,0.14)" };
    if (isCold) return { top: "#6697c8", mid: "#b1cada", bottom: "#e3ebf0", haze: "rgba(232,244,255,0.14)", glow: "rgba(255,233,185,0.12)" };
    return { top: "#6b9ccf", mid: "#b2cade", bottom: "#e2ebf0", haze: "rgba(255,255,255,0.14)", glow: "rgba(255,226,170,0.12)" };
  }

  function drawAtmosphereFilters(ctx, palette) {
    const w = state.cssWidth;
    const h = skyLayerHeight();
    const mobileAtmosphereDamp = isMobileWeatherShell() ? 0.16 : 1;
    const temp = Number.isFinite(state.activeApparentTemperature) ? state.activeApparentTemperature : state.activeTemperature;
    const humidity = Number.isFinite(state.activeHumidity) ? state.activeHumidity : null;
    const visibility = Number.isFinite(state.activeVisibility) ? state.activeVisibility : null;
    const fogDensity = fogDensityFactor();
    const sunPlacement = sunPlacementMetrics();

    if (state.activePhase === "dawn" || state.activePhase === "sunset") {
      const drama = warmEdgeDramaFactor();
      const sunset = state.activePhase === "sunset";
      const warmWash = ctx.createLinearGradient(0, 0, 0, h);
      warmWash.addColorStop(0, sunset
        ? `rgba(42,30,80,${(0.18 + drama * 0.08).toFixed(2)})`
        : `rgba(92,112,170,${(0.10 + drama * 0.04).toFixed(2)})`);
      warmWash.addColorStop(0.20, sunset
        ? `rgba(90,52,118,${(0.16 + drama * 0.08).toFixed(2)})`
        : `rgba(136,142,188,${(0.08 + drama * 0.04).toFixed(2)})`);
      warmWash.addColorStop(0.46, sunset
        ? `rgba(206,86,164,${(0.14 + drama * 0.08).toFixed(2)})`
        : `rgba(255,176,110,${(0.10 + drama * 0.06).toFixed(2)})`);
      warmWash.addColorStop(0.78, sunset
        ? `rgba(255,148,92,${(0.14 + drama * 0.08).toFixed(2)})`
        : `rgba(255,206,132,${(0.14 + drama * 0.06).toFixed(2)})`);
      warmWash.addColorStop(1, sunset
        ? `rgba(255,192,142,${(0.08 + drama * 0.04).toFixed(2)})`
        : `rgba(255,232,188,${(0.10 + drama * 0.04).toFixed(2)})`);
      ctx.fillStyle = warmWash;
      ctx.fillRect(0, 0, w, h);

      const horizonFireX = sunPlacement.centerX;
      const horizonFireY = Math.min(h * 0.90, sunPlacement.centerY + (state.activePhase === "sunset" ? 26 : 18));
      const horizonFire = ctx.createRadialGradient(horizonFireX, horizonFireY, 0, horizonFireX, horizonFireY, h * (sunset ? 0.82 : 0.88));
      horizonFire.addColorStop(0, sunset
        ? `rgba(255,170,112,${(0.26 + drama * 0.12).toFixed(2)})`
        : `rgba(255,218,132,${(0.22 + drama * 0.10).toFixed(2)})`);
      horizonFire.addColorStop(0.22, sunset
        ? `rgba(255,118,166,${(0.22 + drama * 0.10).toFixed(2)})`
        : `rgba(255,176,104,${(0.16 + drama * 0.08).toFixed(2)})`);
      horizonFire.addColorStop(0.52, sunset
        ? `rgba(214,82,154,${(0.12 + drama * 0.08).toFixed(2)})`
        : `rgba(255,196,126,${(0.10 + drama * 0.06).toFixed(2)})`);
      horizonFire.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = horizonFire;
      ctx.fillRect(0, 0, w, h);

      const contrastVeil = ctx.createLinearGradient(0, 0, 0, h);
      contrastVeil.addColorStop(0, sunset
        ? `rgba(34,24,64,${(0.18 + drama * 0.10).toFixed(2)})`
        : `rgba(72,88,146,${(0.10 + drama * 0.05).toFixed(2)})`);
      contrastVeil.addColorStop(0.28, sunset
        ? `rgba(88,48,116,${(0.10 + drama * 0.06).toFixed(2)})`
        : `rgba(146,122,172,${(0.06 + drama * 0.04).toFixed(2)})`);
      contrastVeil.addColorStop(0.58, sunset
        ? `rgba(132,72,128,${(0.05 + drama * 0.03).toFixed(2)})`
        : `rgba(255,176,104,${(0.04 + drama * 0.03).toFixed(2)})`);
      contrastVeil.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = contrastVeil;
      ctx.fillRect(0, 0, w, h);
    }

    if (Number.isFinite(temp) && temp >= 28 && state.activePeriod !== "night") {
      const heat = ctx.createRadialGradient(w * 0.5, h * 0.78, 0, w * 0.5, h * 0.78, h * 0.52);
      heat.addColorStop(0, `rgba(255,202,132,${(0.16 * mobileAtmosphereDamp).toFixed(2)})`);
      heat.addColorStop(0.5, `rgba(255,220,172,${(0.08 * mobileAtmosphereDamp).toFixed(2)})`);
      heat.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = heat;
      ctx.fillRect(0, h * 0.42, w, h * 0.58);

      const shimmer = ctx.createLinearGradient(0, h * 0.26, 0, h * 0.76);
      shimmer.addColorStop(0, "rgba(255,255,255,0)");
      shimmer.addColorStop(0.5, `rgba(255,213,156,${(0.08 * mobileAtmosphereDamp).toFixed(2)})`);
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, h * 0.26, w, h * 0.50);
    }

    if (Number.isFinite(temp) && temp <= 0) {
      const cold = ctx.createLinearGradient(0, 0, 0, h);
      cold.addColorStop(0, `rgba(208,230,255,${(0.08 * mobileAtmosphereDamp).toFixed(2)})`);
      cold.addColorStop(1, `rgba(240,248,255,${(0.12 * mobileAtmosphereDamp).toFixed(2)})`);
      ctx.fillStyle = cold;
      ctx.fillRect(0, 0, w, h);

      if (temp <= -6) {
        const frost = ctx.createLinearGradient(0, 0, 0, h * 0.42);
        frost.addColorStop(0, `rgba(232,244,255,${(0.14 * mobileAtmosphereDamp).toFixed(2)})`);
        frost.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = frost;
        ctx.fillRect(0, 0, w, h * 0.42);
      }
    }

    const denseFogScene = state.activePhenomenon === "fog";
    if (denseFogScene) {
      const mist = ctx.createLinearGradient(0, h * 0.22, 0, h);
      mist.addColorStop(0, "rgba(255,255,255,0)");
      mist.addColorStop(0.56, `rgba(245,248,250,${(0.12 + fogDensity * 0.14).toFixed(2)})`);
      mist.addColorStop(1, `rgba(239,244,248,${(0.24 + fogDensity * 0.24).toFixed(2)})`);
      ctx.fillStyle = mist;
      ctx.fillRect(0, h * 0.22, w, h * 0.78);
    }
  }

  function drawGlow(ctx, palette) {
    const w = state.cssWidth;
    const warmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const sunPlacement = warmEdge ? sunPlacementMetrics() : null;
    const preset = state.activeCloudPreset;
    const mobileNightGlowDamp = isMobileWeatherShell() && state.activePeriod === "night"
      ? (preset === "overcast" ? 0.05 : preset === "cloudy" ? 0.09 : 0.14)
      : 1;
    const cloudCover = cloudCoverageRatio();
    const precipitationMask = state.activePhenomenon === "storm"
      ? 0.34
      : state.activePhenomenon === "rain"
        ? 0.20
        : state.activePhenomenon === "sleet"
          ? 0.18
          : state.activePhenomenon === "snow"
            ? 0.14
            : 0;
    const glowX = state.activePeriod === "night"
      ? w * (preset === "clear" ? 0.68 : 0.74)
      : (warmEdge && sunPlacement ? sunPlacement.centerX : (state.activePhase === "sunset" ? w * 0.74 : w * 0.24));
    const glowY = state.activePeriod === "night"
      ? (preset === "clear" ? 118 : 108)
      : (warmEdge && sunPlacement ? sunPlacement.centerY + 4 : 126);
    const radius = state.activePeriod === "night"
      ? (preset === "clear" ? 88 : 68)
      : (warmEdge ? 214 : preset === "clear" ? 184 : preset === "partly" ? 160 : 132);
    const effectiveRadius = radius * (state.activePeriod === "night"
      ? (preset === "overcast" ? 0.82 : preset === "cloudy" ? 0.92 : 1)
      : (preset === "overcast" ? 0.74 : preset === "cloudy" ? 0.84 : preset === "partly" ? 0.94 : 1)) * mobileNightGlowDamp;
    const midAlpha = Math.max(
      0.02,
      (state.activePeriod === "night" ? 0.028 : (warmEdge ? 0.18 : 0.12)) - cloudCover * (warmEdge ? 0.038 : 0.05) - precipitationMask * 0.10
    ) * (state.activePeriod === "night" ? mobileNightGlowDamp : 1);
    if (state.activePeriod === "night" && midAlpha <= 0.018) return;
    const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, effectiveRadius);
    grad.addColorStop(0, palette.glow);
    grad.addColorStop(0.26, warmEdge && state.activePeriod !== "night"
      ? (state.activePhase === "sunset" ? `rgba(255,146,116,${Math.min(0.34, midAlpha + 0.10).toFixed(2)})` : `rgba(255,190,146,${Math.min(0.30, midAlpha + 0.08).toFixed(2)})`)
      : (state.activePeriod === "night" ? `rgba(196,214,255,${Math.min(0.08, midAlpha + 0.015).toFixed(2)})` : `rgba(255,225,150,${Math.min(0.20, midAlpha + 0.04).toFixed(2)})`));
    grad.addColorStop(0.45, state.activePeriod === "night"
      ? `rgba(196,214,255,${midAlpha.toFixed(2)})`
      : (warmEdge
        ? (state.activePhase === "sunset" ? `rgba(255,186,142,${midAlpha.toFixed(2)})` : `rgba(255,214,164,${midAlpha.toFixed(2)})`)
        : `rgba(255,225,150,${midAlpha.toFixed(2)})`));
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(glowX, glowY, effectiveRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawWarmEdgeRays(ctx) {
    if (state.activePeriod === "night" || (state.activePhase !== "dawn" && state.activePhase !== "sunset")) return;
    const drama = warmEdgeDramaFactor();
    if (drama <= 0.08) return;
    const h = skyLayerHeight();
    const w = state.cssWidth;
    const sunPlacement = sunPlacementMetrics();
    const originX = sunPlacement.centerX;
    const originY = Math.min(h * 0.92, sunPlacement.centerY + (state.activePhase === "sunset" ? 20 : 14));
    const rayColor = state.activePhase === "sunset" ? [255, 132, 194] : [255, 214, 146];
    const coreColor = state.activePhase === "sunset" ? [255, 182, 122] : [255, 228, 158];
    const rays = state.activePhase === "sunset"
      ? [
          { angle: -1.18, spread: 0.22, length: 0.98, alpha: 1.00 },
          { angle: -0.98, spread: 0.18, length: 0.90, alpha: 0.84 },
          { angle: -0.76, spread: 0.16, length: 0.78, alpha: 0.66 },
          { angle: -1.38, spread: 0.16, length: 0.84, alpha: 0.60 },
          { angle: -1.54, spread: 0.11, length: 0.70, alpha: 0.42 }
        ]
      : [
          { angle: -1.56, spread: 0.11, length: 0.86, alpha: 0.64 },
          { angle: -1.32, spread: 0.18, length: 1.02, alpha: 1.00 },
          { angle: -1.12, spread: 0.14, length: 0.94, alpha: 0.84 },
          { angle: -0.92, spread: 0.12, length: 0.82, alpha: 0.58 },
          { angle: -1.74, spread: 0.15, length: 0.74, alpha: 0.48 },
          { angle: -1.00, spread: 0.18, length: 0.70, alpha: 0.42 }
        ];

    ctx.save();
    ctx.translate(originX, originY);
    ctx.globalCompositeOperation = "screen";
    for (const ray of rays) {
      const length = h * ray.length;
      const spread = w * ray.spread * (0.82 + drama * 0.34);
      const coreAlpha = (0.06 + drama * 0.08) * ray.alpha;
      const midAlpha = (0.04 + drama * 0.05) * ray.alpha;
      ctx.save();
      ctx.rotate(ray.angle);
      ctx.filter = `blur(${Math.round(14 + drama * 18)}px)`;
      const gradient = ctx.createLinearGradient(0, 0, 0, -length);
      gradient.addColorStop(0, toRgba(coreColor[0], coreColor[1], coreColor[2], coreAlpha));
      gradient.addColorStop(0.24, toRgba(rayColor[0], rayColor[1], rayColor[2], midAlpha));
      gradient.addColorStop(0.68, toRgba(rayColor[0], rayColor[1], rayColor[2], midAlpha * 0.28));
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-spread * 0.24, -length * 0.04);
      ctx.quadraticCurveTo(-spread * 0.10, -length * 0.48, 0, -length);
      ctx.quadraticCurveTo(spread * 0.10, -length * 0.48, spread * 0.24, -length * 0.04);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.rotate(state.activePhase === "sunset" ? -1.02 : -1.28);
    ctx.filter = `blur(${Math.round(18 + drama * 18)}px)`;
    const fanLength = h * (state.activePhase === "sunset" ? 0.86 : 0.98);
    const fanSpread = w * (state.activePhase === "sunset" ? 0.18 : 0.16) * (0.88 + drama * 0.28);
    const fanGradient = ctx.createLinearGradient(0, 0, 0, -fanLength);
    fanGradient.addColorStop(0, toRgba(coreColor[0], coreColor[1], coreColor[2], 0.12 + drama * 0.12));
    fanGradient.addColorStop(0.34, toRgba(rayColor[0], rayColor[1], rayColor[2], 0.08 + drama * 0.08));
    fanGradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = fanGradient;
    ctx.beginPath();
    ctx.moveTo(-fanSpread * 0.24, -fanLength * 0.04);
    ctx.quadraticCurveTo(-fanSpread * 0.12, -fanLength * 0.52, 0, -fanLength);
    ctx.quadraticCurveTo(fanSpread * 0.12, -fanLength * 0.52, fanSpread * 0.24, -fanLength * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  function traceMountainRange(ctx, w, h, baseY, points, options = {}) {
    const closePath = options.closePath !== false;
    let prevX = -w * 0.06;
    let prevY = baseY;
    ctx.beginPath();
    if (closePath) {
      ctx.moveTo(prevX, h);
      ctx.lineTo(prevX, baseY);
    } else {
      ctx.moveTo(prevX, baseY);
    }
    for (const point of points) {
      const targetX = point[0] * w;
      const targetY = baseY - point[1] * h;
      const cp1X = prevX + (targetX - prevX) * 0.34;
      const cp1Y = prevY;
      const cp2X = prevX + (targetX - prevX) * 0.72;
      const cp2Y = targetY;
      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, targetX, targetY);
      prevX = targetX;
      prevY = targetY;
    }
    if (closePath) {
      ctx.lineTo(w * 1.06, baseY);
      ctx.lineTo(w * 1.06, h);
      ctx.closePath();
    }
  }

  function drawWarmEdgeMountains(ctx) {
    if (state.host?.classList?.contains("app-mobile-shell")) return;
    if (state.activePeriod === "night" || (state.activePhase !== "dawn" && state.activePhase !== "sunset")) return;
    const drama = warmEdgeDramaFactor();
    if (drama <= 0.04 && state.activeCloudPreset === "clear") return;
    const w = state.cssWidth;
    const h = skyLayerHeight();
    const fogDensity = fogDensityFactor();
    const sunset = state.activePhase === "sunset";
    const scenicVisibility = Math.max(0.14, 1 - fogDensity * 0.76);
    const farBaseY = h * (sunset ? 0.74 : 0.77);
    const nearBaseY = h * (sunset ? 0.84 : 0.86);
    const farPoints = sunset
      ? [[0.12, 0.08], [0.28, 0.20], [0.42, 0.12], [0.58, 0.28], [0.74, 0.14], [0.90, 0.18]]
      : [[0.14, 0.10], [0.30, 0.24], [0.48, 0.14], [0.66, 0.28], [0.84, 0.12]];
    const nearPoints = sunset
      ? [[0.10, 0.12], [0.26, 0.34], [0.40, 0.18], [0.56, 0.42], [0.72, 0.20], [0.88, 0.30]]
      : [[0.12, 0.14], [0.30, 0.36], [0.46, 0.22], [0.62, 0.30], [0.80, 0.16], [0.92, 0.22]];

    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = scenicVisibility;

    const farGradient = ctx.createLinearGradient(0, farBaseY - h * 0.18, 0, h);
    farGradient.addColorStop(0, sunset
      ? toRgba(124, 68, 104, 0.20 + drama * 0.14)
      : toRgba(126, 104, 84, 0.16 + drama * 0.10));
    farGradient.addColorStop(1, sunset
      ? toRgba(44, 32, 58, 0.46 + drama * 0.14)
      : toRgba(72, 60, 66, 0.38 + drama * 0.10));
    ctx.fillStyle = farGradient;
    traceMountainRange(ctx, w, h, farBaseY, farPoints);
    ctx.fill();

    const nearGradient = ctx.createLinearGradient(0, nearBaseY - h * 0.24, 0, h);
    nearGradient.addColorStop(0, sunset
      ? toRgba(80, 48, 82, 0.28 + drama * 0.18)
      : toRgba(94, 74, 68, 0.22 + drama * 0.12));
    nearGradient.addColorStop(1, sunset
      ? toRgba(26, 22, 38, 0.72 - fogDensity * 0.18)
      : toRgba(54, 46, 48, 0.62 - fogDensity * 0.16));
    ctx.fillStyle = nearGradient;
    traceMountainRange(ctx, w, h, nearBaseY, nearPoints);
    ctx.fill();

    const ridgeAlpha = clamp((0.08 + drama * 0.12) * (1 - fogDensity * 0.66), 0, 0.18);
    if (ridgeAlpha > 0.02) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.filter = `blur(${(2 + drama * 3).toFixed(1)}px)`;
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = sunset ? toRgba(255, 132, 118, ridgeAlpha) : toRgba(255, 196, 116, ridgeAlpha);
      traceMountainRange(ctx, w, h, farBaseY, farPoints, { closePath: false });
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  function drawStars(ctx, time) {
    if (state.activePeriod !== "night") return;
    const cap = state.activeCloudPreset === "overcast" ? 0.22 : state.activeCloudPreset === "cloudy" ? 0.56 : 0.82;
    for (const star of state.stars) {
      const pulse = (Math.sin(time * 0.9 + star.p * 3) * 0.5 + 0.5) * 0.35 + 0.65;
      const horizonFade = star.horizon ? 0.82 : star.low ? 0.92 : 1;
      const alpha = star.a * pulse * cap * horizonFade * (star.bright ? 1.28 : 1);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * (star.bright ? 1.34 : 1), 0, Math.PI * 2);
      ctx.fill();
      if (star.bright) {
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.28, alpha * 0.44)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawCloudBands(ctx, time, palette, layer = "all") {
    const cloudZoneHeight = headerLayerHeight();
    const cloudBottom = cloudFieldBottomLimit();
    const mobileLowerClouds = isMobileWeatherShell() && state.activeCloudPreset !== "clear";
    const cloudyMobileBlanket = mobileLowerClouds && state.activeCloudPreset === "cloudy";
    const overcastMobileBlanket = mobileLowerClouds && state.activeCloudPreset === "overcast";
    const fogDensity = fogDensityFactor();
    const fogSoftness = state.activePhenomenon === "fog"
      ? Math.max(0.10, 1 - fogDensity * 0.90)
      : 1;
    const fadeTail = state.activeCloudPreset === "clear"
      ? 32
      : state.activeCloudPreset === "partly"
        ? (mobileLowerClouds ? 112 : 56)
        : state.activeCloudPreset === "cloudy"
          ? (mobileLowerClouds ? 196 : 72)
          : (mobileLowerClouds ? 252 : 86);
    const clipBottom = Math.min(
      state.cssHeight,
      mobileLowerClouds ? Math.max(cloudZoneHeight + fadeTail, cloudBottom + 28) : cloudZoneHeight + fadeTail
    );
    const fadeStart = mobileLowerClouds
      ? Math.max(92, Math.min(clipBottom - 64, cloudZoneHeight + (state.activeCloudPreset === "partly" ? 18 : overcastMobileBlanket ? 72 : cloudyMobileBlanket ? 56 : 34)))
      : Math.max(84, cloudZoneHeight - 18);
    const coverFromData = cloudCoverageRatio();
    const precipitationDarkness = state.activePhenomenon === "storm" ? 0.48 : state.activePhenomenon === "rain" ? 0.32 : state.activePhenomenon === "sleet" ? 0.28 : state.activePhenomenon === "snow" ? 0.22 : 0;
    const darkness = (state.activeCloudPreset === "overcast" ? 0.72 : state.activeCloudPreset === "cloudy" ? 0.46 : state.activeCloudPreset === "partly" ? 0.18 : 0.06) + precipitationDarkness;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, state.cssWidth, clipBottom);
    ctx.clip();
    for (let i = 0; i < state.clouds.length; i += 1) {
      const cloud = state.clouds[i];
      if (layer === "front" && !cloud?.foreground) continue;
      if (layer === "back" && cloud?.foreground) continue;
      const position = cloudPositionAt(cloud, i, time);
      const renderWidth = Math.max(cloud?.spriteLogicalWidth || 0, cloud?.w || 0, 120);
      const renderHeight = Math.max(cloud?.spriteLogicalHeight || 0, cloud?.h || 0, 72);
      if (position.x > state.cssWidth + renderWidth || position.x + renderWidth < -renderWidth) continue;
      if (position.y > clipBottom + renderHeight || position.y + renderHeight < -renderHeight) continue;
      const alphaBase = state.activeCloudPreset === "clear"
        ? 0.16
        : state.activeCloudPreset === "partly"
          ? 0.34
          : state.activeCloudPreset === "cloudy"
            ? (cloudyMobileBlanket ? 0.56 : 0.48)
            : (overcastMobileBlanket ? 0.72 : 0.58);
      const layerBoost = cloud?.foreground
        ? (overcastMobileBlanket ? 1.18 : cloudyMobileBlanket ? 1.10 : 1.05)
        : (overcastMobileBlanket ? 1.04 : 1);
      const cloudMidY = position.y + renderHeight * 0.54;
      const fadeRange = Math.max(42, clipBottom - fadeStart);
      const edgeFade = cloudMidY <= fadeStart
        ? 1
        : Math.max(0, 1 - Math.pow((cloudMidY - fadeStart) / fadeRange, overcastMobileBlanket ? 1.44 : cloudyMobileBlanket ? 1.28 : mobileLowerClouds ? 1.18 : 1));
      const alpha = Math.min(
        0.98,
        (alphaBase + coverFromData * 0.34 + cloud.depth * 0.10 + (state.activeCloudPreset === "overcast" ? 0.05 : 0))
          * (cloud?.contrast || 1)
          * layerBoost
          * edgeFade
          * fogSoftness
      );
      if (alpha <= 0.02) continue;
      if (state.activePhenomenon === "fog") {
        ctx.save();
        ctx.filter = `blur(${(2 + fogDensity * 8).toFixed(1)}px)`;
        drawCloud(ctx, position.x, position.y, cloud, alpha, darkness * 0.54, palette);
        ctx.restore();
      } else {
        drawCloud(ctx, position.x, position.y, cloud, alpha, darkness, palette);
      }
    }
    ctx.restore();
  }

  function drawCloudVeil(ctx, time, coverage, darkness) {
    if (coverage < 0.12 || state.activeCloudPreset === "clear") return;
    if (state.activeCloudPreset === "partly" && coverage < 0.52) return;
    const windStrength = windStrengthFactor();
    const isNight = state.activePeriod === "night";
    const mobileDenseBlanket = isMobileWeatherShell() && (state.activeCloudPreset === "cloudy" || state.activeCloudPreset === "overcast");
    const overcastBlanket = mobileDenseBlanket && state.activeCloudPreset === "overcast";
    const cloudyBlanket = mobileDenseBlanket && state.activeCloudPreset === "cloudy";
    const presetSheetBase = state.activeCloudPreset === "overcast" ? (overcastBlanket ? 4 : 4) : state.activeCloudPreset === "cloudy" ? (cloudyBlanket ? 3 : 3) : 1;
    const sheetCount = presetSheetBase + (coverage >= 0.92 ? (overcastBlanket ? 2 : 1) : 0) + (windStrength > 0.7 ? 1 : 0);
    const presetAlphaBoost = state.activeCloudPreset === "overcast" ? (overcastBlanket ? 0.13 : 0.10) : state.activeCloudPreset === "cloudy" ? (cloudyBlanket ? 0.07 : 0.05) : 0.015;
    const baseAlpha = (isNight ? (overcastBlanket ? 0.05 : cloudyBlanket ? 0.04 : 0.06) : (overcastBlanket ? 0.12 : cloudyBlanket ? 0.08 : 0.08)) + presetAlphaBoost + coverage * (overcastBlanket ? 0.08 : cloudyBlanket ? 0.05 : 0.08);
    for (let i = 0; i < sheetCount; i += 1) {
      const sheetRatio = sheetCount <= 1 ? 0 : i / Math.max(1, sheetCount - 1);
      const topBiasRatio = overcastBlanket ? Math.pow(sheetRatio, 1.55) : cloudyBlanket ? Math.pow(sheetRatio, 1.28) : sheetRatio;
      const width = state.cssWidth * ((overcastBlanket ? 0.72 : cloudyBlanket ? 0.74 : 0.62) + i * (overcastBlanket ? 0.12 : 0.14));
      const height = (overcastBlanket ? 94 : cloudyBlanket ? 84 : 120) + i * (overcastBlanket ? 14 : cloudyBlanket ? 16 : 36);
      const driftSpeed = overcastBlanket ? (2.8 + i * 0.55 + windStrength * 4.2) : (2.1 + i * 0.45 + windStrength * 2.3);
      const x = (((time * driftSpeed) + i * 280) % (state.cssWidth + width * 1.45)) - width * 0.94;
      const y = (overcastBlanket ? 6 : cloudyBlanket ? 18 : 54)
        + topBiasRatio * (overcastBlanket ? 92 : cloudyBlanket ? 76 : 52 * Math.max(1, sheetCount - 1))
        + Math.sin(time * (0.09 + windStrength * 0.03) + i * 0.9) * (overcastBlanket ? 5 : 6)
        + Math.cos(time * (0.05 + windStrength * 0.02) + i * 1.4) * (overcastBlanket ? 2 : 0);
      ctx.save();
      ctx.filter = `blur(${(overcastBlanket ? 9 : cloudyBlanket ? 8 : 12) + i * 2 + windStrength * 1.4}px)`;
      fillCloudEllipse(
        ctx,
        x + width * 0.5,
        y + height * 0.5,
        width * 0.5,
        height * 0.5,
        isNight
          ? toRgba(overcastBlanket ? 150 : 190, overcastBlanket ? 162 : 205, overcastBlanket ? 178 : 225, baseAlpha * (0.94 - i * 0.06))
          : toRgba(overcastBlanket ? 224 : 255, overcastBlanket ? 228 : 255, overcastBlanket ? 232 : 255, baseAlpha * (0.98 - i * (overcastBlanket ? 0.05 : 0.1))),
        isNight
          ? toRgba(overcastBlanket ? 82 : 120, overcastBlanket ? 96 : 138, overcastBlanket ? 118 : 164, baseAlpha * (overcastBlanket ? 0.46 : 0.34))
          : toRgba(overcastBlanket ? 168 : 214, overcastBlanket ? 176 : 223, overcastBlanket ? 186 : 232, baseAlpha * (overcastBlanket ? 0.56 : 0.42)),
        "rgba(255,255,255,0)"
      );
      fillCloudEllipse(
        ctx,
        x + width * (overcastBlanket ? 0.54 : 0.58),
        y + height * (overcastBlanket ? 0.52 : 0.48),
        width * (overcastBlanket ? 0.46 : 0.38),
        height * (overcastBlanket ? 0.30 : 0.26),
        isNight
          ? toRgba(overcastBlanket ? 18 : 36, overcastBlanket ? 26 : 49, overcastBlanket ? 40 : 69, baseAlpha * ((overcastBlanket ? 0.34 : 0.24) + darkness * (overcastBlanket ? 0.36 : 0.30)))
          : toRgba(overcastBlanket ? 96 : 124, overcastBlanket ? 106 : 138, overcastBlanket ? 118 : 150, baseAlpha * ((overcastBlanket ? 0.26 : 0.18) + darkness * (overcastBlanket ? 0.28 : 0.22))),
        "rgba(255,255,255,0)",
        "rgba(255,255,255,0)"
      );
      ctx.restore();
    }
  }

  function drawCloud(ctx, x, y, cloud, alpha, darkness, palette) {
    void palette;
    const canUseSprite = state.activeCloudPreset !== "clear";
    const cachedCloud = canUseSprite ? ensureCloudSprite(cloud, alpha, darkness) : null;
    if (cachedCloud?.spriteCanvas) {
      const scaleX = (cloud?.spriteBaseW && cloud?.w) ? cloud.w / cloud.spriteBaseW : 1;
      const scaleY = (cloud?.spriteBaseH && cloud?.h) ? cloud.h / cloud.spriteBaseH : 1;
      ctx.drawImage(
        cachedCloud.spriteCanvas,
        x - cachedCloud.spritePadX * scaleX,
        y - cachedCloud.spritePadY * scaleY,
        cachedCloud.spriteLogicalWidth * scaleX,
        cachedCloud.spriteLogicalHeight * scaleY
      );
      return;
    }
    drawCloudShape(ctx, x, y, cloud, alpha, darkness);
  }

  function cloudSpriteRenderScale() {
    if (state.activeCloudPreset === "overcast") return 0.94;
    if (state.activeCloudPreset === "cloudy") return 0.95;
    if (state.activeCloudPreset === "partly") return 0.96;
    return 1;
  }

  function cloudSpriteKey(cloud, alpha, darkness) {
    return [
      state.activePeriod,
      state.activeCloudPreset,
      state.activePhenomenon,
      Math.round(gustStrengthFactor() * 100),
      Math.round((cloud?.w || 0)),
      Math.round((cloud?.h || 0)),
      Math.round((cloud?.depth || 0) * 100),
      Math.round(alpha * 100),
      Math.round(darkness * 100)
    ].join("|");
  }

  function createRenderCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    return canvas;
  }

  function expandCloudBounds(bounds, x, y, rx, ry) {
    bounds.minX = Math.min(bounds.minX, x - rx);
    bounds.maxX = Math.max(bounds.maxX, x + rx);
    bounds.minY = Math.min(bounds.minY, y - ry);
    bounds.maxY = Math.max(bounds.maxY, y + ry);
  }

  function cloudSpriteBounds(cloud, windStrength = gustStrengthFactor()) {
    const nodes = cloud?.nodes || [];
    const shadowNodes = cloud?.shadowNodes || [];
    const veilNodes = cloud?.veilNodes || [];
    const lean = (cloud?.lean || 0) * (0.7 + windStrength * 0.8);
    const bounds = {
      minX: Number.POSITIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY
    };

    for (const node of shadowNodes) {
      expandCloudBounds(bounds, node.ox + node.oy * lean * 0.86, node.oy, node.rx, node.ry);
    }
    for (const node of veilNodes) {
      expandCloudBounds(bounds, node.ox + node.oy * lean, node.oy, node.rx, node.ry);
    }
    for (const node of nodes) {
      expandCloudBounds(bounds, node.ox + node.oy * lean, node.oy, node.rx, node.ry);
    }

    if (state.activeCloudPreset === "clear" || state.activeCloudPreset === "partly") {
      for (let i = 0; i < Math.min(4, nodes.length); i += 1) {
        const node = nodes[i];
        expandCloudBounds(
          bounds,
          node.ox + node.oy * lean - node.rx * 0.12,
          node.oy - node.ry * 0.38,
          node.rx * 0.68,
          node.ry * 0.34
        );
      }
    }

    if (!Number.isFinite(bounds.minX) || !Number.isFinite(bounds.minY) || !Number.isFinite(bounds.maxX) || !Number.isFinite(bounds.maxY)) {
      return {
        minX: 0,
        minY: 0,
        maxX: cloud?.w || 120,
        maxY: cloud?.h || 80
      };
    }

    return bounds;
  }

  function ensureCloudSprite(cloud, alpha, darkness) {
    if (!cloud) return null;
    const nextKey = cloudSpriteKey(cloud, alpha, darkness);
    if (cloud.spriteCanvas && cloud.spriteKey === nextKey) return cloud;

    const renderScale = cloudSpriteRenderScale();
    const windStrength = gustStrengthFactor();
    const bounds = cloudSpriteBounds(cloud, windStrength);
    const blurPad = Math.round(20 + (cloud?.depth || 0.8) * 10 + windStrength * 5);
    const logicalWidth = Math.max(1, Math.ceil((bounds.maxX - bounds.minX) + blurPad * 2));
    const logicalHeight = Math.max(1, Math.ceil((bounds.maxY - bounds.minY) + blurPad * 2));
    const padX = Math.round(blurPad - bounds.minX);
    const padY = Math.round(blurPad - bounds.minY);
    const canvas = createRenderCanvas(logicalWidth * renderScale, logicalHeight * renderScale);
    const bufferCtx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!bufferCtx) return cloud;
    bufferCtx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    bufferCtx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in bufferCtx) bufferCtx.imageSmoothingQuality = "high";
    drawCloudShape(bufferCtx, padX, padY, cloud, alpha, darkness);

    cloud.spriteCanvas = canvas;
    cloud.spriteKey = nextKey;
    cloud.spriteLogicalWidth = logicalWidth;
    cloud.spriteLogicalHeight = logicalHeight;
    cloud.spriteBaseW = cloud.w;
    cloud.spriteBaseH = cloud.h;
    cloud.spritePadX = padX;
    cloud.spritePadY = padY;
    return cloud;
  }

  function drawCloudShape(ctx, x, y, cloud, alpha, darkness) {
    const isNight = state.activePeriod === "night";
    const warmEdge = !isNight && (state.activePhase === "dawn" || state.activePhase === "sunset");
    const warmEdgeDrama = warmEdge ? warmEdgeDramaFactor() : 0;
    const mobileSoftCloud = isMobileWeatherShell() && state.activeCloudPreset !== "clear";
    const windStrength = gustStrengthFactor();
    const contrast = cloud?.contrast || 1;
    const cloudWidth = Math.max(120, Number(cloud?.w) || 120);
    const cloudHeight = Math.max(64, Number(cloud?.h) || 64);
    const stormDepth = state.activePhenomenon === "storm"
      ? 1
      : state.activePhenomenon === "rain"
        ? 0.74
        : state.activePhenomenon === "sleet"
          ? 0.62
          : state.activePhenomenon === "snow"
            ? 0.54
            : 0;
    const nodes = cloud?.nodes || [];
    const shadowNodes = cloud?.shadowNodes || [];
    const veilNodes = cloud?.veilNodes || [];
    const lean = (cloud?.lean || 0) * (0.7 + windStrength * 0.8);
    const clearBoost = state.activeCloudPreset === "clear" ? 1.28 : state.activeCloudPreset === "partly" ? 1.18 : state.activeCloudPreset === "cloudy" ? 1.02 : 0.96;
    const presetShade = state.activeCloudPreset === "overcast" ? 54 : state.activeCloudPreset === "cloudy" ? 32 : state.activeCloudPreset === "partly" ? 4 : 0;
    const sunsetCloudBurst = warmEdge && state.activePhase === "sunset" && (state.activeCloudPreset === "cloudy" || state.activeCloudPreset === "overcast")
      ? 0.12 + (cloud?.foreground ? 0.06 : 0)
      : 0;
    const warmCloudMix = warmEdge
      ? (state.activeCloudPreset === "overcast" ? 0.22 : state.activeCloudPreset === "cloudy" ? 0.30 : 0.38)
        + warmEdgeDrama * (state.activePhase === "sunset" ? 0.24 : 0.18)
        + sunsetCloudBurst
      : 0;
    let lightCoreRgb = isNight
      ? [207, 218, 234]
      : [255 - presetShade - stormDepth * 14, 255 - presetShade - stormDepth * 12, 255 - presetShade - stormDepth * 10];
    let lightMidRgb = isNight
      ? [162, 176, 199]
      : [234 - presetShade - stormDepth * 34, 240 - presetShade - stormDepth * 32, 247 - presetShade - stormDepth * 30];
    let darkCoreRgb = isNight
      ? [20, 31, 47]
      : [112 - presetShade * 0.74 - stormDepth * 18, 122 - presetShade * 0.68 - stormDepth * 16, 136 - presetShade * 0.60 - stormDepth * 14];
    let darkMidRgb = isNight
      ? [60, 76, 101]
      : [182 - presetShade * 0.52 - stormDepth * 18, 192 - presetShade * 0.48 - stormDepth * 16, 204 - presetShade * 0.44 - stormDepth * 14];
    let highlightRgb = isNight ? [228, 235, 248] : [255, 255, 255];

    if (mobileSoftCloud && state.activeCloudPreset === "overcast" && !warmEdge) {
      lightCoreRgb = mixRgb(lightCoreRgb, isNight ? [154, 166, 184] : [186, 194, 206], isNight ? 0.42 : 0.52);
      lightMidRgb = mixRgb(lightMidRgb, isNight ? [100, 114, 136] : [130, 142, 158], isNight ? 0.52 : 0.62);
      darkCoreRgb = mixRgb(darkCoreRgb, isNight ? [6, 10, 18] : [52, 62, 76], isNight ? 0.46 : 0.58);
      darkMidRgb = mixRgb(darkMidRgb, isNight ? [22, 30, 42] : [82, 94, 110], isNight ? 0.42 : 0.52);
      highlightRgb = mixRgb(highlightRgb, isNight ? [184, 194, 210] : [212, 220, 228], 0.12);
    }

    if (warmCloudMix > 0) {
      const warmCoreTarget = state.activePhase === "sunset" ? [255, 208, 184] : [255, 228, 186];
      const warmMidTarget = state.activePhase === "sunset" ? [242, 116, 170] : [246, 178, 108];
      const warmShadowTarget = state.activePhase === "sunset" ? [118, 76, 116] : [150, 110, 84];
      const warmHighlightTarget = state.activePhase === "sunset" ? [255, 226, 214] : [255, 238, 204];
      lightCoreRgb = mixRgb(lightCoreRgb, warmCoreTarget, warmCloudMix);
      lightMidRgb = mixRgb(lightMidRgb, warmMidTarget, warmCloudMix * 0.84);
      darkCoreRgb = mixRgb(darkCoreRgb, warmShadowTarget, warmCloudMix * 0.34);
      darkMidRgb = mixRgb(darkMidRgb, warmShadowTarget, warmCloudMix * 0.48);
      highlightRgb = mixRgb(highlightRgb, warmHighlightTarget, warmCloudMix * 0.72);
    }

    if (warmEdgeDrama > 0.06) {
      const dramaticShadowTarget = state.activePhase === "sunset" ? [58, 42, 86] : [118, 84, 62];
      const dramaticMidTarget = state.activePhase === "sunset" ? [158, 78, 124] : [184, 126, 90];
      const dramaticHighlightTarget = state.activePhase === "sunset" ? [255, 176, 214] : [255, 227, 166];
      darkCoreRgb = mixRgb(darkCoreRgb, dramaticShadowTarget, 0.12 + warmEdgeDrama * 0.28 + sunsetCloudBurst * 0.80);
      darkMidRgb = mixRgb(darkMidRgb, dramaticMidTarget, 0.08 + warmEdgeDrama * 0.24 + sunsetCloudBurst * 0.60);
      highlightRgb = mixRgb(highlightRgb, dramaticHighlightTarget, warmEdgeDrama * 0.26 + sunsetCloudBurst * 0.42);
    }

    const lightCore = toRgba(lightCoreRgb[0], lightCoreRgb[1], lightCoreRgb[2], alpha * (isNight ? (0.32 - stormDepth * 0.05) : (0.60 * clearBoost - stormDepth * 0.07)));
    const lightMid = toRgba(lightMidRgb[0], lightMidRgb[1], lightMidRgb[2], alpha * (isNight ? (0.18 - stormDepth * 0.04) : (0.38 - stormDepth * 0.05)));
    const darkCore = toRgba(darkCoreRgb[0], darkCoreRgb[1], darkCoreRgb[2], alpha * (isNight ? (0.24 + darkness * 0.26) : (0.22 + darkness * 0.34) * contrast));
    const darkMid = toRgba(darkMidRgb[0], darkMidRgb[1], darkMidRgb[2], alpha * (isNight ? (0.12 + darkness * 0.12) : (0.12 + darkness * 0.18)));
    const highlightColor = toRgba(
      highlightRgb[0],
      highlightRgb[1],
      highlightRgb[2],
      alpha * (isNight
        ? 0.08
        : (state.activeCloudPreset === "overcast" ? 0.05 : state.activeCloudPreset === "cloudy" ? 0.09 : state.activeCloudPreset === "partly" ? 0.30 : 0.22)
          + warmEdgeDrama * (state.activeCloudPreset === "overcast" ? 0.08 : 0.05))
    );
    const shadowBlurBase = state.activeCloudPreset === "overcast" ? 4.0 : state.activeCloudPreset === "cloudy" ? 4.4 : 4.8;
    const bodyBlurBase = state.activeCloudPreset === "overcast" ? 2.6 : state.activeCloudPreset === "cloudy" ? 2.9 : state.activeCloudPreset === "partly" ? 3.2 : 3.8;
    const shadowBlur = (warmEdge ? Math.max(3.2, shadowBlurBase - warmEdgeDrama * 0.7) : shadowBlurBase) + (mobileSoftCloud ? 1.2 : 0);
    const bodyBlur = (warmEdge ? Math.max(2.2, bodyBlurBase - warmEdgeDrama * 0.5) : bodyBlurBase) + (mobileSoftCloud ? 1.4 : 0);
    const overcastDarkBoost = mobileSoftCloud && state.activeCloudPreset === "overcast" && !warmEdge
      ? (isNight ? 1.16 : 1.22)
      : 1;

    ctx.save();
    ctx.filter = `blur(${shadowBlur + Math.round((cloud?.depth || 0.8) * 2.2) + windStrength * 0.8}px)`;
    for (const node of shadowNodes) {
      fillCloudEllipse(
        ctx,
        x + node.ox + node.oy * lean * 0.86,
        y + node.oy,
        node.rx,
        node.ry,
        overcastDarkBoost > 1
          ? toRgba(darkCoreRgb[0], darkCoreRgb[1], darkCoreRgb[2], Math.min(0.98, alpha * (isNight ? (0.28 + darkness * 0.30) : (0.28 + darkness * 0.42) * contrast) * overcastDarkBoost))
          : darkCore,
        overcastDarkBoost > 1
          ? toRgba(darkMidRgb[0], darkMidRgb[1], darkMidRgb[2], Math.min(0.96, alpha * (isNight ? (0.16 + darkness * 0.16) : (0.16 + darkness * 0.24)) * Math.min(1.14, overcastDarkBoost)))
          : darkMid,
        "rgba(255,255,255,0)"
      );
    }
    ctx.restore();

    if (veilNodes.length) {
      ctx.save();
      ctx.filter = `blur(${10 + Math.round((cloud?.depth || 0.8) * 6) + windStrength * 2}px)`;
      for (const node of veilNodes) {
        fillCloudEllipse(
          ctx,
          x + node.ox + node.oy * lean,
          y + node.oy,
          node.rx,
          node.ry,
          isNight ? toRgba(184, 197, 220, node.alpha * alpha * 0.62) : toRgba(255, 255, 255, node.alpha * alpha * 0.72),
          isNight ? toRgba(132, 148, 174, node.alpha * alpha * 0.24) : toRgba(216, 225, 233, node.alpha * alpha * 0.28),
          "rgba(255,255,255,0)"
        );
      }
      ctx.restore();
    }

    ctx.save();
    ctx.filter = `blur(${1 + Math.round((cloud?.depth || 0.8) * 1.5)}px)`;
    if (state.activeCloudPreset === "clear" || state.activeCloudPreset === "partly") {
      for (let i = 0; i < Math.min(4, nodes.length); i += 1) {
        const node = nodes[i];
        fillCloudEllipse(
          ctx,
          x + node.ox + node.oy * lean - node.rx * 0.12,
          y + node.oy - node.ry * 0.38,
          node.rx * 0.68,
          node.ry * 0.34,
          highlightColor,
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0)"
        );
      }
    }
    ctx.restore();

    if (mobileSoftCloud) {
      ctx.save();
      ctx.filter = `blur(${bodyBlur + Math.round((cloud?.depth || 0.8) * 2.4) + windStrength * 0.7 + 4}px)`;
      fillCloudEllipse(
        ctx,
        x + cloudWidth * 0.50 + cloudHeight * lean * 0.10,
        y + cloudHeight * 0.56,
        cloudWidth * 0.34,
        cloudHeight * 0.22,
        lightMid,
        darkMid,
        "rgba(255,255,255,0)"
      );
      fillCloudEllipse(
        ctx,
        x + cloudWidth * 0.32 + cloudHeight * lean * 0.08,
        y + cloudHeight * 0.50,
        cloudWidth * 0.18,
        cloudHeight * 0.17,
        lightCore,
        lightMid,
        "rgba(255,255,255,0)"
      );
      fillCloudEllipse(
        ctx,
        x + cloudWidth * 0.68 + cloudHeight * lean * 0.08,
        y + cloudHeight * 0.50,
        cloudWidth * 0.20,
        cloudHeight * 0.18,
        lightCore,
        lightMid,
        "rgba(255,255,255,0)"
      );
      ctx.restore();
    }

    ctx.save();
    ctx.filter = `blur(${bodyBlur + Math.round((cloud?.depth || 0.8) * 1.8) + windStrength * 0.5}px)`;
    for (const node of nodes) {
      fillCloudEllipse(
        ctx,
        x + node.ox + node.oy * lean,
        y + node.oy,
        node.rx,
        node.ry,
        lightCore,
        lightMid,
        "rgba(255,255,255,0)"
      );
    }
    ctx.restore();
  }

  function fillCloudEllipse(ctx, x, y, rx, ry, innerColor, midColor, outerColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx, ry);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(0.56, midColor);
    grad.addColorStop(1, outerColor);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function toRgba(r, g, b, a) {
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
  }

  function daylightPrecipitationProfile() {
    const mobileVisibilityBoost = isMobileWeatherShell()
      ? state.activePhenomenon === "snow"
        ? 1.12
        : state.activePhenomenon === "sleet"
          ? 1.10
          : state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "drizzle"
            ? 1.08
            : 1.04
      : 1;
    if (state.activePeriod === "night") {
      return {
        trail: 1.04 * mobileVisibilityBoost,
        core: 1.06 * mobileVisibilityBoost,
        glow: 1.08 * mobileVisibilityBoost,
        width: 1.02 * Math.min(1.12, mobileVisibilityBoost),
        radius: 1.04 * Math.min(1.12, mobileVisibilityBoost),
        lift: 0
      };
    }

    const warmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const presetDamp = state.activeCloudPreset === "clear"
      ? 1.12
      : state.activeCloudPreset === "partly"
        ? 1.08
        : state.activeCloudPreset === "cloudy"
          ? 1.0
          : 0.94;

    return {
      trail: Math.min(1.62, (warmEdge ? 1.22 : 1.12) * presetDamp * mobileVisibilityBoost),
      core: Math.min(1.74, (warmEdge ? 1.28 : 1.18) * presetDamp * mobileVisibilityBoost),
      glow: Math.min(1.92, (warmEdge ? 1.40 : 1.22) * Math.max(0.94, presetDamp) * Math.min(1.14, mobileVisibilityBoost)),
      width: (warmEdge ? 1.08 : 1.04) * Math.min(1.12, mobileVisibilityBoost),
      radius: (warmEdge ? 1.12 : 1.06) * Math.min(1.14, mobileVisibilityBoost),
      lift: warmEdge ? 18 : 10
    };
  }

  function drawFog(ctx) {
    const w = state.cssWidth;
    const h = skyLayerHeight();
    const density = fogDensityFactor();
    if (density <= 0.04) return;
    const warmEdge = state.activePhase === "dawn" || state.activePhase === "sunset";
    const topTint = warmEdge
      ? (state.activePhase === "sunset"
        ? `rgba(240,206,224,${(0.08 + density * 0.12).toFixed(2)})`
        : `rgba(255,232,194,${(0.08 + density * 0.10).toFixed(2)})`)
      : `rgba(255,255,255,${(0.06 + density * 0.10).toFixed(2)})`;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, topTint);
    grad.addColorStop(0.26, topTint);
    grad.addColorStop(0.62, `rgba(242,246,249,${(0.16 + density * 0.18).toFixed(2)})`);
    grad.addColorStop(1, `rgba(236,242,246,${(0.28 + density * 0.30).toFixed(2)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const fogBankY = state.activePhase === "dawn" ? h * 0.58 : h * 0.64;
    const bank = ctx.createRadialGradient(w * 0.5, fogBankY, 0, w * 0.5, fogBankY, w * 0.92);
    bank.addColorStop(0, `rgba(246,248,250,${(0.16 + density * 0.16).toFixed(2)})`);
    bank.addColorStop(0.46, `rgba(242,246,249,${(0.10 + density * 0.14).toFixed(2)})`);
    bank.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = bank;
    ctx.fillRect(0, h * 0.18, w, h * 0.82);

    ctx.save();
    ctx.filter = `blur(${Math.round(14 + density * 18)}px)`;
    const drift = ctx.createLinearGradient(0, h * 0.14, 0, h * 0.92);
    drift.addColorStop(0, `rgba(255,255,255,${(0.02 + density * 0.04).toFixed(2)})`);
    drift.addColorStop(0.40, `rgba(248,250,252,${(0.08 + density * 0.10).toFixed(2)})`);
    drift.addColorStop(1, `rgba(239,244,248,${(0.16 + density * 0.16).toFixed(2)})`);
    ctx.fillStyle = drift;
    ctx.fillRect(-w * 0.06, h * (state.activePhase === "dawn" ? 0.14 : 0.20), w * 1.12, h * 0.72);
    ctx.restore();
  }

  function drawLightningGlow(ctx) {
    if (state.lightningValue <= 0.02) return;
    ctx.fillStyle = `rgba(220,232,255,${state.lightningValue * 0.22})`;
    ctx.fillRect(0, 0, state.cssWidth, state.cssHeight);
  }

  function animatePrecip(time) {
    if (!state.precipCtx || !state.fxCtx) return;
    const w = state.cssWidth;
    const h = state.cssHeight;
    const lowPerformanceMobile = isLowPerformanceMobileWeatherMode();
    const hasParticleLayers = Boolean(
      state.rainFar.length
      || state.rainMid.length
      || state.rainNear.length
      || state.snowFar.length
      || state.snowMid.length
      || state.snowNear.length
      || state.hailMid.length
      || state.hailNear.length
    );
    const hasLightningFx = state.activeElectricityLevel > 0.04
      || state.lightningValue > 0.02
      || Boolean(state.lightningBolt);
    if (lowPerformanceMobile && !hasParticleLayers && !hasLightningFx) {
      if (state.precipFrameActive) {
        state.precipCtx.clearRect(0, 0, w, h);
        state.fxCtx.clearRect(0, 0, w, h);
        state.precipFrameActive = false;
      }
      return;
    }
    state.precipFrameActive = true;
    state.precipCtx.clearRect(0, 0, w, h);
    state.fxCtx.clearRect(0, 0, w, h);
    // Predna cloud overlay vrstva posobila v rohoch ako staticky texturovy flak.
    // Oblacnost uz ostava v zadnej shader vrstve, takze precipitation canvas nechame cisty.
    const precipClipTop = precipitationVisibleTopY();
    const clipPrecipitationTop = precipClipTop > 0 && precipClipTop < (h - 24);
    if (clipPrecipitationTop) {
      state.precipCtx.save();
      state.precipCtx.beginPath();
      state.precipCtx.rect(0, precipClipTop, w, Math.max(1, h - precipClipTop));
      state.precipCtx.clip();
      state.fxCtx.save();
      state.fxCtx.beginPath();
      state.fxCtx.rect(0, precipClipTop, w, Math.max(1, h - precipClipTop));
      state.fxCtx.clip();
    }

    if (state.rainFar.length) drawRainLayer(state.rainFar, [220, 232, 247], false, time);
    if (state.rainMid.length) drawRainLayer(state.rainMid, [230, 240, 252], false, time);
    if (state.rainNear.length) drawRainLayer(state.rainNear, [240, 247, 255], true, time);
    if (state.snowFar.length) drawSnowLayer(state.snowFar, time);
    if (state.snowMid.length) drawSnowLayer(state.snowMid, time);
    if (state.snowNear.length) drawSnowLayer(state.snowNear, time);
    if (state.hailMid.length) drawHailLayer(state.hailMid, false, time);
    if (state.hailNear.length) drawHailLayer(state.hailNear, true, time);
    if (!lowPerformanceMobile && state.windTrails.length) drawWindTrails(time);

    if (!lowPerformanceMobile) {
      drawGroundHaze();
      drawWeatherFloor(time);
      drawSnowGroundAccumulation(time);
      drawHailGroundAccumulation(time);
    }
    if (clipPrecipitationTop) {
      state.precipCtx.restore();
      state.fxCtx.restore();
    }
    drawLightningBolt();
    if (!lowPerformanceMobile) drawSplashes();
  }

  function resetRainDrop(drop, time) {
    refreshParticleEmitterSeed(drop, { spawnOffsetXRange: 38, spawnOffsetYRange: 16 });
    const emitter = pickSeededCloudEmitter(drop, time);
    const rainPhenomenon = activeRainParticlePhenomenonKey();
    const mobileRainLike = isMobileWeatherShell()
      && (rainPhenomenon === "rain" || rainPhenomenon === "storm" || rainPhenomenon === "sleet");
    const spawnLeadFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.28 : rainPhenomenon === "sleet" ? 0.22 : 0.24)
      : 1;
    const burstSpawnLead = clampWindParticleOffset(
      windBurstOffsetAt(emitter.y, time, drop.phase || 0, rainPhenomenon, "move"),
      0.72 * spawnLeadFactor,
      rainPhenomenon
    );
    const scatterSpawnLead = clampWindParticleOffset(
      windScatterOffsetAt(emitter.y, time, drop.phase || 0, rainPhenomenon, "move"),
      0.84 * spawnLeadFactor,
      rainPhenomenon
    );
    drop.x = redistributedPrecipSpawnX(
      emitter.x + burstSpawnLead + scatterSpawnLead + (Number.isFinite(drop.spawnOffsetX) ? drop.spawnOffsetX : 0),
      rainPhenomenon,
      22
    );
    drop.y = emitter.y - (8 + Math.random() * 22) + (Number.isFinite(drop.spawnOffsetY) ? Math.min(drop.spawnOffsetY, 12) : 0);
  }

  function drawRainLayer(items, colorBase, withSplashes, time) {
    const h = state.cssHeight;
    const w = state.cssWidth;
    const floorY = precipitationFloorY(8);
    const windStrength = gustStrengthFactor();
    const precipCalm = isPrecipitationCalm();
    const chaosFactor = precipitationChaosFactor();
    const windResponse = precipitationWindResponse();
    const visibility = daylightPrecipitationProfile();
    const rainPhenomenon = activeRainParticlePhenomenonKey();
    const mobileRainLike = isMobileWeatherShell()
      && (rainPhenomenon === "rain" || rainPhenomenon === "storm" || rainPhenomenon === "sleet");
    const gustFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.24 : rainPhenomenon === "sleet" ? 0.18 : 0.20)
      : 1;
    const burstFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.24 : rainPhenomenon === "sleet" ? 0.18 : 0.20)
      : 1;
    const scatterFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.18 : rainPhenomenon === "sleet" ? 0.14 : 0.15)
      : 1;
    const driftFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.22 : rainPhenomenon === "sleet" ? 0.18 : 0.20)
      : 1;
    const curveFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.18 : rainPhenomenon === "sleet" ? 0.12 : 0.15)
      : 1;
    const jitterFactor = mobileRainLike ? 0.40 : 1;
    const moveClampFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.30 : rainPhenomenon === "sleet" ? 0.24 : 0.26)
      : 1;
    const trailClampFactor = mobileRainLike
      ? (rainPhenomenon === "storm" ? 0.28 : rainPhenomenon === "sleet" ? 0.22 : 0.24)
      : 1.06;
    const fallSpeedBoost = mobileRainLike
      ? (rainPhenomenon === "storm" ? 1 + windStrength * 0.34 : rainPhenomenon === "sleet" ? 1 + windStrength * 0.20 : 1 + windStrength * 0.28)
      : 1;
    const visualWindStretch = mobileRainLike ? 0.02 : 0.08;
    const mobileRainBoost = isMobileWeatherShell()
      ? (state.activePhenomenon === "storm" ? 1.26 : state.activePhenomenon === "rain" ? 1.18 : 1.10)
      : 1;
    const frameScale = frameStepScale();
    state.precipCtx.lineCap = "round";
    for (const drop of items) {
      const gustDrift = precipCalm ? 0 : windDriftAt(drop.x, drop.y, time, drop.phase) * gustFactor;
      const burstMoveDx = precipCalm ? 0 : windBurstOffsetAt(drop.y, time, drop.phase, rainPhenomenon, "move") * burstFactor;
      const burstTrailDx = precipCalm ? 0 : windBurstOffsetAt(drop.y, time, drop.phase, rainPhenomenon, "trail") * burstFactor;
      const scatterMoveDx = precipCalm ? 0 : windScatterOffsetAt(drop.y, time, drop.phase, rainPhenomenon, "move") * scatterFactor;
      const scatterTrailDx = precipCalm ? 0 : windScatterOffsetAt(drop.y, time, drop.phase, rainPhenomenon, "trail") * scatterFactor;
      const driftDx = precipCalm ? 0 : drop.drift * windResponse * driftFactor;
      const curveDx = precipCalm ? 0 : drop.curve * windResponse * curveFactor;
      const jitterDx = precipCalm
        ? 0
        : (
          Math.sin(time * (0.56 + drop.sizeBias * 0.16) + drop.phase * 1.18 + drop.y * 0.010)
          + Math.sin(time * 1.06 - drop.phase * 0.72 + drop.x * 0.004) * 0.56
        ) * 0.05 * chaosFactor * jitterFactor;
      const dx = precipCalm ? 0 : driftDx + gustDrift * 0.18 + jitterDx;
      const trailDx = precipCalm ? 0 : clampWindParticleOffset(dx + curveDx + burstTrailDx + scatterTrailDx, trailClampFactor, rainPhenomenon, "trail");
      const moveDx = precipCalm
        ? 0
        : clampWindParticleOffset(
          clampWindParticleOffset(dx, 0.14 * moveClampFactor, rainPhenomenon, "move") + burstMoveDx + scatterMoveDx,
          moveClampFactor,
          rainPhenomenon,
          "move"
        );
      const dy = drop.len * (0.20 + drop.sizeBias * 0.10 + windStrength * visualWindStretch);
      const headX = drop.x + trailDx * 0.34;
      const headY = drop.y + dy;
      const tailX = drop.x - trailDx * 0.10;
      const tailY = drop.y - dy * 0.10;
      const trailWidth = Math.max(1.05, drop.width * (1.24 + drop.sizeBias * 0.24) * visibility.width * mobileRainBoost);
      const headRadius = Math.max(1.05, trailWidth * (0.68 + drop.sizeBias * 0.12) * visibility.radius);
      const tailAlpha = Math.min(0.96, Math.max(0.12, drop.alpha * (0.34 + drop.sizeBias * 0.14) * visibility.trail * mobileRainBoost));
      const coreAlpha = Math.min(0.99, drop.alpha * (0.78 + drop.sizeBias * 0.14) * visibility.core * mobileRainBoost);
      const glowAlpha = Math.min(0.56, drop.alpha * (0.24 + drop.sizeBias * 0.08) * visibility.glow * mobileRainBoost);
      const rainStrokeR = Math.min(255, colorBase[0] + 8 + visibility.lift * 0.62);
      const rainStrokeG = Math.min(255, colorBase[1] + 10 + visibility.lift * 0.56);
      const rainCoreR = Math.min(255, colorBase[0] + 28 + visibility.lift * 1.10);
      const rainCoreG = Math.min(255, colorBase[1] + 22 + visibility.lift * 0.82);
      state.precipCtx.strokeStyle = toRgba(rainStrokeR, rainStrokeG, 255, tailAlpha);
      state.precipCtx.lineWidth = trailWidth;
      state.precipCtx.beginPath();
      state.precipCtx.moveTo(tailX, tailY);
      state.precipCtx.lineTo(headX, headY);
      state.precipCtx.stroke();

      state.precipCtx.fillStyle = toRgba(
        rainCoreR,
        rainCoreG,
        255,
        coreAlpha
      );
      state.precipCtx.beginPath();
      state.precipCtx.arc(headX, headY, headRadius, 0, Math.PI * 2);
      state.precipCtx.fill();

      state.precipCtx.fillStyle = toRgba(255, 255, 255, glowAlpha);
      state.precipCtx.beginPath();
      state.precipCtx.arc(headX - trailDx * 0.06, headY - dy * 0.16, headRadius * 1.6, 0, Math.PI * 2);
      state.precipCtx.fill();

      drop.x += moveDx * frameScale;
      drop.y += drop.speed * fallSpeedBoost * frameScale;
      const impactHeadX = headX + moveDx * frameScale * 0.28;
      const impactHeadY = headY + drop.speed * fallSpeedBoost * frameScale;
      if (impactHeadY >= floorY && impactHeadX >= -18 && impactHeadX <= w + 18) {
        if (state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "drizzle" || state.activePhenomenon === "sleet") {
          const depositBase = state.activePhenomenon === "storm"
            ? 0.00142
            : state.activePhenomenon === "sleet"
              ? 0.00086
              : state.activePhenomenon === "drizzle"
                ? 0.00062
                : 0.00110;
          depositWaterGroundAt(
            impactHeadX,
            depositBase * (0.82 + drop.sizeBias * 0.22) * (withSplashes ? 1.08 : 0.92),
            0.92 + drop.sizeBias * 0.62
          );
        }
        if (withSplashes && Math.random() > 0.84) addSplash(impactHeadX, floorY, drop.alpha * 0.42);
        resetRainDrop(drop, time);
        continue;
      }
      if (drop.y > h + 50 || drop.x > w + 70 || drop.x < -90) {
        resetRainDrop(drop, time);
      }
    }
  }

  function resetSnowFlake(flake, time) {
    refreshParticleEmitterSeed(flake, { spawnOffsetXRange: 44, spawnOffsetYRange: 14 });
    const emitter = pickSeededCloudEmitter(flake, time);
    const burstSpawnLead = clampWindParticleOffset(windBurstOffsetAt(emitter.y, time, flake.sway || 0, "snow", "move"), 0.68, "snow");
    const scatterSpawnLead = clampWindParticleOffset(windScatterOffsetAt(emitter.y, time, flake.sway || 0, "snow", "move"), 0.88, "snow");
    const baseX = emitter.x + burstSpawnLead + scatterSpawnLead;
    flake.x = redistributedPrecipSpawnX(
      baseX + (Number.isFinite(flake.spawnOffsetX) ? flake.spawnOffsetX : 0),
      "snow",
      18
    );
    flake.y = emitter.y - (10 + Math.random() * 26) + (Number.isFinite(flake.spawnOffsetY) ? Math.min(flake.spawnOffsetY, 10) : 0);
  }

  function drawSnowLayer(items, time) {
    const h = state.cssHeight;
    const w = state.cssWidth;
    const floorY = precipitationFloorY(8);
    const precipCalm = isPrecipitationCalm();
    const chaosFactor = precipitationChaosFactor();
    const windResponse = precipitationWindResponse();
    const visibility = daylightPrecipitationProfile();
    const frameScale = frameStepScale();
    for (const flake of items) {
      const gustDrift = precipCalm ? 0 : windDriftAt(flake.x, flake.y, time, flake.sway);
      const sway = precipCalm || chaosFactor <= 0.01
        ? 0
        : (
          Math.sin((flake.y * 0.010) + flake.sway * 0.92 + time * (0.42 + flake.r * 0.03))
          + Math.sin((flake.x * 0.006) - flake.sway * 0.54 + time * (0.86 + flake.r * 0.02)) * 0.42
        ) * flake.swayAmp * (0.56 + chaosFactor * 0.22);
      const burstMove = precipCalm ? 0 : windBurstOffsetAt(flake.y, time, flake.sway, "snow", "move");
      const scatterMove = precipCalm ? 0 : windScatterOffsetAt(flake.y, time, flake.sway, "snow", "move");
      const lateralTravel = precipCalm
        ? 0
        : clampWindParticleOffset(
          clampWindParticleOffset(sway * 0.42 + flake.drift * 0.88 * windResponse + gustDrift * 0.50, 0.16, "snow", "move") + burstMove + scatterMove,
          1,
          "snow",
          "move"
        );
      state.precipCtx.fillStyle = `rgba(255,255,255,${Math.min(0.98, flake.alpha * visibility.core)})`;
      state.precipCtx.beginPath();
      state.precipCtx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      state.precipCtx.fill();
      if (flake.r > 3.2) {
        state.fxCtx.fillStyle = `rgba(255,255,255,${Math.min(0.22, flake.alpha * 0.10 * visibility.glow)})`;
        state.fxCtx.beginPath();
        state.fxCtx.arc(flake.x, flake.y, flake.r * 2.2, 0, Math.PI * 2);
        state.fxCtx.fill();
      }
      flake.x += lateralTravel * frameScale;
      flake.y += (flake.speed + Math.abs(Math.cos(time * 0.9 + flake.sway)) * 0.04) * frameScale;
      if (flake.y >= floorY - flake.r * 0.3 && flake.x >= -8 && flake.x <= w + 8) {
        const settleChance = clamp(0.18 + flake.r * 0.16, 0.18, 0.62);
        if (Math.random() <= settleChance) {
          const settleAmount = flake.r * (state.activeSceneKey === "snow_heavy" ? 0.0050 : 0.0034);
          depositSnowGroundAt(flake.x, settleAmount, 0.9 + flake.r * 0.45);
        }
        resetSnowFlake(flake, time);
        continue;
      }
      if (flake.y > h + 12 || flake.x > w + 12 || flake.x < -12) {
        resetSnowFlake(flake, time);
      }
    }
  }

  function resetHailStone(stone, time) {
    refreshParticleEmitterSeed(stone, { spawnOffsetXRange: 34, spawnOffsetYRange: 12 });
    const emitter = pickSeededCloudEmitter(stone, time);
    const burstSpawnLead = clampWindParticleOffset(windBurstOffsetAt(emitter.y, time, stone.phase || 0, "hail", "move"), 0.74, "hail");
    const scatterSpawnLead = clampWindParticleOffset(windScatterOffsetAt(emitter.y, time, stone.phase || 0, "hail", "move"), 0.80, "hail");
    stone.x = redistributedPrecipSpawnX(
      emitter.x + burstSpawnLead + scatterSpawnLead + (Number.isFinite(stone.spawnOffsetX) ? stone.spawnOffsetX : 0),
      "hail",
      20
    );
    stone.y = emitter.y - (8 + Math.random() * 20) + (Number.isFinite(stone.spawnOffsetY) ? Math.min(stone.spawnOffsetY, 8) : 0);
    stone.bounceCount = 0;
    stone.bounceEnabled = Math.random() < 0.5;
    stone.bounceLiftFactor = 0.62 + Math.random() * 0.76;
    stone.bounceSpeedFactor = 0.68 + Math.random() * 0.56;
    stone.bounceDx = 0;
    stone.bounceVy = null;
  }

  function drawHailLayer(items, heavy = false, time) {
    const h = state.cssHeight;
    const w = state.cssWidth;
    const floorLineY = precipitationFloorY(8);
    const precipCalm = isPrecipitationCalm();
    const chaosFactor = precipitationChaosFactor();
    const windResponse = precipitationWindResponse();
    const visibility = daylightPrecipitationProfile();
    const frameScale = frameStepScale();
    const windStrength = gustStrengthFactor();
    for (const stone of items) {
      const gustDrift = precipCalm ? 0 : windDriftAt(stone.x, stone.y, time, stone.phase);
      const sideKick = precipCalm
        ? 0
        : (
          Math.sin(time * 2.8 + stone.phase * 1.18 + stone.y * 0.010)
          + Math.sin(time * 4.6 - stone.phase * 0.72 + stone.x * 0.006) * 0.38
        ) * (0.08 + gustStrengthFactor() * 0.24) * chaosFactor;
      const burstMove = precipCalm ? 0 : windBurstOffsetAt(stone.y, time, stone.phase, "hail", "move");
      const burstTrail = precipCalm ? 0 : windBurstOffsetAt(stone.y, time, stone.phase, "hail", "trail");
      const scatterMove = precipCalm ? 0 : windScatterOffsetAt(stone.y, time, stone.phase, "hail", "move");
      const scatterTrail = precipCalm ? 0 : windScatterOffsetAt(stone.y, time, stone.phase, "hail", "trail");
      const hailTravel = precipCalm
        ? 0
        : clampWindParticleOffset(
          clampWindParticleOffset(stone.drift * windResponse + gustDrift * 0.78 + sideKick, 0.14, "hail", "move") + burstMove + scatterMove,
          1,
          "hail",
          "move"
        );
      const floorY = floorLineY - stone.r;
      const fallSpeed = Number.isFinite(stone.bounceVy)
        ? stone.bounceVy
        : (stone.speed + Math.abs(gustDrift) * 0.02);
      const bounceDrift = Number.isFinite(stone.bounceDx) ? stone.bounceDx : 0;

      state.precipCtx.fillStyle = `rgba(204,216,232,${Math.min(0.98, stone.alpha * visibility.core)})`;
      state.precipCtx.beginPath();
      state.precipCtx.arc(stone.x, stone.y, stone.r, 0, Math.PI * 2);
      state.precipCtx.fill();

      state.precipCtx.strokeStyle = `rgba(238,244,252,${Math.min(0.96, stone.alpha * 0.7 * visibility.trail)})`;
      state.precipCtx.lineWidth = Math.max(0.7, stone.r * 0.32);
      state.precipCtx.beginPath();
      state.precipCtx.arc(stone.x, stone.y, Math.max(0.8, stone.r - 0.16), 0, Math.PI * 2);
      state.precipCtx.stroke();

      state.precipCtx.fillStyle = `rgba(255,255,255,${Math.min(0.98, stone.alpha * stone.shine * visibility.glow)})`;
      state.precipCtx.beginPath();
      state.precipCtx.arc(stone.x - stone.r * 0.22, stone.y - stone.r * 0.24, Math.max(0.45, stone.r * 0.36), 0, Math.PI * 2);
      state.precipCtx.fill();

      if (heavy || stone.r >= 2.4) {
        state.fxCtx.strokeStyle = `rgba(216,228,244,${Math.min(0.74, stone.alpha * (heavy ? 0.44 : 0.26) * visibility.trail)})`;
        state.fxCtx.lineWidth = Math.max(0.8, stone.r * (heavy ? 0.34 : 0.22));
        state.fxCtx.beginPath();
        state.fxCtx.moveTo(stone.x, stone.y - stone.r * 1.3);
        state.fxCtx.lineTo(
          stone.x - gustDrift * 0.10 + clampWindParticleOffset(burstTrail + scatterTrail, 0.10, "hail", "trail"),
          stone.y + stone.r * (heavy ? 2.1 : 1.7)
        );
        state.fxCtx.stroke();
      }

      stone.x += (hailTravel + bounceDrift) * frameScale;
      stone.y += fallSpeed * frameScale;

      if (Number.isFinite(stone.bounceVy)) {
        stone.bounceVy += (0.34 + stone.r * 0.12 + windStrength * 0.07) * frameScale;
      }
      if (Number.isFinite(stone.bounceDx) && Math.abs(stone.bounceDx) > 0.001) {
        stone.bounceDx *= Math.pow(0.88, frameScale);
      }

      if (stone.y >= floorY) {
        const maxBounces = heavy ? 2 : 1;
        const impactSpeed = Math.max(
          Math.abs(fallSpeed),
          heavy ? 3.2 : 2.6
        );
        const canBounce = stone.bounceEnabled !== false && (stone.bounceCount || 0) < maxBounces;
        if (canBounce) {
          stone.bounceCount = (stone.bounceCount || 0) + 1;
          const bounceDecay = clamp(1 - (stone.bounceCount - 1) * (heavy ? 0.34 : 0.46), 0.16, 1);
          const liftBase = Math.max(
            heavy ? 4.2 : 2.8,
            stone.r * (heavy ? 1.8 : 1.3),
            impactSpeed * (heavy ? 0.24 : 0.16) * bounceDecay
          );
          const bounceHeightFactor = clamp(
            (Number.isFinite(stone.bounceLiftFactor) ? stone.bounceLiftFactor : 1) * (0.78 + Math.random() * 0.34),
            0.56,
            1.32
          );
          const bounceSpeedBase = Math.max(
            heavy ? 2.8 : 1.9,
            impactSpeed * (heavy ? 0.34 : 0.24) * bounceDecay
          );
          const bounceSpeedFactor = clamp(
            (Number.isFinite(stone.bounceSpeedFactor) ? stone.bounceSpeedFactor : 1) * (0.80 + Math.random() * 0.28),
            0.60,
            1.26
          );
          const lift = liftBase * bounceHeightFactor;
          stone.y = floorY - lift;
          stone.bounceVy = -(bounceSpeedBase * bounceSpeedFactor);
          const kickBase = hailTravel * 0.12 + (Math.random() - 0.5) * (0.16 + stone.r * 0.14);
          stone.bounceDx = (Number.isFinite(stone.bounceDx) ? stone.bounceDx : 0) * 0.12 + kickBase;
          const bounceDepositFactor = stone.bounceCount === 1 ? 0.18 : 0.06;
          depositHailGroundAt(
            stone.x,
            stone.r * (heavy ? 0.0072 : 0.0044) * bounceDepositFactor,
            stone.r * (heavy ? 1.6 : 1.25)
          );
          if (Math.random() > (heavy ? 0.72 : 0.82)) {
            addSplash(stone.x, floorLineY, stone.alpha * (heavy ? 0.46 : 0.28));
          }
        } else {
          depositHailGroundAt(
            stone.x,
            stone.r * (heavy ? 0.0048 : 0.0032),
            stone.r * (heavy ? 1.45 : 1.08)
          );
          if (Math.random() > (heavy ? 0.62 : 0.76)) {
            addSplash(stone.x, floorLineY, stone.alpha * (heavy ? 0.72 : 0.46));
          }
          resetHailStone(stone, time);
          continue;
        }
      }

      if (stone.y > h + 18 || stone.x > w + 24 || stone.x < -24) {
        resetHailStone(stone, time);
      }
    }
  }

  function drawWindTrails(time) {
    const w = state.cssWidth;
    const h = state.cssHeight;
    const strength = gustStrengthFactor();
    const chaosFactor = precipitationChaosFactor();
    const frameScale = frameStepScale();
    const nightTrailDamp = state.activePeriod === "night"
      ? (state.activePhenomenon === "storm" ? 0.46 : 0.22)
      : 1;
    if (strength <= 0.08 && chaosFactor <= 0.01) return;
    if (state.activePeriod === "night" && state.activePhenomenon !== "storm" && strength < 0.56 && chaosFactor < 0.12) return;
    state.fxCtx.save();
    state.fxCtx.lineCap = "round";
    state.fxCtx.filter = `blur(${0.4 + strength * (state.activePeriod === "night" ? 1.1 : 1.8)}px)`;

    for (const trail of state.windTrails) {
      const trailBias = chaoticWindBiasAt(trail.x, trail.y, time, trail.curve);
      const dx = trail.len * (0.52 + strength * 0.62) * trailBias;
      const dy = Math.sin((trail.x * 0.012) + trail.curve) * trail.lift * 0.12 + 4 + strength * 8;
      const trailAlpha = trail.alpha * (state.activePhenomenon === "storm" ? 0.74 : 1) * nightTrailDamp;
      const gradient = state.fxCtx.createLinearGradient(trail.x, trail.y, trail.x + dx, trail.y + dy);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.34, `rgba(236,244,255,${trailAlpha * 0.82})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      state.fxCtx.strokeStyle = gradient;
      state.fxCtx.lineWidth = trail.thickness;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(trail.x, trail.y);
      state.fxCtx.quadraticCurveTo(trail.x + dx * 0.44, trail.y - dy * 0.32, trail.x + dx, trail.y + dy);
      state.fxCtx.stroke();

      const drift = windDriftAt(trail.x, trail.y, time, trail.curve);
      trail.x += (trailBias * (trail.speed * 0.18 + state.activeWindSpeed * 0.05) + drift * 0.14) * frameScale;
      trail.y += Math.sin(trail.x * 0.01 + trail.curve) * 0.16 * frameScale;
      if (trail.x > w + trail.len + 90 || trail.x < -trail.len - 90) {
        trail.x = Math.random() > 0.5
          ? (-trail.len - Math.random() * 120)
          : (w + trail.len + Math.random() * 120);
        trail.y = 32 + Math.random() * Math.max(80, h * 0.82);
      }
    }

    state.fxCtx.restore();
  }

  function drawSplashes() {
    const frameScale = frameStepScale();
    for (let i = state.splashes.length - 1; i >= 0; i -= 1) {
      const splash = state.splashes[i];
      splash.life -= 0.06 * frameScale;
      if (splash.life <= 0) {
        state.splashes.splice(i, 1);
        continue;
      }
      state.fxCtx.strokeStyle = `rgba(225,236,250,${splash.alpha * splash.life})`;
      state.fxCtx.lineWidth = 1;
      state.fxCtx.beginPath();
      state.fxCtx.arc(splash.x, splash.y, splash.r * (2 - splash.life), Math.PI, Math.PI * 2);
      state.fxCtx.stroke();
    }
  }

  function drawGroundHaze() {
    const w = state.cssWidth;
    const h = state.cssHeight;
    const visibility = Number.isFinite(state.activeVisibility) ? state.activeVisibility : null;
    const fogDensity = fogDensityFactor();
    const mobileMediumOnlySurface = isMobileWeatherShell()
      && (
        state.activePhenomenon === "rain"
        || state.activePhenomenon === "storm"
        || state.activePhenomenon === "snow"
        || state.activePhenomenon === "sleet"
        || state.activeSceneKey === "hail"
      );
    if (!mobileMediumOnlySurface && (state.activePhenomenon === "rain" || state.activePhenomenon === "storm" || state.activePhenomenon === "fog" || state.activePhenomenon === "sleet")) {
      const grad = state.fxCtx.createLinearGradient(0, h * 0.72, 0, h);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(1, state.activePhenomenon === "storm"
        ? "rgba(205,220,245,0.12)"
        : state.activePhenomenon === "fog"
          ? `rgba(235,242,250,${(0.14 + fogDensity * 0.10).toFixed(2)})`
          : "rgba(235,242,250,0.12)");
      state.fxCtx.fillStyle = grad;
      state.fxCtx.fillRect(0, h * 0.72, w, h * 0.28);
    }
    if (!mobileMediumOnlySurface && (state.activePhenomenon === "snow" || state.activePhenomenon === "sleet")) {
      const grad = state.fxCtx.createLinearGradient(0, h * 0.70, 0, h);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(1, state.activePhenomenon === "sleet" ? "rgba(242,246,250,0.16)" : "rgba(245,248,252,0.20)");
      state.fxCtx.fillStyle = grad;
      state.fxCtx.fillRect(0, h * 0.70, w, h * 0.30);
    }
    if (state.activePhenomenon === "fog") {
      const sunPlacement = sunPlacementMetrics();
      const skyMilk = state.fxCtx.createLinearGradient(0, 0, 0, h);
      skyMilk.addColorStop(0, `rgba(248,250,252,${(0.16 + fogDensity * 0.12).toFixed(2)})`);
      skyMilk.addColorStop(0.42, `rgba(245,248,250,${(0.22 + fogDensity * 0.18).toFixed(2)})`);
      skyMilk.addColorStop(1, `rgba(240,244,248,${(0.26 + fogDensity * 0.18).toFixed(2)})`);
      state.fxCtx.fillStyle = skyMilk;
      state.fxCtx.fillRect(0, 0, w, h);

      const sunBlanket = state.fxCtx.createRadialGradient(
        sunPlacement.centerX,
        Math.min(h * 0.78, sunPlacement.centerY + 6),
        0,
        sunPlacement.centerX,
        Math.min(h * 0.78, sunPlacement.centerY + 6),
        154 + fogDensity * 126
      );
      sunBlanket.addColorStop(0, `rgba(249,251,252,${(0.24 + fogDensity * 0.14).toFixed(2)})`);
      sunBlanket.addColorStop(0.38, `rgba(244,247,250,${(0.16 + fogDensity * 0.14).toFixed(2)})`);
      sunBlanket.addColorStop(1, "rgba(255,255,255,0)");
      state.fxCtx.fillStyle = sunBlanket;
      state.fxCtx.fillRect(0, 0, w, h);

      const lowMist = state.fxCtx.createLinearGradient(0, h * 0.42, 0, h);
      lowMist.addColorStop(0, "rgba(255,255,255,0)");
      lowMist.addColorStop(1, Number.isFinite(visibility) && visibility < 1200
        ? `rgba(241,245,249,${(0.24 + fogDensity * 0.16).toFixed(2)})`
        : `rgba(241,245,249,${(0.16 + fogDensity * 0.10).toFixed(2)})`);
      state.fxCtx.fillStyle = lowMist;
      state.fxCtx.fillRect(0, h * 0.42, w, h * 0.58);
    }
  }

  function drawSnowGroundAccumulation(time = state.time) {
    if (!isMobileWeatherShell()) return;
    ensureSnowGroundProfile();
    const activeSnow = state.activePhenomenon === "snow" && (state.snowFar.length || state.snowMid.length || state.snowNear.length);
    if (activeSnow) {
      for (let index = 1; index < state.snowGroundProfile.length - 1; index += 1) {
        state.snowGroundProfile[index] = state.snowGroundProfile[index] * 0.92
          + (state.snowGroundProfile[index - 1] + state.snowGroundProfile[index] + state.snowGroundProfile[index + 1]) / 3 * 0.08;
      }
      const target = snowGroundProfileStrength();
      state.snowGroundCover += (target - state.snowGroundCover) * 0.10 * frameStepScale();
    } else {
      state.snowGroundCover = 0;
      for (let index = 0; index < state.snowGroundProfile.length; index += 1) {
        state.snowGroundProfile[index] = 0;
      }
      return;
    }

    const cover = clamp(Math.max(state.snowGroundCover, snowGroundProfileStrength()), 0, 1);
    if (cover <= 0.01 || !state.fxCtx) return;
    ensureSnowGroundSeeds();
    const w = state.cssWidth;
    const floorY = precipitationFloorY(8);
    const bandHeight = Math.max(14, Math.min(48, 10 + cover * 32));
    const baseTopY = floorY - Math.max(8, bandHeight * 0.42);

    const base = state.fxCtx.createLinearGradient(0, baseTopY, 0, floorY + 2);
    base.addColorStop(0, `rgba(255,255,255,${(0.03 + cover * 0.06).toFixed(2)})`);
    base.addColorStop(0.46, `rgba(246,249,252,${(0.12 + cover * 0.14).toFixed(2)})`);
    base.addColorStop(1, `rgba(232,239,248,${(0.18 + cover * 0.16).toFixed(2)})`);
    state.fxCtx.fillStyle = base;
    state.fxCtx.fillRect(0, baseTopY, w, floorY + 2 - baseTopY);

    const moundPoints = [];
    for (let index = 0; index < state.snowGroundProfile.length; index += 1) {
      const value = Math.max(0, Number(state.snowGroundProfile[index]) || 0);
      if (value <= 0.004) continue;
      const xRatio = state.snowGroundProfile.length <= 1 ? 0 : index / (state.snowGroundProfile.length - 1);
      const contour = groundContourOffset(xRatio, cover, "snow");
      moundPoints.push({
        x: xRatio * w,
        y: floorY - bandHeight * clamp(0.10 + value * 0.90 + contour * 0.10, 0.04, 1.16),
        reveal: value
      });
    }

    if (moundPoints.length >= 2) {
      const moundFill = state.fxCtx.createLinearGradient(0, floorY - bandHeight, 0, floorY + 2);
      moundFill.addColorStop(0, `rgba(252,253,255,${(0.20 + cover * 0.12).toFixed(2)})`);
      moundFill.addColorStop(0.60, `rgba(244,248,252,${(0.26 + cover * 0.18).toFixed(2)})`);
      moundFill.addColorStop(1, `rgba(228,236,246,${(0.24 + cover * 0.16).toFixed(2)})`);
      state.fxCtx.fillStyle = moundFill;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(0, floorY);
      state.fxCtx.lineTo(0, moundPoints[0].y);
      for (let i = 0; i < moundPoints.length - 1; i += 1) {
        const current = moundPoints[i];
        const next = moundPoints[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const crestY = Math.min(current.y, next.y) - bandHeight * 0.04 * Math.min(1, current.reveal + next.reveal);
        state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
      }
      state.fxCtx.lineTo(w, floorY);
      state.fxCtx.closePath();
      state.fxCtx.fill();

      state.fxCtx.strokeStyle = `rgba(255,255,255,${Math.min(0.76, 0.18 + cover * 0.20).toFixed(2)})`;
      state.fxCtx.lineWidth = Math.max(1.2, 1.0 + cover * 1.3);
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(0, moundPoints[0].y);
      for (let i = 0; i < moundPoints.length - 1; i += 1) {
        const current = moundPoints[i];
        const next = moundPoints[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const crestY = Math.min(current.y, next.y) - bandHeight * 0.03;
        state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
      }
      state.fxCtx.stroke();
    }

    const seedStep = cover < 0.36 ? 2 : 1;
    for (let i = 0; i < state.snowGroundSeeds.length; i += seedStep) {
      const seed = state.snowGroundSeeds[i];
      const profileIndex = Math.min(
        state.snowGroundProfile.length - 1,
        Math.max(0, Math.round(seed.xRatio * Math.max(1, state.snowGroundProfile.length - 1)))
      );
      const localPile = Math.max(0, Number(state.snowGroundProfile[profileIndex]) || 0);
      const reveal = localPile * 1.08 - seed.depth * 0.42;
      if (reveal <= 0.02) continue;
      const x = seed.xRatio * w;
      const contour = groundContourOffset(seed.xRatio, cover, "snow");
      const y = floorY - localPile * bandHeight * (0.52 + seed.yBias * 0.18 + contour * 0.08);
      const radius = seed.size * (0.60 + cover * 0.56) * (0.9 + reveal * 0.7);
      const alpha = Math.min(0.82, 0.10 + reveal * 0.22);
      state.fxCtx.fillStyle = `rgba(250,252,255,${alpha.toFixed(2)})`;
      state.fxCtx.beginPath();
      state.fxCtx.ellipse(x, y, radius * seed.stretch, radius, seed.phase * 0.10, 0, Math.PI * 2);
      state.fxCtx.fill();
    }
  }

  function drawHailGroundAccumulation(time = state.time) {
    if (!isMobileWeatherShell()) return;
    ensureHailGroundProfile();
    const activeHail = state.activeSceneKey === "hail" && (state.hailMid.length || state.hailNear.length);
    if (activeHail) {
      state.hailGroundCover += (hailGroundProfileStrength() - state.hailGroundCover) * 0.038 * frameStepScale();
    } else {
      state.hailGroundCover = 0;
      for (let index = 0; index < state.hailGroundProfile.length; index += 1) {
        state.hailGroundProfile[index] = 0;
      }
      return;
    }

    const cover = clamp(Math.max(state.hailGroundCover, hailGroundProfileStrength()), 0, 1);
    if (cover <= 0.01 || !state.fxCtx) return;
    ensureHailGroundSeeds();
    const w = state.cssWidth;
    const floorY = precipitationFloorY(8);
    const bandHeight = Math.max(12, Math.min(38, 9 + cover * 26));
    const baseTopY = floorY - Math.max(7, bandHeight * 0.44);

    const base = state.fxCtx.createLinearGradient(0, baseTopY, 0, floorY + 2);
    base.addColorStop(0, `rgba(255,255,255,${(0.02 + cover * 0.05).toFixed(2)})`);
    base.addColorStop(0.42, `rgba(232,239,248,${(0.06 + cover * 0.10).toFixed(2)})`);
    base.addColorStop(1, `rgba(214,225,240,${(0.10 + cover * 0.14).toFixed(2)})`);
    state.fxCtx.fillStyle = base;
    state.fxCtx.fillRect(0, baseTopY, w, floorY + 2 - baseTopY);

    const moundPoints = [];
    for (let index = 0; index < state.hailGroundProfile.length; index += 1) {
      const value = Math.max(0, Number(state.hailGroundProfile[index]) || 0);
      if (value <= 0.004) continue;
      const xRatio = state.hailGroundProfile.length <= 1 ? 0 : index / (state.hailGroundProfile.length - 1);
      const contour = groundContourOffset(xRatio, cover, "hail");
      moundPoints.push({
        x: xRatio * w,
        y: floorY - bandHeight * clamp(0.10 + value * 0.90 + contour * 0.12, 0.04, 1.18),
        reveal: value
      });
    }
    if (moundPoints.length >= 2) {
      const moundFill = state.fxCtx.createLinearGradient(0, floorY - bandHeight, 0, floorY + 2);
      moundFill.addColorStop(0, `rgba(246,249,252,${(0.12 + cover * 0.14).toFixed(2)})`);
      moundFill.addColorStop(0.55, `rgba(232,239,247,${(0.18 + cover * 0.18).toFixed(2)})`);
      moundFill.addColorStop(1, `rgba(214,224,238,${(0.22 + cover * 0.18).toFixed(2)})`);
      state.fxCtx.fillStyle = moundFill;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(0, floorY);
      state.fxCtx.lineTo(0, moundPoints[0].y);
      for (let i = 0; i < moundPoints.length - 1; i += 1) {
        const current = moundPoints[i];
        const next = moundPoints[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const crestY = Math.min(current.y, next.y) - bandHeight * 0.06 * Math.min(1, current.reveal + next.reveal);
        state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
      }
      state.fxCtx.lineTo(w, floorY);
      state.fxCtx.closePath();
      state.fxCtx.fill();

      state.fxCtx.strokeStyle = `rgba(255,255,255,${Math.min(0.64, 0.12 + cover * 0.18).toFixed(2)})`;
      state.fxCtx.lineWidth = Math.max(1.1, 1.0 + cover * 1.4);
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(0, moundPoints[0].y);
      for (let i = 0; i < moundPoints.length - 1; i += 1) {
        const current = moundPoints[i];
        const next = moundPoints[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const crestY = Math.min(current.y, next.y) - bandHeight * 0.04;
        state.fxCtx.quadraticCurveTo(midX, crestY, next.x, next.y);
      }
      state.fxCtx.stroke();
    }

    const seedStep = cover < 0.34 ? 2 : 1;
    for (let i = 0; i < state.hailGroundSeeds.length; i += seedStep) {
      const seed = state.hailGroundSeeds[i];
      const profileIndex = Math.min(
        state.hailGroundProfile.length - 1,
        Math.max(0, Math.round(seed.xRatio * Math.max(1, state.hailGroundProfile.length - 1)))
      );
      const localPile = Math.max(0, Number(state.hailGroundProfile[profileIndex]) || 0);
      const reveal = localPile * 1.08 - seed.depth * 0.40;
      if (reveal <= 0.02) continue;
      const x = seed.xRatio * w;
      const contour = groundContourOffset(seed.xRatio, cover, "hail");
      const y = floorY - localPile * bandHeight * (0.54 + seed.yBias * 0.18 + contour * 0.09);
      const radius = seed.size * (0.52 + cover * 0.60) * (0.9 + reveal * 0.8);
      const alpha = Math.min(0.78, 0.08 + reveal * 0.22);
      state.fxCtx.fillStyle = `rgba(238,244,252,${alpha.toFixed(2)})`;
      state.fxCtx.beginPath();
      state.fxCtx.ellipse(x, y, radius * seed.stretch, radius, seed.phase * 0.12, 0, Math.PI * 2);
      state.fxCtx.fill();
      if (i % 2 === 0) {
        state.fxCtx.fillStyle = `rgba(255,255,255,${Math.min(0.72, alpha * 0.46).toFixed(2)})`;
        state.fxCtx.beginPath();
        state.fxCtx.ellipse(x - radius * 0.18, y - radius * 0.12, Math.max(0.18, radius * 0.30), Math.max(0.14, radius * 0.22), 0, 0, Math.PI * 2);
        state.fxCtx.fill();
      }
    }
  }

  function maybeLightning() {
    if (state.activeElectricityLevel <= 0.04) {
      state.lightningValue = applyFrameDecay(state.lightningValue, 0.88);
      if (state.lightningValue <= 0.04) state.lightningBolt = null;
      return;
    }

    const triggerChance = state.activeSceneKey === "storm"
      ? 0.011
      : state.activeSceneKey === "hail"
        ? 0.008
        : 0.003;
    const triggerScale = frameStepScale();
    const idle = state.lightningValue <= 0.08;

    if (idle && Math.random() < triggerChance * triggerScale * (0.5 + state.activeElectricityLevel * 0.8)) {
      state.lightningValue = 1;
      state.lightningBolt = makeLightningBolt();
    }

    state.lightningValue = applyFrameDecay(state.lightningValue, state.activeSceneKey === "storm"
      ? 0.86
      : state.activeSceneKey === "hail"
        ? 0.88
        : 0.90);

    if (state.lightningValue <= 0.04) state.lightningBolt = null;
  }

  function makeLightningBolt() {
    const branchCount = state.activeSceneKey === "storm" ? 2 : 1;
    const bolts = [];
    for (let i = 0; i < branchCount; i += 1) {
      const points = [];
      let x = state.cssWidth * (0.16 + Math.random() * 0.68);
      let y = 34 + Math.random() * 52;
      const segments = 6 + Math.floor(Math.random() * 4) + (state.activeSceneKey === "storm" ? 1 : 0);
      points.push({ x, y });
      for (let segment = 0; segment < segments; segment += 1) {
        x += (Math.random() - 0.5) * (18 + segment * 3);
        y += 22 + Math.random() * 34;
        points.push({ x, y });
      }
      bolts.push(points);
    }
    return bolts;
  }

  function drawLightningBolt() {
    if (!state.lightningBolt || state.lightningValue <= 0.12) return;
    const glowAlpha = state.lightningValue * 0.24;
    const coreAlpha = state.lightningValue * 0.88;

    state.fxCtx.save();
    state.fxCtx.lineCap = "round";
    state.fxCtx.lineJoin = "round";

    for (const points of state.lightningBolt) {
      if (!points || points.length < 2) continue;

      state.fxCtx.strokeStyle = `rgba(198,222,255,${glowAlpha})`;
      state.fxCtx.lineWidth = 12;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) {
        state.fxCtx.lineTo(points[i].x, points[i].y);
      }
      state.fxCtx.stroke();

      state.fxCtx.strokeStyle = `rgba(255,255,255,${coreAlpha})`;
      state.fxCtx.lineWidth = 2.4;
      state.fxCtx.beginPath();
      state.fxCtx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) {
        state.fxCtx.lineTo(points[i].x, points[i].y);
      }
      state.fxCtx.stroke();
    }

    state.fxCtx.restore();
  }

  function clear() {
    if (state.rafId) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }
    if (state.layoutSyncRaf) {
      window.cancelAnimationFrame(state.layoutSyncRaf);
      state.layoutSyncRaf = 0;
    }
    if (state.resizeObserver) {
      state.resizeObserver.disconnect();
      state.resizeObserver = null;
    }
    state.resizeHost = null;
    if (state.root?.parentElement) state.root.parentElement.removeChild(state.root);
    state.root = null;
    state.skyCanvas = null;
    state.skyCtx = null;
    state.treeCanvas = null;
    state.treeCtx = null;
    state.celestialLayer = null;
    state.precipCanvas = null;
    state.precipCtx = null;
    state.fxCanvas = null;
    state.fxCtx = null;
    state.debugBadge = null;
    state.sunWrap = null;
    state.moonWrap = null;
    state.moonShade = null;
    state.headerHeight = 0;
    state.skyHeight = 0;
    state.treeProfile = null;
    state.treeParticles = [];
    state.snowGroundCover = 0;
    state.snowGroundProfile = [];
    state.snowGroundSeeds = [];
    state.waterGroundCover = 0;
    state.waterGroundProfile = [];
    state.waterGroundSeeds = [];
    state.hailGroundCover = 0;
    state.hailGroundProfile = [];
    state.hailGroundSeeds = [];
    state.lightningValue = 0;
    state.lightningBolt = null;
    state.activeElectricityLevel = 0;
    state.paused = false;
    state.pausedAt = 0;
    state.startTs = 0;
    state.lastFrameTs = 0;
    state.lastSkyDrawTs = 0;
    state.lastTreeDrawTs = 0;
    state.frameScale = 1;
    state.forceSkyRedraw = true;
    state.forceTreeRedraw = true;
  }

  function getDebugState() {
    return {
      scene: state.activeSceneKey,
      period: state.activePeriod,
      phase: state.activePhase,
      hasVideo: false,
      source: "canvas-local",
      precipitation: state.activePhenomenon || "none",
      precipitationAmount: Number.isFinite(state.activePrecipitationAmount) ? Number(state.activePrecipitationAmount.toFixed(1)) : null,
      snowfallAmount: Number.isFinite(state.activeSnowfallAmount) ? Number(state.activeSnowfallAmount.toFixed(1)) : null,
      windSpeed: Math.round(state.activeWindSpeed || 0),
      windCategory: windCategoryFromSpeed(state.activeWindSpeed),
      temperature: Number.isFinite(state.activeTemperature) ? Number(state.activeTemperature.toFixed(1)) : null,
      season: state.activeSeason || null,
      moonPhase: state.activeMoonPhase,
      debugLabel: state.activeDebugLabel
    };
  }

  window.weatherBackgroundEngine = {
    apply,
    clear,
    getDebugState,
    pauseAnimation,
    resumeAnimation
  };
})();
