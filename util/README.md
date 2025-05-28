# Certification Data Extractor

A CLI tool to extract and analyze data from the portfolio certifications JSON file.

## Features

- Extract unique certification names, organizations, or skills
- Sort results alphabetically (case-insensitive)
- Display results with numbered list or JSON format
- Show total count of unique items
- Colorized terminal output

## Usage

### Direct Node.js execution:

```bash
node util/extract-cert-data.js [field] [options]
```

### Using npm script:

```bash
npm run extract-certs [field] [options]
```

## Fields

- `name` - Extract unique certification names
- `organization` - Extract unique organizations
- `skills` - Extract unique skills

## Options

- `-h, --help` - Show help message
- `-c, --count` - Show count of unique items
- `-j, --json` - Output as JSON format

## Examples

```bash
# Show help
node util/extract-cert-data.js --help

# Extract all unique organizations with count
node util/extract-cert-data.js organization --count

# Extract all skills in JSON format
node util/extract-cert-data.js skills --json

# Extract certification names (default format)
node util/extract-cert-data.js name

# Using npm script
npm run extract-certs skills --count
```

## Output

The tool provides:

- **Default format**: Numbered list with color coding and total count
- **JSON format**: Clean JSON array for programmatic use
- **Count option**: Additional summary with total unique items

## File Structure

The tool reads from: `src/certifications/certifications.json`

## Error Handling

- Validates field names
- Handles missing JSON file
- Handles malformed JSON
- Provides helpful error messages
