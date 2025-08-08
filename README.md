# Adda AI - AI Character Chat Platform

An intelligent AI character chatting platform that enables users to engage in meaningful conversations with diverse AI personalities. Built with advanced vector embedding technology for contextual memory and semantic search capabilities.

## 🌟 Features

### 🤖 AI Character Interactions
- Chat with unique AI personalities with distinct characteristics
- Each character has customizable personality traits, descriptions, and behaviors
- Characters maintain conversation context through vector embeddings
- Real-time streaming responses for natural conversation flow

### 🧠 Advanced Memory System
- **Vector Embeddings**: Messages are converted to 768-dimensional vectors using Google's text-embedding-004 model
- **Semantic Search**: Find relevant past conversations using natural language queries
- **Contextual Awareness**: AI characters remember previous interactions and maintain conversation continuity
- **PostgreSQL with pgvector**: Efficient vector similarity search for message history

### 🔍 Smart Features
- **Semantic Message Search**: Search through conversation history using meaning rather than keywords
- **Character Discovery**: Explore and filter characters by personality, interests, and popularity
- **Trending Characters**: Discover popular AI companions based on user interactions
- **Multilingual Support**: Chat in multiple languages with built-in translation capabilities

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom component library
- **State Management**: Zustand for efficient client-side state
- **Real-time Chat**: Streaming responses with AI SDK
- **Deployment**: Vercel with optimized performance

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Vector Search**: pgvector extension for similarity search
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Deployment**: AWS EC2 with Docker containerization
- **CI/CD**: Automated deployment pipeline

### AI & Embeddings
- **AI Models**: Google Gemini 2.0 Flash for conversational AI
- **Embeddings**: Google text-embedding-004 (768 dimensions)
- **Vector Database**: PostgreSQL with pgvector extension
- **Semantic Search**: Custom RPC functions for similarity matching

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service for auth and database operations
- **AI SDK** - Vercel's AI SDK for streaming responses
- **Zustand** - Lightweight state management
- **React Hot Toast** - Toast notifications

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Type-safe database client
- **PostgreSQL** - Relational database with vector support
- **pgvector** - Vector similarity search extension
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### Infrastructure
- **Vercel** - Frontend deployment and hosting
- **AWS EC2** - Backend server hosting
- **Docker** - Containerization for consistent deployments
- **GitHub Actions** - CI/CD pipeline automation

### AI & ML
- **Google Gemini API** - Conversational AI capabilities
- **Google Text Embeddings** - Vector representation of text
- **Vector Similarity Search** - Semantic message retrieval

## 📁 Project Structure

```
adda-ai/
├── apps/
│   ├── frontend/           # Next.js frontend application
│   │   ├── app/           # App router pages and components
│   │   ├── lib/           # Utilities and AI integrations
│   │   └── store/         # Zustand state management
│   └── backend-main/      # NestJS backend API
│       ├── src/           # Source code
│       └── test/          # E2E tests
├── packages/
│   ├── db/                # Prisma schema and migrations
│   ├── ui/                # Shared React components
│   ├── backend-common/    # Shared backend utilities
│   └── typescript-config/ # Shared TypeScript configurations
└── docker/               # Docker configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 9.0+
- PostgreSQL with pgvector extension
- Google Gemini API key
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rudra-Sankha-Sinhamahapatra/adda-ai.git
   cd adda-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

   **Backend (.env)**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/adda_ai
   DIRECT_URL=postgresql://username:password@localhost:5432/adda_ai
   JWT_SECRET=your_jwt_secret
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Run migrations
   cd packages/db && pnpm prisma migrate dev
   ```

5. **Development**
   ```bash
   # Start all applications
   pnpm dev
   
   # Or start individually
   pnpm start:backend  # Backend on port 3001
   cd apps/frontend && pnpm dev  # Frontend on port 3000
   ```

## 💡 Key Features in Detail

### Vector Embedding System
- Messages are automatically converted to 768-dimensional vectors
- Enables semantic search through conversation history
- AI characters can recall relevant past interactions
- Similarity threshold-based message retrieval

### Character Personality System
- Each character has unique personality traits
- Customizable descriptions and behavioral patterns
- Rating and interaction tracking
- Trending algorithm based on user engagement

### Semantic Search
- Natural language queries to find relevant messages
- Vector similarity matching with configurable thresholds
- Context-aware search results
- Integration with AI response generation

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard
- Optimized for performance with Next.js

### Backend (AWS EC2)
- Dockerized deployment for consistency
- CI/CD pipeline with GitHub Actions
- Automated testing and deployment
- Load balancing and auto-scaling capabilities

## 📊 Performance Features

- **Streaming Responses**: Real-time AI message generation
- **Vector Indexing**: Optimized database queries for embedding search
- **Caching**: Efficient state management and API response caching
- **Code Splitting**: Optimized bundle sizes with Next.js
- **Database Optimization**: Indexed queries and connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- [Supabase](https://supabase.com/) for backend infrastructure
- [pgvector](https://github.com/pgvector/pgvector) for vector similarity search
- [Vercel AI SDK](https://sdk.vercel.ai/) for streaming AI responses

## 📞 Contact

**Rudra Sankha Sinhamahapatra**
- GitHub: [@Rudra-Sankha-Sinhamahapatra](https://github.com/Rudra-Sankha-Sinhamahapatra)
- Project Link: [https://github.com/Rudra-Sankha-Sinhamahapatra/adda-ai](https://github.com/Rudra-Sankha-Sinhamahapatra/adda-ai)

---

Built with ❤️ using modern web technologies and AI

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
