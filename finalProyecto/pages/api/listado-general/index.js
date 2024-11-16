import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clientes = await prisma.cliente.findMany({
        include: {
          informacionGeneral: true,
        },
        orderBy: [
          { apellidos: 'asc' },
          { fechaNacimiento: 'asc' },
        ],
      });
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el listado' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
