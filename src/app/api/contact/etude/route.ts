import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nom,
      telephone,
      email,
      steg,
      clientType,
      matricule,
      adresse,
      typeProjet,
      message,
    } = body;

    // Validation des champs
    if (
      !nom ||
      !telephone ||
      !email ||
      !steg ||
      !clientType ||
      !adresse ||
      !typeProjet ||
      !message
    ) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 },
      );
    }

    // Template HTML du message
    const htmlContent = `
      <h2>Nouveau demande d'étude</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Télephone :</strong> ${telephone}</p>
      <p><strong>E-mail :</strong> ${email}</p>
      <p><strong>Référence STEG :</strong> ${steg}</p>
      <p><strong>Type de client :</strong> ${clientType}</p>
      <p><strong>Matricule fiscale :</strong> ${matricule}</p>
      <p><strong>Adresse :</strong> ${adresse}</p>
      <p><strong>Type de projet :</strong> ${typeProjet}</p>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Envoi de l'e-mail
    await sendEmail({
      subject: `[Etude gratuite] Nouvelle demande de ${nom}`,
      htmlContent: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { success: true, message: "Votre demande d'étude a été transmise." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur API Message:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 },
    );
  }
}
