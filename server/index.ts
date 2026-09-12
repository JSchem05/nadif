import cors from "cors";
import express from "express";
import { buildBrief } from "./brief.js";
import { classifyReport } from "./classify.js";

const app = express();
const port = Number(process.env.PORT ?? 43142);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/classify", (req, res) => {
  const { locality, street, notes } = req.body as {
    locality?: string;
    street?: string;
    notes?: string;
  };
  if (!locality?.trim() || !street?.trim()) {
    res.status(400).json({ error: "locality and street are required" });
    return;
  }
  const result = classifyReport({
    locality: locality.trim(),
    street: street.trim(),
    notes: (notes ?? "").trim(),
  });
  res.json(result);
});

app.get("/api/brief", (req, res) => {
  const locality = String(req.query.locality ?? "St Paul's Bay");
  res.json(buildBrief(locality));
});

app.listen(port, () => {
  console.log(`[nadif-api] http://127.0.0.1:${port}`);
});
