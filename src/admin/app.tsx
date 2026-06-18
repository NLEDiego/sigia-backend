export default {
  config: {
    // Forzamos el modo oscuro por defecto y alteramos la paleta de colores
    theme: {
      dark: {
        colors: {
          // 1. EXTIRPAMOS EL MORADO: Todo lo que era morado ahora es Blanco o Gris Técnico
          primary100: '#1c1c1e', // Fondos de elementos seleccionados / activos
          primary200: '#2c2c2e', // Bordes de enfoque
          primary500: '#ffffff', // Color principal: Botones e íconos clave ahora son Blancos
          primary600: '#e5e5ea', // Hover de elementos principales (Gris Apple)
          primary700: '#d1d1d6', // Estado activo al hacer click

          // 2. FONDOS DE MATRIZ NEGRA (Para contrastar con el cristal)
          neutral0: '#000000',   // Menú lateral izquierdo absoluto
          neutral100: '#050505', // Fondo general profundo de la aplicación
          neutral150: '#0d0d0d', // Contenedores secundarios
          neutral200: '#1c1c1e', // Líneas divisorias y bordes sutiles

          // 3. TEXTOS EN ALTO CONTRASTE
          neutral800: '#ffffff', // Texto principal blanco puro
          neutral700: '#f2f2f7', // Texto secundario gris brillante
          neutral600: '#aeaeb2', // Textos apagados / placeholders
        },
      },
    },
  },
  
  bootstrap(app: any) {
    // 4. INYECCIÓN SIGMA: Metemos CSS real al navegador para activar el Liquid Glass estilo Apple
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        /* === EFECTO LIQUID GLASS EN EL MENÚ LATERAL === */
        nav[aria-label="Main"] {
          background: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        /* Sub-menús flotantes estilo cristal */
        [data-testid="sub-nav"], header {
          background: rgba(5, 5, 5, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
        }

        /* === BLINDAJE DE NOTIFICACIONES Y ALERTAS (Adiós Morados/Colores chillones) === */
        [role="alert"], .strapi-alert, [data-strapi-alert="true"] {
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(30px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(30px) saturate(140%) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 16px !important;
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.2), 
            0 12px 40px rgba(0, 0, 0, 0.7) !important;
          color: #ffffff !important;
        }

        /* Forzamos que los textos y links dentro de las alertas sean limpios */
        [role="alert"] p, [role="alert"] span, [role="alert"] h2 {
          color: #ffffff !important;
        }
        [role="alert"] svg {
          fill: #ffffff !important;
          stroke: rgba(255,255,255,0.8) !important;
        }

        /* === CRISTALIZACIÓN DE TARJETAS Y CONTENEDORES DE CONTENIDO === */
        main div[background="neutral0"], .sc-bdnyPb, [data-strapi-safe-grid] {
          background: rgba(255, 255, 255, 0.02) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.06) !important;
          border-radius: 20px !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4) !important;
        }

        /* Ajustes finos a botones nativos para que parezcan de vidrio tallado */
        button[variant="default"] {
          background: rgba(255, 255, 255, 0.9) !important;
          color: #000000 !important;
          font-weight: 800 !important;
          border: none !important;
          backdrop-filter: blur(10px) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        button[variant="default"]:hover {
          background: #ffffff !important;
          transform: translateY(-1px);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.25) !important;
        }

        /* Esconder las decoraciones púrpuras de carga de Strapi */
        .strapi-loader, [aria-busy="true"] {
          border-top-color: #ffffff !important;
        }
      `;
      document.head.appendChild(style);
    }
  },
};