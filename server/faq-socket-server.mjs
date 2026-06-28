import { WebSocketServer } from "ws";

const port = Number(process.env.FAQ_SOCKET_PORT || 8787);
const server = new WebSocketServer({ port });

const faqResponses = [
  {
    match: ["account", "sign up", "register"],
    answer: "Create an account from the login page by switching to Sign Up and completing the form.",
  },
  {
    match: ["download", "offline"],
    answer: "Offline downloads are represented in the app player and can be demonstrated from the Help Center flow.",
  },
  {
    match: ["my list", "watchlist", "save"],
    answer: "Use Add to My List on any title card, then manage it from the My List page.",
  },
  {
    match: ["quality", "streaming"],
    answer: "Streaming quality depends on your network and playback device. The app shows trailer playback in the player.",
  },
  {
    match: ["contact", "support"],
    answer: "Use Contact Us or Feedback to send a message directly to the Firestore-backed forms.",
  },
];

const pickAnswer = (question) => {
  const normalized = question.toLowerCase();
  const found = faqResponses.find((entry) =>
    entry.match.some((term) => normalized.includes(term)),
  );

  return found?.answer || "That question is not in the canned FAQ list, but it has been received live through the socket connection.";
};

server.on("connection", (socket) => {
  socket.send(JSON.stringify({
    type: "welcome",
    message: "Connected to the FAQ socket server.",
  }));

  socket.on("message", (raw) => {
    try {
      const payload = JSON.parse(raw.toString());
      if (payload.type !== "faq_question") return;

      const question = String(payload.question || "").trim();
      socket.send(JSON.stringify({
        type: "faq_answer",
        question,
        answer: pickAnswer(question),
      }));
    } catch (error) {
      socket.send(JSON.stringify({
        type: "faq_error",
        message: "Invalid payload received by the FAQ socket server.",
      }));
    }
  });
});

server.on("listening", () => {
  console.log(`FAQ socket server running on ws://localhost:${port}`);
});
