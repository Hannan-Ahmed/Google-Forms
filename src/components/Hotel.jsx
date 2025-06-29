import React, { useState, useEffect } from "react";

export default function FitnessLandingPage() {

      const heroSlides = [
    {
      image:
        "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heading: "Transform Your Body",
      subheading: "Elevate Your Life"
    },
    {
      image:
        "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heading: "Unleash Your Potential",
      subheading: "Train Like Never Before"
    },
    {
      image:
        "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1600",
      heading: "Strong Body, Calm Mind",
      subheading: "Balance Through Movement"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);


  return (
    <div className="font-sans scroll-smooth bg-gray-100 text-gray-800">
      {/* ───── NAVBAR ───── */}
      <nav className="fixed top-0 w-full z-20 bg-white/30 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wider text-amber-600">ZenFit</h1>
          <ul className="hidden md:flex space-x-6 text-sm font-semibold">
            <li><a href="#about" className="hover:text-amber-600">About</a></li>
            <li><a href="#programs" className="hover:text-amber-600">Programs</a></li>
            <li><a href="#trainers" className="hover:text-amber-600">Trainers</a></li>
            <li><a href="#testimonials" className="hover:text-amber-600">Stories</a></li>
            <li><a href="#pricing" className="hover:text-amber-600">Pricing</a></li>
            <li><a href="#contact" className="hover:text-amber-600">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ───── HERO ───── */}
       <header
        className="relative h-screen flex items-center justify-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {heroSlides[currentSlide].heading}
            <br />
            {heroSlides[currentSlide].subheading}
          </h2>
          <p className="mt-6 text-white/90 max-w-xl mx-auto">
            Join the community that's redefining fitness with science‑backed training,
            nutrition guidance and unmatched accountability.
          </p>
          <a
            href="#programs"
            className="inline-block mt-10 bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            Get Started
          </a>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            ></span>
          ))}
        </div>
      </header>

      {/* ───── ABOUT ───── */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About"
            className="rounded-2xl shadow-xl"
          />
          <div>
            <h3 className="text-3xl font-bold mb-6">Why ZenFit?</h3>
            <p className="text-gray-600 leading-relaxed">
              We blend expert coaching with data‑driven programming to craft a fitness journey that adapts to
              <span className="font-semibold text-gray-800"> your </span>
              life. From beginners aiming to move pain‑free to athletes chasing performance, our mission remains the same: deliver sustainable results and unshakable confidence.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-amber-600 rounded-full"></span>
                <span>Personalized workout and nutrition plans</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-amber-600 rounded-full"></span>
                <span>State‑of‑the‑art facility with 24/7 access</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-2 mr-3 bg-amber-600 rounded-full"></span>
                <span>Community events, workshops and challenges</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───── PROGRAMS ───── */}
      <section id="programs" className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Programs Built For Impact</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Strength Training",
                img: "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1600",
                desc: "Progressive overload meets intelligent coaching to build power and resilience.",
              },
              {
                title: "HIIT & Conditioning",
                img: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=1600",
                desc: "Torch calories, improve VO₂ max and spike metabolism with our signature sweat sessions.",
              },
              {
                title: "Mind‑Body Flow",
                img: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600",
                desc: "Yoga, mobility and breath‑work classes harmonize movement, recovery and mindfulness.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img src={p.img} alt={p.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{p.title}</h4>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRAINERS ───── */}
      <section id="trainers" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Meet The Coaches</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Ava Khan",
                role: "Strength & Conditioning",
                img: "https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=1600",
              },
              {
                name: "Liam Patel",
                role: "Performance Specialist",
                img: "https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg?auto=compress&cs=tinysrgb&w=1600",
              },
              {
                name: "Mia Lee",
                role: "Mobility & Yoga",
                img: "https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1600",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-1 hover:shadow-xl transition"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-amber-600 -mt-16 mb-4"
                />
                <h4 className="text-xl font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section id="testimonials" className="py-20 relative">
        <div
          className="absolute inset-0 bg-fixed"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-12">Member Stories</h3>
          <div className="space-y-12">
            {[
              {
                quote:
                  "ZenFit helped me lose 18 kg and, more importantly, fall in love with training again.",
                name: "Sara",
                city: "Karachi",
              },
              {
                quote:
                  "I set a national powerlifting record thanks to the programming and mentorship here.",
                name: "Hamza",
                city: "Lahore",
              },
              {
                quote:
                  "My chronic back pain is gone and my mobility has never been better.",
                name: "Farah",
                city: "Islamabad",
              },
            ].map((t, i) => (
              <blockquote key={i} className="text-lg leading-relaxed italic max-w-2xl mx-auto">
                “{t.quote}”
                <footer className="mt-4 not-italic font-semibold">
                  — {t.name}, {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Flexible Memberships</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                plan: "Starter",
                price: "4,999",
                desc: ["Gym floor access", "Group classes", "Starter program"],
              },
              {
                plan: "Pro",
                price: "7,999",
                desc: [
                  "All Starter perks",
                  "Personal coach (4×/mo)",
                  "Nutrition consultation",
                ],
              },
              {
                plan: "Elite",
                price: "12,999",
                desc: [
                  "All Pro perks",
                  "Unlimited coaching",
                  "Recovery lounge + sauna",
                ],
              },
            ].map((p) => (
              <div
                key={p.plan}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition flex flex-col"
              >
                <h4 className="text-xl font-semibold mb-2">{p.plan}</h4>
                <div className="text-4xl font-bold text-amber-600 mb-4">PKR {p.price}</div>
                <ul className="text-gray-600 flex-grow">
                  {p.desc.map((d, idx) => (
                    <li key={idx} className="py-1">
                      {d}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-block bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full transition"
                >
                  Join Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Let's Build Your Story</h3>
          <p className="text-gray-600 mb-8">
            Message us and our team will craft the perfect plan for your goals.
          </p>
          <form className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-600 md:col-span-2"
            />
            <textarea
              rows="4"
              placeholder="Tell us about your goals…"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-600 md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} ZenFit. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </footer>
      </div>
  );
}

