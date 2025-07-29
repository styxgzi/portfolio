import { Button } from "@/components/ui/moving-border-btn";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { HiPaperAirplane, HiUser, HiEnvelope, HiChatBubbleLeftRight, HiCheckCircle } from "react-icons/hi2";
import { slideInFromLeft } from "@/utils/motions/montion";

export default function ContactInput() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const msg = msgRef.current?.value;

    if (!name || !email || !msg) {
      toast.error("All fields are required. Check your inputs.", {
        icon: "⚠️",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
      });
      setLoading(false);
      return;
    }

    // Send email using EmailJS directly to styxgzi@gmail.com
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          name,
          email,
          message: msg,
          to_email: "styxgzi@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
      );

      toast.success("Message sent successfully!", {
        icon: "🚀",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        duration: 5000,
      });

      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (msgRef.current) msgRef.current.value = "";

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Request failed. Check console for details.", {
        icon: "❌",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focused: { scale: 1.02, borderColor: "rgba(168, 85, 247, 0.8)", boxShadow: "0 0 8px rgba(168, 85, 247, 0.3)" },
    unfocused: { scale: 1, borderColor: "rgba(168, 85, 247, 0.3)", boxShadow: "none" }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-20 flex w-full flex-col z-50 rounded-xl text-white md:flex-row md:shadow-lg "
    >
      <motion.form
        className="mx-auto w-full py-8 px-4 relative overflow-hidden rounded-xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-4 font-mono text-xs text-purple-400/70 border-l-2 border-purple-500/30 pl-3"
          variants={slideInFromLeft(0.1)}
          initial="hidden"
          animate="visible"
        >
          <code>// POST /api/contact</code>
        </motion.div>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <motion.input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            variants={inputVariants}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <motion.input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            variants={inputVariants}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <motion.textarea
            ref={msgRef}
            id="message"
            name="message"
            rows={5}
            className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            variants={inputVariants}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HiCheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">
                    Sent!
                  </span>
                </motion.div>
              ) : (
                <motion.span
                  key="default"
                  className="size-full flex items-center justify-center gap-2 font-medium transition-all duration-300"
                  whileHover={{ gap: 4 }}
                >
                  <code className="font-mono">submit()</code>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <HiPaperAirplane className="h-4 w-4 text-purple-400" />
                  </motion.div>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
