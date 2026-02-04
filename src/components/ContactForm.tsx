"use client";

export default function ContactForm() {
  return (
    <form
      className="mt-12 space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-mint/30 bg-white/10 px-4 py-3 text-white placeholder:text-mint/80 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full rounded-lg border border-mint/30 bg-white/10 px-4 py-3 text-white placeholder:text-mint/80 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Your message"
          className="w-full resize-none rounded-lg border border-mint/30 bg-white/10 px-4 py-3 text-white placeholder:text-mint/80 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-teal py-4 font-medium text-white transition hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-deep"
      >
        Send message
      </button>
    </form>
  );
}
