# portfolio

Portfolio Website

# Tech Stack (tentative)

- Framework: Next.js
- Database:
  - PlanetScale: Serverless MySQL
    - 5 GB storage included
    - 1 billion row reads per month ($1 per additional billion)
    - 1B row reads/ month
    - 10 million row reads per month ($1.50 per additional million)
    - 10M row writes/ month
    - 1 production branch
    - 1 development branch
  - Upstash: Serverless Redis/Kafka
    - Redis is an in-memory data structure store, used as a database, cache, and message broker.
    - Free tier limits 10K commands per day and total 256Mb data size.
    - Use case: Page View Counter
  - MongoDB Atlas: Serverless MongoDB
    - 512MB to 5GB of storage
    - Shared RAM
- Authentication: NextAuth
- Deployment: Vercel
  - Support for 35+ Frameworks
  - Fast Globally (Edge Network)
  - Automatic CI/CD (Git Integration)
  - Functions (Serverless, Edge)
  - Starter Database (KV, Postgres)
  - Web Analytics
- Styling: Tailwind CSS
- Analytics: Vercel Analytics
- Frontend Library: React

# Implementation

## Dependencies

```bash
npx create-next-app@latest portfolio
```
