import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
class EmailService {
  constructor() {
   this.transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT), // asegúrate de convertir a número
  secure: process.env.EMAIL_PORT === '465', // true si usas 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // 🔧 Esto es lo que necesitas
  }
});


  }

  async enviarConfirmacionReserva(datosReserva) {
    const {
      nombre,
      apellido,
      email,
      codigoConfirmacion,
      servicio,
      fechaReserva,
      numeroPersonas,
      precioTotal,
      tipoServicio,
      metodoPago
    } = datosReserva;

    const tipoServicioTexto = {
      excursion: 'Excursión',
      hotel: 'Hotel',
      paquete: 'Paquete Turístico'
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c5282; color: white; padding: 20px; text-align: center; }
          .content { background: #f7fafc; padding: 20px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #2c5282; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .total { font-weight: bold; font-size: 1.1em; background: #e2e8f0; padding: 10px; }
          .footer { text-align: center; color: #666; font-size: 0.9em; margin-top: 20px; }
          .code { background: #2c5282; color: white; padding: 10px; text-align: center; font-size: 1.2em; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Confirmación de Reserva!</h1>
            <p>Caminantes por Colombia</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Hola ${nombre} ${apellido},</h2>
              <p>¡Gracias por tu reserva! Hemos recibido tu solicitud y está confirmada.</p>
              
              <div class="code">
                Código de Confirmación: ${codigoConfirmacion}
              </div>
            </div>

            <div class="section">
              <h3>Detalles del Servicio</h3>
              <div class="info-row">
                <span>Tipo de Servicio:</span>
                <span>${tipoServicioTexto[tipoServicio]}</span>
              </div>
              <div class="info-row">
                <span>Servicio:</span>
                <span>${servicio.nombre}</span>
              </div>
              <div class="info-row">
                <span>Fecha:</span>
                <span>${new Date(fechaReserva).toLocaleDateString('es-CO')}</span>
              </div>
              ${tipoServicio !== 'hotel' ? `
              <div class="info-row">
                <span>Número de Personas:</span>
                <span>${numeroPersonas}</span>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <h3>Información de Pago</h3>
              <div class="info-row">
                <span>Método de Pago:</span>
                <span>${metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1)}</span>
              </div>
              <div class="info-row total">
                <span>Total a Pagar:</span>
                <span>$${precioTotal.toLocaleString('es-CO')}</span>
              </div>
            </div>

            <div class="section">
              <h3>Instrucciones Importantes</h3>
              <ul>
                <li>Conserva este código de confirmación: <strong>${codigoConfirmacion}</strong></li>
                <li>Preséntate 15 minutos antes del horario programado</li>
                <li>Trae tu documento de identidad</li>
                ${metodoPago === 'efectivo' ? '<li>El pago se realizará en efectivo el día del servicio</li>' : ''}
                <li>Para cambios o cancelaciones, contacta con nosotros con 24 horas de anticipación</li>
              </ul>
            </div>

            <div class="section">
              <h3>¿Necesitas Ayuda?</h3>
              <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
              <ul>
                <li>Email: caminantesporcolombia@gmail.com</li>
                <li>Teléfono: 312 2567578</li>
                <li>WhatsApp: 311 2874546</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>¡Gracias por elegir Caminantes por Colombia!</p>
            <p>Este es un correo automático, por favor no responder.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: {
        name: 'Caminantes por Colombia',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: `Confirmación de Reserva - ${servicio.nombre} [${codigoConfirmacion}]`,
      html: htmlContent,
      text: `
        Confirmación de Reserva - Caminantes por Colombia
        
        Hola ${nombre} ${apellido},
        
        ¡Gracias por tu reserva! Tu código de confirmación es: ${codigoConfirmacion}
        
        Detalles:
        - Servicio: ${servicio.nombre}
        - Fecha: ${new Date(fechaReserva).toLocaleDateString('es-CO')}
        - Personas: ${numeroPersonas}
        - Total: $${precioTotal.toLocaleString('es-CO')}
        
        Conserva este código y preséntate 15 minutos antes.
        
        ¡Gracias por elegir Caminantes por Colombia!
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw new Error('Error al enviar el correo de confirmación');
    }
  }

  // Método para enviar correo de cancelación
  async enviarCancelacionReserva(datosReserva) {
    const { nombre, apellido, email, codigoConfirmacion, servicio } = datosReserva;

    const mailOptions = {
      from: {
        name: 'Caminantes por Colombia',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: `Cancelación de Reserva - ${codigoConfirmacion}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
            <h1>Reserva Cancelada</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hola ${nombre} ${apellido},</p>
            <p>Tu reserva con código <strong>${codigoConfirmacion}</strong> para el servicio <strong>${servicio.nombre}</strong> ha sido cancelada exitosamente.</p>
            <p>Si tienes alguna pregunta, contáctanos en caminantesporcolombia@gmail.com</p>
            <br>
            <p>¡Esperamos verte pronto!</p>
            <p>Equipo Caminantes por Colombia</p>
          </div>
        </div>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error enviando correo de cancelación:', error);
      throw new Error('Error al enviar el correo de cancelación');
    }
  }
}

export const emailService = new EmailService();
