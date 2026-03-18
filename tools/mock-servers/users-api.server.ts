import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "disabled";
    avatarUrl: string;
    bio: string;
    lastLoginAt: number;
    createdAt: number;
};

const USERS: User[] = makeUsers(20000);

function makeUsers(n: number): User[] {
    const roles = ["Admin", "Manager", "Member", "Viewer"] as const;

    return Array.from({ length: n }, (_, i) => {
        const id = String(i + 1);
        const name = `User ${i + 1}`;
        const email = `user${i + 1}@example.com`;
        const role = roles[i % roles.length];
        const status: User["status"] = i % 9 === 0 ? "disabled" : "active";
        const avatarUrl = `https://i.pravatar.cc/48?img=${(i % 70) + 1}`;

        // "שמן" בכוונה — יכביד payload
        const bio = `Bio for ${name}. `.repeat(30);

        const now = Date.now();
        const createdAt = now - i * 1000 * 60;
        const lastLoginAt = now - (i % 5000) * 1000;

        return { id, name, email, role, status, avatarUrl, bio, lastLoginAt, createdAt };
    });
}

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

function maybeFail(probability = 0.2) {
    if (Math.random() < probability) {
        const err = new Error("Simulated server error");
        (err as any).status = 500;
        throw err;
    }
}


app.get("/health", (_, res) => res.send("ok"));

app.get("/api/users", async (req, res) => {

    const page = Math.max(1, Number(req.query.page ?? 1));
    const pageSize = Math.min(20000, Math.max(1, Number(req.query.pageSize ?? 50)));
    const q = String(req.query.q ?? "").toLowerCase();
    const sort = String(req.query.sort ?? "name"); // name | lastLoginAt

    // latency משתנה (כמו פרודקשן)
    const latency = 80 + Math.floor(Math.random() * 520);
    await sleep(latency);

    let rows = USERS;

    if (q) {
        rows = rows.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }

    if (sort === "lastLoginAt") {
        rows = [...rows].sort((a, b) => b.lastLoginAt - a.lastLoginAt);
    } else {
        rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    // ETag בסיסי (לא חובה אבל נחמד)
    const etag = crypto.createHash("sha1").update(JSON.stringify({ page, pageSize, q, sort, total })).digest("hex");
    res.setHeader("ETag", etag);

    if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
    }

    const summaryItems = items.map(u => ({
        id: u.id,
        name: u.name,
        role: u.role,
        status: u.status,
        avatarUrl: u.avatarUrl,
        email: u.email,
    }));

    console.log(summaryItems);
    res.json({ items: summaryItems, total, page, pageSize, latency });
});

app.get("/api/users/:id", async (req, res) => {

    await sleep(300);

    if (Math.random() < 0.3) {
        return res.status(500).json({ message: "Failed to load user details" });
    }

    const latency = 120 + Math.floor(Math.random() * 600);
    await sleep(latency);

    const user = USERS.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: "not found" });

    res.json(user);
});

app.listen(3001, () => console.log("API on http://localhost:3001"));
