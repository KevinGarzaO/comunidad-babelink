export interface CommunityUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  posts: number;
  isVerified?: boolean; // Creadores verificados del programa
}

export interface CommunityPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: CommunityUser;
  tags: string[];
  slug: string;
  reactions: number;
  comments: number;
  readTime: number;
  publishedAt: string;
  coverImage?: string;
}

export const communityUsers: CommunityUser[] = [
  {
    id: 1,
    name: "María González",
    username: "mariagonzalez",
    avatar:
      "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMDE1ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Diseñadora UX/UI apasionada por IA generativa",
    followers: 342,
    posts: 28,
    isVerified: true, // Creadora verificada del programa
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    username: "carlosruiz",
    avatar:
      "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2Rpbmd8ZW58MXx8fHwxNzYxOTg2ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Developer full-stack, mentor de IA",
    followers: 521,
    posts: 45,
    isVerified: true, // Creador verificado del programa
  },
  {
    id: 3,
    name: "Ana Martínez",
    username: "anamartinez",
    avatar:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYxOTg2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Content creator especializada en video y IA",
    followers: 289,
    posts: 32,
    isVerified: false, // Usuario normal
  },
  {
    id: 4,
    name: "David López",
    username: "davidlopez",
    avatar:
      "https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE5ODY1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Product designer y estratega digital",
    followers: 412,
    posts: 38,
    isVerified: true, // Creador verificado del programa
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: 1,
    title: "Cómo uso ChatGPT para acelerar mi workflow de diseño UX",
    excerpt:
      "Comparto mi proceso diario usando IA para investigación de usuarios, wireframes y testing de usabilidad.",
    content:
      "En este post explico cómo integro ChatGPT en cada fase de mi proceso de diseño...",
    author: communityUsers[0],
    slug: "como-uso-chatgpt-para-acelerar-mi-workflow-de-diseno-ux",
    tags: ["IA", "UX Design", "ChatGPT", "Productividad"],
    reactions: 124,
    comments: 23,
    readTime: 5,
    publishedAt: "Hace 2 horas",
    coverImage:
      "https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE5ODY1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "5 herramientas de IA que todo creador de contenido debe conocer",
    excerpt:
      "Una lista curada de las mejores herramientas de IA para video, audio, texto e imágenes que uso diariamente.",
    content:
      "Después de probar decenas de herramientas, estas son las que realmente valen la pena...",
    author: communityUsers[2],
    slug: "5-herramientas-de-ia-que-todo-creador-de-contenido-debe-conocer",
    tags: ["Herramientas", "IA", "Video", "Contenido"],
    reactions: 298,
    comments: 45,
    readTime: 8,
    publishedAt: "Hace 5 horas",
    coverImage:
      "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2Rpbmd8ZW58MXx8fHwxNzYxOTg2ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Mi experiencia en el Programa de Creadores de Babelink",
    excerpt:
      "Primer mes completado: lo que aprendí, los retos que enfrenté y por qué vale totalmente la pena.",
    content:
      "Llevo 4 semanas en el programa y quiero compartir mi experiencia auténtica...",
    author: communityUsers[3],
    slug: "mi-experiencia-en-el-programa-de-creadores-de-babelink",
    tags: ["Babelink", "Aprendizaje", "Comunidad", "Experiencia"],
    reactions: 187,
    comments: 34,
    readTime: 6,
    publishedAt: "Hace 1 día",
  },
  {
    id: 4,
    title: "Tutorial: Automatiza tu flujo de trabajo con IA y APIs",
    excerpt:
      "Paso a paso para conectar herramientas de IA mediante APIs y crear workflows automatizados.",
    content:
      "En este tutorial técnico veremos cómo integrar diferentes APIs de IA...",
    author: communityUsers[1],
    slug: "tutorial-automatiza-tu-flujo-de-trabajo-con-ia-y-apis",
    tags: ["Tutorial", "Desarrollo", "APIs", "Automatización"],
    reactions: 256,
    comments: 52,
    readTime: 12,
    publishedAt: "Hace 1 día",
    coverImage:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYxOTg2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Generé $1000 con contenido creado por IA: mi historia",
    excerpt:
      "Cómo moneticé mi primer proyecto usando herramientas de IA generativa sin experiencia técnica previa.",
    content:
      "Hace 3 meses no sabía nada de IA. Hoy genero ingresos consistentes...",
    author: communityUsers[2],
    slug: "genere-1000-con-contenido-creado-por-ia-mi-historia",
    tags: ["Monetización", "IA", "Emprendimiento", "Historia"],
    reactions: 412,
    comments: 78,
    readTime: 10,
    publishedAt: "Hace 2 días",
  },
  {
    id: 6,
    title: "Comparativa: Midjourney vs DALL-E 3 vs Stable Diffusion",
    excerpt:
      "Análisis detallado de las 3 principales herramientas de generación de imágenes con IA en 2025.",
    content:
      "He probado las tres plataformas durante meses. Aquí mis conclusiones...",
    author: communityUsers[0],
    slug: "comparativa-midjourney-vs-dall-e-3-vs-stable-diffusion",
    tags: ["IA", "Diseño", "Herramientas", "Review"],
    reactions: 341,
    comments: 67,
    readTime: 15,
    publishedAt: "Hace 3 días",
    coverImage:
      "https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE5ODY1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    title: "Construí una app en 24h usando IA: aquí está el código",
    excerpt:
      "Reto personal: crear una aplicación funcional desde cero con ayuda de ChatGPT y GitHub Copilot.",
    content:
      "Decidí probar qué tan rápido podía desarrollar una app real con IA...",
    author: communityUsers[1],
    slug: "construi-una-app-en-24h-usando-ia-aqui-esta-el-codigo",
    tags: ["Desarrollo", "IA", "Código", "Proyecto"],
    reactions: 523,
    comments: 91,
    readTime: 7,
    publishedAt: "Hace 3 días",
  },
  {
    id: 8,
    title: "Networking efectivo: cómo conecté con 50+ creadores en Babelink",
    excerpt:
      "Estrategias prácticas que usé para hacer networking de valor en la comunidad y crear colaboraciones reales.",
    content:
      "Al principio me costaba conectar con otros creadores. Esto fue lo que funcionó...",
    author: communityUsers[3],
    slug: "networking-efectivo-como-conecte-con-50-creadores-en-babelink",
    tags: ["Networking", "Comunidad", "Consejos", "Colaboración"],
    reactions: 189,
    comments: 42,
    readTime: 6,
    publishedAt: "Hace 4 días",
  },
];

export const popularTags = [
  { name: "IA", count: 1234 },
  { name: "ChatGPT", count: 892 },
  { name: "Diseño", count: 745 },
  { name: "Desarrollo", count: 678 },
  { name: "Tutorial", count: 564 },
  { name: "Productividad", count: 523 },
  { name: "Video", count: 489 },
  { name: "Herramientas", count: 456 },
  { name: "Babelink", count: 398 },
  { name: "Comunidad", count: 367 },
  { name: "Código", count: 334 },
  { name: "UX Design", count: 298 },
];
