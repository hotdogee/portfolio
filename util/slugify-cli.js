#!/usr/bin/env node

/**
 * CLI tool to slugify strings using the slugify function from utils.ts
 *
 * Usage:
 *   npm run slugify "Your String Here"
 *   npm run slugify "Your String Here" -- --keep-stop-words
 *
 * Examples:
 *   npm run slugify "Hello World and the Universe"
 *   # Output: hello-world-universe
 *
 *   npm run slugify "Hello World and the Universe" -- --keep-stop-words
 *   # Output: hello-world-and-the-universe
 */

import { slugify } from '../src/lib/utils'

function showHelp() {
  console.log(`
Slugify CLI Tool

Usage:
  npm run slugify <text> [options]

Arguments:
  <text>                    The text to slugify (required)

Options:
  --keep-stop-words, -k     Keep stop words in the slug (default: remove stop words)
  --help, -h               Show this help message

Examples:
  npm run slugify "Hello World and the Universe"
  # Output: hello-world-universe

  npm run slugify "Hello World and the Universe" -- --keep-stop-words
  # Output: hello-world-and-the-universe

  npm run slugify "前端開發的技術"
  # Output: 前端開發技術
`)
}

function main() {
  const args = process.argv.slice(2)

  // Check for help flag
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp()
    process.exit(0)
  }

  // Get the text to slugify (first non-flag argument)
  const textToSlugify = args.find((arg) => !arg.startsWith('--') && !arg.startsWith('-'))

  if (!textToSlugify) {
    console.error('Error: No text provided to slugify.')
    console.error('Use --help for usage information.')
    process.exit(1)
  }

  // Check for keep-stop-words flag
  const keepStopWords = args.includes('--keep-stop-words') || args.includes('-k')
  const removeStopWords = !keepStopWords

  try {
    const result = slugify(textToSlugify, removeStopWords)
    console.log(result)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
