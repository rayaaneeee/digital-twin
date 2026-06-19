# GitHub Project: medical-xai

**Repository:** https://github.com/rayaaneeee/medical-xai
**Language:** JavaScript
**Stars:** 0
**Topics:** 
**Last updated:** 2026-06-19
**Description:** Explainable skin lesion classification using EfficientNet-B0, Grad-CAM, temperature scaling, and MC Dropout uncertainty estimation. FastAPI-powered medical imaging AI platform trained on ISIC 2019.

## README
---
title: DermAI Skin Lesion Classification
emoji: 🔬
colorFrom: blue
colorTo: purple
sdk: docker
app_file: server.py
pinned: false
---

<div align="center">

# DermAI — Medical Imaging with Explainability

**Production-quality skin lesion classification with Grad-CAM heatmaps, confidence calibration, and uncertainty quantification**

[![Live Demo](https://img.shields.io/badge/🤗_Live_Demo-HuggingFace_Spaces-FFD21E?style=for-the-badge)](https://huggingface.co/spaces/rytaaaaaaa/dermai)
[![AUC-ROC](https://img.shields.io/badge/AUC--ROC-0.9630-22d3ee?style=for-the-badge)]()
[![ECE](https://img.shields.io/badge/ECE-0.030-8b5cf6?style=for-the-badge)]()
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![PyTorch](https://img.shields.io/badge/PyTorch-2.2-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

<br/>

> **⚠️ Research and portfolio project — not intended for clinical use.**

</div>

---

## Overview

Most medical AI papers stop at accuracy. This project adds the three layers that actually matter for responsible deployment:

| Layer | Method | Result |
|-------|--------|--------|
| **Explainability** | Grad-CAM / Grad-CAM++ / EigenCAM | Visual heatmap per prediction |
| **Calibration** | Temperature Scaling | ECE: 0.1046 → **0.0296** |
| **Uncertainty** | MC Dropout (30 passes) | Predictive entropy per image |

The model — EfficientNet-B0 fine-tuned on ISIC 2019 — achieves **AUC-ROC 0.9630** across 7 skin lesion classes, matching and exceeding the top entries from the original ISIC 2019 challenge (0.93–0.95), using the smallest EfficientNet variant.

---

## Live Demo

Try it at **https://huggingface.co/spaces/rytaaaaaaa/dermai**

Upload any dermoscopy image and get:
- Grad-CAM overlay highlighting what the model is looking at
- Calibrated probability distribution across all 7 classes
- MC Dropout uncertainty score from 30 stochastic forward passes

---

## Results

| Metric | Value |
|--------|-------|
| Macro AUC-ROC (7 classes) | **0.9630** |
| ECE before calibration | 0.1046 |
| ECE after temperature scaling | **0.0296** |
| Calibration temperature T | 0.694 |
| Best checkpoint | Epoch 19 / 20 |
| Training images | 22,687 |
| Training hardware | Apple M3 Max · 32-core GPU · 48 GB RAM |

---

## Dataset — ISIC 2019

The [ISIC 2019 Challenge](https://challenge.isic-archive.com/landing/2019/) dataset contains 25,331 dermoscopy images across 7 classes. 22,687 were used after handling partial archive extraction.

| Code | Full Name | Type |
|------|-----------|------|
| MEL | Melanoma | Malignant |
| NV | Melanocytic Nevus | Benign |
| BCC | Basal Cell Carcinoma | Malignant |
| AK | Actinic Keratosis | Pre-cancerous |
| BKL | Benign Keratosis-like Lesion | Benign |
| DF | Dermatofibroma | Benign |
| VASC | Vascular Lesion | Benign |

The dataset is heavily class-imbalanced (NV ≈ 50%), which is why AUC-ROC is the right metric — not accuracy.

---

## Model Architecture

```
Input Image (224 × 224 × 3)
         │
         ▼
┌─────────────────────────────┐
│     EfficientNet-B0         │  ← ImageNet pretrained (timm)
│     5.3M parameters         │  ← Backbone: blocks[-1] used for Grad-CAM
└─────────────────────────────┘
         │
         ▼
  Dropout(p=0.3)
         │
  Linear(1280 → 256)
         │
       ReLU
         │
  Dropout(p=0.3)
         │
  Linear(256 → 7)
         │
         ▼
┌─────────────────────────────┐
│   Temperature Scaler        │  ← logits / T,  T = 0.694 (learned on val)
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   MC Dropout Inference      │  ← 30 stochastic passes → entropy
└─────────────────────────────┘
         │
         ▼
  Prediction + Confidence + Uncertainty
```

### Training Strategy — Two Phases

| Phase | Epochs | Backbone | Learning Rate | Scheduler |
|-------|--------|----------|--------------|-----------|
| 1 — Head warmup | 1–3 | Frozen | 1e-3 | Constant |
| 2 — Full fine-tune | 4–20 | Unfrozen | 2e-4 (head) / 4e-5 (backbone) | CosineAnnealingLR |

AUC jumped from **0.876 → 0.915** in the first epoch after backbone unfreezing, confirming the value of the two-phase strategy.

---

## Technical Deep Dive

### 1. Explainability — Grad-CAM

Gradient-weighted Class Activation Mapping (Grad-CAM) computes the gradient of the class score with respect to the final convolutional feature map, then performs a weighted average to produce a spatial importance map.

Three methods are supported:

- **Grad-CAM** — gradient-weighted activations from the last conv block
- **Grad-CAM++** — improved second-order gradients, better for multiple instances
- **EigenCAM** — PCA-based, gradient-free, more stable on low-contrast images

Target layer: `model.backbone.blocks[-1]` (last MBConv block of EfficientNet-B0).

The heatmap is overlaid on the original image using a jet colormap — low activation (blue) to high activation (red). For melanoma images, Grad-CAM consistently highlights irregular borders and asymmetric pigmentation — the same features used in clinical ABCDE criteria.

### 2. Calibration — Temperature Scaling

A classifier outputs logits `z`. Standard softmax gives probabilities `p = softmax(z)`. Temperature scaling introduces a scalar T:

```
p_calibrated = softmax(z / T)
```

T is optimized on the validation set by minimizing Negative Log-Likelihood. No retraining needed — it's a single post-hoc parameter.

- **T < 1** → sharpens distribution (fixes under-confidence)
- **T > 1** → flattens distribution (fixes over-confidence)

Our **T = 0.694** means the model was under-confident after training. After scaling:

```
ECE: 0.1046  →  0.0296   (72% improvement)
```

Expected Calibration Error (ECE) is computed with 15 equal-width bins. A reliability diagram shows the calibrated model's confidence closely tracking its actual accuracy.

### 3. Uncertainty Quantification 
