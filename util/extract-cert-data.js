#!/usr/bin/env node
// Use triple-dash to pass the -j arg to the script on PowerShell
// npm run extract-certs skills --- -j

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { slugify } from '../src/lib/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function showHelp() {
  console.log(`
${colors.bright}${colors.cyan}Certification Data Extractor${colors.reset}

${colors.bright}Usage:${colors.reset}
  node extract-cert-data.js [field] [options]

${colors.bright}Fields:${colors.reset}
  ${colors.green}name${colors.reset}         Extract unique certification names
  ${colors.green}organization${colors.reset} Extract unique organizations
  ${colors.green}skills${colors.reset}       Extract unique skills

${colors.bright}Options:${colors.reset}
  ${colors.yellow}-h, --help${colors.reset}    Show this help message
  ${colors.yellow}-c, --count${colors.reset}   Show count of unique items
  ${colors.yellow}-j, --json${colors.reset}    Output as JSON format for i18n

${colors.bright}Examples:${colors.reset}
  node extract-cert-data.js name
  node extract-cert-data.js organization --count
  node extract-cert-data.js skills --json
`)
}

function extractData(field, options = {}) {
  const certFilePath = path.join(__dirname, '..', 'src', 'certifications', 'certifications.json')

  try {
    // Read and parse the JSON file
    const rawData = fs.readFileSync(certFilePath, 'utf8')
    const certifications = JSON.parse(rawData)

    let extractedData = new Set()

    certifications.forEach((cert) => {
      if (!cert || typeof cert !== 'object') return

      switch (field) {
        case 'name':
          if (cert.name && cert.name.trim()) {
            extractedData.add(cert.name.trim())
          }
          break

        case 'organization':
          if (cert.organization && cert.organization.trim()) {
            extractedData.add(cert.organization.trim())
          }
          break

        case 'skills':
          if (Array.isArray(cert.skills)) {
            cert.skills.forEach((skill) => {
              if (skill && skill.trim()) {
                extractedData.add(skill.trim())
              }
            })
          }
          break

        default:
          console.error(
            `${colors.red}Error: Invalid field '${field}'. Use 'name', 'organization', or 'skills'.${colors.reset}`
          )
          process.exit(1)
      }
    })

    // Convert Set to sorted array
    const sortedData = Array.from(extractedData).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    )

    // Output results
    if (options.json) {
      console.log(
        JSON.stringify(
          sortedData.reduce((acc, item) => {
            acc[slugify(item)] = item
            return acc
          }, {}),
          null,
          2
        )
      )
    } else {
      console.log(
        `${colors.bright}${colors.cyan}Unique ${field}s (${sortedData.length} total):${colors.reset}\n`
      )

      sortedData.forEach((item, index) => {
        console.log(`${colors.green}${(index + 1).toString().padStart(3)}. ${colors.reset}${item}`)
      })

      if (options.count) {
        console.log(
          `\n${colors.bright}${colors.yellow}Total unique ${field}s: ${sortedData.length}${colors.reset}`
        )
      }
    }

    return sortedData
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(
        `${colors.red}Error: Could not find certifications.json file at: ${certFilePath}${colors.reset}`
      )
    } else if (error instanceof SyntaxError) {
      console.error(`${colors.red}Error: Invalid JSON format in certifications.json${colors.reset}`)
    } else {
      console.error(`${colors.red}Error: ${error.message}${colors.reset}`)
    }
    process.exit(1)
  }
}

function main() {
  const args = process.argv.slice(2)
  console.log('args', args)

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp()
    return
  }

  const field = args[0]
  const validFields = ['name', 'organization', 'skills']

  if (!validFields.includes(field)) {
    console.error(
      `${colors.red}Error: Invalid field '${field}'. Valid fields are: ${validFields.join(', ')}${colors.reset}`
    )
    showHelp()
    process.exit(1)
  }

  const options = {
    count: args.includes('-c') || args.includes('--count'),
    json: args.includes('-j') || args.includes('--json'),
  }

  extractData(field, options)
}

// Run the CLI tool if this file is executed directly
if (process.argv[1] === __filename) {
  console.log('process.argv', process.argv)
  main()
}

export { extractData }
