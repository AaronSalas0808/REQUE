const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // 👈 Importa 'path' de Node.js
const multer = require("multer"); // 👈 Importa 'multer'
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
// 👇 Sirve estáticamente los archivos de la carpeta 'public'
app.use(express.static("public"));

const DB_PATH = "./db.json";
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// --- CONFIGURACIÓN DE MULTER ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Crea un nombre de archivo único para evitar colisiones
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// --- FIN DE CONFIGURACIÓN DE MULTER ---


// 👇 MODIFICA EL ENDPOINT DE REGISTRO DE CANDIDATO
app.post("/api/register-candidate", upload.single("partyLogo"), (req, res) => {
  const { id, password, name, party, email, biography, proposal } = req.body;
  const db = readDB();

  if (db.users.some((u) => u.id === id)) {
    return res.status(409).json({ message: "Este número de cédula ya está registrado." });
  }

  // Comprueba si se subió un archivo
  if (!req.file) {
    return res.status(400).json({ message: "La foto del partido es requerida." });
  }
  
  // Obtenemos la ruta del archivo para guardarla en la DB
  const partyLogoPath = req.file.path.replace("public\\", "/").replace("public/", "/");

  const newUser = { id, password, name, email, role: "candidate" };
  const newCandidate = {
    id, name, party, email, biography, proposal,
    photo: `https://i.pravatar.cc/150?u=${id}`,
    partyLogo: partyLogoPath, // 👈 Guardamos la ruta del logo
    status: "pending",
  };

  db.users.push(newUser);
  db.candidates.push(newCandidate);
  writeDB(db);

  res.status(201).json({ message: "Candidatura registrada con éxito." });
});


// ... (El resto de tus endpoints: /api/login, /api/vote, /api/admin/*, etc., no cambian) ...
// Endpoint de Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find((u) => u.id === username);

  if (user && user.password === password) {
    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      hasVoted: user.hasVoted,
    });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

// Endpoint para obtener el estado de la elección y los candidatos aprobados
app.get("/api/election-data", (req, res) => {
  const db = readDB();
  res.json({
    electionStatus: db.electionStatus,
    candidates: db.candidates.filter((c) => c.status === "approved"),
  });
});

// Endpoint para emitir un voto
app.post("/api/vote", (req, res) => {
  const { userId, candidateId } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.id === userId);
  if (!user || user.hasVoted) {
    return res.status(403).json({ message: "El usuario ya ha votado." });
  }

  user.hasVoted = true;
  db.votes[candidateId] = (db.votes[candidateId] || 0) + 1;

  writeDB(db);
  res.json({ message: "Voto registrado con éxito." });
});

// Endpoint para obtener todos los datos para el Admin
app.get("/api/admin/dashboard", (req, res) => {
  res.json(readDB());
});

// Endpoint para que el admin cambie el estado de la elección
app.post("/api/admin/toggle-election", (req, res) => {
  const db = readDB();
  db.electionStatus = db.electionStatus === "active" ? "inactive" : "active";
  writeDB(db);
  res.json({ electionStatus: db.electionStatus });
});

// Endpoint para que el admin apruebe o rechace candidatos
app.post("/api/admin/update-candidate-status", (req, res) => {
  const { candidateId, newStatus } = req.body; // newStatus será 'approved' o 'rejected'
  const db = readDB();

  const candidate = db.candidates.find((c) => c.id === candidateId);
  if (candidate) {
    candidate.status = newStatus;
    writeDB(db);
    res.json({ message: `Candidato ${newStatus}.` });
  } else {
    res.status(404).json({ message: "Candidato no encontrado." });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});