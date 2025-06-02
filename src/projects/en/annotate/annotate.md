---
icon: './annotate-icon.png'
color: 'amber'
featured: 30
tagline: 'Accelerating Scientific Discovery'
title: 'ANNotate'
subtitle: 'Protein Function Prediction using Deep Learning'
description: 'ANNotate leverages deep learning to predict protein functions 100x faster than traditional methods, making complex proteomic analysis accessible to all researchers through an intuitive web interface. The system uses a recurrent neural network architecture to identify patterns in protein sequences with unprecedented speed and accuracy.'
categories: ['Deep Learning', 'Bioinformatics', 'Proteomics']
image:
  url: './annotate-ui.gif'
  alt: 'ANNotate Interface'
tech:
  - 'TensorFlow'
  - 'Cloud Run'
  - 'Compute Engine'
  - 'NodeJS'
  - 'NVIDIA cuDNN'
  - 'Recurrent Neural Networks (RNN)'
  - 'Gated Recurrent Units (GRU)'
  - 'Convolutional Neural Networks (CNN)'
  - 'GitOps'
  - 'DevOps'
  - 'Vue 3'
  - 'TypeScript'
  - 'Tailwind CSS'
  - 'Quasar Framework'
  - 'MongoDB'
  - 'Docker'
  - 'FeathersJS'
  - 'Cloudflare Pages'
links:
  - text: 'Try ANNotate Live'
    url: 'https://ann.hanl.in/'
    icon: 'lucide:external-link'
    variant: 'default'
  - text: 'View Source Code'
    url: 'https://github.com/hotdogee/annotate-ui'
    icon: 'lucide:github'
    variant: 'outline'
cards:
  - title: 'Architecture Diagram'
    type: 'diagram'
    image:
      url: './annotate-architecture.jpg'
      alt: 'Neural Network Architecture'
    caption: 'Hierarchical neural network architecture combining convolutional and recurrent layers for protein function prediction.'
  - title: 'Performance Metrics'
    type: 'metrics'
    metrics:
      - label: 'Speed Improvement'
        value: '100x'
        percentage: 100
      - label: 'Accuracy'
        value: '95%'
        percentage: 95
      - label: 'Domain Coverage'
        value: '16,714'
        percentage: 100
  - type: 'list'
    title: 'Key Integrations'
    items:
      - name: 'TensorFlow for ML models'
      - name: 'Google Cloud Storage for storage'
      - name: 'Google Cloud Run for deployment'
changes:
  - '2025-05-16': 'updated post'
  - '2025-05-05': 'initial post'
---

## Overview

ANNotate represents a breakthrough in protein function prediction, using deep learning to dramatically accelerate scientific discovery. Traditional methods for identifying protein domains are computationally intensive and time-consuming, creating a bottleneck in genomic and proteomic research.

By developing a hierarchical neural network architecture that combines convolutional and recurrent layers, ANNotate achieves remarkable results:

## Features

- 100x faster processing than traditional HMMER-based tools like PfamScan
- High-accuracy prediction across 16,714 Pfam domain classes
- GPU-accelerated inference for processing large-scale proteomic datasets
- Intuitive visualization that makes complex predictions accessible to all researchers

## Impact

The system's responsive web interface allows scientists to upload protein sequences and receive detailed function predictions within seconds, democratizing access to advanced protein analysis tools. The interactive visualization provides both high-level overview and detailed amino acid-level predictions, with quick links to external databases for further research.

## Technical Implementation

The deep learning model employs a sophisticated architecture:

### Details

- Input protein sequences are encoded using one-hot encoding and embedded into a 32-dimensional continuous vector space
- 15 parallel convolutional layers with increasing kernel sizes (1-29) capture local sequence motifs at different resolutions simultaneously
- Quad-stacked bidirectional GRU layers process sequences in both forward and reverse directions to capture long-range dependencies

This architecture enables ANNotate to identify subtle patterns in protein sequences that determine their function, with results displayed through an intuitive interface built on Vue 3 and the Quasar Framework.
