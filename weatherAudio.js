(function () {
  const AUDIO_DEBUG_KEY = "moja-zahrada-weather-audio-debug-v1";
  const MASTER_VOLUME = 1;
  const LOOP_BOOST = 2.05;
  const DETAIL_BOOST = 1.28;
  const MAX_BUS_GAIN = 1.55;
  const MAX_LAYER_GAIN = 2.35;
  const MAX_DETAIL_DIRECT_GAIN = 0.82;
  const DETAIL_DIRECTOR_HISTORY_LIMIT = 8;
  const DETAIL_DIRECTOR_CONFIG = Object.freeze({
    requestedKeyBias: 1.34,
    globalCooldownMs: {
      safe: [9000, 19000],
      accent: [18000, 32000],
      hero: [28000, 52000]
    },
    categoryCooldownMs: {
      safe: [14000, 26000],
      accent: [28000, 54000],
      hero: [52000, 96000]
    },
    quietWindowMs: {
      safe: [3500, 9000],
      accent: [7000, 15000],
      hero: [14000, 26000]
    },
    fadeInMs: {
      safe: [220, 420],
      accent: [320, 620],
      hero: [520, 860]
    },
    fadeOutMs: {
      safe: [420, 760],
      accent: [620, 1100],
      hero: [900, 1600]
    },
    recentAssetCooldownMs: 65000,
    strongAfterglowMs: 28000,
    maxProminentActive: 1,
    maxTotalShots: 2,
    baseSilenceWeight: 0.34,
    maxSilenceWeight: 0.48
  });
  const DETAIL_DURATION_MULTIPLIER = Object.freeze({
    safe: 1.14,
    accent: 1.12,
    hero: 1.08
  });
  const MIX_CONTINUITY_BLEND = 0.34;
  const MIX_ENERGY_FACTOR_MIN = 0.9;
  const MIX_ENERGY_FACTOR_MAX = 1.08;
  const WEATHER_ORDER = [
    "clear",
    "partly_cloudy",
    "cloudy",
    "overcast",
    "fog",
    "drizzle",
    "rain",
    "heavy_rain",
    "storm_far",
    "storm_near",
    "wind_soft",
    "wind_medium",
    "wind_strong",
    "snow_light",
    "snow_medium",
    "snow_heavy",
    "wet_snow",
    "blizzard_like",
    "hail",
    "post_rain",
    "post_storm",
    "post_snow",
    "frost",
    "heat_haze"
  ];
  const DETAIL_CATEGORY_LIMITS = {
    songbirds: 2,
    bird_motion: 1,
    woodpecker: 1,
    corvids: 1,
    doves: 1,
    owls: 1,
    insects: 1,
    thunder: 1,
    drips: 1,
    mammals: 1,
    amphibians: 1
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(start, end, progress) {
    return start + ((end - start) * progress);
  }

  function randomBetween(min, max) {
    return min + (Math.random() * (max - min));
  }

  function pickRandom(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return list[Math.floor(Math.random() * list.length)] || list[0] || "";
  }

  function randomFromRange(range) {
    if (Array.isArray(range) && range.length >= 2) {
      return randomBetween(Number(range[0]) || 0, Number(range[1]) || Number(range[0]) || 0);
    }
    return Number(range) || 0;
  }

  function weightedPick(list) {
    const weightedList = (Array.isArray(list) ? list : []).filter((item) => Number(item?.weight) > 0);
    if (!weightedList.length) return null;
    const totalWeight = weightedList.reduce((sum, item) => sum + Number(item.weight || 0), 0);
    if (!(totalWeight > 0)) return null;
    let cursor = Math.random() * totalWeight;
    for (const item of weightedList) {
      cursor -= Number(item.weight || 0);
      if (cursor <= 0) return item;
    }
    return weightedList[weightedList.length - 1] || null;
  }

  function averageRange(range) {
    if (Array.isArray(range) && range.length >= 2) {
      return ((Number(range[0]) || 0) + (Number(range[1]) || Number(range[0]) || 0)) / 2;
    }
    return Number(range) || 0;
  }

  function uniq(list) {
    return Array.from(new Set((Array.isArray(list) ? list : []).filter(Boolean)));
  }

  function asArray(value) {
    return Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];
  }

  function normalizeWeatherKey(value) {
    const weather = String(value || "").trim().toLowerCase();
    return WEATHER_ORDER.includes(weather) ? weather : "clear";
  }

  function normalizeTimeOfDay(value) {
    const time = String(value || "").trim().toLowerCase();
    if (time === "morning") return "dawn";
    if (time === "evening" || time === "sunset") return "evening";
    if (time === "night") return "night";
    return time === "dawn" || time === "day" ? time : "day";
  }

  function normalizeSeason(value) {
    const season = String(value || "").trim().toLowerCase();
    if (["spring", "summer", "autumn", "fall", "winter"].includes(season)) {
      return season === "fall" ? "autumn" : season;
    }
    return "spring";
  }

  function normalizeTemperatureBand(value) {
    const band = String(value || "").trim().toLowerCase();
    if (["cold", "mild", "warm", "hot"].includes(band)) return band;
    return "mild";
  }

  function isRealMobileRuntimeAudioMode() {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("mobile-preview-embedded") === "1") return false;
    } catch (error) {
      // Ignore URL parsing failures and continue with viewport heuristics.
    }
    if (window.parent !== window) return false;
    const narrowScreen = Math.max(0, Number(window.innerWidth) || 0) <= 820;
    const coarsePointer = typeof window.matchMedia === "function"
      ? window.matchMedia("(pointer: coarse)").matches
      : false;
    return (coarsePointer && narrowScreen)
      || /Android|iPhone|iPad|iPod|Mobile/i.test(String(navigator?.userAgent || ""));
  }

  function mobileAudioLoopDelayMs() {
    return isRealMobileRuntimeAudioMode() ? 140 : 0;
  }

  function mobileSilentLoopHoldMs() {
    return isRealMobileRuntimeAudioMode() ? 12000 : 0;
  }

  function resolveLoopPreloadMode(lowPerformanceMobile, config) {
    if (!lowPerformanceMobile) return "auto";
    if (!config) return "metadata";
    return ["time", "weather", "texture"].includes(String(config.group || ""))
      ? "auto"
      : "metadata";
  }

  function layerDef(options) {
    return {
      group: "weather",
      kind: "loop",
      fileList: [],
      baseVolume: 0.15,
      crossfadeDuration: 3.8,
      playbackRate: [0.98, 1.02],
      seasonalWeight: 1,
      ...options
    };
  }

  function detailDef(options) {
    return {
      group: "details",
      kind: "oneshot",
      fileList: [],
      baseVolume: 0.12,
      allowedTimes: [],
      allowedWeather: [],
      blockedWeather: [],
      blockedTemperature: [],
      allowedTemperature: [],
      minTemperatureC: null,
      maxTemperatureC: null,
      allowedSeasons: [],
      category: "details",
      intervalMin: 40000,
      intervalMax: 120000,
      cooldown: 22000,
      chance: 1,
      priority: 0,
      role: "",
      directorBias: 1,
      maxDurationMs: 0,
      playbackRateMin: 0.98,
      playbackRateMax: 1.02,
      panMin: -0.35,
      panMax: 0.35,
      ...options
    };
  }

  function scenePreset(options) {
    return {
      timeLayers: [],
      weatherLayers: [],
      textureLayers: [],
      allowDetails: [],
      blockDetails: [],
      groupVolumes: {
        master: 1,
        time: 1,
        weather: 1,
        texture: 1,
        details: 1
      },
      priority: "low",
      crossfadeDuration: 4,
      ...options
    };
  }

  const SOUNDSCAPE_CONFIG = {
    groups: {
      master: 1,
      time: 1.18,
      weather: 1.04,
      texture: 0.98,
      details: 0.96
    },
    timeLayers: {
      dawn_chorus_rich: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/forest-birds-singing.mp3",
          "assets/weather-audio/birds-spring-forest.mp3",
          "assets/weather-audio/relaxing-forest-birds-2026.mp3"
        ],
        baseVolume: 0.40,
        crossfadeDuration: 4.8
      }),
      dawn_chorus_soft: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/forest-birds-chirp-ambience.mp3",
          "assets/weather-audio/relaxing-forest-birds-2026.mp3",
          "assets/weather-audio/birds-spring-forest.mp3"
        ],
        baseVolume: 0.26,
        crossfadeDuration: 4.8
      }),
      dawn_chorus_sparse: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/european-forest-ambience.mp3",
          "assets/weather-audio/village-ambience.mp3"
        ],
        baseVolume: 0.20,
        crossfadeDuration: 4.8
      }),
      dawn_garden_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/european-forest-ambience.mp3",
          "assets/weather-audio/village-ambience.mp3"
        ],
        baseVolume: 0.12,
        crossfadeDuration: 4.8
      }),
      day_garden_soft: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/european-forest-ambience.mp3",
          "assets/weather-audio/village-ambience.mp3"
        ],
        baseVolume: 0.12,
        crossfadeDuration: 4.2
      }),
      day_garden_open: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/village-ambience.mp3",
          "assets/weather-audio/european-forest-ambience.mp3"
        ],
        baseVolume: 0.10,
        crossfadeDuration: 4.2
      }),
      day_forest_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/european-forest-ambience.mp3",
          "assets/weather-audio/village-ambience.mp3"
        ],
        baseVolume: 0.08,
        crossfadeDuration: 4.2
      }),
      evening_softbirds: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/day-birds-alt.mp3",
          "assets/weather-audio/birds-forest-loop.mp3",
          "assets/weather-audio/forest-birds-chirp-ambience.mp3"
        ],
        baseVolume: 0.28,
        crossfadeDuration: 4.4
      }),
      evening_garden_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/birds-near-river.mp3",
          "assets/weather-audio/european-forest-ambience.mp3",
          "assets/weather-audio/village-ambience.mp3"
        ],
        baseVolume: 0.16,
        crossfadeDuration: 4.4
      }),
      night_deep_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/night-bed.mp3"
        ],
        baseVolume: 0.08,
        crossfadeDuration: 5.4
      }),
      night_forest_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/night-bed.mp3"
        ],
        baseVolume: 0.06,
        crossfadeDuration: 5.4
      }),
      night_cold_air: layerDef({
        group: "time",
        fileList: [
          "assets/weather-audio/winter-wind-loop.mp3"
        ],
        baseVolume: 0.09,
        crossfadeDuration: 5.8
      })
    },
    weatherLayers: {
      clear_air_soft: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.06
      }),
      cloud_air_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/wind-soft.mp3",
          "assets/weather-audio/wind-main.mp3"
        ],
        baseVolume: 0.08
      }),
      overcast_air_heavy: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.08
      }),
      fog_air_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/wind-soft.mp3",
          "assets/weather-audio/winter-wind-loop.mp3"
        ],
        baseVolume: 0.12,
        playbackRate: [1, 1],
        crossfadeDuration: 5.6
      }),
      drizzle_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/rain-light.mp3"
        ],
        baseVolume: 0.36
      }),
      rain_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/rain-light.mp3",
          "assets/weather-audio/light-rain-atmosphere.mp3"
        ],
        baseVolume: 0.44
      }),
      rain_heavy: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/rain-heavy.mp3"],
        baseVolume: 0.58
      }),
      storm_far_bed: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/storm-bed.mp3",
          "assets/weather-audio/distant-thunders.mp3",
          "assets/weather-audio/thunder-background.mp3"
        ],
        baseVolume: 0.36
      }),
      storm_near_bed: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/storm-bed.mp3",
          "assets/weather-audio/thunder-background.mp3"
        ],
        baseVolume: 0.50
      }),
      wind_soft_trees: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.09
      }),
      wind_medium_trees: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-main.mp3"],
        baseVolume: 0.18
      }),
      wind_strong_trees: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-main.mp3"],
        baseVolume: 0.48
      }),
      snow_air_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/winter-wind-loop.mp3",
          "assets/weather-audio/wind-soft.mp3"
        ],
        baseVolume: 0.03,
        crossfadeDuration: 5.6
      }),
      snow_air_heavy: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/blizzard-cold-winds.mp3",
          "assets/weather-audio/winter-wind-loop.mp3"
        ],
        baseVolume: 0.10,
        crossfadeDuration: 5.8
      }),
      snow_wind_soft: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/winter-wind-loop.mp3",
          "assets/weather-audio/wind-soft.mp3"
        ],
        baseVolume: 0.04,
        crossfadeDuration: 5.4
      }),
      wet_snow_slush: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/rain-light.mp3"],
        baseVolume: 0.12
      }),
      hail_hits_bed: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/hail-soft.mp3"],
        baseVolume: 0.42
      }),
      frost_cold_air: layerDef({
        group: "weather",
        fileList: [
          "assets/weather-audio/winter-wind-loop.mp3",
          "assets/weather-audio/wind-soft.mp3"
        ],
        baseVolume: 0.04,
        crossfadeDuration: 5.6
      }),
      heat_soft_air: layerDef({
        group: "weather",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.08
      })
    },
    textureLayers: {
      crowns_soft: layerDef({
        group: "texture",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.07,
        crossfadeDuration: 4.2
      }),
      crowns_medium: layerDef({
        group: "texture",
        fileList: ["assets/weather-audio/wind-soft.mp3"],
        baseVolume: 0.10,
        crossfadeDuration: 4.2
      }),
      crowns_strong: layerDef({
        group: "texture",
        fileList: ["assets/weather-audio/wind-main.mp3"],
        baseVolume: 0.22,
        crossfadeDuration: 4
      }),
      wet_space_soft: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/light-rain-atmosphere.mp3",
          "assets/weather-audio/rain-dripping-tree.mp3"
        ],
        baseVolume: 0.10,
        crossfadeDuration: 4.4
      }),
      winter_space_soft: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/winter-wind-loop.mp3",
          "assets/weather-audio/wind-soft.mp3"
        ],
        baseVolume: 0.03,
        playbackRate: [1, 1],
        crossfadeDuration: 5.4
      }),
      day_gentle_insects: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/insect-buzzing-soft.mp3"
        ],
        baseVolume: 0.04,
        crossfadeDuration: 4.4
      }),
      night_crickets_bed: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/night-crickets.mp3",
          "assets/weather-audio/night-crickets-alt.mp3",
          "assets/weather-audio/crickets-jungle-night.mp3",
          "assets/weather-audio/cricket-orange-night.mp3",
          "assets/weather-audio/night-crickets-summer.mp3"
        ],
        baseVolume: 0.28,
        crossfadeDuration: 2.8
      }),
      evening_warm_insects: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/cricket-orange-night.mp3",
          "assets/weather-audio/night-crickets-summer.mp3",
          "assets/weather-audio/night-crickets-alt.mp3",
          "assets/weather-audio/summer-night-soft.mp3"
        ],
        baseVolume: 0.18,
        crossfadeDuration: 3.4
      }),
      autumn_leaves_soft: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/dry-leaves-rustling.mp3",
          "assets/weather-audio/dry-leaves-sound.mp3"
        ],
        baseVolume: 0.08,
        crossfadeDuration: 4.2
      }),
      post_rain_drip_bed: layerDef({
        group: "texture",
        fileList: [
          "assets/weather-audio/light-rain-atmosphere.mp3",
          "assets/weather-audio/dripping-water-gutter.mp3",
          "assets/weather-audio/rain-dripping-tree.mp3"
        ],
        baseVolume: 0.12,
        crossfadeDuration: 4.6
      })
    },
    detailEvents: {
      day_bird_call: detailDef({
        fileList: [
          "assets/weather-audio/little-bird-chirp.mp3",
          "assets/weather-audio/double-bird-chirp.mp3",
          "assets/weather-audio/little-bird-chirp.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "fog", "drizzle", "wind_soft", "heat_haze", "post_rain", "post_storm"],
        blockedWeather: ["rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_medium", "snow_heavy", "blizzard_like"],
        baseVolume: 0.13,
        intervalMin: 24000,
        intervalMax: 76000,
        cooldown: 18000,
        chance: 0.54,
        priority: 1,
        category: "songbirds",
        role: "safe",
        maxDurationMs: 1700,
        playbackRateMin: 0.98,
        playbackRateMax: 1.05,
        panMin: -0.62,
        panMax: 0.62
      }),
      bird_wings: detailDef({
        fileList: [
          "assets/weather-audio/bird-wings.mp3",
          "assets/weather-audio/bird-medium-flutter.mp3",
          "assets/weather-audio/bird-flight-pass.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "wind_soft", "heat_haze", "post_rain"],
        blockedWeather: ["rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_medium", "snow_heavy", "blizzard_like"],
        baseVolume: 0.10,
        intervalMin: 55000,
        intervalMax: 180000,
        cooldown: 45000,
        chance: 0.62,
        priority: 1,
        category: "bird_motion",
        role: "safe",
        maxDurationMs: 1400,
        playbackRateMin: 0.96,
        playbackRateMax: 1.04,
        panMin: -0.72,
        panMax: 0.72
      }),
      woodpecker: detailDef({
        fileList: [
          "assets/weather-audio/woodpecker-orange-pecking.mp3",
          "assets/weather-audio/woodpecker-orange-pecking.mp3",
          "assets/weather-audio/woodpecker-orange-pecking.mp3",
          "assets/weather-audio/woodpecker-orange-pecking.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "wind_soft", "heat_haze", "post_rain", "post_storm", "frost", "snow_light"],
        blockedWeather: ["fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like"],
        allowedSeasons: ["spring", "summer", "autumn", "winter"],
        baseVolume: 0.11,
        intervalMin: 110000,
        intervalMax: 280000,
        cooldown: 120000,
        chance: 0.22,
        priority: 1,
        category: "woodpecker",
        role: "accent",
        maxDurationMs: 2200,
        playbackRateMin: 0.99,
        playbackRateMax: 1.02,
        panMin: -0.42,
        panMax: 0.42
      }),
      crow_call: detailDef({
        fileList: [
          "assets/weather-audio/crow-orange-call.mp3",
          "assets/weather-audio/crow-orange-caw.mp3",
          "assets/weather-audio/crow-orange-triple.mp3",
          "assets/weather-audio/crow-orange-harsh.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening"],
        allowedWeather: ["cloudy", "overcast", "drizzle", "rain", "wind_soft", "wind_medium", "post_rain", "post_storm", "post_snow", "frost", "snow_light", "snow_medium"],
        blockedWeather: ["heavy_rain", "storm_near", "hail", "blizzard_like"],
        baseVolume: 0.09,
        intervalMin: 22000,
        intervalMax: 110000,
        cooldown: 28000,
        chance: 0.58,
        priority: 1,
        category: "corvids",
        role: "accent",
        maxDurationMs: 4200
      }),
      owl_call: detailDef({
        fileList: [
          "assets/weather-audio/owl-orange-hooting.mp3",
          "assets/weather-audio/owl-orange-night.mp3",
          "assets/weather-audio/owl.mp3",
          "assets/weather-audio/owl-orange-hooting.mp3",
          "assets/weather-audio/owl-orange-night.mp3",
          "assets/weather-audio/owl-orange-hoot.mp3",
          "assets/weather-audio/owl-orange-single.mp3"
        ],
        allowedTimes: ["night"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "fog", "wind_soft", "snow_light", "snow_medium", "snow_heavy", "post_rain", "post_storm", "post_snow", "frost"],
        blockedWeather: ["drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "hail", "wet_snow", "blizzard_like"],
        baseVolume: 0.18,
        intervalMin: 40000,
        intervalMax: 120000,
        cooldown: 46000,
        chance: 0.58,
        priority: 2,
        category: "owls",
        role: "accent",
        maxDurationMs: 6200,
        panMin: -0.36,
        panMax: 0.36
      }),
      wolf_far: detailDef({
        fileList: [
          "assets/weather-audio/wolf.mp3",
          "assets/weather-audio/wolf-orange-pack.mp3"
        ],
        allowedTimes: ["night"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "frost", "post_snow", "post_rain", "post_storm"],
        blockedWeather: ["rain", "heavy_rain", "storm_far", "storm_near", "hail", "blizzard_like"],
        baseVolume: 0.10,
        intervalMin: 120000,
        intervalMax: 260000,
        cooldown: 120000,
        chance: 0,
        priority: 1,
        category: "mammals",
        role: "hero",
        panMin: -0.5,
        panMax: 0.5
      }),
      dog_far: detailDef({
        fileList: ["assets/weather-audio/dog-orange-night.mp3"],
        allowedTimes: ["night"],
        allowedWeather: WEATHER_ORDER,
        blockedWeather: [],
        baseVolume: 0.05,
        intervalMin: 140000,
        intervalMax: 320000,
        cooldown: 240000,
        chance: 0.14,
        priority: 1,
        category: "mammals",
        role: "accent",
        maxDurationMs: 4200,
        panMin: -0.58,
        panMax: 0.58
      }),
      bee_pass: detailDef({
        fileList: [
          "assets/weather-audio/bee-buzz.mp3",
          "assets/weather-audio/bee-big-flying.mp3",
          "assets/weather-audio/insect-fast-pass.mp3"
        ],
        allowedTimes: ["dawn", "day"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "wind_soft", "heat_haze", "post_rain"],
        blockedWeather: ["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "wind_medium", "wind_strong", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
        allowedSeasons: ["spring", "summer", "autumn"],
        baseVolume: 0.08,
        intervalMin: 36000,
        intervalMax: 100000,
        cooldown: 30000,
        chance: 0.18,
        priority: 1,
        category: "insects",
        role: "safe",
        playbackRateMin: 0.97,
        playbackRateMax: 1.03,
        panMin: -0.55,
        panMax: 0.55
      }),
      bumblebee_pass: detailDef({
        fileList: [
          "assets/weather-audio/bumblebee-orange.mp3",
          "assets/weather-audio/bumblebee-orange-alt.mp3",
          "assets/weather-audio/bee-big-flying.mp3"
        ],
        allowedTimes: ["dawn", "day"],
        allowedWeather: ["clear", "partly_cloudy", "wind_soft", "post_rain"],
        blockedWeather: ["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "wind_medium", "wind_strong", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
        allowedSeasons: ["spring", "summer", "autumn"],
        minTemperatureC: 10,
        baseVolume: 0.09,
        intervalMin: 36000,
        intervalMax: 110000,
        cooldown: 24000,
        chance: 0.46,
        priority: 1,
        category: "insects",
        role: "safe",
        playbackRateMin: 0.96,
        playbackRateMax: 1.02,
        panMin: -0.52,
        panMax: 0.52
      }),
      dove_call: detailDef({
        fileList: [
          "assets/weather-audio/dove-orange-collared.mp3",
          "assets/weather-audio/dove-orange-calling.mp3",
          "assets/weather-audio/dove-orange-authentic.mp3"
        ],
        allowedTimes: ["day", "evening"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "wind_soft", "heat_haze"],
        blockedWeather: ["rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_light", "snow_medium", "snow_heavy", "blizzard_like"],
        baseVolume: 0.09,
        intervalMin: 70000,
        intervalMax: 190000,
        cooldown: 90000,
        chance: 0.34,
        category: "doves",
        role: "safe",
        maxDurationMs: 2600
      }),
      cuckoo_call: detailDef({
        fileList: [
          "assets/weather-audio/cuckoo-bird-song.mp3"
        ],
        allowedTimes: ["dawn", "day"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "wind_soft", "post_rain"],
        blockedWeather: ["fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
        allowedSeasons: ["spring", "summer"],
        baseVolume: 0.09,
        intervalMin: 70000,
        intervalMax: 180000,
        cooldown: 65000,
        chance: 0.32,
        priority: 1,
        category: "songbirds",
        role: "accent",
        maxDurationMs: 2200,
        playbackRateMin: 0.98,
        playbackRateMax: 1.02,
        panMin: -0.48,
        panMax: 0.48
      }),
      squirrel_rustle: detailDef({
        fileList: [
          "assets/weather-audio/squirrel-sounds.mp3",
          "assets/weather-audio/squirrel-sounds.mp3",
          "assets/weather-audio/dry-leaves-rustling.mp3"
        ],
        allowedTimes: ["day", "evening"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "wind_soft", "post_rain"],
        blockedWeather: ["rain", "heavy_rain", "storm_far", "storm_near", "hail", "wind_strong", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like"],
        allowedSeasons: ["summer", "autumn"],
        baseVolume: 0.09,
        intervalMin: 30000,
        intervalMax: 120000,
        cooldown: 26000,
        chance: 0.22,
        priority: 1,
        category: "mammals",
        role: "safe",
        playbackRateMin: 0.96,
        playbackRateMax: 1.03,
        panMin: -0.46,
        panMax: 0.46
      }),
      mosquito_pass: detailDef({
        fileList: [
          "assets/weather-audio/insect-fast-pass.mp3",
          "assets/weather-audio/insect-fast-pass.mp3",
          "assets/weather-audio/mosquito-orange.mp3"
        ],
        allowedTimes: ["evening", "night"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "heat_haze", "post_rain"],
        blockedWeather: ["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "wind_medium", "wind_strong", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
        allowedTemperature: ["warm", "hot"],
        allowedSeasons: ["summer"],
        baseVolume: 0.035,
        intervalMin: 50000,
        intervalMax: 150000,
        cooldown: 42000,
        chance: 0.12,
        priority: 1,
        category: "insects",
        role: "safe",
        maxDurationMs: 1000,
        playbackRateMin: 0.99,
        playbackRateMax: 1.03,
        panMin: -0.34,
        panMax: 0.34
      }),
      frog_call: detailDef({
        fileList: [
          "assets/weather-audio/frog-orange-night.mp3",
          "assets/weather-audio/frog-orange-night.mp3"
        ],
        allowedTimes: ["evening", "night"],
        allowedWeather: ["clear", "partly_cloudy", "cloudy", "overcast", "wind_soft", "post_rain", "post_storm"],
        blockedWeather: ["fog", "drizzle", "rain", "heavy_rain", "storm_near", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
        allowedTemperature: ["mild", "warm", "hot"],
        allowedSeasons: ["spring", "summer", "autumn"],
        baseVolume: 0.07,
        intervalMin: 70000,
        intervalMax: 180000,
        cooldown: 60000,
        chance: 0.22,
        priority: 1,
        category: "amphibians",
        role: "accent",
        maxDurationMs: 2400,
        playbackRateMin: 0.98,
        playbackRateMax: 1.02,
        panMin: -0.56,
        panMax: 0.56
      }),
      tree_drips: detailDef({
        fileList: [
          "assets/weather-audio/dripping-water-gutter.mp3",
          "assets/weather-audio/rain-dripping-tree.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening", "night"],
        allowedWeather: ["post_rain", "post_storm", "drizzle"],
        baseVolume: 0.09,
        intervalMin: 18000,
        intervalMax: 48000,
        cooldown: 16000,
        category: "drips",
        role: "safe"
      }),
      thunder_far: detailDef({
        fileList: [
          "assets/weather-audio/thunder-soft.mp3",
          "assets/weather-audio/distant-thunders.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening", "night"],
        allowedWeather: ["storm_far", "storm_near"],
        baseVolume: 0.18,
        intervalMin: 35000,
        intervalMax: 95000,
        cooldown: 26000,
        priority: 3,
        chance: 0.72,
        category: "thunder",
        role: "hero",
        panMin: -0.6,
        panMax: 0.6
      }),
      thunder_near: detailDef({
        fileList: [
          "assets/weather-audio/thunder-soft.mp3",
          "assets/weather-audio/thunder-background.mp3"
        ],
        allowedTimes: ["dawn", "day", "evening", "night"],
        allowedWeather: ["storm_near"],
        baseVolume: 0.22,
        intervalMin: 18000,
        intervalMax: 52000,
        cooldown: 22000,
        priority: 4,
        chance: 0.84,
        category: "thunder",
        role: "hero",
        playbackRateMin: 0.95,
        playbackRateMax: 1.01,
        panMin: -0.64,
        panMax: 0.64
      })
    },
    rules: {
      priority: {
        hail: "extreme",
        storm_near: "extreme",
        heavy_rain: "high",
        wind_strong: "high",
        blizzard_like: "high",
        storm_far: "medium",
        rain: "medium",
        snow_heavy: "medium",
        overcast: "medium",
        fog: "medium",
        drizzle: "medium",
        wind_medium: "medium"
      },
      silenceBiologyWeathers: ["hail", "storm_near", "heavy_rain", "wind_strong", "blizzard_like"],
      dampBiologyWeathers: ["storm_far", "rain", "snow_heavy", "snow_medium", "wet_snow", "fog", "wind_medium"],
      insectBlockingWeathers: ["fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "wind_medium", "wind_strong", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"],
      quietWeatherTypes: ["fog", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "frost", "night", "post_snow"]
    }
  };

  const TIME_TEMPLATES = {
    dawn: scenePreset({
      timeLayers: ["dawn_chorus_rich", "dawn_chorus_soft", "dawn_garden_air"],
      textureLayers: ["crowns_soft", "day_gentle_insects", "autumn_leaves_soft"],
      allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "bee_pass", "bumblebee_pass", "cuckoo_call"],
      blockDetails: ["owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 1.08, weather: 0.88, texture: 0.74, details: 0.96 },
      priority: "low",
      crossfadeDuration: 5
    }),
    day: scenePreset({
      timeLayers: ["day_garden_soft", "day_garden_open", "day_forest_air"],
      textureLayers: ["crowns_soft", "day_gentle_insects", "autumn_leaves_soft"],
      allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "crow_call", "bee_pass", "bumblebee_pass", "dove_call", "cuckoo_call", "squirrel_rustle"],
      blockDetails: ["owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.98, weather: 0.90, texture: 0.76, details: 0.86 },
      priority: "low",
      crossfadeDuration: 4.4
    }),
    evening: scenePreset({
      timeLayers: ["evening_softbirds", "evening_garden_air"],
      textureLayers: ["crowns_soft", "evening_warm_insects", "autumn_leaves_soft"],
      allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "crow_call", "dove_call", "squirrel_rustle", "frog_call", "mosquito_pass"],
      blockDetails: ["owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.86, weather: 0.88, texture: 0.74, details: 0.74 },
      priority: "low",
      crossfadeDuration: 4.6
    }),
    night: scenePreset({
      timeLayers: ["night_deep_air", "night_cold_air"],
      textureLayers: ["night_crickets_bed"],
      allowDetails: ["owl_call", "dog_far", "frog_call", "mosquito_pass"],
      blockDetails: ["woodpecker", "crow_call", "bee_pass", "bumblebee_pass", "dove_call", "cuckoo_call", "squirrel_rustle"],
      groupVolumes: { master: 1, time: 0.72, weather: 0.88, texture: 0.68, details: 0.92 },
      priority: "low",
      crossfadeDuration: 5.6
    })
  };

  const WEATHER_TEMPLATES = {
    clear: scenePreset({
      weatherLayers: ["clear_air_soft"],
      textureLayers: ["crowns_soft", "day_gentle_insects"],
      allowDetails: ["bee_pass", "bumblebee_pass"],
      groupVolumes: { master: 1, time: 1.02, weather: 0.46, texture: 0.62, details: 0.94 },
      priority: "low",
      crossfadeDuration: 4.8
    }),
    partly_cloudy: scenePreset({
      weatherLayers: ["clear_air_soft", "cloud_air_soft"],
      textureLayers: ["crowns_soft", "day_gentle_insects"],
      allowDetails: ["bee_pass", "bumblebee_pass"],
      groupVolumes: { master: 1, time: 1, weather: 0.54, texture: 0.66, details: 0.88 },
      priority: "low",
      crossfadeDuration: 4.6
    }),
    cloudy: scenePreset({
      weatherLayers: ["cloud_air_soft"],
      textureLayers: ["crowns_soft"],
      allowDetails: ["crow_call"],
      groupVolumes: { master: 1, time: 0.94, weather: 0.62, texture: 0.70, details: 0.72 },
      priority: "low",
      crossfadeDuration: 4.4
    }),
    overcast: scenePreset({
      weatherLayers: [],
      textureLayers: ["crowns_medium"],
      allowDetails: ["crow_call"],
      blockDetails: ["bee_pass"],
      groupVolumes: { master: 1, time: 0.84, weather: 0, texture: 0.32, details: 0.56 },
      priority: "medium",
      crossfadeDuration: 4.2
    }),
    fog: scenePreset({
      weatherLayers: [],
      textureLayers: [],
      blockDetails: ["bee_pass", "dove_call"],
      groupVolumes: { master: 1, time: 0.74, weather: 0, texture: 0, details: 0.42 },
      priority: "medium",
      crossfadeDuration: 5.8
    }),
    drizzle: scenePreset({
      weatherLayers: ["drizzle_soft"],
      textureLayers: ["wet_space_soft"],
      allowDetails: ["tree_drips"],
      blockDetails: ["bee_pass", "woodpecker", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.72, weather: 0.88, texture: 0.74, details: 0.44 },
      priority: "medium",
      crossfadeDuration: 3.8
    }),
    rain: scenePreset({
      weatherLayers: ["rain_soft"],
      textureLayers: ["wet_space_soft"],
      blockDetails: ["bee_pass", "woodpecker", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.46, weather: 1, texture: 0.84, details: 0.22 },
      priority: "medium",
      crossfadeDuration: 3.2
    }),
    heavy_rain: scenePreset({
      weatherLayers: ["rain_heavy"],
      textureLayers: ["wet_space_soft", "crowns_medium"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.24, weather: 1.12, texture: 0.88, details: 0.12 },
      priority: "high",
      crossfadeDuration: 2.8
    }),
    storm_far: scenePreset({
      weatherLayers: ["rain_soft", "storm_far_bed", "wind_medium_trees"],
      textureLayers: ["wet_space_soft"],
      allowDetails: ["thunder_far"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.20, weather: 1.16, texture: 0.86, details: 0.22 },
      priority: "medium",
      crossfadeDuration: 2.8
    }),
    storm_near: scenePreset({
      weatherLayers: ["rain_heavy", "storm_near_bed", "wind_strong_trees"],
      textureLayers: ["wet_space_soft"],
      allowDetails: ["thunder_far", "thunder_near"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.12, weather: 1.22, texture: 0.82, details: 0.18 },
      priority: "high",
      crossfadeDuration: 2.4
    }),
    wind_soft: scenePreset({
      weatherLayers: [],
      textureLayers: [],
      groupVolumes: { master: 1, time: 0.98, weather: 0, texture: 0, details: 0.92 },
      priority: "low",
      crossfadeDuration: 4.2
    }),
    wind_medium: scenePreset({
      weatherLayers: ["wind_medium_trees"],
      textureLayers: ["crowns_medium"],
      blockDetails: ["bee_pass"],
      groupVolumes: { master: 1, time: 0.74, weather: 0.52, texture: 0.62, details: 0.38 },
      priority: "medium",
      crossfadeDuration: 3.8
    }),
    wind_strong: scenePreset({
      weatherLayers: ["wind_strong_trees"],
      textureLayers: ["crowns_strong"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.28, weather: 1.04, texture: 0.98, details: 0.16 },
      priority: "high",
      crossfadeDuration: 3
    }),
    snow_light: scenePreset({
      weatherLayers: [],
      textureLayers: [],
      allowDetails: ["crow_call"],
      blockDetails: ["bee_pass", "dove_call", "woodpecker", "wolf_far"],
      groupVolumes: { master: 1, time: 0.42, weather: 0, texture: 0, details: 0.28 },
      priority: "medium",
      crossfadeDuration: 5.8
    }),
    snow_medium: scenePreset({
      weatherLayers: ["snow_air_soft", "snow_wind_soft"],
      textureLayers: ["winter_space_soft"],
      allowDetails: ["crow_call"],
      blockDetails: ["bee_pass", "dove_call", "woodpecker", "wolf_far"],
      groupVolumes: { master: 1, time: 0.30, weather: 0.56, texture: 0.72, details: 0.22 },
      priority: "medium",
      crossfadeDuration: 5.8
    }),
    snow_heavy: scenePreset({
      weatherLayers: ["snow_air_heavy", "snow_wind_soft"],
      textureLayers: ["winter_space_soft"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.18, weather: 0.92, texture: 0.74, details: 0.12 },
      priority: "medium",
      crossfadeDuration: 5.8
    }),
    wet_snow: scenePreset({
      weatherLayers: ["snow_air_soft", "wet_snow_slush"],
      textureLayers: ["winter_space_soft"],
      blockDetails: ["bee_pass", "woodpecker", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.24, weather: 0.92, texture: 0.70, details: 0.14 },
      priority: "medium",
      crossfadeDuration: 5.2
    }),
    blizzard_like: scenePreset({
      weatherLayers: ["snow_air_heavy", "wind_strong_trees"],
      textureLayers: ["winter_space_soft"],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.10, weather: 1, texture: 0.78, details: 0.08 },
      priority: "high",
      crossfadeDuration: 2.8
    }),
    hail: scenePreset({
      weatherLayers: ["hail_hits_bed", "wind_medium_trees"],
      textureLayers: [],
      allowDetails: [],
      blockDetails: ["bee_pass", "woodpecker", "crow_call", "dove_call", "owl_call", "wolf_far"],
      groupVolumes: { master: 1, time: 0.08, weather: 1.18, texture: 0.28, details: 0.14 },
      priority: "extreme",
      crossfadeDuration: 2.2
    }),
    post_rain: scenePreset({
      weatherLayers: ["clear_air_soft"],
      textureLayers: ["post_rain_drip_bed", "wet_space_soft"],
      allowDetails: ["tree_drips", "crow_call"],
      blockDetails: ["thunder_far", "thunder_near"],
      groupVolumes: { master: 1, time: 0.96, weather: 0.54, texture: 0.84, details: 0.74 },
      priority: "low",
      crossfadeDuration: 4.8
    }),
    post_storm: scenePreset({
      weatherLayers: ["cloud_air_soft", "clear_air_soft"],
      textureLayers: ["post_rain_drip_bed", "wet_space_soft"],
      allowDetails: ["tree_drips", "crow_call"],
      blockDetails: ["bee_pass"],
      groupVolumes: { master: 1, time: 0.82, weather: 0.62, texture: 0.86, details: 0.56 },
      priority: "medium",
      crossfadeDuration: 4.8
    }),
    post_snow: scenePreset({
      weatherLayers: ["snow_air_soft"],
      textureLayers: ["winter_space_soft"],
      allowDetails: ["crow_call"],
      blockDetails: ["bee_pass"],
      groupVolumes: { master: 1, time: 0.44, weather: 0.56, texture: 0.64, details: 0.26 },
      priority: "low",
      crossfadeDuration: 5.8
    }),
    frost: scenePreset({
      weatherLayers: ["frost_cold_air"],
      textureLayers: ["winter_space_soft"],
      allowDetails: ["crow_call", "woodpecker"],
      blockDetails: ["bee_pass", "dove_call"],
      groupVolumes: { master: 1, time: 0.52, weather: 0.56, texture: 0.62, details: 0.26 },
      priority: "medium",
      crossfadeDuration: 5.8
    }),
    heat_haze: scenePreset({
      weatherLayers: [],
      textureLayers: [],
      allowDetails: ["bee_pass"],
      groupVolumes: { master: 1, time: 0.72, weather: 0, texture: 0, details: 0.42 },
      priority: "low",
      crossfadeDuration: 4.4
    })
  };

  function combineVolumes(base = {}, extra = {}) {
    return {
      master: (base.master ?? 1) * (extra.master ?? 1),
      time: (base.time ?? 1) * (extra.time ?? 1),
      weather: (base.weather ?? 1) * (extra.weather ?? 1),
      texture: (base.texture ?? 1) * (extra.texture ?? 1),
      details: (base.details ?? 1) * (extra.details ?? 1)
    };
  }

  function mergeScenePresets(timePreset, weatherPreset, override = {}) {
    return scenePreset({
      timeLayers: uniq([...asArray(timePreset.timeLayers), ...asArray(weatherPreset.timeLayers), ...asArray(override.timeLayers)]),
      weatherLayers: uniq([...asArray(timePreset.weatherLayers), ...asArray(weatherPreset.weatherLayers), ...asArray(override.weatherLayers)]),
      textureLayers: uniq([...asArray(timePreset.textureLayers), ...asArray(weatherPreset.textureLayers), ...asArray(override.textureLayers)]),
      allowDetails: uniq([...asArray(timePreset.allowDetails), ...asArray(weatherPreset.allowDetails), ...asArray(override.allowDetails)]),
      blockDetails: uniq([...asArray(timePreset.blockDetails), ...asArray(weatherPreset.blockDetails), ...asArray(override.blockDetails)]),
      groupVolumes: combineVolumes(combineVolumes(timePreset.groupVolumes, weatherPreset.groupVolumes), override.groupVolumes || {}),
      priority: override.priority || weatherPreset.priority || timePreset.priority || "low",
      crossfadeDuration: override.crossfadeDuration || weatherPreset.crossfadeDuration || timePreset.crossfadeDuration || 4
    });
  }

  const SCENE_OVERRIDES = {
    dawn: {
      clear: { allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "bee_pass", "bumblebee_pass", "cuckoo_call"], groupVolumes: { details: 1.04, time: 1.04, texture: 1.04 } },
      wind_soft: { allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "crow_call", "cuckoo_call"], groupVolumes: { details: 1.00, weather: 0.92, texture: 1.02 } },
      overcast: { timeLayers: ["dawn_chorus_sparse", "dawn_garden_air"], groupVolumes: { time: 0.84, details: 0.92 } },
      fog: { timeLayers: [], allowDetails: ["day_bird_call"], groupVolumes: { time: 0.42, weather: 0, texture: 0, details: 0.74 } },
      drizzle: { timeLayers: ["dawn_chorus_sparse", "dawn_garden_air"], allowDetails: ["tree_drips", "day_bird_call"], groupVolumes: { time: 0.72, details: 0.92 } },
      post_rain: { allowDetails: ["tree_drips", "day_bird_call", "bird_wings", "cuckoo_call"], groupVolumes: { details: 0.98, texture: 1.08 } }
    },
    day: {
      clear: { allowDetails: ["day_bird_call", "bird_wings", "bee_pass", "bumblebee_pass", "woodpecker", "dove_call", "cuckoo_call", "squirrel_rustle"], groupVolumes: { details: 1.00, time: 1.02, texture: 1.06 } },
      wind_soft: { allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "crow_call", "dove_call", "cuckoo_call", "squirrel_rustle"], groupVolumes: { details: 0.98, weather: 0.90, texture: 1.04 } },
      heat_haze: { allowDetails: ["bee_pass", "bumblebee_pass", "day_bird_call", "bird_wings", "woodpecker", "dove_call", "mosquito_pass"], groupVolumes: { time: 0.80, texture: 0.94, details: 0.90 } },
      fog: { timeLayers: [], allowDetails: ["day_bird_call"], groupVolumes: { time: 0.38, weather: 0, texture: 0, details: 0.76 } },
      overcast: {
        timeLayers: ["day_garden_soft", "day_forest_air"],
        allowDetails: ["day_bird_call", "crow_call", "woodpecker"],
        blockDetails: ["bee_pass", "bumblebee_pass", "bird_wings", "dove_call", "cuckoo_call"],
        groupVolumes: { time: 0.90, weather: 0.72, texture: 0.42, details: 0.92 }
      },
      post_rain: { allowDetails: ["tree_drips", "day_bird_call", "bird_wings", "crow_call", "dove_call", "woodpecker", "squirrel_rustle"], groupVolumes: { details: 1.00, texture: 1.08 } }
    },
    evening: {
      clear: { allowDetails: ["day_bird_call", "bird_wings", "dove_call", "woodpecker", "frog_call", "mosquito_pass", "squirrel_rustle"], groupVolumes: { time: 1.02, details: 0.94, texture: 1.12 } },
      wind_soft: { allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "crow_call", "dove_call", "frog_call", "squirrel_rustle"], groupVolumes: { details: 0.96, weather: 0.90, texture: 1.02 } },
      partly_cloudy: { allowDetails: ["day_bird_call", "bird_wings", "woodpecker", "frog_call", "mosquito_pass"], groupVolumes: { time: 0.98, details: 0.96, texture: 1.08 } },
      fog: { timeLayers: [], allowDetails: ["day_bird_call"], groupVolumes: { time: 0.34, weather: 0, texture: 0, details: 0.80 } },
      overcast: { allowDetails: ["day_bird_call", "crow_call", "woodpecker"], groupVolumes: { time: 0.86, details: 0.92 } },
      post_rain: { allowDetails: ["tree_drips", "day_bird_call", "bird_wings", "crow_call", "woodpecker", "frog_call"], groupVolumes: { details: 1.00, texture: 1.14 } }
    },
    night: {
      clear: { allowDetails: ["owl_call", "dog_far", "frog_call", "mosquito_pass"], groupVolumes: { details: 1.06, texture: 1.00 } },
      wind_soft: { allowDetails: ["owl_call", "dog_far"], groupVolumes: { details: 0.92, weather: 0.90, texture: 0.96 } },
      partly_cloudy: { allowDetails: ["owl_call", "dog_far", "frog_call", "mosquito_pass"], groupVolumes: { details: 1.00, texture: 0.98 } },
      cloudy: { allowDetails: ["owl_call", "dog_far", "frog_call"], groupVolumes: { details: 0.96, texture: 0.90 } },
      overcast: { allowDetails: ["owl_call", "dog_far", "frog_call"], groupVolumes: { time: 0.90, texture: 0.78, details: 0.92 } },
      fog: { allowDetails: ["owl_call", "dog_far"], groupVolumes: { time: 0.68, weather: 0, texture: 0, details: 0.82 } },
      rain: { textureLayers: [], groupVolumes: { texture: 0.30 } },
      heavy_rain: { textureLayers: [], groupVolumes: { texture: 0.18 } },
      storm_near: { textureLayers: [], groupVolumes: { texture: 0.12 } },
      post_rain: { allowDetails: ["tree_drips", "owl_call", "dog_far", "frog_call"], groupVolumes: { details: 0.96, texture: 0.94 } },
      post_storm: { allowDetails: ["tree_drips", "owl_call", "dog_far", "frog_call"], groupVolumes: { details: 0.90, texture: 0.90 } },
      post_snow: { allowDetails: ["owl_call", "dog_far"], groupVolumes: { details: 0.92, texture: 0.62 } },
      frost: { allowDetails: ["owl_call", "dog_far"], groupVolumes: { details: 0.90, texture: 0.60 } }
    }
  };

  function buildScenePresets() {
    const presets = {};
    Object.keys(TIME_TEMPLATES).forEach((timeKey) => {
      presets[timeKey] = {};
      WEATHER_ORDER.forEach((weatherKey) => {
        const weatherPreset = WEATHER_TEMPLATES[weatherKey] || WEATHER_TEMPLATES.clear;
        const override = (SCENE_OVERRIDES[timeKey] && SCENE_OVERRIDES[timeKey][weatherKey]) || {};
        presets[timeKey][weatherKey] = mergeScenePresets(TIME_TEMPLATES[timeKey], weatherPreset, override);
      });
    });
    return presets;
  }

  const SCENE_PRESETS = buildScenePresets();

  function createDefaultSoundState() {
    return {
      timeOfDay: "day",
      weather: "clear",
      intensity: 0,
      season: "spring",
      temperatureBand: "mild",
      postEffect: null,
      enabledDetails: true,
      masterVolume: 1,
      cloudCover: 0,
      rainIntensity: 0,
      snowIntensity: 0,
      windIntensity: 0,
      hailIntensity: 0,
      fogIntensity: 0,
      heatIntensity: 0,
      coldIntensity: 0,
      temperatureC: null,
      windSpeed: 0,
      windGustSpeed: 0,
      precipitationAmount: 0,
      snowfallAmount: 0,
      hasThunder: false,
      sourceInput: null
    };
  }

  function loadDebugPreference() {
    try {
      return localStorage.getItem(AUDIO_DEBUG_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function persistDebugPreference(enabled) {
    try {
      if (enabled) {
        localStorage.setItem(AUDIO_DEBUG_KEY, "1");
      } else {
        localStorage.removeItem(AUDIO_DEBUG_KEY);
      }
    } catch (error) {
      // Ignore storage write failures.
    }
  }

  class WeatherAudioEngine {
    constructor() {
      this.supported = typeof Audio !== "undefined";
      this.enabled = true;
      this.debug = loadDebugPreference();
      this.activated = false;
      this.lowPerformanceMobile = isRealMobileRuntimeAudioMode();
      this.preferDirectAudio = typeof window !== "undefined"
        && /^file:/i.test(String(window.location?.protocol || ""));
      this.audioContext = null;
      this.masterGain = null;
      this.groupNodes = {};
      this.groupState = {};
      Object.keys(SOUNDSCAPE_CONFIG.groups).forEach((groupKey) => {
        if (groupKey === "master") return;
        this.groupState[groupKey] = {
          current: 0,
          target: 0,
          fadeRate: this.fadeRateFromSeconds(4)
        };
      });
      this.loopLayers = new Map();
      this.oneShots = new Set();
      this.detailTimers = new Map();
      this.detailCooldowns = new Map();
      this.resetDetailDirectorState();
      this.lastInput = null;
      this.state = createDefaultSoundState();
      this.evaluation = null;
      this.lastActiveMix = null;
      this.masterState = {
        current: clamp(this.state.masterVolume, 0, MAX_BUS_GAIN),
        target: clamp(this.state.masterVolume, 0, MAX_BUS_GAIN),
        fadeRate: this.fadeRateFromSeconds(4)
      };
      this.volumeRaf = 0;
      this.volumeTimer = 0;
      this.lastFrameTs = 0;
      this.autoActivationBound = false;
      this.handleUserActivation = this.handleUserActivation.bind(this);
      this.handleAutoActivationGesture = this.handleAutoActivationGesture.bind(this);
      this.stepMix = this.stepMix.bind(this);
      this.bindUserActivation();
      if (typeof window !== "undefined") {
        window.setWeatherAudioDebug = (enabled) => this.setDebug(Boolean(enabled));
      }
    }

    bindUserActivation() {
      if (!this.lowPerformanceMobile || typeof window === "undefined" || typeof document === "undefined" || this.autoActivationBound) return;
      window.addEventListener("pointerdown", this.handleAutoActivationGesture, { passive: true });
      window.addEventListener("touchstart", this.handleAutoActivationGesture, { passive: true });
      window.addEventListener("keydown", this.handleAutoActivationGesture);
      this.autoActivationBound = true;
    }

    unbindUserActivation() {
      if (!this.autoActivationBound || typeof window === "undefined") return;
      window.removeEventListener("pointerdown", this.handleAutoActivationGesture);
      window.removeEventListener("touchstart", this.handleAutoActivationGesture);
      window.removeEventListener("keydown", this.handleAutoActivationGesture);
      this.autoActivationBound = false;
    }

    handleAutoActivationGesture(event) {
      if (!this.lowPerformanceMobile || !this.enabled || !this.supported || this.activated) return;
      const hasPendingSoundscape = Boolean(
        this.lastInput
        || (this.lastActiveMix && Object.keys(this.lastActiveMix.activeLayers || {}).length)
      );
      if (!hasPendingSoundscape) return;
      if (String(event?.type || "") === "keydown") {
        const key = String(event?.key || "");
        if (key && !["Enter", " ", "Spacebar"].includes(key)) return;
      }
      const activationPromise = this.handleUserActivation();
      if (activationPromise && typeof activationPromise.catch === "function") {
        activationPromise.catch(() => {});
      }
    }

    setDebug(enabled) {
      this.debug = Boolean(enabled);
      persistDebugPreference(this.debug);
      this.debugLog("debug", { enabled: this.debug });
      return this.getState();
    }

    debugLog(tag, payload) {
      if (!this.debug || typeof console === "undefined") return;
      console.log(`[weather-audio] ${tag}`, payload);
    }

    resetDetailDirectorState() {
      this.detailDirector = {
        globalCooldownUntil: 0,
        quietUntil: 0,
        lastDetailTs: 0,
        lastStrongDetailTs: 0,
        lastDetailKey: "",
        lastDetailRole: "",
        recentKeys: [],
        recentCategories: [],
        lastByKey: new Map(),
        lastByCategory: new Map(),
        lastByRole: new Map(),
        lastByAsset: new Map()
      };
    }

    detailDirectorDebugState() {
      const director = this.detailDirector || {};
      const now = Date.now();
      return {
        globalCooldownRemainingMs: Math.max(0, Math.round((director.globalCooldownUntil || 0) - now)),
        quietRemainingMs: Math.max(0, Math.round((director.quietUntil || 0) - now)),
        lastDetailKey: director.lastDetailKey || "",
        lastDetailRole: director.lastDetailRole || "",
        recentKeys: Array.isArray(director.recentKeys) ? [...director.recentKeys] : [],
        recentCategories: Array.isArray(director.recentCategories) ? [...director.recentCategories] : []
      };
    }

    notifyStateChange(reason = "update") {
      if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
      window.dispatchEvent(new CustomEvent("weatheraudio:statechange", {
        detail: {
          reason,
          state: this.getState()
        }
      }));
    }

    getState() {
      return {
        supported: this.supported,
        enabled: this.enabled,
        ready: this.supported,
        running: this.isRunning(),
        activated: this.activated,
        debug: this.debug,
        currentState: { ...this.state },
        evaluation: this.evaluation,
        activeMix: this.lastActiveMix,
        playingDetails: Array.from(this.oneShots).map((shot) => shot.key).filter(Boolean),
        detailDirector: this.detailDirectorDebugState()
      };
    }

    isRunning() {
      for (const layer of this.loopLayers.values()) {
        if (layer.audio && !layer.audio.paused && layer.currentGain > 0.0025) return true;
      }
      for (const shot of this.oneShots) {
        if (shot.audio && !shot.audio.paused) return true;
      }
      return false;
    }

    async handleUserActivation() {
      if (!this.enabled || !this.supported) return;
      if (this.preferDirectAudio) {
        this.activated = true;
        if (this.lastInput) {
          this.apply(this.lastInput);
          this.primeActiveLoopPlayback(this.lastActiveMix);
        } else {
          this.startMixLoop();
        }
        this.notifyStateChange("activated");
        return;
      }
      this.initAudioEngine();
      if (this.audioContext && this.audioContext.state === "suspended") {
        try {
          await this.audioContext.resume();
        } catch (error) {
          // Ignore autoplay-related failures; the next gesture can retry.
        }
      }
      if (this.audioContext && this.audioContext.state === "suspended") {
        this.activated = false;
        this.notifyStateChange("activation-pending");
        return;
      }
      this.activated = true;
      if (this.lastInput) {
        this.apply(this.lastInput);
        this.primeActiveLoopPlayback(this.lastActiveMix);
      } else {
        this.startMixLoop();
      }
      this.notifyStateChange("activated");
    }

    initAudioEngine() {
      if (!this.supported || this.audioContext || this.preferDirectAudio) return this.audioContext;
      const ContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!ContextCtor) return null;
      try {
        this.audioContext = new ContextCtor();
      } catch (error) {
        this.audioContext = null;
        return null;
      }
      this.masterGain = this.createLayerBus("master", MASTER_VOLUME);
      this.groupNodes.time = this.createLayerBus("time", SOUNDSCAPE_CONFIG.groups.time);
      this.groupNodes.weather = this.createLayerBus("weather", SOUNDSCAPE_CONFIG.groups.weather);
      this.groupNodes.texture = this.createLayerBus("texture", SOUNDSCAPE_CONFIG.groups.texture);
      this.groupNodes.details = this.createLayerBus("details", SOUNDSCAPE_CONFIG.groups.details);
      Object.keys(this.groupNodes).forEach((groupKey) => {
        this.groupNodes[groupKey].connect(this.masterGain);
        const previousState = this.groupState[groupKey];
        this.groupState[groupKey] = {
          current: typeof previousState?.current === "number" ? previousState.current : 0,
          target: typeof previousState?.target === "number" ? previousState.target : 0,
          fadeRate: typeof previousState?.fadeRate === "number" ? previousState.fadeRate : this.fadeRateFromSeconds(4)
        };
      });
      this.masterGain.gain.value = clamp(this.masterState?.current ?? this.state.masterVolume, 0, MAX_BUS_GAIN);
      this.masterGain.connect(this.audioContext.destination);
      return this.audioContext;
    }

    preloadAudioAssets(layerKeys = []) {
      if (!this.activated) return;
      const keys = asArray(layerKeys);
      keys.forEach((layerKey) => {
        this.ensureLoopLayer(layerKey);
      });
    }

    primeActiveLoopPlayback(activeMix = null) {
      if (!this.activated || !this.enabled) return;
      const resolvedMix = activeMix?.activeLayers ? activeMix : this.lastActiveMix;
      const activeLayers = resolvedMix?.activeLayers || {};
      Object.keys(activeLayers).forEach((layerKey) => {
        const targetGain = Number(activeLayers[layerKey]) || 0;
        if (targetGain <= 0.002) return;
        const layer = this.ensureLoopLayer(layerKey);
        if (!layer?.audio || !layer.audio.paused) return;
        try {
          const playPromise = layer.audio.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } catch (error) {
          // Keď mobil ešte blokuje autoplay, ďalšie gesto to môže skúsiť znova.
        }
      });
    }

    createLayerBus(groupKey, initialValue = 1) {
      if (!this.audioContext) return null;
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = clamp(initialValue, 0, MAX_BUS_GAIN);
      gainNode.__groupKey = groupKey;
      return gainNode;
    }

    fadeRateFromSeconds(seconds) {
      const safe = Math.max(0.25, Number(seconds) || 3.8);
      return clamp(1 / (safe * 14), 0.02, 0.28);
    }

    getLoopConfig(layerKey) {
      return SOUNDSCAPE_CONFIG.timeLayers[layerKey]
        || SOUNDSCAPE_CONFIG.weatherLayers[layerKey]
        || SOUNDSCAPE_CONFIG.textureLayers[layerKey]
        || null;
    }

    ensureLoopLayer(layerKey) {
      const config = this.getLoopConfig(layerKey);
      if (!config || !config.fileList.length) return null;
      if (this.loopLayers.has(layerKey)) return this.loopLayers.get(layerKey);
      const audio = new Audio(pickRandom(config.fileList));
      audio.preload = resolveLoopPreloadMode(this.lowPerformanceMobile, config);
      audio.loop = true;
      audio.volume = 0;
      audio.muted = false;
      audio.defaultMuted = false;
      audio.playsInline = true;
      if (audio.preload === "auto") {
        try {
          audio.load();
        } catch (error) {
          // Ignore eager preload failures and let the browser recover lazily.
        }
      }
      const layerState = {
        key: layerKey,
        config,
        audio,
        currentGain: 0,
        targetGain: 0,
        fadeRate: this.fadeRateFromSeconds(config.crossfadeDuration),
        silentSinceTs: 0,
        started: false,
        mediaSource: null,
        gainNode: null
      };

      this.initAudioEngine();
      if (this.audioContext && this.groupNodes[config.group]) {
        try {
          const mediaSource = this.audioContext.createMediaElementSource(audio);
          const gainNode = this.audioContext.createGain();
          gainNode.gain.value = 0;
          mediaSource.connect(gainNode);
          gainNode.connect(this.groupNodes[config.group]);
          audio.volume = 1;
          layerState.mediaSource = mediaSource;
          layerState.gainNode = gainNode;
        } catch (error) {
          layerState.mediaSource = null;
          layerState.gainNode = null;
        }
      }

      this.loopLayers.set(layerKey, layerState);
      return layerState;
    }

    clear() {
      this.stopDetailTimers();
      this.stopIncompatibleDetails([]);
      this.detailCooldowns.clear();
      this.resetDetailDirectorState();
      this.state = createDefaultSoundState();
      this.evaluation = null;
      this.lastActiveMix = null;
      if (this.masterState) {
        this.masterState.current = 0;
        this.masterState.target = 0;
        this.masterState.fadeRate = this.fadeRateFromSeconds(2.8);
      }
      this.loopLayers.forEach((layer) => {
        layer.targetGain = 0;
        layer.fadeRate = this.fadeRateFromSeconds(2.4);
      });
      Object.keys(this.groupState).forEach((groupKey) => {
        this.groupState[groupKey].target = 0;
        this.groupState[groupKey].fadeRate = this.fadeRateFromSeconds(2.8);
      });
      this.startMixLoop();
      this.notifyStateChange("clear");
    }

    setEnabled(enabled) {
      this.enabled = Boolean(enabled);
      if (!this.enabled) {
        this.clear();
      } else if (this.activated && this.lastInput) {
        this.apply(this.lastInput);
      }
      this.notifyStateChange("enabled");
      return this.getState();
    }

    setTimeOfDay(value) {
      return this.transitionToState({ timeOfDay: normalizeTimeOfDay(value) });
    }

    setWeather(value) {
      return this.transitionToState({ weather: normalizeWeatherKey(value) });
    }

    setWeatherIntensity(value) {
      return this.transitionToState({ intensity: clamp(Number(value) || 0, 0, 1) });
    }

    setTemperatureBand(value) {
      return this.transitionToState({ temperatureBand: normalizeTemperatureBand(value) });
    }

    setPostEffect(value) {
      return this.transitionToState({ postEffect: value || null });
    }

    enableDetails(enabled) {
      return this.transitionToState({ enabledDetails: Boolean(enabled) });
    }

    setMasterVolume(value) {
      return this.transitionToState({ masterVolume: clamp(Number(value) || 0, 0, 1) });
    }

    updateSoundscape() {
      return this.transitionToState({});
    }

    applyWeatherState(nextState) {
      return this.transitionToState(nextState);
    }

    apply(input = null) {
      this.lastInput = input ? { ...input } : null;
      if (!this.supported || !this.enabled) {
        this.clear();
        return null;
      }
      if (!input) {
        this.clear();
        return null;
      }
      const normalized = this.normalizeInputToState(input);
      if (!this.activated) {
        this.state = normalized;
        this.evaluation = this.evaluateRules(normalized);
        this.lastActiveMix = this.computeActiveLayers(normalized, this.evaluation);
        this.stopDetailTimers();
        this.notifyStateChange("pending-activation");
        return this.evaluation;
      }
      return this.transitionToState(normalized, { sourceInput: input });
    }

    transitionToState(partialState = {}, options = {}) {
      const nextState = {
        ...this.state,
        ...partialState
      };
      nextState.timeOfDay = normalizeTimeOfDay(nextState.timeOfDay);
      nextState.weather = normalizeWeatherKey(nextState.weather);
      nextState.season = normalizeSeason(nextState.season);
      nextState.temperatureBand = normalizeTemperatureBand(nextState.temperatureBand);
      nextState.intensity = clamp(Number(nextState.intensity) || 0, 0, 1);
      nextState.masterVolume = clamp(Number(nextState.masterVolume) || 0, 0, 1);
      nextState.enabledDetails = nextState.enabledDetails !== false;
      nextState.postEffect = nextState.postEffect || null;
      nextState.sourceInput = options.sourceInput || nextState.sourceInput || null;

      this.state = nextState;
      this.evaluation = this.evaluateRules(nextState);
      const activeMix = this.computeActiveLayers(nextState, this.evaluation);
      this.lastActiveMix = activeMix;
      this.applyLayerMix(activeMix, this.evaluation);
      this.scheduleDetailEvents(this.evaluation);
      this.debugLog("transition", {
        state: nextState,
        preset: this.evaluation.presetKey,
        activeLayers: activeMix.activeLayerKeys,
        allowedDetails: this.evaluation.allowedDetails,
        mutedDueToPriority: this.evaluation.mutedDueToPriority
      });
      this.notifyStateChange("transition");
      return this.evaluation;
    }

    normalizeInputToState(input = {}) {
      const phase = String(input.phase || input.period || "day").trim().toLowerCase();
      const timeOfDay = phase === "sunset"
        ? "evening"
        : phase === "night"
          ? "night"
          : phase === "dawn"
            ? "dawn"
            : "day";

      const windSpeed = Math.max(0, Number(input.windSpeed) || 0);
      const windGustSpeed = Math.max(windSpeed, Number(input.windGustSpeed) || 0);
      const precipitationAmount = Math.max(
        0,
        Number(input.precipitationAmount) || 0,
        Number(input.rainAmount) || 0,
        Number(input.showersAmount) || 0
      );
      const snowfallAmount = Math.max(0, Number(input.snowfallAmount) || 0);
      const cloudCover = clamp((Number(input.cloudCover) || 0) / 100, 0, 1);
      const visibility = Math.max(0, Number(input.visibility) || 0);
      const temperatureC = Number.isFinite(Number(input.temperature)) ? Number(input.temperature) : null;
      const season = normalizeSeason(input.season || "spring");
      const temperatureBand = this.temperatureBandFromValue(temperatureC);
      const normalizedPhenomenonVariant = (() => {
        const rawPhenomenon = String(input.phenomenonVariant || "").trim().toLowerCase();
        if (rawPhenomenon === "light-rain" || rawPhenomenon === "heavy-rain" || rawPhenomenon === "drizzle") return "rain";
        if (rawPhenomenon === "light-snow" || rawPhenomenon === "dense-snow" || rawPhenomenon === "blizzard") return "snow";
        if (rawPhenomenon === "freezing-rain") return "sleet";
        if (rawPhenomenon === "frost" && Number.isFinite(temperatureC) && temperatureC > 2) return "none";
        return rawPhenomenon;
      })();
      const rainIntensity = clamp(precipitationAmount / 6.8, 0, 1);
      const snowIntensity = ["snow", "sleet", "freezing-rain"].includes(normalizedPhenomenonVariant)
        ? clamp(snowfallAmount / 2.4, 0, 1)
        : 0;
      const hailIntensity = normalizedPhenomenonVariant === "hail"
        ? clamp(precipitationAmount / 4.6, 0, 1)
        : 0;
      const fogIntensity = ["fog", "mist"].includes(normalizedPhenomenonVariant)
        ? clamp(0.35 + (visibility ? clamp((9000 - visibility) / 9000, 0, 1) * 0.55 : 0.28), 0.22, 1)
        : 0;
      const windIntensity = clamp(((windSpeed / 34) * 0.76) + (Math.max(0, windGustSpeed - windSpeed) / 34) * 0.34, 0, 1);

      const heatIntensity = temperatureBand === "hot"
        ? clamp(((temperatureC || 28) - 27) / 9, 0.15, 1)
        : 0;
      const coldIntensity = temperatureBand === "cold"
        ? clamp((4 - (temperatureC ?? 4)) / 10, 0, 1)
        : 0;
      const weather = this.deriveWeatherKey({
        phenomenonVariant: normalizedPhenomenonVariant,
        variant: input.variant,
        hasThunder: Boolean(input.hasThunder),
        windSpeed,
        windGustSpeed,
        precipitationAmount,
        snowfallAmount,
        cloudCover,
        temperatureC,
        fogIntensity,
        heatIntensity,
        coldIntensity
      });

      const baseIntensity = clamp(
        Math.max(rainIntensity, snowIntensity, hailIntensity, fogIntensity * 0.74, windIntensity * 0.82, heatIntensity * 0.58, coldIntensity * 0.46),
        0,
        1
      );

      return {
        ...createDefaultSoundState(),
        timeOfDay,
        weather,
        intensity: baseIntensity,
        season,
        temperatureBand,
        cloudCover,
        rainIntensity,
        snowIntensity,
        windIntensity,
        hailIntensity,
        fogIntensity,
        heatIntensity,
        coldIntensity,
        temperatureC,
        windSpeed,
        windGustSpeed,
        precipitationAmount,
        snowfallAmount,
        hasThunder: Boolean(input.hasThunder)
      };
    }

    temperatureBandFromValue(value) {
      if (!Number.isFinite(value)) return "mild";
      if (value <= 4) return "cold";
      if (value < 19) return "mild";
      if (value < 28) return "warm";
      return "hot";
    }

    deriveWeatherKey({
      phenomenonVariant = "",
      variant = "",
      hasThunder = false,
      windSpeed = 0,
      windGustSpeed = 0,
      precipitationAmount = 0,
      snowfallAmount = 0,
      cloudCover = 0,
      temperatureC = null,
      fogIntensity = 0,
      heatIntensity = 0,
      coldIntensity = 0
    } = {}) {
      const phenomenon = String(phenomenonVariant || "").trim().toLowerCase();
      const cloudVariant = String(variant || "").trim().toLowerCase();
      const explicitFrost = phenomenon === "frost";
      const realColdSurface = Number.isFinite(temperatureC) && temperatureC <= 0.2;
      const dryColdSurface = precipitationAmount <= 0.02 && snowfallAmount <= 0.01 && fogIntensity < 0.22;
      if (phenomenon === "hail") return "hail";
      if (phenomenon === "storm" || hasThunder) {
        return precipitationAmount >= 1.8 || windSpeed >= 25 || windGustSpeed >= 38 ? "storm_near" : "storm_far";
      }
      if (phenomenon === "snow") {
        if (windSpeed >= 28 || windGustSpeed >= 44) return "blizzard_like";
        if (snowfallAmount >= 1.05) return "snow_heavy";
        if (snowfallAmount >= 0.24) return "snow_medium";
        return "snow_light";
      }
      if (phenomenon === "sleet" || phenomenon === "freezing-rain") return "wet_snow";
      if (phenomenon === "rain") {
        if (precipitationAmount >= 3.4) return "heavy_rain";
        if (precipitationAmount >= 0.58) return "rain";
        return "drizzle";
      }
      if (phenomenon === "fog" || phenomenon === "mist" || fogIntensity >= 0.26) return "fog";
      if (windSpeed >= 34 || windGustSpeed >= 48) return "wind_strong";
      if (windSpeed >= 24 || windGustSpeed >= 36) return "wind_medium";
      if (windSpeed >= 14 || windGustSpeed >= 24) return "wind_soft";
      if ((explicitFrost || (coldIntensity >= 0.55 && (!phenomenon || phenomenon === "none"))) && realColdSurface && dryColdSurface) return "frost";
      if (cloudVariant === "overcast" || cloudCover >= 0.9) return "overcast";
      if (cloudVariant === "cloudy" || cloudCover >= 0.46) return "cloudy";
      if (cloudVariant === "mostly-clear" || cloudCover >= 0.10) return "partly_cloudy";
      return "clear";
    }

    evaluateRules(nextState) {
      const preset = this.resolveScenePreset(nextState);
      const priority = preset.priority || SOUNDSCAPE_CONFIG.rules.priority[nextState.weather] || "low";
      const blockedSet = new Set(asArray(preset.blockDetails));
      const mutedDueToPriority = [];

      if (SOUNDSCAPE_CONFIG.rules.silenceBiologyWeathers.includes(nextState.weather)) {
        ["woodpecker", "crow_call", "dove_call", "bee_pass", "bumblebee_pass", "cuckoo_call", "squirrel_rustle", "mosquito_pass", "frog_call", "owl_call", "wolf_far"].forEach((detailKey) => blockedSet.add(detailKey));
        mutedDueToPriority.push("Biologicke detaily utlmené kvoli vysokej priorite pocasia.");
      } else if (SOUNDSCAPE_CONFIG.rules.dampBiologyWeathers.includes(nextState.weather)) {
        ["woodpecker", "dove_call", "bee_pass", "bumblebee_pass", "cuckoo_call", "mosquito_pass", "squirrel_rustle"].forEach((detailKey) => blockedSet.add(detailKey));
        mutedDueToPriority.push("Jemne denné detaily utlmené kvoli pocasiu.");
      }

      if (nextState.timeOfDay === "night") {
        ["woodpecker", "crow_call", "dove_call", "bee_pass", "bumblebee_pass", "cuckoo_call", "squirrel_rustle"].forEach((detailKey) => blockedSet.add(detailKey));
      } else {
        ["owl_call", "wolf_far", "dog_far"].forEach((detailKey) => blockedSet.add(detailKey));
      }

      if (SOUNDSCAPE_CONFIG.rules.insectBlockingWeathers.includes(nextState.weather) || nextState.temperatureBand === "cold") {
        blockedSet.add("bee_pass");
        blockedSet.add("bumblebee_pass");
        blockedSet.add("mosquito_pass");
      }

      const allowedDetails = asArray(preset.allowDetails).filter((detailKey) => {
        if (blockedSet.has(detailKey)) return false;
        return this.isDetailEligible(detailKey, nextState, { ignoreCooldown: true });
      });

      if (false && this.lowPerformanceMobile) {
        mutedDueToPriority.push("Na reálnom mobile sú detailné zvuky utlmené, aby appka menej sekala.");
      }

      const blockedReasons = {};
      Object.keys(SOUNDSCAPE_CONFIG.detailEvents).forEach((detailKey) => {
        const eligible = this.isDetailEligible(detailKey, nextState, { ignoreCooldown: true, includeReason: true });
        if (!eligible.allowed) {
          blockedReasons[detailKey] = eligible.reason;
        }
      });

      return {
        presetKey: `${nextState.timeOfDay}:${nextState.weather}`,
        preset,
        priority,
        allowedDetails,
        blockedDetails: Array.from(blockedSet),
        blockedReasons,
        mutedDueToPriority
      };
    }

    resolveScenePreset(nextState) {
      const timeKey = normalizeTimeOfDay(nextState.timeOfDay);
      const postWeather = nextState.postEffect && WEATHER_ORDER.includes(nextState.postEffect)
        ? nextState.postEffect
        : nextState.postEffect === "postRain"
          ? "post_rain"
          : nextState.postEffect === "postStorm"
            ? "post_storm"
            : nextState.postEffect === "postSnow"
              ? "post_snow"
              : nextState.weather;
      return (SCENE_PRESETS[timeKey] && SCENE_PRESETS[timeKey][postWeather]) || SCENE_PRESETS[timeKey].clear;
    }

    computeActiveLayers(nextState, evaluation) {
      const preset = evaluation.preset;
      const activeLayers = {};
      const activeLayerKeys = uniq([
        ...asArray(preset.timeLayers),
        ...asArray(preset.weatherLayers),
        ...asArray(preset.textureLayers)
      ]);

      activeLayerKeys.forEach((layerKey) => {
        const config = this.getLoopConfig(layerKey);
        if (!config || !config.fileList.length) return;
        const volume = this.resolveLayerVolume(layerKey, config, nextState, preset, evaluation);
        if (volume > 0.002) {
          activeLayers[layerKey] = volume;
        }
      });

      const ensureGroupFallback = (groupName, layerKeys, fallbackVolume) => {
        const hasGroupLayer = Object.keys(activeLayers).some((layerKey) => {
          const config = this.getLoopConfig(layerKey);
          return config?.group === groupName;
        });
        if (hasGroupLayer) return;
        for (const layerKey of asArray(layerKeys)) {
          const config = this.getLoopConfig(layerKey);
          if (!config || !config.fileList.length) continue;
          activeLayers[layerKey] = Math.max(activeLayers[layerKey] || 0, Math.min(MAX_LAYER_GAIN, fallbackVolume));
          return;
        }
      };

      if (nextState.timeOfDay === "day" && nextState.weather === "overcast") {
        ensureGroupFallback("time", ["day_garden_soft", "day_forest_air"], 0.0048);
        ensureGroupFallback("texture", ["crowns_soft", "crowns_medium"], 0.0038);
      }

      const groupTargets = this.resolveGroupTargets(nextState, preset, evaluation);
      const stabilizedLayers = this.stabilizeLoopContinuity(activeLayers, nextState);
      return {
        activeLayers: stabilizedLayers,
        activeLayerKeys: Object.keys(stabilizedLayers),
        groupTargets
      };
    }

    targetLoopEnergy(nextState) {
      let target = nextState.timeOfDay === "dawn"
        ? 0.88
        : nextState.timeOfDay === "day"
          ? 0.78
          : nextState.timeOfDay === "evening"
            ? 0.68
            : 0.56;
      if (["fog", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather)) {
        target *= 0.94;
      }
      if (["storm_far", "storm_near", "hail", "heavy_rain"].includes(nextState.weather)) {
        target *= 0.96;
      }
      return target;
    }

    loopEnergy(activeLayers = {}) {
      return Object.entries(activeLayers).reduce((sum, [layerKey, volume]) => {
        const config = this.getLoopConfig(layerKey);
        if (!config) return sum;
        const groupWeight = SOUNDSCAPE_CONFIG.groups[config.group] || 1;
        return sum + (clamp(Number(volume) || 0, 0, MAX_LAYER_GAIN) * groupWeight);
      }, 0);
    }

    stabilizeLoopContinuity(activeLayers, nextState) {
      const layerEntries = Object.entries(activeLayers || {});
      if (!layerEntries.length) return activeLayers;
      const currentEnergy = this.loopEnergy(activeLayers);
      if (currentEnergy <= 0.02) return activeLayers;
      const targetEnergy = this.targetLoopEnergy(nextState);
      const previousEnergy = this.loopEnergy(this.lastActiveMix?.activeLayers || {});
      const continuityTarget = previousEnergy > 0.02
        ? lerp(targetEnergy, previousEnergy, MIX_CONTINUITY_BLEND)
        : targetEnergy;
      const factor = clamp(continuityTarget / currentEnergy, MIX_ENERGY_FACTOR_MIN, MIX_ENERGY_FACTOR_MAX);
      if (Math.abs(factor - 1) < 0.025) return activeLayers;
      return layerEntries.reduce((normalized, [layerKey, volume]) => {
        normalized[layerKey] = clamp(volume * factor, 0, MAX_LAYER_GAIN);
        return normalized;
      }, {});
    }

    resolveLayerVolume(layerKey, config, nextState, preset, evaluation) {
      const groupVolume = preset.groupVolumes?.[config.group] ?? 1;
      const base = config.baseVolume * groupVolume;
      const rain = nextState.rainIntensity;
      const snow = nextState.snowIntensity;
      const wind = nextState.windIntensity;
      const hail = nextState.hailIntensity;
      const fog = nextState.fogIntensity;
      const cloud = nextState.cloudCover;
      const heat = nextState.heatIntensity;
      const cold = nextState.coldIntensity;
      const season = nextState.season;
      const isWinter = season === "winter";
      const isAutumn = season === "autumn";
      const isSpringOrSummer = season === "spring" || season === "summer";
      const isWarmBand = nextState.temperatureBand === "warm" || nextState.temperatureBand === "hot";
      const isColdNight = nextState.timeOfDay === "night" && (nextState.temperatureBand === "cold" || isWinter || ["snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather));
      const allowWarmNightWildlife = nextState.timeOfDay === "night" && !isWinter && nextState.temperatureBand !== "cold";
      const calm = clamp(1 - (rain * 0.92) - (wind * 0.46) - (hail * 1.08) - (snow * 0.36) - (fog * 0.28), 0, 1);
      const quietBiologyWeather = [
        "snow_light",
        "snow_medium",
        "snow_heavy",
        "wet_snow",
        "blizzard_like",
        "drizzle",
        "rain",
        "heavy_rain",
        "storm_far",
        "storm_near",
        "hail"
      ].includes(nextState.weather);

      if (quietBiologyWeather && [
        "dawn_chorus_rich",
        "dawn_chorus_soft",
        "dawn_chorus_sparse",
        "dawn_garden_air",
        "day_garden_soft",
        "day_garden_open",
        "day_forest_air",
        "evening_softbirds",
        "evening_garden_air"
      ].includes(layerKey)) {
        return 0;
      }

      switch (layerKey) {
        case "dawn_chorus_rich":
          if (["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near"].includes(nextState.weather)) return 0;
          return base * clamp(((0.16 + (calm * 0.26)) - (cloud * 0.08) - (heat * 0.04)) * (isSpringOrSummer ? 1.04 : isAutumn ? 0.74 : 0.52), 0, 0.62);
        case "dawn_chorus_soft":
          if (["fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near"].includes(nextState.weather)) return 0;
          return base * clamp(((0.10 + (calm * 0.18)) - (cloud * 0.08) - (heat * 0.03) - (nextState.weather === "overcast" ? 0.10 : 0)) * (isSpringOrSummer ? 0.94 : isAutumn ? 0.78 : 0.56), 0, 0.42);
        case "dawn_chorus_sparse":
          return base * clamp(((0.10 + (calm * 0.14)) - (rain * 0.10) + (["overcast", "fog", "drizzle"].includes(nextState.weather) ? 0.06 : 0)) * (isAutumn ? 1.02 : isWinter ? 0.86 : 0.76), 0, 0.30);
        case "dawn_garden_air":
          return base * clamp(((0.08 + (calm * 0.14)) - (cloud * 0.08) - (rain * 0.05) - (nextState.weather === "overcast" ? 0.02 : 0)) * (isWinter ? 0.50 : isAutumn ? 0.74 : 0.88), 0, 0.24);
        case "day_garden_soft":
          if (nextState.weather === "overcast") {
            return base * clamp(((0.13 + (calm * 0.16)) - (cloud * 0.10) - (heat * 0.02)) * (isWinter ? 0.48 : isAutumn ? 0.76 : 0.92), 0.03, 0.28);
          }
          return base * clamp(((0.10 + (calm * 0.15)) - (cloud * 0.14) - (heat * 0.03) - (nextState.weather === "overcast" ? 0.06 : 0)) * (isWinter ? 0.42 : isAutumn ? 0.70 : 0.84), 0, 0.24);
        case "day_garden_open":
          return base * clamp(((0.06 + (calm * 0.10)) - (cloud * 0.12) - (heat * 0.03) - (nextState.weather === "overcast" ? 0.05 : 0)) * (isWinter ? 0.38 : isAutumn ? 0.70 : 0.80), 0, 0.18);
        case "day_forest_air":
          if (nextState.weather === "overcast") {
            return base * clamp(((0.10 + (calm * 0.12)) - (cloud * 0.07) - (heat * 0.01)) * (isWinter ? 0.62 : 0.88), 0.04, 0.22);
          }
          return base * clamp(((0.08 + (calm * 0.10)) - (cloud * 0.10) - (heat * 0.02) - (nextState.weather === "overcast" ? 0.03 : 0)) * (isWinter ? 0.56 : 0.82), 0, 0.18);
        case "evening_softbirds":
          return base * clamp(((0.24 + (calm * 0.34)) - (rain * 0.22) - (wind * 0.12)) * (isWinter ? 0.38 : isAutumn ? 0.70 : 1), 0, 1);
        case "evening_garden_air":
          return base * clamp(((0.18 + (calm * 0.22)) - (rain * 0.16) - (wind * 0.08)) * (isWinter ? 0.46 : isAutumn ? 0.82 : 1), 0, 1);
        case "night_deep_air":
          if (isColdNight || ["snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather)) return 0;
          return base * clamp(0.24 + (fog * 0.08) + (season === "summer" ? 0.08 : 0.02), 0.08, 0.34);
        case "night_forest_air":
          if (!allowWarmNightWildlife || ["fog", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather)) return 0;
          return base * clamp(0.14 + (calm * 0.12) + (season === "summer" ? 0.06 : 0.02), 0.06, 0.34);
        case "night_cold_air":
          if (!isColdNight) return 0;
          return base * clamp(0.18 + (cold * 0.34) + (wind * 0.18) + (snow * 0.10), 0.08, 0.56);
        case "clear_air_soft":
          if (nextState.timeOfDay === "night") return 0;
          if (wind < 0.28) return 0;
          return base * clamp(0.006 + (wind * 0.08) + ((1 - cloud) * 0.012), 0, 0.08);
        case "cloud_air_soft":
          if (nextState.timeOfDay === "night") return 0;
          if (wind < 0.32) return 0;
          return base * clamp(0.006 + (wind * 0.09) + (cloud * 0.016), 0, 0.08);
        case "overcast_air_heavy":
          if (nextState.timeOfDay === "night") return 0;
          if (nextState.weather === "overcast") {
            if (wind < 0.14 && fog < 0.12 && rain < 0.06 && cloud < 0.52) return 0;
            return base * clamp(0.018 + (wind * 0.06) + (cloud * 0.03) + (fog * 0.02), 0.014, 0.10);
          }
          if (wind < 0.36 && fog < 0.26 && rain < 0.16) return 0;
          return base * clamp(0.008 + (wind * 0.08) + (cloud * 0.022) + (fog * 0.02), 0, 0.08);
        case "fog_air_soft":
          return base * clamp(0.22 + (fog * 0.42), 0.14, 0.54);
        case "drizzle_soft":
          return base * clamp(0.62 + (rain * 0.48), 0.36, 1);
        case "rain_soft":
          return base * clamp(0.46 + (rain * 0.92), 0.28, 1);
        case "rain_heavy":
          return base * clamp(0.42 + (rain * 0.90), 0.24, 1);
        case "storm_far_bed":
          return base * clamp(0.36 + (nextState.hasThunder ? 0.20 : 0.04) + (wind * 0.18) + (rain * 0.22), 0.24, 1);
        case "storm_near_bed":
          return base * clamp(0.42 + (nextState.hasThunder ? 0.24 : 0.08) + (wind * 0.22) + (rain * 0.22) + (hail * 0.12), 0.28, 1);
        case "wind_soft_trees":
          if (wind < 0.40) return 0;
          return base * clamp(0.01 + (wind * 0.10), 0.01, 0.10);
        case "wind_medium_trees":
          if (wind < 0.24) return 0;
          return base * clamp(0.12 + (wind * 0.62), 0.10, 0.94);
        case "wind_strong_trees":
          if (wind < 0.32) return 0;
          return base * clamp(0.18 + (wind * 0.72), 0.14, 1);
        case "snow_air_soft":
          return base * clamp(0.34 + (snow * 0.54) + (cold * 0.12), 0.20, 1);
        case "snow_air_heavy":
          return base * clamp(0.30 + (snow * 0.68) + (cold * 0.18), 0.20, 1);
        case "snow_wind_soft":
          return base * clamp(0.24 + (snow * 0.30) + (wind * 0.34), 0.14, 1);
        case "wet_snow_slush":
          return base * clamp(0.34 + (rain * 0.44) + (snow * 0.24), 0.18, 1);
        case "hail_hits_bed":
          return base * clamp(0.12 + (hail * 0.92), 0.04, 0.88);
        case "frost_cold_air":
          return base * clamp(0.18 + (cold * 0.38) + (wind * 0.08), 0.08, 0.52);
        case "heat_soft_air":
          return base * clamp(0.28 + (heat * 0.56), 0.16, 1);
        case "crowns_soft":
          if (nextState.timeOfDay === "night") return 0;
          if (nextState.weather === "overcast") {
            if (wind < 0.18) return 0;
            return base * clamp(
              0.006 + ((wind - 0.18) * 0.05) + (cloud * 0.003),
              0.004,
              0.028
            );
          }
          if (wind < 0.46) return 0;
          return base * clamp(
            (wind - 0.40) * 0.10,
            0,
            0.06
          );
        case "crowns_medium":
          if (nextState.weather === "overcast") {
            if (wind < 0.26 && rain < 0.20) return 0;
            return base * clamp(
              0.010 + (wind * 0.032) + (rain * 0.02),
              0.006,
              0.04
            );
          }
          if (wind < 0.68 && rain < 0.38) return 0;
          return base * clamp(
            (0.004 + (wind * 0.06) + (rain * 0.03)) * (nextState.weather === "overcast" ? 0.28 : 0.40),
            0,
            0.06
          );
        case "crowns_strong":
          if (wind < 0.58) return 0;
          return base * clamp(0.04 + (wind * 0.42) + (rain * 0.08), 0.02, 0.42);
        case "wet_space_soft":
          return base * clamp(0.38 + (rain * 0.42) + (fog * 0.16), 0.18, 1);
        case "winter_space_soft":
          if (wind < 0.74 && snow < 0.58) return 0;
          return base * clamp((wind * 0.03) + (snow * 0.07) + (cold * 0.01), 0.008, 0.05);
        case "day_gentle_insects":
          if (!["dawn", "day"].includes(nextState.timeOfDay) || nextState.temperatureBand === "cold") return 0;
          if (Number.isFinite(nextState.temperatureC) && nextState.temperatureC < 10) return 0;
          if (isWinter || ["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "wind_medium", "wind_strong", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"].includes(nextState.weather)) return 0;
          return base * clamp((isWarmBand ? 0.70 : 0.34) + (calm * 0.18), 0, 0.68);
        case "night_crickets_bed":
          if (nextState.timeOfDay !== "night" || nextState.temperatureBand === "cold" || nextState.season === "winter") return 0;
          if (["fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather)) return 0;
          if (Number.isFinite(nextState.temperatureC) && nextState.temperatureC < 10) return 0;
          if (nextState.windIntensity >= 0.40) return 0;
          return base * clamp((season === "summer" ? 0.26 : 0.10) + (calm * 0.22) + (nextState.temperatureBand === "hot" ? 0.12 : nextState.temperatureBand === "warm" ? 0.08 : 0) - (nextState.windIntensity * 0.22), 0, 0.70);
        case "evening_warm_insects":
          if (nextState.timeOfDay !== "evening" || nextState.temperatureBand === "cold" || isWinter || season === "spring") return 0;
          if (["overcast", "fog", "drizzle", "rain", "heavy_rain", "storm_far", "storm_near", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost"].includes(nextState.weather)) return 0;
          if (nextState.windIntensity >= 0.26) return 0;
          return base * clamp((isWarmBand ? 0.38 : season === "summer" ? 0.26 : 0.12) + (calm * 0.18), 0, 0.72);
        case "autumn_leaves_soft":
          if (!isAutumn) return 0;
          if (["rain", "heavy_rain", "storm_far", "storm_near", "hail", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like"].includes(nextState.weather)) return 0;
          if (wind < 0.66) return 0;
          return base * clamp(0.004 + (wind * 0.05), 0, 0.04);
        case "post_rain_drip_bed":
          return base * clamp(0.56 + (rain * 0.16), 0.30, 1);
        default:
          return base;
      }
    }

    resolveGroupTargets(nextState, preset, evaluation) {
      const base = preset.groupVolumes || {};
      const priority = evaluation.priority;
      const groupTargets = {
        master: clamp((base.master ?? 1) * nextState.masterVolume, 0, MAX_BUS_GAIN),
        time: clamp(base.time ?? 1, 0, MAX_BUS_GAIN),
        weather: clamp(base.weather ?? 1, 0, MAX_BUS_GAIN),
        texture: clamp(base.texture ?? 1, 0, MAX_BUS_GAIN),
        details: clamp((base.details ?? 1) * (nextState.enabledDetails ? 1 : 0), 0, MAX_BUS_GAIN)
      };

      groupTargets.details *= 0.86;

      if (priority === "medium") {
        groupTargets.time *= 0.94;
        groupTargets.details *= 0.82;
      }
      if (priority === "high") {
        groupTargets.time *= 0.72;
        groupTargets.texture *= 0.94;
        groupTargets.details *= 0.46;
      }
      if (priority === "extreme") {
        groupTargets.time *= 0.46;
        groupTargets.texture *= 0.72;
        groupTargets.details *= 0.24;
      }
      if (nextState.timeOfDay === "night") {
        groupTargets.time *= 0.96;
        groupTargets.details *= 0.88;
      }
      if (["fog", "snow_light", "snow_medium", "snow_heavy", "wet_snow", "blizzard_like", "frost", "post_snow"].includes(nextState.weather)) {
        groupTargets.details *= 0.80;
      }
      if (this.sceneCalmScore(nextState) > 0.76 && priority === "low") {
        groupTargets.details *= 0.94;
      }
      return groupTargets;
    }

    resolveDirectDetailGain() {
      const detailsState = this.groupState.details;
      if (!detailsState) return 1;
      const rawGain = typeof detailsState.current === "number"
        ? detailsState.current
        : typeof detailsState.target === "number"
          ? detailsState.target
          : 1;
      return clamp(rawGain * 0.92, 0, MAX_DETAIL_DIRECT_GAIN);
    }

    resolveDetailRole(detailKey, detail = SOUNDSCAPE_CONFIG.detailEvents[detailKey]) {
      // Ostrejsie a dlhsie detaily drzime v accent/hero, aby ambience a pocasie ostali nosnou vrstvou sceny.
      const explicitRole = String(detail?.role || "").trim().toLowerCase();
      if (["safe", "accent", "hero"].includes(explicitRole)) return explicitRole;
      if (detail?.category === "thunder" || (detail?.priority || 0) >= 3) return "hero";
      if (["tree_drips", "day_bird_call", "bird_wings", "bee_pass", "bumblebee_pass", "mosquito_pass", "squirrel_rustle"].includes(detailKey)) {
        return "safe";
      }
      if (["corvids", "owls", "woodpecker", "amphibians"].includes(String(detail?.category || ""))) return "accent";
      if ((detail?.maxDurationMs || 0) >= 3200 || (detail?.baseVolume || 0) >= 0.16) return "accent";
      return "safe";
    }

    isProminentDetailRole(role = "") {
      return role === "accent" || role === "hero";
    }

    sceneCalmScore(nextState = this.state) {
      return clamp(
        1
        - ((nextState?.rainIntensity || 0) * 0.92)
        - ((nextState?.windIntensity || 0) * 0.46)
        - ((nextState?.hailIntensity || 0) * 1.08)
        - ((nextState?.snowIntensity || 0) * 0.36)
        - ((nextState?.fogIntensity || 0) * 0.22),
        0,
        1
      );
    }

    activeProminentDetailCount() {
      let count = 0;
      this.oneShots.forEach((shot) => {
        if (this.isProminentDetailRole(shot?.role)) count += 1;
      });
      return count;
    }

    recentDirectorAge(map, key) {
      if (!(map instanceof Map)) return Infinity;
      const value = map.get(key) || 0;
      return value ? Math.max(0, Date.now() - value) : Infinity;
    }

    resolveDetailCategoryWeight(detailKey, detail, nextState, evaluation, role) {
      const weather = nextState.weather;
      const time = nextState.timeOfDay;
      const season = nextState.season;
      const calm = this.sceneCalmScore(nextState);
      let weight = clamp(detail.directorBias ?? 1, 0.1, 2.4);

      switch (detail.category) {
        case "songbirds":
          weight *= time === "dawn" ? 1.18 : time === "day" ? 1.02 : 0.78;
          weight *= ["clear", "partly_cloudy", "post_rain"].includes(weather)
            ? 1.12
            : ["cloudy", "overcast"].includes(weather) ? 0.84 : 0.58;
          break;
        case "bird_motion":
          weight *= time === "day" ? 1.04 : 0.92;
          weight *= ["clear", "partly_cloudy", "post_rain"].includes(weather) ? 1.06 : 0.78;
          break;
        case "woodpecker":
          weight *= (time === "dawn" || time === "day") ? 1.18 : 0.56;
          weight *= ["clear", "partly_cloudy", "cloudy", "post_rain", "frost", "snow_light"].includes(weather) ? 1.04 : 0.68;
          weight *= calm > 0.68 ? 1.06 : 0.74;
          break;
        case "corvids":
          weight *= time === "day" || time === "evening" ? 1.06 : 0.88;
          weight *= ["cloudy", "overcast", "post_rain", "post_storm", "frost", "snow_light"].includes(weather)
            ? 1.18
            : ["clear", "partly_cloudy"].includes(weather) ? 0.62 : 0.86;
          break;
        case "doves":
          weight *= ["day", "evening"].includes(time) ? 1.04 : 0.76;
          weight *= ["clear", "partly_cloudy", "heat_haze"].includes(weather) ? 1.08 : 0.82;
          break;
        case "owls":
          weight *= time === "night" ? 1.12 : 0.08;
          weight *= ["fog", "cloudy", "overcast", "post_rain", "post_storm", "post_snow", "frost"].includes(weather) ? 1.08 : 0.84;
          break;
        case "insects":
          if (detailKey === "mosquito_pass") {
            weight *= ["evening", "night"].includes(time) ? 1.18 : 0.42;
            weight *= season === "summer" ? 1.12 : 0.74;
            weight *= ["post_rain", "clear", "partly_cloudy", "cloudy", "heat_haze"].includes(weather) ? 1.04 : 0.54;
          } else {
            weight *= ["dawn", "day"].includes(time) ? 1.08 : 0.52;
            weight *= (nextState.temperatureBand === "warm" || nextState.temperatureBand === "hot") ? 1.14 : 0.76;
            weight *= ["clear", "partly_cloudy", "heat_haze", "post_rain"].includes(weather) ? 1.10 : 0.58;
          }
          break;
        case "mammals":
          if (detailKey === "squirrel_rustle") {
            weight *= ["day", "evening"].includes(time) ? 1.06 : 0.46;
            weight *= ["summer", "autumn"].includes(season) ? 1.08 : 0.70;
            weight *= calm > 0.70 ? 1.06 : 0.74;
          } else if (detailKey === "dog_far") {
            weight *= time === "night" ? 1.06 : 0.18;
            weight *= ["cloudy", "overcast", "post_rain", "frost", "post_snow"].includes(weather) ? 1.04 : 0.84;
            weight *= 0.56;
          } else {
            weight *= 0.12;
          }
          break;
        case "amphibians":
          weight *= ["evening", "night"].includes(time) ? 1.08 : 0.44;
          weight *= ["post_rain", "post_storm", "cloudy", "overcast"].includes(weather) ? 1.14 : 0.82;
          break;
        case "drips":
          weight *= ["post_rain", "post_storm", "drizzle"].includes(weather) ? 1.24 : 0.62;
          weight *= calm > 0.46 ? 1.04 : 0.90;
          break;
        case "thunder":
          weight *= weather === "storm_near" ? 1.14 : 0.92;
          weight *= 0.92 + (nextState.intensity * 0.24);
          break;
        default:
          weight *= 1;
      }

      if (evaluation?.priority === "medium") {
        weight *= role === "safe" ? 0.88 : role === "hero" ? 0.86 : 0.62;
      } else if (evaluation?.priority === "high") {
        if (detail.category === "thunder") {
          weight *= 1.02;
        } else if (detail.category === "drips") {
          weight *= 0.86;
        } else {
          weight *= role === "safe" ? 0.56 : 0.24;
        }
      } else if (evaluation?.priority === "extreme") {
        if (detail.category === "thunder") {
          weight *= 1.04;
        } else {
          weight *= detailKey === "tree_drips" ? 0.22 : 0.06;
        }
      }

      return clamp(weight, 0, 4.2);
    }

    resolveDetailDirectorWeight(detailKey, detail, nextState, evaluation, triggerKey = "") {
      const director = this.detailDirector || {};
      const role = this.resolveDetailRole(detailKey, detail);
      const now = Date.now();
      const calm = this.sceneCalmScore(nextState);
      let weight = clamp(detail.chance ?? 1, 0.02, 1.2);

      weight *= role === "safe" ? 1 : role === "accent" ? 0.54 : 0.22;
      weight *= detailKey === triggerKey ? DETAIL_DIRECTOR_CONFIG.requestedKeyBias : 0.58;
      weight *= this.resolveDetailCategoryWeight(detailKey, detail, nextState, evaluation, role);
      weight *= calm > 0.74
        ? (role === "safe" ? 1.08 : 0.94)
        : calm < 0.34 ? (role === "hero" ? 1 : 0.72) : 1;

      const recentKeyAge = this.recentDirectorAge(director.lastByKey, detailKey);
      const recentCategoryAge = this.recentDirectorAge(director.lastByCategory, detail.category);
      const recentRoleAge = this.recentDirectorAge(director.lastByRole, role);
      if (recentKeyAge < Math.max(detail.cooldown || 0, 1) * 2.1) {
        weight *= clamp(recentKeyAge / Math.max((detail.cooldown || 1) * 2.1, 1), 0.08, 1);
      }
      if (recentCategoryAge < this.resolveDetailCategoryCooldownMs(detailKey, detail, nextState, evaluation, role) * 1.5) {
        weight *= clamp(recentCategoryAge / Math.max(this.resolveDetailCategoryCooldownMs(detailKey, detail, nextState, evaluation, role) * 1.5, 1), 0.22, 1);
      }
      if (this.isProminentDetailRole(role) && recentRoleAge < this.resolveDetailRoleCooldownMs(role, nextState, evaluation) * 1.4) {
        weight *= clamp(recentRoleAge / Math.max(this.resolveDetailRoleCooldownMs(role, nextState, evaluation) * 1.4, 1), 0.18, 1);
      }
      if (director.lastStrongDetailTs && (now - director.lastStrongDetailTs) < DETAIL_DIRECTOR_CONFIG.strongAfterglowMs) {
        weight *= role === "safe" ? 0.88 : 0.54;
      }

      return clamp(weight, 0, 4.2);
    }

    resolveDetailGlobalCooldownMs(detailKey, detail, nextState, evaluation, role) {
      let cooldownMs = randomFromRange(DETAIL_DIRECTOR_CONFIG.globalCooldownMs[role] || DETAIL_DIRECTOR_CONFIG.globalCooldownMs.safe);
      if (evaluation?.priority === "medium") cooldownMs *= 1.08;
      if (evaluation?.priority === "high") cooldownMs *= 1.24;
      if (evaluation?.priority === "extreme") cooldownMs *= 1.42;
      if (detail.category === "thunder") cooldownMs *= nextState.weather === "storm_near" ? 0.82 : 0.96;
      if (detailKey === "tree_drips") cooldownMs *= 0.74;
      return Math.round(cooldownMs);
    }

    resolveDetailCategoryCooldownMs(detailKey, detail, nextState, evaluation, role) {
      let cooldownMs = averageRange(DETAIL_DIRECTOR_CONFIG.categoryCooldownMs[role] || DETAIL_DIRECTOR_CONFIG.categoryCooldownMs.safe);
      if (detail.category === "mammals") cooldownMs *= 1.26;
      if (detail.category === "drips") cooldownMs *= 0.72;
      if (detail.category === "thunder") cooldownMs *= nextState.weather === "storm_near" ? 0.88 : 1.04;
      if (evaluation?.priority === "high" || evaluation?.priority === "extreme") cooldownMs *= 1.12;
      return Math.round(cooldownMs);
    }

    resolveDetailRoleCooldownMs(role, nextState, evaluation) {
      let cooldownMs = averageRange(DETAIL_DIRECTOR_CONFIG.globalCooldownMs[role] || DETAIL_DIRECTOR_CONFIG.globalCooldownMs.safe) * (role === "hero" ? 1.18 : 1.04);
      if (evaluation?.priority === "high") cooldownMs *= 1.08;
      if (evaluation?.priority === "extreme") cooldownMs *= 1.18;
      return Math.round(cooldownMs);
    }

    resolveDetailQuietWindowMs(role, nextState, evaluation, afterPlayback = false) {
      let quietMs = randomFromRange(DETAIL_DIRECTOR_CONFIG.quietWindowMs[role] || DETAIL_DIRECTOR_CONFIG.quietWindowMs.safe);
      if (!afterPlayback) quietMs *= 0.82;
      if (evaluation?.priority === "medium") quietMs *= 1.06;
      if (evaluation?.priority === "high") quietMs *= 1.18;
      if (evaluation?.priority === "extreme") quietMs *= 1.28;
      if (nextState.timeOfDay === "night") quietMs *= 1.08;
      return Math.round(quietMs);
    }

    buildDirectedDetailCandidates(triggerKey, nextState, evaluation = this.evaluation) {
      const allowedSet = new Set(asArray(evaluation?.allowedDetails));
      return Object.keys(SOUNDSCAPE_CONFIG.detailEvents).map((detailKey) => {
        if (!allowedSet.has(detailKey)) return null;
        const detail = SOUNDSCAPE_CONFIG.detailEvents[detailKey];
        const eligible = this.isDetailEligible(detailKey, nextState, { includeReason: true });
        if (!eligible.allowed) return null;
        const directorCheck = this.canDirectorUseDetail(detailKey, detail, nextState, evaluation, { includeReason: true });
        if (!directorCheck.allowed) return null;
        const role = this.resolveDetailRole(detailKey, detail);
        const weight = this.resolveDetailDirectorWeight(detailKey, detail, nextState, evaluation, triggerKey);
        if (!(weight > 0.01)) return null;
        return { detailKey, detail, role, weight };
      }).filter(Boolean);
    }

    resolveDetailSilenceWeight(triggerKey, candidates, nextState, evaluation = this.evaluation) {
      const director = this.detailDirector || {};
      const now = Date.now();
      const calm = this.sceneCalmScore(nextState);
      const triggerDetail = SOUNDSCAPE_CONFIG.detailEvents[triggerKey];
      const triggerRole = triggerDetail ? this.resolveDetailRole(triggerKey, triggerDetail) : "safe";
      let weight = DETAIL_DIRECTOR_CONFIG.baseSilenceWeight;

      if (!(director.lastDetailTs || 0) && !this.oneShots.size) weight *= 0.12;
      if (calm > 0.74) weight += 0.05;
      if (evaluation?.priority === "medium") weight += 0.10;
      if (evaluation?.priority === "high") weight += 0.20;
      if (evaluation?.priority === "extreme") weight += 0.30;
      if ((director.lastDetailTs || 0) && (now - director.lastDetailTs) < 22000) weight += 0.10;
      if (this.oneShots.size) weight += 0.10;
      if (this.isProminentDetailRole(triggerRole)) weight += 0.05;
      if (!candidates.length) weight += 0.22;

      return clamp(weight, 0.08, DETAIL_DIRECTOR_CONFIG.maxSilenceWeight);
    }

    registerDetailDirectorPlayback(detailKey, detail, assetPath, nextState, evaluation, role) {
      const director = this.detailDirector || {};
      const now = Date.now();
      director.lastDetailTs = now;
      director.lastDetailKey = detailKey;
      director.lastDetailRole = role;
      if (this.isProminentDetailRole(role)) {
        director.lastStrongDetailTs = now;
      }
      director.globalCooldownUntil = Math.max(
        Number(director.globalCooldownUntil) || 0,
        now + this.resolveDetailGlobalCooldownMs(detailKey, detail, nextState, evaluation, role)
      );
      director.quietUntil = Math.max(
        Number(director.quietUntil) || 0,
        now + this.resolveDetailQuietWindowMs(role, nextState, evaluation, true)
      );
      director.lastByKey.set(detailKey, now);
      director.lastByCategory.set(detail.category, now);
      director.lastByRole.set(role, now);
      if (assetPath) {
        director.lastByAsset.set(assetPath, now);
      }
      director.recentKeys = [detailKey, ...director.recentKeys.filter((item) => item !== detailKey)].slice(0, DETAIL_DIRECTOR_HISTORY_LIMIT);
      director.recentCategories = [detail.category, ...director.recentCategories.filter((item) => item !== detail.category)].slice(0, DETAIL_DIRECTOR_HISTORY_LIMIT);
      const extraKeyCooldown = Math.max(
        detail.cooldown || 0,
        Math.round(this.resolveDetailCategoryCooldownMs(detailKey, detail, nextState, evaluation, role) * (role === "safe" ? 0.82 : 1))
      );
      this.detailCooldowns.set(detailKey, now + extraKeyCooldown);
    }

    registerDetailDirectorSilence(triggerKey, nextState, evaluation = this.evaluation) {
      const triggerDetail = SOUNDSCAPE_CONFIG.detailEvents[triggerKey];
      const role = triggerDetail ? this.resolveDetailRole(triggerKey, triggerDetail) : "safe";
      const until = Date.now() + this.resolveDetailQuietWindowMs(role, nextState, evaluation, false);
      this.detailDirector.quietUntil = Math.max(Number(this.detailDirector.quietUntil) || 0, until);
    }

    canDirectorUseDetail(detailKey, detail, nextState, evaluation = this.evaluation, { includeReason = false } = {}) {
      const director = this.detailDirector || {};
      const now = Date.now();
      const role = this.resolveDetailRole(detailKey, detail);
      if (this.oneShots.size >= DETAIL_DIRECTOR_CONFIG.maxTotalShots) {
        return includeReason ? { allowed: false, reason: "total-active" } : false;
      }
      if (this.isProminentDetailRole(role) && this.activeProminentDetailCount() >= DETAIL_DIRECTOR_CONFIG.maxProminentActive) {
        return includeReason ? { allowed: false, reason: "prominent-active" } : false;
      }
      if ((director.globalCooldownUntil || 0) > now) {
        return includeReason ? { allowed: false, reason: "global-cooldown" } : false;
      }
      if ((director.quietUntil || 0) > now) {
        return includeReason ? { allowed: false, reason: "quiet-window" } : false;
      }
      const categoryAge = this.recentDirectorAge(director.lastByCategory, detail.category);
      if (categoryAge < this.resolveDetailCategoryCooldownMs(detailKey, detail, nextState, evaluation, role)) {
        return includeReason ? { allowed: false, reason: "category-cooldown" } : false;
      }
      const roleAge = this.recentDirectorAge(director.lastByRole, role);
      if (this.isProminentDetailRole(role) && roleAge < this.resolveDetailRoleCooldownMs(role, nextState, evaluation)) {
        return includeReason ? { allowed: false, reason: "role-cooldown" } : false;
      }
      if (this.isProminentDetailRole(role) && director.lastStrongDetailTs && (now - director.lastStrongDetailTs) < DETAIL_DIRECTOR_CONFIG.strongAfterglowMs && detail.category !== "thunder") {
        return includeReason ? { allowed: false, reason: "strong-afterglow" } : false;
      }
      return includeReason ? { allowed: true, reason: "" } : true;
    }

    attemptDirectedDetail(triggerKey, evaluation = this.evaluation) {
      if (!evaluation || !this.state.enabledDetails || !this.enabled || !this.activated) {
        return { played: false, reason: "engine-disabled" };
      }
      const director = this.detailDirector || {};
      const now = Date.now();
      if ((director.globalCooldownUntil || 0) > now) {
        return { played: false, reason: "global-cooldown" };
      }
      if ((director.quietUntil || 0) > now) {
        return { played: false, reason: "quiet-window" };
      }
      const candidates = this.buildDirectedDetailCandidates(triggerKey, this.state, evaluation);
      if (!candidates.length) {
        return { played: false, reason: "no-candidates" };
      }
      const silenceWeight = this.resolveDetailSilenceWeight(triggerKey, candidates, this.state, evaluation);
      const choice = weightedPick([
        ...candidates.map((candidate) => ({
          type: "detail",
          detailKey: candidate.detailKey,
          role: candidate.role,
          weight: candidate.weight
        })),
        {
          type: "silence",
          weight: silenceWeight
        }
      ]);

      if (!choice || choice.type !== "detail") {
        this.registerDetailDirectorSilence(triggerKey, this.state, evaluation);
        return { played: false, reason: "director-silence" };
      }

      const played = this.playRandomDetail(choice.detailKey, { evaluation, triggerKey, role: choice.role });
      if (!played) {
        return { played: false, reason: "play-failed", detailKey: choice.detailKey };
      }
      if (choice.detailKey !== triggerKey) {
        this.scheduleDetail(choice.detailKey, evaluation, false);
      }
      return { played: true, detailKey: choice.detailKey, reason: "" };
    }

    pickDetailAsset(detailKey, detail) {
      const director = this.detailDirector || {};
      const recentAssetLimit = DETAIL_DIRECTOR_CONFIG.recentAssetCooldownMs;
      const now = Date.now();
      const freshList = detail.fileList.filter((assetPath) => {
        const lastPlayedAt = director.lastByAsset.get(assetPath) || 0;
        return !lastPlayedAt || (now - lastPlayedAt) >= recentAssetLimit;
      });
      const candidateList = freshList.length ? freshList : detail.fileList.filter((assetPath) => assetPath !== director.lastPlayedAsset);
      const selectedAsset = pickRandom(candidateList.length ? candidateList : detail.fileList);
      director.lastPlayedAsset = selectedAsset || director.lastPlayedAsset || "";
      return selectedAsset;
    }

    resolveDetailFadeMs(detailKey, detail, role, type = "fadeIn") {
      const ranges = type === "fadeOut"
        ? DETAIL_DIRECTOR_CONFIG.fadeOutMs
        : DETAIL_DIRECTOR_CONFIG.fadeInMs;
      let fadeMs = randomFromRange(ranges[role] || ranges.safe);
      if (detail.category === "thunder" && type === "fadeOut") fadeMs *= 1.18;
      if (detailKey === "tree_drips" && type === "fadeIn") fadeMs *= 0.78;
      return Math.round(fadeMs);
    }

    resolveShotEnvelope(shot, now = Date.now()) {
      if (!shot) return 0;
      if (!shot.fadeOutStartTs && shot.stopAtTs && shot.fadeOutMs > 0 && now >= (shot.stopAtTs - shot.fadeOutMs)) {
        shot.fadeOutStartTs = Math.max(shot.startedAt, shot.stopAtTs - shot.fadeOutMs);
      }
      const fadeInProgress = shot.fadeInMs > 0
        ? clamp((now - shot.startedAt) / Math.max(shot.fadeInMs, 1), 0, 1)
        : 1;
      if (!shot.fadeOutStartTs) {
        return fadeInProgress;
      }
      const fadeOutProgress = shot.fadeOutMs > 0
        ? clamp((now - shot.fadeOutStartTs) / Math.max(shot.fadeOutMs, 1), 0, 1)
        : 1;
      return clamp(Math.min(fadeInProgress, 1 - fadeOutProgress), 0, 1);
    }

    applyLayerMix(activeMix, evaluation) {
      if (!this.activated) return;
      this.initAudioEngine();
      this.preloadAudioAssets(activeMix.activeLayerKeys);
      const activeLayerKeySet = new Set(Object.keys(activeMix.activeLayers));

      this.loopLayers.forEach((layer) => {
        layer.targetGain = activeMix.activeLayers[layer.key] || 0;
        const fadeSeconds = activeLayerKeySet.has(layer.key)
          ? (evaluation.preset.crossfadeDuration || layer.config.crossfadeDuration)
          : Math.max(1.2, (evaluation.preset.crossfadeDuration || layer.config.crossfadeDuration) * 0.42);
        layer.fadeRate = this.fadeRateFromSeconds(fadeSeconds);
      });

      Object.keys(activeMix.activeLayers).forEach((layerKey) => {
        const layer = this.ensureLoopLayer(layerKey);
        if (!layer) return;
        if (layer.audio && layer.audio.paused && layer.currentGain <= 0.002 && layer.config.fileList.length > 1) {
          const currentSrc = String(layer.audio.currentSrc || layer.audio.src || "");
          const candidates = layer.config.fileList.filter((item) => !currentSrc.endsWith(item));
          const nextSrc = pickRandom(candidates.length ? candidates : layer.config.fileList);
          if (nextSrc) {
            try {
              layer.audio.src = nextSrc;
              layer.audio.load();
            } catch (error) {
              // Ignore source rotation failures.
            }
          }
        }
        layer.targetGain = activeMix.activeLayers[layerKey];
        layer.fadeRate = this.fadeRateFromSeconds(layer.config.crossfadeDuration || evaluation.preset.crossfadeDuration);
      });

      Object.keys(this.groupState).forEach((groupKey) => {
        this.groupState[groupKey].target = activeMix.groupTargets[groupKey] || 0;
        this.groupState[groupKey].fadeRate = this.fadeRateFromSeconds(evaluation.preset.crossfadeDuration || 4);
      });
      if (this.masterState) {
        this.masterState.target = activeMix.groupTargets.master || 0;
        this.masterState.fadeRate = this.fadeRateFromSeconds(evaluation.preset.crossfadeDuration || 4);
      }

      this.stopIncompatibleDetails(evaluation.allowedDetails);
      this.startMixLoop();
    }

    fadeInLayer(layerKey, target = 0.2, seconds = 3.8) {
      const layer = this.ensureLoopLayer(layerKey);
      if (!layer) return null;
      layer.targetGain = clamp(target, 0, MAX_LAYER_GAIN);
      layer.fadeRate = this.fadeRateFromSeconds(seconds);
      this.startMixLoop();
      return layer;
    }

    fadeOutLayer(layerKey, seconds = 2.8) {
      const layer = this.loopLayers.get(layerKey);
      if (!layer) return null;
      layer.targetGain = 0;
      layer.fadeRate = this.fadeRateFromSeconds(seconds);
      this.startMixLoop();
      return layer;
    }

    stopMixLoop() {
      if (typeof window === "undefined") return;
      if (this.volumeRaf) {
        window.cancelAnimationFrame(this.volumeRaf);
        this.volumeRaf = 0;
      }
      if (this.volumeTimer) {
        window.clearTimeout(this.volumeTimer);
        this.volumeTimer = 0;
      }
    }

    queueNextMixStep() {
      if (typeof window === "undefined") return;
      const delayMs = mobileAudioLoopDelayMs();
      if (delayMs > 0) {
        if (this.volumeTimer) return;
        this.volumeTimer = window.setTimeout(() => {
          this.volumeTimer = 0;
          this.stepMix(performance.now());
        }, delayMs);
        return;
      }
      if (this.volumeRaf) return;
      this.volumeRaf = window.requestAnimationFrame(this.stepMix);
    }

    startMixLoop() {
      if (typeof window === "undefined") return;
      this.queueNextMixStep();
    }

    stepMix(timestamp) {
      this.volumeRaf = 0;
      this.volumeTimer = 0;
      const frameTs = Number(timestamp) || 0;
      const deltaMs = this.lastFrameTs ? Math.max(8, frameTs - this.lastFrameTs) : 16.7;
      this.lastFrameTs = frameTs;
      const frameScale = clamp(deltaMs / 16.7, 0.7, 2.6);
      let keepRunning = false;

      if (this.masterState) {
        const factor = clamp(this.masterState.fadeRate * frameScale, 0.02, 0.42);
        const next = Math.abs(this.masterState.target - this.masterState.current) < 0.002
          ? this.masterState.target
          : lerp(this.masterState.current, this.masterState.target, factor);
        this.masterState.current = next;
        if (this.masterGain) {
          this.masterGain.gain.value = clamp(next * MASTER_VOLUME, 0, MAX_BUS_GAIN);
        }
        if (Math.abs(this.masterState.target - next) > 0.002) keepRunning = true;
      }

      const directMasterVolume = clamp(this.masterState?.current ?? this.state.masterVolume, 0, 1);
      const directDetailGain = this.resolveDirectDetailGain();

      Object.keys(this.groupState).forEach((groupKey) => {
        const state = this.groupState[groupKey];
        if (!state) return;
        const factor = clamp(state.fadeRate * frameScale, 0.02, 0.42);
        const next = Math.abs(state.target - state.current) < 0.002 ? state.target : lerp(state.current, state.target, factor);
        state.current = next;
        if (this.groupNodes[groupKey]) {
          this.groupNodes[groupKey].gain.value = clamp(next * SOUNDSCAPE_CONFIG.groups[groupKey], 0, MAX_BUS_GAIN);
        }
        if (Math.abs(state.target - next) > 0.002) keepRunning = true;
      });

      this.loopLayers.forEach((layer) => {
        const factor = clamp(layer.fadeRate * frameScale, 0.02, 0.42);
        const next = Math.abs(layer.targetGain - layer.currentGain) < 0.002 ? layer.targetGain : lerp(layer.currentGain, layer.targetGain, factor);
        layer.currentGain = next;

        if (layer.gainNode) {
          layer.gainNode.gain.value = clamp(next * LOOP_BOOST, 0, MAX_LAYER_GAIN);
        } else {
          layer.audio.volume = clamp(next * directMasterVolume * LOOP_BOOST, 0, 1);
        }

        if (this.enabled && this.activated && next > 0.002) {
          layer.silentSinceTs = 0;
          if (layer.audio.paused) {
            const playPromise = layer.audio.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {});
            }
          }
        } else if (!layer.audio.paused && next <= 0.002 && layer.targetGain <= 0.002) {
          const holdMs = (this.enabled && this.activated) ? mobileSilentLoopHoldMs() : 0;
          if (holdMs > 0) {
            if (!layer.silentSinceTs) layer.silentSinceTs = Date.now();
            if ((Date.now() - layer.silentSinceTs) >= holdMs) {
              layer.audio.pause();
              layer.silentSinceTs = 0;
            } else {
              keepRunning = true;
            }
          } else {
            layer.audio.pause();
            layer.silentSinceTs = 0;
          }
        }

        if (Math.abs(layer.targetGain - next) > 0.002 || (this.enabled && this.activated && next > 0.002)) {
          keepRunning = true;
        }
      });

      const shotNow = Date.now();
      this.oneShots.forEach((shot) => {
        if (!shot?.audio) return;
        const envelope = this.resolveShotEnvelope(shot, shotNow);
        if (shot.gainNode) {
          shot.gainNode.gain.value = clamp((shot.baseVolume || 0) * envelope, 0, MAX_LAYER_GAIN);
        } else {
          shot.audio.volume = clamp((shot.baseVolume || 0) * directMasterVolume * directDetailGain * envelope, 0, 1);
        }
        if (shot.cleanup && shot.fadeOutStartTs && envelope <= 0.002 && shotNow >= (shot.fadeOutStartTs + Math.max(shot.fadeOutMs || 0, 80))) {
          shot.cleanup();
          return;
        }
        if (!shot.audio.paused || envelope > 0.002) {
          keepRunning = true;
        }
      });

      if (keepRunning && typeof window !== "undefined") {
        this.queueNextMixStep();
      } else {
        this.lastFrameTs = 0;
      }
    }

    scheduleDetailEvents(evaluation = this.evaluation) {
      if (!evaluation) return;
      const allowedSet = new Set(evaluation.allowedDetails);
      Object.keys(SOUNDSCAPE_CONFIG.detailEvents).forEach((detailKey) => {
        if (!allowedSet.has(detailKey) || !this.state.enabledDetails || !this.enabled || !this.activated) {
          this.clearDetailTimer(detailKey);
          return;
        }
        if (!this.detailTimers.has(detailKey)) {
          this.scheduleDetail(detailKey, evaluation);
        }
      });
    }

    scheduleDetail(detailKey, evaluation = this.evaluation, warmStart = true) {
      const detail = SOUNDSCAPE_CONFIG.detailEvents[detailKey];
      if (!detail || !detail.fileList.length) return;
      this.clearDetailTimer(detailKey);
      const delay = this.randomizedDetailDelay(detailKey, detail, warmStart);
      const timer = window.setTimeout(() => {
        this.detailTimers.delete(detailKey);
        const activeEvaluation = this.evaluation || evaluation;
        const result = this.attemptDirectedDetail(detailKey, activeEvaluation);
        if (!result.played) {
          this.debugLog("detail-skip", { detailKey, reason: result.reason || "director-skip" });
        }
        this.scheduleDetail(detailKey, activeEvaluation, false);
      }, delay);
      this.detailTimers.set(detailKey, timer);
    }

    randomizedDetailDelay(detailKey, detail, warmStart = false) {
      const baseDelay = randomBetween(detail.intervalMin, detail.intervalMax);
      const role = this.resolveDetailRole(detailKey, detail);
      if (warmStart) {
        if (detailKey === "mosquito_pass") return clamp(baseDelay * 0.22, 8000, 24000);
        if (detailKey === "frog_call") return clamp(baseDelay * 0.24, 12000, 32000);
        if (detailKey === "squirrel_rustle") return clamp(baseDelay * 0.28, 15000, 36000);
        if (detailKey === "woodpecker") return clamp(baseDelay * 0.42, 26000, 70000);
        if (detailKey === "bee_pass" || detailKey === "bumblebee_pass") return clamp(baseDelay * 0.26, 9000, 28000);
        const warmDelay = baseDelay * (role === "safe" ? 0.24 : role === "accent" ? 0.32 : 0.44);
        return clamp(
          warmDelay,
          role === "safe" ? 6000 : role === "accent" ? 10000 : 16000,
          role === "safe" ? 18000 : role === "accent" ? 28000 : 42000
        );
      }
      const weather = this.state.weather;
      let delay = baseDelay;
      if (detailKey === "thunder_near") delay *= clamp(1 - (this.state.intensity * 0.24), 0.55, 1);
      if (detailKey === "thunder_far") delay *= clamp(1 - (this.state.intensity * 0.18), 0.66, 1.02);
      if (detailKey === "day_bird_call") {
        if (this.state.timeOfDay === "dawn") delay *= 0.72;
        else if (weather === "overcast") delay *= 1.26;
        else if (weather === "cloudy") delay *= 1.18;
        else if (weather === "partly_cloudy") delay *= 0.96;
        else if (weather === "clear") delay *= 0.88;
      }
      if (detailKey === "bee_pass") delay *= clamp(1.04 - (this.state.heatIntensity * 0.24), 0.72, 1.08);
      if (detailKey === "bumblebee_pass") delay *= clamp(1.10 - (this.state.heatIntensity * 0.18), 0.82, 1.14);
      if (detailKey === "crow_call") {
        if (weather === "overcast") delay *= 1.22;
        else if (weather === "cloudy") delay *= 1.08;
        else if (weather === "post_rain" || weather === "post_storm" || weather === "frost") delay *= 0.86;
      }
      if (detailKey === "cuckoo_call" && this.state.timeOfDay === "dawn") delay *= 0.78;
      if (detailKey === "dove_call" && (weather === "clear" || weather === "partly_cloudy")) delay *= 1.12;
      if (detailKey === "dove_call" && !["clear", "partly_cloudy"].includes(weather)) delay *= 1.26;
      if (detailKey === "woodpecker") delay *= (this.state.timeOfDay === "evening" ? 1.54 : 1.32);
      if (detailKey === "owl_call" && (weather === "clear" || weather === "partly_cloudy")) delay *= 0.70;
      if (detailKey === "owl_call" && weather === "fog") delay *= 0.86;
      if (detailKey === "owl_call" && (weather === "cloudy" || weather === "overcast" || weather === "post_rain" || weather === "post_storm" || weather === "frost" || weather === "post_snow")) delay *= 0.78;
      if (detailKey === "dog_far") delay *= (weather === "clear" || weather === "partly_cloudy" || weather === "cloudy" || weather === "overcast" ? 0.76 : 0.94);
      if (detailKey === "mosquito_pass") delay *= (this.state.temperatureBand === "hot" ? 0.54 : 0.68);
      if (detailKey === "frog_call" && (weather === "post_rain" || weather === "post_storm")) delay *= 0.64;
      if (detailKey === "frog_call" && !["post_rain", "post_storm"].includes(weather)) delay *= (this.state.timeOfDay === "night" ? 0.78 : 0.90);
      if (detailKey === "squirrel_rustle" && this.state.season === "autumn") delay *= 0.68;
      if (detailKey === "squirrel_rustle" && this.state.season !== "autumn") delay *= 0.78;
      delay *= role === "safe" ? 0.92 : role === "accent" ? 1.04 : 1.18;
      if (this.evaluation?.priority === "medium") delay *= role === "safe" ? 0.96 : 1.04;
      if (this.evaluation?.priority === "high") delay *= role === "hero" ? 1.02 : 1.12;
      if (this.evaluation?.priority === "extreme") delay *= role === "hero" ? 1.02 : 1.20;
      return delay;
    }

    playRandomDetail(detailKey, options = {}) {
      const detail = SOUNDSCAPE_CONFIG.detailEvents[detailKey];
      if (!detail || !detail.fileList.length || !this.enabled || !this.activated) return false;
      const evaluation = options.evaluation || this.evaluation;
      const role = options.role || this.resolveDetailRole(detailKey, detail);
      const eligibility = this.isDetailEligible(detailKey, this.state, { includeReason: true });
      if (!eligibility.allowed) {
        this.debugLog("detail-blocked", { detailKey, reason: eligibility.reason });
        return false;
      }
      const directorCheck = this.canDirectorUseDetail(detailKey, detail, this.state, evaluation, { includeReason: true });
      if (!directorCheck.allowed) {
        this.debugLog("detail-director-block", { detailKey, reason: directorCheck.reason });
        return false;
      }
      if (this.countShotsByCategory(detail.category) >= (DETAIL_CATEGORY_LIMITS[detail.category] || 1)) {
        this.debugLog("detail-limit", { detailKey, category: detail.category });
        return false;
      }

      this.initAudioEngine();
      const assetPath = this.pickDetailAsset(detailKey, detail);
      if (!assetPath) return false;
      const audio = new Audio(assetPath);
      audio.preload = "auto";
      audio.loop = false;
      audio.playsInline = true;
      audio.volume = 0;
      audio.muted = false;
      audio.defaultMuted = false;
      audio.playbackRate = randomBetween(detail.playbackRateMin, detail.playbackRateMax);

      const startedAt = Date.now();
      const fadeInMs = this.resolveDetailFadeMs(detailKey, detail, role, "fadeIn");
      const fadeOutMs = this.resolveDetailFadeMs(detailKey, detail, role, "fadeOut");
      const maxDurationMs = detail.maxDurationMs > 0
        ? Math.round(detail.maxDurationMs * (DETAIL_DURATION_MULTIPLIER[role] || 1.1))
        : 0;

      const shot = {
        key: detailKey,
        category: detail.category,
        role,
        assetPath,
        audio,
        baseVolume: clamp(this.detailVolume(detailKey, detail, role) * DETAIL_BOOST, 0, MAX_LAYER_GAIN),
        gainNode: null,
        mediaSource: null,
        startedAt,
        fadeInMs,
        fadeOutMs,
        fadeOutStartTs: 0,
        stopAtTs: maxDurationMs > 0 ? (startedAt + maxDurationMs) : 0,
        cleanup: null
      };

      if (this.audioContext && this.groupNodes.details) {
        try {
          const mediaSource = this.audioContext.createMediaElementSource(audio);
          const gainNode = this.audioContext.createGain();
          gainNode.gain.value = 0;
          mediaSource.connect(gainNode);
          audio.volume = 1;
          if (this.audioContext.createStereoPanner) {
            const panner = this.audioContext.createStereoPanner();
            panner.pan.value = randomBetween(detail.panMin, detail.panMax);
            gainNode.connect(panner);
            panner.connect(this.groupNodes.details);
            shot.pannerNode = panner;
          } else {
            gainNode.connect(this.groupNodes.details);
          }
          shot.gainNode = gainNode;
          shot.mediaSource = mediaSource;
        } catch (error) {
          audio.volume = clamp(shot.baseVolume * clamp(this.state.masterVolume, 0, 1) * this.resolveDirectDetailGain(), 0, 1);
        }
      } else {
        audio.volume = 0;
      }

      let durationTimer = 0;
      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        if (durationTimer && typeof window !== "undefined") {
          window.clearTimeout(durationTimer);
          durationTimer = 0;
        }
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (error) {
          // Ignore media cleanup issues.
        }
        this.oneShots.delete(shot);
        this.notifyStateChange("detail-stop");
      };
      shot.cleanup = cleanup;

      this.oneShots.add(shot);
      this.registerDetailDirectorPlayback(detailKey, detail, assetPath, this.state, evaluation, role);
      this.notifyStateChange("detail-start");
      audio.addEventListener("loadedmetadata", () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
        const naturalStopTs = shot.startedAt + Math.round(audio.duration * 1000);
        shot.stopAtTs = shot.stopAtTs > 0
          ? Math.min(shot.stopAtTs, naturalStopTs)
          : naturalStopTs;
      }, { once: true });
      audio.addEventListener("ended", cleanup, { once: true });
      audio.addEventListener("error", cleanup, { once: true });
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => cleanup());
      }
      if (shot.stopAtTs > 0 && typeof window !== "undefined") {
        durationTimer = window.setTimeout(() => cleanup(), Math.max(shot.stopAtTs - Date.now() + fadeOutMs + 240, fadeOutMs + 320));
      }
      this.debugLog("detail-play", { detailKey, volume: this.detailVolume(detailKey, detail, role), role, assetPath });
      return true;
    }

    detailVolume(detailKey, detail, role = this.resolveDetailRole(detailKey, detail)) {
      const priority = this.evaluation?.priority || "low";
      let volume = detail.baseVolume;
      if (detailKey === "thunder_far" || detailKey === "thunder_near") {
        volume *= 0.82 + (this.state.intensity * 0.30);
      } else if (detailKey === "day_bird_call") {
        const timeFactor = this.state.timeOfDay === "dawn" ? 1.12 : this.state.timeOfDay === "day" ? 0.94 : 0.76;
        const weatherFactor = this.state.weather === "clear"
          ? 1.02
          : this.state.weather === "partly_cloudy"
            ? 0.92
            : this.state.weather === "cloudy"
              ? 0.78
              : this.state.weather === "overcast"
                ? 0.70
                : this.state.weather === "fog" || this.state.weather === "drizzle"
                  ? 0.50
                  : 0.72;
        volume *= timeFactor * weatherFactor;
      } else if (detailKey === "bee_pass") {
        volume *= 0.76 + (this.state.heatIntensity * 0.18);
      } else if (detailKey === "bumblebee_pass") {
        volume *= 0.78 + (this.state.heatIntensity * 0.16);
      } else if (detailKey === "crow_call") {
        volume *= this.state.weather === "overcast"
          ? 0.62
          : this.state.weather === "cloudy"
            ? 0.72
            : (this.state.weather === "post_rain" || this.state.weather === "frost") ? 0.82 : 0.74;
      } else if (detailKey === "cuckoo_call") {
        volume *= (this.state.season === "spring" || this.state.season === "summer") ? 0.98 : 0.76;
      } else if (detailKey === "woodpecker") {
        volume *= this.state.timeOfDay === "evening"
          ? 0.52
          : this.state.weather === "frost"
            ? 0.76
            : this.state.weather === "heat_haze"
              ? 0.60
              : 0.68;
      } else if (detailKey === "dove_call") {
        volume *= this.state.weather === "heat_haze"
          ? 0.68
          : (this.state.weather === "clear" || this.state.weather === "partly_cloudy") ? 0.86 : 0.72;
      } else if (detailKey === "owl_call") {
        volume *= this.state.weather === "fog"
          ? 0.82
          : 0.96 + ((this.state.weather === "clear" || this.state.weather === "partly_cloudy") ? 0.08 : 0.04);
      } else if (detailKey === "dog_far") {
        volume *= (this.state.weather === "clear" || this.state.weather === "overcast" || this.state.weather === "cloudy" || this.state.weather === "frost" || this.state.weather === "post_snow") ? 0.84 : 0.72;
      } else if (detailKey === "frog_call") {
        volume *= (this.state.weather === "post_rain" || this.state.weather === "post_storm") ? 0.84 : 0.72;
      } else if (detailKey === "mosquito_pass") {
        volume *= this.state.temperatureBand === "hot" ? 0.56 : 0.46;
      } else if (detailKey === "squirrel_rustle") {
        volume *= this.state.season === "autumn" ? 0.96 : 0.86;
      } else if (detailKey === "tree_drips") {
        volume *= (this.state.weather === "post_rain" || this.state.weather === "post_storm") ? 0.96 : 0.82;
      }
      volume *= role === "safe" ? 0.94 : role === "accent" ? 0.82 : 0.78;
      if (priority === "high" || priority === "extreme") {
        volume *= detail.category === "thunder" ? 0.94 : 0.58;
      }
      if (this.state.timeOfDay === "night" && role !== "hero") {
        volume *= 0.92;
      }
      volume *= randomBetween(0.94, 1.02);
      const cap = role === "hero"
        ? 0.24
        : role === "accent"
          ? 0.17
          : 0.13;
      return clamp(volume, 0, cap);
    }

    stopIncompatibleDetails(allowedDetailKeys = []) {
      const allowedSet = new Set(asArray(allowedDetailKeys));
      let changed = false;
      this.oneShots.forEach((shot) => {
        if (allowedSet.has(shot.key)) return;
        if (!shot.fadeOutStartTs) {
          shot.fadeOutStartTs = Date.now();
          shot.stopAtTs = shot.fadeOutStartTs + Math.min(Math.max(shot.fadeOutMs || 220, 180), 320);
        }
        changed = true;
      });
      if (changed) this.notifyStateChange("detail-prune");
    }

    stopDetailTimers() {
      this.detailTimers.forEach((timerId) => {
        window.clearTimeout(timerId);
      });
      this.detailTimers.clear();
    }

    clearDetailTimer(detailKey) {
      const timerId = this.detailTimers.get(detailKey);
      if (timerId) window.clearTimeout(timerId);
      this.detailTimers.delete(detailKey);
    }

    countShotsByCategory(category) {
      let count = 0;
      this.oneShots.forEach((shot) => {
        if (shot.category === category) count += 1;
      });
      return count;
    }

    isDetailEligible(detailKey, nextState, { ignoreCooldown = false, includeReason = false } = {}) {
      const detail = SOUNDSCAPE_CONFIG.detailEvents[detailKey];
      if (!detail) return includeReason ? { allowed: false, reason: "missing-detail" } : false;
      if (!detail.fileList.length) return includeReason ? { allowed: false, reason: "missing-assets" } : false;
      if ((detail.chance ?? 1) <= 0) return includeReason ? { allowed: false, reason: "disabled" } : false;
      if (detail.allowedTimes.length && !detail.allowedTimes.includes(nextState.timeOfDay)) {
        return includeReason ? { allowed: false, reason: "time-blocked" } : false;
      }
      if (detail.allowedWeather.length && !detail.allowedWeather.includes(nextState.weather)) {
        return includeReason ? { allowed: false, reason: "weather-not-allowed" } : false;
      }
      if (detail.blockedWeather.includes(nextState.weather)) {
        return includeReason ? { allowed: false, reason: "weather-blocked" } : false;
      }
      if (detail.allowedSeasons.length && !detail.allowedSeasons.includes(nextState.season)) {
        return includeReason ? { allowed: false, reason: "season-blocked" } : false;
      }
      if (detail.allowedTemperature.length && !detail.allowedTemperature.includes(nextState.temperatureBand)) {
        return includeReason ? { allowed: false, reason: "temperature-not-allowed" } : false;
      }
      if (detail.blockedTemperature.includes(nextState.temperatureBand)) {
        return includeReason ? { allowed: false, reason: "temperature-blocked" } : false;
      }
      if (Number.isFinite(detail.minTemperatureC) && Number.isFinite(nextState.temperatureC) && nextState.temperatureC < detail.minTemperatureC) {
        return includeReason ? { allowed: false, reason: "temperature-too-low" } : false;
      }
      if (Number.isFinite(detail.maxTemperatureC) && Number.isFinite(nextState.temperatureC) && nextState.temperatureC > detail.maxTemperatureC) {
        return includeReason ? { allowed: false, reason: "temperature-too-high" } : false;
      }
      if (!ignoreCooldown) {
        const cooldownUntil = this.detailCooldowns.get(detailKey) || 0;
        if (cooldownUntil > Date.now()) {
          return includeReason ? { allowed: false, reason: "cooldown" } : false;
        }
      }
      return includeReason ? { allowed: true, reason: "" } : true;
    }

    destroyAudioEngine() {
      this.clear();
      this.unbindUserActivation();
      this.loopLayers.forEach((layer) => {
        try {
          layer.audio.pause();
          layer.audio.currentTime = 0;
        } catch (error) {
          // Ignore media cleanup issues.
        }
      });
      this.loopLayers.clear();
      if (this.audioContext && typeof this.audioContext.close === "function") {
        this.audioContext.close().catch(() => {});
      }
      this.audioContext = null;
      this.groupNodes = {};
      this.groupState = {};
    }
  }

  window.weatherAudioEngine = new WeatherAudioEngine();
  window.weatherAudioConfig = {
    scenePresets: SCENE_PRESETS,
    soundscapeConfig: SOUNDSCAPE_CONFIG
  };
})();
