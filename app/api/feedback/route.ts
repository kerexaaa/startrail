import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, message, contact } = body;

    if (!message || !type) {
      return NextResponse.json(
        { error: "Type and message are required" },
        { status: 400 },
      );
    }

    if (message.length > 300) {
      return NextResponse.json(
        { error: "Message must be 300 characters or less" },
        { status: 400 },
      );
    }

    if (contact && contact.length > 100) {
      return NextResponse.json(
        { error: "Contact info must be 100 characters or less" },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK_URL is not set in environment variables.");
      // In development, we can mock a success response if the webhook is not set up yet.
      return NextResponse.json({ success: true, mocked: true });
    }

    // Colors mapping for different feedback types
    const colors: Record<string, number> = {
      "Bug Report": 16711680, // Red
      "Feature Request": 65280, // Green
      "General Feedback": 3447003, // Blue
    };

    const embed = {
      title: `New Feedback: ${type}`,
      description: message,
      color: colors[type] || 3447003,
      fields: [
        {
          name: "Contact / Identity",
          value: contact || "Anonymous",
          inline: true,
        },
        {
          name: "Date",
          value: new Date().toISOString(),
          inline: true,
        },
      ],
      footer: {
        text: "Startrail App Feedback",
      },
    };

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordResponse.ok) {
      console.error("Discord API Error:", await discordResponse.text());
      return NextResponse.json(
        { error: "Failed to send feedback to Discord" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
