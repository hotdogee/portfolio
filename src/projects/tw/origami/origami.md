---
icon: '../../en/origami/origami-icon.png'
color: 'blue'
featured: 10
tagline: '藝術與演算法的交會點'
title: 'Origami Moving Cubes'
subtitle: '互動繪圖設計工具'
description: '這是一款互動式網頁應用程式，能用以設計令人目眩神迷的視覺幻象，知名科普傳播者 Steve Mould 亦曾對其進行專題介紹。本專案淋漓盡致地展現了當創意巧思與精密技術相互碰撞時所迸發的獨特美學，更使複雜的數學變換原理深入淺出，人人皆可輕鬆領略。'
categories: ['Interactive Design', 'Mathematics', 'Art']
image:
  url: '../../en/origami/origami-ui.gif'
  alt: 'Origami Cubes Designer 工具介面'
tech:
  - 'React'
  - 'Next.js'
  - 'Vercel'
  - 'GitOps'
  - 'DevOps'
  - 'TypeScript'
  - 'Canvas API'
  - 'Tailwind CSS'
  - 'Responsive Design'
  - 'Internationalization'
  - 'Progressive Web App (PWA)'
links:
  - text: '立即體驗'
    url: 'https://cubes.hanl.in/'
    icon: 'lucide:external-link'
    variant: 'default'
  - text: '開源專案'
    url: 'https://github.com/hotdogee/origami-moving-cubes-drawing-designer'
    icon: 'lucide:github'
    variant: 'outline'
  - text: '觀看影片'
    url: 'https://youtu.be/FMRi6pNAoag?t=17'
    icon: 'lucide:youtube'
    variant: 'outline'
cards:
  - title: '運作機制'
    type: 'diagram'
    image:
      url: '../../en/origami/origami-physical.jpg'
      alt: '方塊變換原理示意圖'
    caption: '透過精密的圖案佈局，使方塊產生變換的視覺幻象，其背後蘊藏的數學原理。'
  - title: '媒體報導與推薦'
    type: 'list'
    items:
      - icon: 'lucide:youtube'
        name: 'Steve Mould'
        description: '科普傳播者'
        url: 'https://youtu.be/FMRi6pNAoag?t=17'
        image:
          url: '../../en/origami/origami-showcased.png'
          alt: '獲 Steve Mould 影片介紹'
changes:
  - '2025-05-16': 'updated post'
  - '2025-05-05': 'initial post'
---

## 概覽

Origami Moving Cubes 互動式摺紙動畫設計工具巧妙融合了藝術、數學與網頁技術，打造出獨樹一格的創作平台。這種令人目眩神迷的視覺變換，一個 3D 立方體在旋轉時彷彿不斷改變外觀，其奧秘在於展開圖案的精準設計。

我開發此應用程式，旨在讓這門迷人的藝術形式普及大眾：

## 主要功能

- 同步多畫布預覽系統，即時呈現摺紙動畫的變換效果。
- 特製的慢速滾輪 (jog wheel) 介面，能進行精確的逐格動畫控制。
- 直觀的繪圖工具，具備可調式筆刷屬性。
- 支援七種語言的多語系介面。
- 具備漸進式網頁應用程式 (PWA) 功能，可離線使用。

## 影響力

此專案曾獲知名科普頻道主 Steve Mould 在其探討視覺幻象的熱門影片中專題介紹，充分展現了精湛技術如何賦予藝術表達更豐富的可能。本應用程式成功將複雜的數學挑戰，轉化為直觀易懂的創意體驗。

## 技術架構解析

此應用程式採用了多項現代網頁技術：

### 詳細資訊

- 以 React 及 Next.js 建構組件式架構。
- 運用 Canvas API 實現高效能繪圖。
- 採用 TypeScript 確保程式碼的類型安全。
- 使用 Tailwind CSS 打造響應式設計。
- 客製化的國際化解決方案，支援靜態網站生成 (SSG)。

三段式深色模式切換功能，不僅能偵測系統偏好設定，亦允許使用者自行調整；同時支援觸控輸入，使本應用程式在行動裝置上也能流暢操作。
