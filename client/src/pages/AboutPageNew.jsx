import { useEffect, useRef } from "react";


/* ─── STYLE ─── */
const css = `
  :root{
    --cream:#FAF8F3;--warm-white:#FFFEF9;--sand:#F0EBE1;--sand-dark:#E2D9CC;
    --terra:#B8895A;--terra-dark:#8C6340;--terra-light:#F5EDE3;
    --sage:#7A8C6E;--charcoal:#2C2C28;--charcoal-mid:#5A5A54;--charcoal-light:#9A9A94;
    --gold:#C9A84C;--fd:'Cormorant Garamond',Georgia,serif;--fb:'DM Sans',sans-serif;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html.lenis,html.lenis body{height:auto;}
  .lenis.lenis-smooth{scroll-behavior:auto!important;}
  .lenis.lenis-stopped{overflow:hidden;}
  body{font-family:var(--fb);background:var(--cream);color:var(--charcoal);overflow-x:hidden;font-size:15px;line-height:1.6;}


  /* HERO */
  .hero{height:72vh;min-height:520px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:64px 0 8vh;}
  .hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop') center/cover no-repeat;will-change:transform;}
  .hero-bg::after{
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(to right, rgba(250, 248, 243, 0.82) 0%, rgba(250, 248, 243, 0.5) 30%, rgba(250, 248, 243, 0) 65%),
      linear-gradient(to bottom, rgba(44, 44, 40, 0.05) 0%, rgba(250, 248, 243, 0) 50%, rgba(250, 248, 243, 0.8) 85%, rgba(250, 248, 243, 1) 100%);
  }
  .hero-content{position:relative;z-index:1;padding:0 8%;max-width:900px;}
  .hero-eyebrow{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--terra-dark);font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:12px;opacity:0;transform:translateY(20px);}
  .hero-eyebrow::before{content:'';width:40px;height:1px;background:var(--terra-dark);}
  .hero-title{font-family:var(--fd);font-size:clamp(2.8rem,5.5vw,5rem);font-weight:500;line-height:1.05;color:var(--charcoal);letter-spacing:-.01em;opacity:0;transform:translateY(30px);}
  .hero-title em{font-style:italic;color:var(--terra-dark);font-weight:600;}
  .hero-sub{margin-top:18px;font-size:16px;color:var(--charcoal);max-width:500px;font-weight:400;opacity:0;transform:translateY(20px);}
  .scroll-hint{position:absolute;bottom:28px;right:8%;display:flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--charcoal-light);opacity:0;}
  .scroll-line{width:40px;height:1px;background:var(--charcoal-light);overflow:hidden;position:relative;}
  .scroll-line::after{content:'';position:absolute;inset:0;background:var(--terra);animation:scan 1.8s ease-in-out infinite;}
  @keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}

  /* SECTIONS */
  section{padding:88px 8%;}
  .sec-label{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--terra);font-weight:500;margin-bottom:12px;display:flex;align-items:center;gap:10px;}
  .sec-label::before{content:'';width:28px;height:1px;background:var(--terra);}
  .sec-title{font-family:var(--fd);font-size:clamp(2rem,4vw,3.2rem);font-weight:300;line-height:1.1;color:var(--charcoal);}
  .sec-title em{font-style:italic;color:var(--terra);}
  .divider{height:1px;background:var(--sand-dark);margin:0 8%;}

  /* WHO */
  .who{background:var(--warm-white);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
  .who-big{font-family:var(--fd);font-size:clamp(1.25rem,2.2vw,1.7rem);font-weight:300;line-height:1.55;color:var(--charcoal);margin:24px 0 20px;}
  .who-p{font-size:15px;color:var(--charcoal-mid);line-height:1.75;margin-bottom:14px;}
  .who-img{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/5;box-shadow:0 24px 72px rgba(44,44,40,.12);}
  .who-img img{width:100%;height:100%;object-fit:cover;display:block;}
  .img-badge{position:absolute;bottom:28px;left:28px;background:white;border-radius:12px;padding:16px 20px;box-shadow:0 8px 32px rgba(44,44,40,.14);display:flex;align-items:center;gap:14px;}
  .badge-n{font-family:var(--fd);font-size:2.4rem;font-weight:500;color:var(--terra);line-height:1;}
  .badge-l{font-size:12px;color:var(--charcoal-mid);max-width:80px;line-height:1.3;}

  /* STATS */
  .stats{background:var(--charcoal);padding:56px 8%;}
  .stats-g{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}
  .stat-item{padding:32px 24px;border-right:1px solid rgba(255,255,255,.07);text-align:center;}
  .stat-item:last-child{border-right:none;}
  .stat-n{font-family:var(--fd);font-size:clamp(2.4rem,4vw,3.6rem);font-weight:300;color:var(--terra);line-height:1;margin-bottom:8px;}
  .stat-l{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:400;}

  /* VM */
  .vm{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--sand-dark);padding:0;}
  .vm-card{background:var(--cream);padding:72px 8%;position:relative;overflow:hidden;}
  .vm-card.alt{background:var(--terra-light);}
  .vm-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--terra);transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.25,.1,.25,1);}
  .vm-card:hover::before{transform:scaleX(1);}
  .vm-icon{width:52px;height:52px;border-radius:14px;background:var(--terra-light);display:flex;align-items:center;justify-content:center;margin-bottom:24px;}
  .vm-icon.alt{background:rgba(184,137,90,.15);}
  .vm-icon svg{width:24px;height:24px;color:var(--terra);}
  .vm-title{font-family:var(--fd);font-size:1.9rem;font-weight:300;color:var(--charcoal);margin-bottom:16px;}
  .vm-title em{font-style:italic;color:var(--terra);}
  .vm-text{font-size:15px;color:var(--charcoal-mid);line-height:1.75;}

  /* VALUES */
  .values{background:var(--warm-white);}
  .values-h{margin-bottom:56px;}
  .values-g{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .val-card{background:white;border:1px solid var(--sand-dark);border-radius:16px;padding:36px 28px;transition:border-color .25s,box-shadow .25s,transform .25s;opacity:0;transform:translateY(40px);}
  .val-card:hover{border-color:var(--terra);box-shadow:0 12px 40px rgba(184,137,90,.13);transform:translateY(-4px)!important;}
  .val-n{font-family:var(--fd);font-size:3rem;font-weight:300;color:var(--sand-dark);line-height:1;margin-bottom:16px;}
  .val-t{font-family:var(--fd);font-size:1.45rem;font-weight:400;color:var(--charcoal);margin-bottom:10px;}
  .val-txt{font-size:14px;color:var(--charcoal-mid);line-height:1.7;}

  /* TEAM */
  .team{background:var(--cream);}
  .team-h{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:52px;}
  .team-intro{
    max-width:760px;
    margin-top:18px;
    padding-left:18px;
    border-left:2px solid var(--terra);
    font-size:15.5px;
    line-height:1.8;
    color:var(--charcoal-mid);
  }
  .team-intro strong{
    display:block;
    margin-bottom:8px;
    font-family:var(--fd);
    font-size:1.45rem;
    font-weight:400;
    line-height:1.35;
    color:var(--charcoal);
  }
  .team-g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
  .team-card{border-radius:16px;overflow:hidden;background:white;border:1px solid var(--sand-dark);transition:box-shadow .3s,transform .3s;opacity:0;transform:translateY(40px);}
  .team-card:hover{box-shadow:0 16px 48px rgba(44,44,40,.12);transform:translateY(-6px)!important;}
  .team-img{aspect-ratio:1/1;overflow:hidden;}
  .team-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s;}
  .team-card:hover .team-img img{transform:scale(1.04);}
  .team-info{padding:22px 24px 24px;}
  .team-name{font-family:var(--fd);font-size:1.35rem;font-weight:400;color:var(--charcoal);margin-bottom:4px;}
  .team-role{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--terra);}
  .team-bio{font-size:13.5px;color:var(--charcoal-mid);line-height:1.65;margin-top:10px;}

  /* TESTIMONIALS */
  .testimonials{background:var(--warm-white);overflow:hidden;}
  .testimonials-h{max-width:720px;margin-bottom:42px;}
  .testimonials-sub{
    margin-top:18px;
    padding-left:18px;
    border-left:2px solid var(--terra);
    font-size:15.5px;
    font-weight:400;
    line-height:1.8;
    color:var(--charcoal-mid);
  }
  .testimonials-sub em{font-style:normal;color:var(--charcoal);font-weight:500;}
  .testimonial-marquee{
    position:relative;
    width:100%;
    overflow:hidden;
    padding:8px 0 14px;
  }
  .testimonial-marquee::before,
  .testimonial-marquee::after{
    content:"";
    position:absolute;
    top:0;
    bottom:0;
    width:120px;
    z-index:2;
    pointer-events:none;
  }
  .testimonial-marquee::before{left:0;background:linear-gradient(90deg,var(--warm-white),rgba(255,254,249,0));}
  .testimonial-marquee::after{right:0;background:linear-gradient(270deg,var(--warm-white),rgba(255,254,249,0));}
  .testimonial-track{
    display:flex;
    gap:22px;
    width:max-content;
    animation:testimonialScroll 32s linear infinite;
  }
  .testimonial-marquee:hover .testimonial-track{animation-play-state:paused;}
  .review-card{
    width:360px;
    min-height:230px;
    background:white;
    border:1px solid var(--sand-dark);
    border-radius:16px;
    padding:28px;
    box-shadow:0 14px 42px rgba(44,44,40,.07);
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .review-quote{
    font-family:var(--fd);
    font-size:1.2rem;
    line-height:1.55;
    font-weight:300;
    color:var(--charcoal);
  }
  .review-quote::before{
    content:"“";
    color:var(--terra);
    font-size:2.4rem;
    line-height:0;
    vertical-align:-.32em;
    margin-right:4px;
  }
  .review-meta{
    margin-top:24px;
    padding-top:16px;
    border-top:1px solid var(--sand-dark);
  }
  .review-name{font-size:14px;font-weight:500;color:var(--charcoal);}
  .review-place{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--terra);margin-top:3px;}
  @keyframes testimonialScroll{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
  }

  /* CAREERS */
  .careers{background:var(--terra-light);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  .careers p{font-size:15px;color:var(--charcoal-mid);line-height:1.75;margin-bottom:28px;}
  .email-link{display:inline-flex;align-items:center;gap:10px;color:var(--terra);font-weight:500;text-decoration:none;font-size:15px;transition:gap .3s;}
  .email-link:hover{gap:16px;}
  .email-link::after{content:'→';}
  .careers-img{border-radius:16px;overflow:hidden;aspect-ratio:5/4;box-shadow:0 20px 60px rgba(44,44,40,.12);}
  .careers-img img{width:100%;height:100%;object-fit:cover;display:block;}

  /* CONTACT */
  .contact{background:var(--charcoal);padding:100px 8%;position:relative;}
  .contact::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);}
  .contact-g{display:grid;grid-template-columns:1.2fr 1fr;gap:80px;align-items:center;}
  .contact-map{border-radius:24px;overflow:hidden;height:440px;border:1px solid rgba(255,255,255,.1);box-shadow:0 32px 64px rgba(0,0,0,.3);}
  .contact-map iframe{width:100%;height:100%;border:none;display:block;filter:grayscale(60%) contrast(1.1) opacity(0.85);transition:filter 0.5s ease;}
  .contact-map:hover iframe{filter:grayscale(0%) contrast(1) opacity(1);}
  .c-label{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);font-weight:500;margin-bottom:16px;display:flex;align-items:center;gap:12px;}
  .c-label::before{content:'';width:40px;height:1px;background:var(--terra);}
  .c-title{font-family:var(--fd);font-size:clamp(2.5rem,4vw,3.6rem);font-weight:300;color:white;margin:0 0 40px;line-height:1.1;}
  .c-title em{font-style:italic;color:var(--terra);}
  .c-detail{display:flex;align-items:flex-start;gap:20px;margin-bottom:24px;padding:20px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s ease;}
  .c-detail:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);transform:translateX(8px);}
  .c-icon{width:48px;height:48px;border-radius:12px;background:rgba(184,137,90,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.3s ease;}
  .c-detail:hover .c-icon{background:var(--terra);transform:scale(1.05);}
  .c-detail:hover .c-icon svg{color:white;}
  .c-icon svg{width:20px;height:20px;color:var(--terra);transition:color 0.3s;}
  .c-strong{display:block;font-size:16px;font-family:var(--fd);font-weight:500;letter-spacing:0.02em;color:white;margin-bottom:6px;}
  .c-muted{font-size:14px;color:rgba(255,255,255,.6);line-height:1.6;display:block;}
  .c-link{text-decoration:none;transition:color 0.2s;}
  .c-link:hover{color:var(--terra);}

  /* FOOTER */
  footer{background:#1E1E1B;padding:64px 8% 32px;}
  .footer-g{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;}
  .f-logo{font-family:var(--fd);font-size:1.6rem;font-weight:500;color:white;margin-bottom:12px;}
  .f-desc{font-size:13px;color:rgba(255,255,255,.4);line-height:1.7;margin-bottom:20px;}
  .f-socials{display:flex;gap:8px;}
  .soc{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);font-size:11px;font-weight:500;display:flex;align-items:center;justify-content:center;text-decoration:none;text-transform:uppercase;transition:background .2s,color .2s;}
  .soc:hover{background:var(--terra);color:white;border-color:var(--terra);}
  .f-col h4{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px;font-weight:500;}
  .f-col ul{list-style:none;}
  .f-col ul li{margin-bottom:8px;}
  .f-col ul li a{font-size:13px;color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s;}
  .f-col ul li a:hover{color:var(--terra);}
  .f-bot{border-top:1px solid rgba(255,255,255,.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;}
  .f-bot p,.f-bot a{font-size:12px;color:rgba(255,255,255,.25);text-decoration:none;}
  .f-bot a:hover{color:var(--terra);}
  .f-links{display:flex;gap:20px;}
  .link-arrow{font-size:13px;color:var(--terra);text-decoration:none;letter-spacing:.06em;display:inline-flex;align-items:center;gap:8px;transition:gap .3s;}
  .link-arrow::after{content:'→';}
  .link-arrow:hover{gap:12px;}
  .clip-r{clip-path:inset(0 100% 0 0);}

  @media(max-width:900px){
    .who,.vm,.careers,.contact-g{grid-template-columns:1fr;}
    .stats-g{grid-template-columns:repeat(2,1fr);}
    .values-g,.team-g{grid-template-columns:repeat(2,1fr);}
    .footer-g{grid-template-columns:1fr 1fr;}
    .nav-links,.nav-actions{display:none;}
  }
  @media(max-width:540px){
    .values-g,.team-g,.stats-g{grid-template-columns:1fr;}
  }
`;

/* ─── DATA ─── */
const values = [
  {
    n: "01",
    t: "Verified and Genuine Property Listings",
    d: "Every listing is carefully reviewed so buyers and sellers can explore reliable and authentic property options.",
  },
  {
    n: "02",
    t: "Transparent Dealings",
    d: "We maintain clarity in pricing, documentation, and every step of the process so you can make confident decisions.",
  },
  {
    n: "03",
    t: "Customer-Centric Approach",
    d: "We first understand your requirements, then suggest options that match your budget, location preference, and purpose.",
  },
  {
    n: "04",
    t: "Local Market Expertise",
    d: "Our understanding of Jabalpur and nearby areas helps us provide practical, location-wise real estate guidance.",
  },
  {
    n: "05",
    t: "Professional Guidance Throughout the Process",
    d: "From shortlisting and site visits to negotiation, paperwork, and closing, we guide you at every stage.",
  },
  {
    n: "06",
    t: "Value-for-Money Investment Opportunities",
    d: "We recommend properties that balance your current needs with future growth potential and resale value.",
  },
  {
    n: "07",
    t: "Dedicated Support for Buyers and Sellers",
    d: "Buyers receive support in finding the right property, while sellers get assistance in connecting with genuine customers.",
  },
  {
    n: "08",
    t: "Strong Ethical Standards",
    d: "Honesty, fair communication, and responsible service are the core principles behind every interaction.",
  },
];

const team = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    bio: "15+ saal ka real estate experience. Jabalpur ki property market ke sabse jaankar log mein se ek.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&facepad=3",
  },
  {
    name: "Priya Verma",
    role: "Head of Operations",
    bio: "Client relations aur operations ki expert. Har deal ko seamless banana inki zimmedari hai.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&facepad=3",
  },
  {
    name: "Amit Patel",
    role: "Property Advisor",
    bio: "Residential aur commercial properties mein specialist. Har budget ke liye sahi property dhundhna inki kala hai.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&facepad=3",
  },
];

const testimonials = [
  {
    name: "Happy Homebuyer",
    place: "Client Review",
    text: "SIARA Properties guided us throughout the buying process with complete transparency. Their honest approach made all the difference.",
  },
  {
    name: "Satisfied Property Seller",
    place: "Client Review",
    text: "We were able to sell our property smoothly and confidently. Highly recommended for anyone looking for trustworthy real estate services.",
  },
  {
    name: "Valued Client",
    place: "Client Review",
    text: "Professional, responsive, and genuinely committed to their clients' interests.",
  },
  {
    name: "Rahul Verma",
    place: "Wright Town",
    text: "The team understood my requirements clearly and suggested properties that matched my budget and location preference.",
  },
  {
    name: "Priya Jain",
    place: "Napier Town",
    text: "From property visits to documentation, everything was handled professionally. I felt supported at every step.",
  },
];

const stats = [
  { n: 500, l: "Happy Clients" },
  { n: 1200, l: "Properties Listed" },
  { n: 8, l: "Years of Trust" },
  { n: 15, l: "Areas Covered" },
];

/* ─── HELPERS ─── */
function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      res();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

/* ─── COMPONENT ─── */
export default function AboutPageNew() {
  const navRef = useRef(null);
  const heroBgRef = useRef(null);
  const eyeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const hintRef = useRef(null);
  const whoImgRef = useRef(null);
  const statsRef = useRef([]);
  const valRefs = useRef([]);
  const teamRefs = useRef([]);

  useEffect(() => {
    let lenis;

    (async () => {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
      );

      const { gsap, ScrollTrigger, Lenis } = window;
      gsap.registerPlugin(ScrollTrigger);

      /* Lenis */
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: true,
        touchMultiplier: 1.5,
      });
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      /* Nav scroll */
      lenis.on("scroll", ({ scroll }) => {
        navRef.current?.classList.toggle("scrolled", scroll > 60);
      });

      /* Hero entrance */
      gsap.set([eyeRef.current, titleRef.current, subRef.current], {
        opacity: 0,
        y: 0,
      });
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl
        .to(eyeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          subRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .to(hintRef.current, { opacity: 1, duration: 0.6 }, "-=0.2");

      /* Hero parallax */
      gsap.to(heroBgRef.current, {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Generic .reveal */
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Clip reveal titles */
      gsap.utils.toArray(".clip-r").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      /* Who image parallax */
      if (whoImgRef.current) {
        gsap.to(whoImgRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".who",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Value cards stagger */
      valRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: ".values-g",
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      /* Team cards stagger */
      teamRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: ".team-g",
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      /* VM cards slide */
      gsap.utils.toArray(".vm-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".vm",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Stats count up */
      statsRef.current.forEach((el, i) => {
        if (!el || !stats[i]) return; // ← guard: index 4 is badge (not in stats[])
        const target = stats[i].n;
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              { val: target },
              {
                duration: 2.2,
                ease: "power2.out",
                onUpdate: function () {
                  if (el)
                    el.textContent = Math.round(this.targets()[0].val) + "+";
                },
              },
            );
          },
        });
      });

      /* Smooth scroll anchors */
      document.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const id = link.getAttribute("href");
          id.length > 1
            ? lenis.scrollTo(id, {
                duration: 1.4,
                easing: (t) => 1 - Math.pow(1 - t, 4),
              })
            : lenis.scrollTo(0, { duration: 1.4 });
        });
      });
    })();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      {/* NAV */}
      {/* ── NAVIGATION ── */}
      
      {/* <nav ref={navRef} className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-mark">B</div>
         SiaraProperties
        </a>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#" className="active">About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-o">Register</button>
          <button className="btn-f">Login</button>
        </div>
      </nav> */}
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-content">
          <p className="hero-eyebrow" ref={eyeRef}>
            About Us
          </p>
          <h1 className="hero-title" ref={titleRef}>
            Finding Home Just
            <br />
            Got <em>Easier</em>
          </h1>
          <p className="hero-sub" ref={subRef}>
            Jabalpur's most trusted real estate platform where every property
            comes with trust.
          </p>
        </div>
        <div className="scroll-hint" ref={hintRef}>
          Scroll
          <div className="scroll-line" />
        </div>
      </section>
      {/* WHO WE ARE */ }
      <section className="who">
        <div>
          <p className="sec-label reveal">About Us</p>
          <h2 className="sec-title clip-r">
            SIARA <em>Properties</em>
          </h2>
          <p className="who-big reveal">
            Founded in June 2026, SIARA Properties was established with a vision
            to transform the real estate experience through honesty,
            professionalism, and customer-first service.
          </p>
          <p className="who-p reveal">
            With over 4 years of experience in the real estate industry and 10
            years of expertise in marketing and customer engagement, our team
            understands both the market dynamics and the expectations of modern
            buyers and sellers.
          </p>
          <strong className="who-p reveal">Our mission is simple:</strong>
          <p className="who-p reveal">
            To deliver value for money through genuine properties while
            fostering long-term relationships built on trust and transparency.
          </p>
        </div>
        <div className="who-img reveal" ref={whoImgRef}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop"
            alt="Property"
            loading="lazy"
          />
          <div className="img-badge">
            <div className="badge-n" ref={(el) => (statsRef.current[4] = el)}>
              500+
            </div>
            <div className="badge-l">Satisfied Clients</div>
          </div>
        </div>
      </section>
      <div className="divider" />
      {/* STATS */}
      <div className="stats">
        <div className="stats-g">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-n" ref={(el) => (statsRef.current[i] = el)}>
                {s.n}+
              </div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* VISION + MISSION */}
      <div className="vm">
        <div className="vm-card">
          <div className="vm-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </div>
          {/* <p className="sec-label">Hamara Lakshya</p> */}
          <h3 className="vm-title">
            Our <em>Vision</em>
          </h3>
          <p className="vm-text">
            To become the most trusted real estate partner in the Mahakaushal
            region by setting new standards of honesty, reliability, and
            customer satisfaction.
          </p>
        </div>
        <div className="vm-card alt">
          <div className="vm-icon alt">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          {/* <p className="sec-label">Humara Waada</p> */}
          <h3 className="vm-title">
            Our <em>Mission</em>
          </h3>
          <p className="vm-text">
            To help individuals and families make informed property decisions by
            offering genuine opportunities, ethical guidance, and value-driven
            real estate solutions.
          </p>
        </div>
      </div>
      {/* VALUES */}
      <section className="values">
        <div className="values-h">
          <p className="sec-label reveal">Why Choose</p>
          <h2 className="sec-title clip-r">SIARA Properties</h2>
        </div>
        <div className="values-g">
          {values.map((v, i) => (
            <div
              className="val-card"
              key={i}
              ref={(el) => (valRefs.current[i] = el)}
            >
              <div className="val-n">{v.n}</div>
              <div className="val-t">{v.t}</div>
              <p className="val-txt">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="divider" />
      {/* TEAM */}
      <section className="team">
        <div className="team-h">
          <div>
            <p className="sec-label reveal">
              Our <em>Team</em>
            </p>
            <h2 className="sec-title clip-r">
              People who handle every <em>property journey with care</em>
            </h2>

            <p className="team-intro reveal">
              Our team consists of enthusiastic, dedicated, and honest
              professionals who believe that every property transaction should
              be handled with integrity and responsibility. At SIARA Properties,
              we focus on understanding our clients' needs and delivering
              solutions with sincerity, professionalism, and attention to
              detail.
            </p>
          </div>
          <a href="#" className="link-arrow reveal">
            More About
          </a>
        </div>
        <div className="team-g">
          {team.map((m, i) => (
            <div
              className="team-card"
              key={i}
              ref={(el) => (teamRefs.current[i] = el)}
            >
              <div className="team-img">
                <img src={m.img} alt={m.name} loading="lazy" />
              </div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-h">
          <p className="sec-label reveal">Testimonials</p>
          <h2 className="sec-title clip-r">
            What Our <em>Clients Say</em>
          </h2>
        </div>
        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((item, i) => (
              <div className="review-card" key={`${item.name}-${i}`}>
                <p className="review-quote">{item.text}</p>
                <div className="review-meta">
                  <div className="review-name">{item.name}</div>
                  <div className="review-place">{item.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CAREERS */}
      <section className="careers">
        <div>
          <p className="sec-label reveal">Join Us</p>
          <h2 className="sec-title reveal" style={{ margin: "12px 0 20px" }}>
            Creating joy is
            <br />
            our <em>mantra</em>
          </h2>
          <p className="reveal">
            Do you want to build a meaningful career in real estate? We are
            looking for passionate, driven professionals who want to help people
            in Jabalpur make better property decisions.
          </p>
          <a
            href="mailto:careers@SiaraProperties.com"
            className="email-link reveal"
          >
            careers@SiaraProperties.com
          </a>
        </div>
        <div className="careers-img reveal">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
            alt="Team"
            loading="lazy"
          />
        </div>
      </section>
      {/* CONTACT */}
      <section className="contact">
        <div className="contact-g">
          <div className="contact-map reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.9!2d79.9864!3d23.1815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981af62ff9b99b5%3A0x4f3e0bfb5f3c9d8a!2sWright%20Town%2C%20Jabalpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
          <div>
            <p className="c-label">come to us</p>
            <h2 className="c-title reveal">
              Find Us <em>Here</em>
            </h2>
            {[
              {
                icon: <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />,
                label: "Address",
                val: [
                  "1815 Wright Town, Jabalpur",
                  "Madhya Pradesh INDIA 482002",
                ],
              },
              {
                icon: (
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                ),
                label: "Phone",
                val: ["+91 9243066371", "+91 7000102121"],
              },
              {
                icon: (
                  <>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </>
                ),
                label: "Email",
                val: [
                  "info@siaraproperties.com",
                  "support@siaraproperties.com",
                ],
              },
            ].map((d, i) => (
              <div className="c-detail reveal" key={i}>
                <div className="c-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {d.icon}
                  </svg>
                </div>
                <div>
                  <strong className="c-strong">{d.label}</strong>
                  {d.val.map((line, idx) => {
                    if (d.label === "Phone") {
                      return (
                        <a
                          href={`tel:${line.replace(/ /g, "")}`}
                          className="c-muted c-link"
                          key={idx}
                        >
                          {line}
                        </a>
                      );
                    }
                    if (d.label === "Email") {
                      return (
                        <a
                          href={`mailto:${line}`}
                          className="c-muted c-link"
                          key={idx}
                        >
                          {line}
                        </a>
                      );
                    }
                    return (
                      <span className="c-muted" key={idx}>
                        {line}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FOOTER */}
      {/* <footer>
        <div className="footer-g">
          <div>
            <div className="f-logo">SiaraProperties</div>
            <p className="f-desc">Jabalpur ki sabse trusted real estate platform. Ghar kharidna, bechna, ya kiraye par lena — sab kuch ek jagah.</p>
            <div className="f-socials">
              {["f","in","yt","wa"].map(s => <a key={s} href="#" className="soc">{s}</a>)}
            </div>
          </div>
          {[
            { h: "Residential", links: ["Houses in Jabalpur","Villas in Jabalpur","Plots in Jabalpur","Flats in Jabalpur","Farm House","Farm Land","Commercial"] },
            { h: "BHK Searches", links: ["1 BHK Flats","2 BHK Flats","3 BHK Flats","4 BHK Flats","1 BHK House","2 BHK House","3 BHK House"] },
            { h: "For Rent",     links: ["Houses for Rent","Villas for Rent","Plots for Rent","Flats for Rent","Land for Rent","Farm Lands","Commercial Rent"] },
            { h: "Resale",       links: ["House Resale","Villa Resale","Plot Resale","Flat Resale","Land Resale","Farm Lands","Farm Houses"] },
          ].map((col, i) => (
            <div className="f-col" key={i}>
              <h4>{col.h}</h4>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="f-bot">
          <p>© 2024 SiaraProperties.com · All Rights Reserved</p>
          <div className="f-links">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer> */}
    </>
  );
}
