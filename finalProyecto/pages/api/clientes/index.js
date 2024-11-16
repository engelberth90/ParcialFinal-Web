import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombres, apellidos, genero, fechaNacimiento, estado } = req.body;

    try {
      const cliente = await prisma.cliente.create({
        data: {
          nombres,
          apellidos,
          genero,
          fechaNacimiento: new Date(fechaNacimiento),
          estado,
        },
      });
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear cliente' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
