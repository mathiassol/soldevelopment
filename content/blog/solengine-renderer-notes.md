---
title: "SolEngine: notes on the renderer so far"
date: "2026-04-12"
summary: "A snapshot of what the renderer looks like today — forward PBR, HDR, shadows — and what's next."
tags: ["solengine", "rendering", "dev-log"]
---

Quick checkpoint on SolEngine. The renderer has reached the point where I can
load a glTF, light it properly, and not be embarrassed by the result.

## Current state

- **Forward PBR** — Cook-Torrance BRDF, metallic/roughness workflow.
- **Lighting** — directional + point + spot (up to 8 per pass), PCF shadow maps
  on the directional light.
- **HDR pipeline** — RGBA16F framebuffer, ACES tonemap, Kawase bloom.
- **Skybox** — equirectangular HDR mapped to a cube map at load time.
- **Scene system** — a Godot-ish node tree serialized to `.solscene` JSON.

It runs on top of [bgfx](https://github.com/bkaradzic/bgfx), which means I get
D3D11, GL, Vulkan and Metal for free. I do most testing on the Vulkan backend.

## What's annoying me

PCF on the directional shadow map is fine but the cascades are not in yet, so
anything past a few meters from the camera turns into a mess at oblique angles.
That's the next thing.

## Next

- CSM for the sun.
- Move from forward to a clustered forward setup so I can have more dynamic
  lights without paying per-pixel for all of them.
- Get the editor side of things started — right now the only way to edit a
  scene is to write JSON by hand, which is exactly as fun as it sounds.
