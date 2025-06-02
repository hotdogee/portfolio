---
icon: './scada-iot-icon.png'
color: 'green'
featured: 20
tagline: 'Powering a Sustainable Future'
title: 'SCADA/IoT'
subtitle: 'Reimagining Industrial Automation for Research'
description: "A modern, cost-effective monitoring system that helped increase power output from 70kW to 180kW in Taiwan's pioneering geothermal project. This system demonstrates how open-source technology can outperform expensive proprietary solutions while providing deeper insights for research and optimization."
categories: ['IoT', 'Real-time Systems', 'Electronics']
image:
  url: './scada-iot-ui.gif'
  alt: 'SCADA/IoT System Dashboard'
tech:
  - 'Vue 3'
  - 'MongoDB'
  - 'Raspberry Pi'
  - 'Node.js'
  - 'Modbus RTU'
  - 'RabbitMQ'
  - 'WebSockets'
  - 'GitOps'
  - 'DevOps'
  - 'TypeScript'
  - 'Tailwind CSS'
  - 'Quasar Framework'
  - 'Highcharts'
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
  - text: 'See the SCADA/IoT System in Action'
    url: 'https://scada.hanl.in/'
    icon: 'lucide:external-link'
    variant: 'default'
  - text: 'View Source Code'
    url: 'https://github.com/hotdogee/scada-iot-hmi'
    icon: 'lucide:github'
    variant: 'outline'
cards:
  - title: 'System Architecture'
    type: 'diagram'
    image:
      url: './scada-iot-architecture.png'
      alt: 'SCADA/IoT System Architecture Diagram'
    caption: 'Four-layer distributed architecture for real-time monitoring and control of geothermal power systems.'
  - title: 'Performance Metrics'
    type: 'metrics'
    metrics:
      - label: 'Cost Reduction'
        value: '90%'
        percentage: 90
      - label: 'Power Output Increase'
        value: '157%'
        percentage: 100
      - label: 'Data Points Processed'
        value: '1B+'
        percentage: 95
changes:
  - '2025-05-16': 'updated post'
  - '2025-05-05': 'initial post'
---

## Overview

This SCADA/IoT system represents a fundamental rethinking of industrial automation for research environments. Traditional SCADA systems are expensive, proprietary, and inflexible-ill-suited for innovative research where rapid iteration and deep insights are essential.

My approach replaced expensive proprietary solutions with an open-source stack and commodity hardware, yielding transformative results:

## Features

- 90% reduction in PLC hardware costs through software-defined solutions
- 70-80% savings on overall component costs while improving capabilities
- Real-time monitoring of ~100 sensors at ~1 second resolution
- Zero data loss despite unreliable field connections through robust buffering
- Interactive visualization of over 1 billion data points for research insights

## Impact

Most importantly, this system directly contributed to more than doubling the power output of our geothermal plant from 70kW to 180kW under identical well conditions. The architecture's flexibility allowed us to quickly implement and test optimizations based on real-time data analytics, proving that modern software approaches can revolutionize industrial energy research.

## Architecture & Implementation

The system employs a distributed architecture with four distinct layers:

### Details

- Field layer: Direct sensor connections via Modbus RTU
- Edge layer: Data processing on Raspberry Pi hardware
- Supervisor layer: Node.js/MongoDB for data collection and analysis
- Presentation layer: Web interface with real-time updates via WebSockets

This design emphasizes cost-effectiveness, scalability, and maintainability by leveraging open-source technologies and commodity hardware, replacing traditional expensive solutions while providing superior analytical capabilities.
