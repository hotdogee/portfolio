---
icon: 'lucide:cpu'
color: 'blue'
featured: 20
tagline: '驅動永續未來'
title: 'SCADA/IoT'
subtitle: '為研究領域重新構想工業自動化'
description: '這套現代化、高 CP 值的監控系統，成功助攻台灣指標性的地熱發電計畫，將發電功率從 70 kW 一舉提升至 180 kW 。本系統充分證明，開源技術不僅能超越昂貴的專有解決方案，更能為相關研究與系統優化，提供鞭辟入裡的分析見解。'
categories: ['IoT', 'Real-time Systems', 'Electronics']
image:
  url: 'https://docs.astro.build/assets/arc.webp'
  alt: 'SCADA/IoT 系統運維儀表板'
tech:
  - 'Node.js'
  - 'Raspberry Pi'
  - 'Modbus RTU'
  - 'RabbitMQ'
  - 'WebSockets'
  - 'GitOps'
  - 'DevOps'
  - 'Vue 3'
  - 'TypeScript'
  - 'Tailwind CSS'
  - 'Quasar Framework'
  - 'Highcharts'
  - 'MongoDB'
  - 'FeathersJS'
  - 'Cloudflare Pages'
  - 'Oracle Cloud Infrastructure'
  - 'Hioki Power Analyzers'
  - 'FLIR Thermal Cameras'
  - 'High-Speed Cameras'
  - 'ABB Inverters'
  - 'PT100'
  - 'Danfoss MBS 3000'
  - 'Coriolis Flowmeters'
  - 'Electromagnetic Flowmeters'
links:
  - text: '系統展示'
    url: 'https://scada.hanl.in/'
    icon: 'lucide:external-link'
    variant: 'default'
  - text: '開源專案'
    url: 'https://github.com/hotdogee/scada-iot-hmi'
    icon: 'lucide:github'
    variant: 'outline'
cards:
  - title: '系統架構圖'
    type: 'diagram'
    image:
      url: 'https://docs.astro.build/assets/rays.webp'
      alt: 'SCADA/IoT 系統架構圖'
    caption: '一套專為地熱發電系統設計的四層分散式架構，用以達成即時監控與控制。'
  - title: '成效指標'
    type: 'metrics'
    metrics:
      - label: '成本降幅'
        value: '90%'
        percentage: 90
      - label: '發電功率增幅'
        value: '157%'
        percentage: 100
      - label: '總資料點數'
        value: '1B+'
        percentage: 95
changes:
  - '2025-05-16': 'updated post'
  - '2025-05-05': 'initial post'
---

## 概覽

此 SCADA/IoT 系統代表了對研究環境中工業自動化方案的根本性革新。傳統 SCADA 系統不僅價格高昂、具專屬封閉性，且缺乏彈性，難以滿足創新型研究對於快速迭代與深度洞察的需求。

我的方法是以開源架構及市售硬體取代昂貴的專有解決方案，帶來了革命性的成果：

## 主要功能

- 透過軟體定義方案， PLC (可程式化邏輯控制器) 硬體成本大幅降低 90%。
- 整體零組件成本節省 70-80%，同時提升系統功能。
- 以約 1 秒的更新頻率，即時監控近 100 組感測器。
- 即便現場網路連線不穩，藉由強固的緩衝機制，仍能確保數據零遺失。
- 提供超過十億筆數據點的互動式視覺化分析，發掘研究洞見。

## 影響力

至關重要的是，在相同的地熱井條件下，本系統直接促使我們的地熱發電廠功率輸出從 70kW 提升超過一倍，達到 180kW。其架構的靈活性，讓我們能根據即時數據分析，迅速導入並驗證優化策略，證明了現代軟體思維足以為工業能源研究帶來典範轉移。

## 系統架構與實施

本系統採用分散式架構，共分為四個層次：

### 詳細資訊

- 現場層 (Field layer)：透過 Modbus RTU 通訊協定直接與感測器連接。
- 邊緣層 (Edge layer)：於 Raspberry Pi 硬體上進行資料預處理。
- 監理層 (Supervisor layer)：運用 Node.js/MongoDB 進行資料收集與分析。
- 呈現層 (Presentation layer)：透過 WebSockets 技術，提供即時更新的網頁操作介面。

此設計充分利用開源技術及市售硬體，強調成本效益、可擴展性與易維護性，不僅取代了傳統高價的解決方案，更提供了卓越的數據分析能力。
