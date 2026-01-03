import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send,
  Github,
  Twitter,
  Linkedin 
} from "lucide-react";
import toast from 'react-hot-toast'; // ✅ Import toast

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would normally send the form data to your backend
    // For now, we'll just show the success toast

    toast.success("We will contact you shortly!", {
      duration: 5000,
      icon: '📧',
      style: {
        background: '#14b8a6', // teal-500
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '16px',
        padding: '16px 20px',
      },
    });

    // Optional: Reset form
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
              <MessageCircle className="w-9 h-9 text-teal-600 dark:text-teal-400" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="6"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all outline-none resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 px-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-teal-100 dark:bg-teal-900/50 rounded-2xl">
                    <Mail className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <a href="mailto:support@finease.app" className="text-lg text-teal-600 dark:text-teal-400 hover:underline">
                      support@finease.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl">
                    <Phone className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Phone</p>
                    <a href="tel:+1234567890" className="text-lg text-emerald-600 dark:text-emerald-400 hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
                    <MapPin className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Location</p>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Remote Team<br />
                      Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-10">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Follow Us
              </h3>
              <div className="flex gap-6">
                <a href="#" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:scale-110 transition-transform" aria-label="Twitter">
                  <Twitter className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </a>
                <a href="#" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:scale-110 transition-transform" aria-label="GitHub">
                  <Github className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </a>
                <a href="#" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:scale-110 transition-transform" aria-label="LinkedIn">
                  <Linkedin className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We typically respond within <span className="font-bold text-teal-600 dark:text-teal-400">24 hours</span>.
            Thank you for reaching out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;