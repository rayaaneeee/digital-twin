# DermAI — Rayane's Medical Imaging Project
# مشروع DermAI للتصوير الطبي
# Projet DermAI de Rayane — imagerie médicale

DermAI is one of Rayane's main AI projects. It is a skin lesion classification platform with explainability features.
DermAI هو أحد مشاريع ريان الرئيسية في مجال الذكاء الاصطناعي — منصة لتصنيف آفات الجلد مع ميزات الشرح.
DermAI est l'un des projets principaux de Rayane — une plateforme de classification des lésions cutanées avec explainabilité.

## What DermAI does — ما يفعله DermAI — Ce que fait DermAI
- Classifies skin lesions into 7 categories (melanoma, nevus, BCC, AK, BKL, DF, VASC)
- Uses EfficientNet-B0 fine-tuned on ISIC 2019 dataset (25,331 dermoscopy images)
- Achieves AUC-ROC 0.9630 across all 7 classes
- Produces Grad-CAM heatmaps showing which skin regions influenced the prediction
- Applies Temperature Scaling for confidence calibration
- Uses MC Dropout (30 forward passes) for uncertainty quantification
- Deployed on HuggingFace Spaces with a FastAPI backend and Docker

## Tech Stack — التقنيات المستخدمة — Stack technologique
- Model: EfficientNet-B0 (PyTorch, timm library)
- Explainability: Grad-CAM, Grad-CAM++, EigenCAM
- Calibration: Temperature Scaling
- Uncertainty: MC Dropout
- Backend: FastAPI, Docker
- Dataset: ISIC 2019

## Key achievement — الإنجاز الرئيسي — Réalisation clé
AUC-ROC of 0.9630 across 7 dermatology classes. Rayane designed, trained, and deployed the entire platform end-to-end.
