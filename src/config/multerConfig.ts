import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Middleware para upload genérico (como você já tinha)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(6).toString('hex');
    const ext = path.extname(file.originalname);
    const uuid = (req.body?.uuid || req.params?.uuid || req.query?.uuid || 'sem-uuid');
    const filename = `${uuid}-${hash}-${file.originalname}`;
    cb(null, filename);
  }
});
export const upload = multer({ storage });

// Função para gerar nome aleatório de 16 caracteres alfanuméricos
function gerarNomeImagem(extensao: string): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nome = '';
  for (let i = 0; i < 16; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    nome += caracteres[indice];
  }
  return `${nome}${extensao}`;
}

// Middleware específico para upload de capas de livros
const storageCapa = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeAleatorio = gerarNomeImagem(ext);
    cb(null, nomeAleatorio);
  }
});

export const uploadCapa = multer({ storage: storageCapa });
