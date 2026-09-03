import "./MessageCard.css";

/** Tarjeta decorativa pequeña con texto/emoji, con el mismo brillo que
 * los marcos de fotos, para mezclarse entre ellas dentro del corazón. */
export default function MessageCard({ text }) {
  const isEmojiOnly = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+$/u.test(text);

  return (
    <div className={`message-card ${isEmojiOnly ? "message-card--emoji" : ""}`}>
      <span>{text}</span>
    </div>
  );
}
