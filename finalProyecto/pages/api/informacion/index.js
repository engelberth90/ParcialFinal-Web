import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tipoInformacion, usuarioCreador, estado, clienteId } = req.body;

    try {
      const infoGeneral = await prisma.informacionGeneral.create({
        data: {
          tipoInformacion,
          usuarioCreador,
          estado,
          clienteId,
        },
      });
      res.status(201).json(infoGeneral);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear información general' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
