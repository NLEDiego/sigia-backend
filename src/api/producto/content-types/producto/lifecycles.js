module.exports = {
  async afterUpdate(event) {
    // Extraemos el resultado del producto que acaba de ser actualizado en la base de datos
    const { result } = event;

    // Evaluamos si el inventario alcanzó un estado crítico
    if (result.stock_actual <= result.stock_minimo) {
      
      // 1. Alerta en la consola del servidor (Auditoría backend)
      console.warn(`\n⚠️ [ALERTA DE STOCK CRÍTICO] - SIGIA`);
      console.warn(`Producto: ${result.nombre} (Código: ${result.codigo})`);
      console.warn(`Estado: El stock actual (${result.stock_actual}) alcanzó o superó el límite mínimo establecido (${result.stock_minimo}).`);
      console.warn(`Acción requerida: Reposición de mercancía.\n`);

      /* * 2. (Opcional para el futuro) Integración de correo electrónico
       * Si configuras el plugin de Email en Strapi más adelante, puedes 
       * descomentar y usar este bloque para enviar un correo automático al dueño:
       * * try {
       * await strapi.plugins['email'].services.email.send({
       * to: 'administrador@tu-negocio.cl',
       * from: 'alertas@sigia.cl',
       * subject: `Alerta de Stock: ${result.nombre}`,
       * text: `El producto ${result.nombre} tiene solo ${result.stock_actual} unidades disponibles.`,
       * });
       * } catch (err) {
       * console.error("Error enviando el correo de alerta:", err);
       * }
       */
    }
  },
};