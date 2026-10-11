import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, telephone, email, typeProjet, power, message } = body;

    // Validation des champs
    if (!nom || !email || !telephone || !typeProjet || !power) {
      return NextResponse.json(
        {
          error:
            "Champs obligatoires manquants (nom, email, téléphone, type de bâtiment).",
        },
        { status: 400 },
      );
    }

    // Template HTML de l'e-mail reçue
    const htmlContent = `
      <h2>Nouvelle Demande de Devis Photovoltaïque</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>E-mail :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${telephone}</p>
      <p><strong>Type de projet :</strong> ${typeProjet}</p>
      <p><strong>Puissance à installer :</strong> ${power}</p>
      <p><strong>Message complémentaire :</strong></p>
      <p>${message ? message.replace(/\n/g, "<br>") : "Aucun message."}</p>
    `;

    // Envoi de l'e-mail
    await sendEmail({
      subject: `[Devis Solaire] Nouvelle demande de ${nom}`,
      htmlContent: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { success: true, message: "Votre demande de devis a été transmise." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur API Devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 },
    );
  }
}
