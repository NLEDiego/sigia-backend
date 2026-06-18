export default {
  async afterCreate(event: any) {
    const { result } = event;

    try {
      // 1. Buscamos el movimiento
      const movimiento = await strapi.db.query('api::movimiento.movimiento').findOne({
        where: { id: result.id },
        populate: ['producto'],
      });

      if (!movimiento || !movimiento.producto) return;

      // 2. NUEVO: Verificamos si ya existe otro movimiento en el historial 
      // con la misma hora y mismo producto (pista de duplicado)
      const duplicados = await strapi.db.query('api::movimiento.movimiento').findMany({
        where: {
          createdAt: { $eq: movimiento.createdAt },
          producto: movimiento.producto.id,
          id: { $ne: movimiento.id }
        }
      });

      if (duplicados.length > 0) {
        console.log("⚠️ Movimiento duplicado detectado, ignorando cálculo.");
        return;
      }

      // 3. Calculamos
      const producto = movimiento.producto;
      const cantidad = Number(movimiento.Cantidad);
      const tipo = movimiento.Tipo;
      const stockActual = Number(producto.stock_actual);

      let nuevoStock = tipo === 'Entrada' ? stockActual + cantidad : stockActual - cantidad;

      // 4. Actualizamos el producto
      await strapi.db.query('api::producto.producto').update({
        where: { id: producto.id },
        data: { stock_actual: nuevoStock },
      });

      console.log(`✅ Ajuste aplicado. Stock: ${stockActual} -> ${nuevoStock}`);
    } catch (error) {
      console.error('❌ Error:', error);
    }
  },
};