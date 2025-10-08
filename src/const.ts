export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const TOKEN_VALIDATION_INTERVAL = 7;//7 days

// TODO: will read from DB later
export const frontendKeyValuePairs = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Node.js", value: "nodejs" },
    { label: "SQL", value: "sql" },
    { label: "CSS", value: "css" },
    { label: "HTML", value: "html" },
];

export const backendKeyValuePairs = [
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" },
    { label: "Database", value: "database" },
    { label: "SQL", value: "sql" },
    { label: "API", value: "api" },
];

export const sreKeyValuePairs = [
    { label: "Linux", value: "linux" },
    { label: "Docker", value: "docker" },
    { label: "Kubernetes", value: "kubernetes" },
    { label: "CI/CD", value: "cicd" },
    { label: "Networking", value: "networking" },
    { label: "Cloud", value: "cloud" },
    { label: "Monitoring", value: "monitoring" },
    { label: "Security", value: "security" },
];

export const otherKeyValuePairs = [
    { label: "Git", value: "git" },
    { label: "Testing", value: "testing" },
];

export const techGroups = [
    {
        title: "Frontend",
        pairs: frontendKeyValuePairs,
    },
    {
        title: "Backend",
        pairs: backendKeyValuePairs,
    },
    {
        title: "SRE",
        pairs: sreKeyValuePairs,
    },
    {
        title: "Other",
        pairs: otherKeyValuePairs,
    },
]