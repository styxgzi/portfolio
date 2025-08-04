import { Button } from "@/components/ui/moving-border-btn";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { HiPaperAirplane, HiUser, HiEnvelope, HiChatBubbleLeftRight, HiCheckCircle } from "react-icons/hi2";
import { slideInFromLeft } from "@/utils/motions/montion";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

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
    focused: { scale: 1.02, borderColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)" },
    unfocused: { scale: 1, borderColor: "rgba(255, 255, 255, 0.3)", boxShadow: "none" }
  };

  return (
    <>
      <div className="mx-auto mb-8 flex w-full flex-col z-50 text-white">
      <motion.form
        className="mx-auto w-full py-4 px-2 relative overflow-hidden"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-4 font-mono text-xs text-white/70 bg-black/30 p-2 rounded-md border border-white/10"
          variants={slideInFromLeft(0.1)}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2">
            <FiMessageSquare className="text-white/70" />
            <code>$ curl -X POST https://api.example.com/contact</code>
          </div>
        </motion.div>
        
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1.5">
            <span className="text-blue-400">$</span>
            <span className="text-white">NAME=</span>
          </label>
          <div className="relative">
            <motion.input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              className="w-full font-mono rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-all backdrop-blur-sm"
              variants={inputVariants}
              animate={focused === "name" ? "focused" : "unfocused"}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1.5">
            <span className="text-blue-400">$</span>
            <span className="text-white">EMAIL=</span>
          </label>
          <div className="relative">
            <motion.input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              className="w-full font-mono rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-all backdrop-blur-sm"
              variants={inputVariants}
              animate={focused === "email" ? "focused" : "unfocused"}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1.5">
            <span className="text-blue-400">$</span>
            <span className="text-white">cat > message.txt</span>
          </label>
          <div className="relative">
            <motion.textarea
              ref={msgRef}
              id="message"
              name="message"
              rows={5}
              className="w-full font-mono rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-all backdrop-blur-sm"
              variants={inputVariants}
              animate={focused === "message" ? "focused" : "unfocused"}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="Type your message here..."
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-black/50 border border-white/20 hover:border-white/40 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all duration-300" 
            disabled={loading}
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HiCheckCircle className="h-5 w-5 text-white" />
                  <span className="font-medium text-white">
                    Message Sent! (exit code 0)
                  </span>
                </motion.div>
              ) : (
                <motion.span
                  key="default"
                  className="size-full flex items-center justify-center gap-2 font-medium transition-all duration-300"
                  whileHover={{ gap: 4 }}
                >
                  <span className="text-blue-400 font-mono">$</span>
                  <code className="font-mono text-white">./send_message.sh</code>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <FiSend className="h-4 w-4 text-white" />
                  </motion.div>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.form>
      </div>
    </>
  );
}
