/* ============================================
   ORASAL - Main JavaScript
   Premium Business Services
   ─────────────────────────────────────────
   Device Support:
     ✓ Android (Chrome, Samsung Browser)
     ✓ iOS (Safari, Chrome)
     ✓ Tablet (iPad, Android tablets)
     ✓ Desktop (all modern browsers)
   ─────────────────────────────────────────
   Sections:
     1. Theme Toggle
     2. Custom Cursor (desktop only)
     3. Navbar Scroll Effect
     4. Hamburger Mobile Menu
     5. Smooth Scroll
     6. Mouse Light Effect (desktop only)
     7. Particle Canvas
     8. Scroll Reveal Animations
     9. Animated Counters
    10. Service Cards Interaction
    11. Work Cards Interaction
    12. Testimonials Carousel
    13. Select Floating Label
    14. Contact Form Submit
    15. Why Orasal Section Counters
============================================ */
(function(){
"use strict";

/* ============================================
   THEME TOGGLE
============================================ */
function getTheme(){return localStorage.getItem("orasal-theme")||"dark"}
function setTheme(t){
  document.documentElement.setAttribute("data-theme",t);
  localStorage.setItem("orasal-theme",t);
  var lbl=document.getElementById("thLbl");
  var lblM=document.getElementById("thLblMob");
  if(lbl)lbl.textContent=t==="dark"?"Dark":"Light";
  if(lblM)lblM.textContent=t==="dark"?"Dark Mode":"Light Mode";
}
setTheme(getTheme());
function toggleTheme(){setTheme(getTheme()==="dark"?"light":"dark")}
var tt=document.getElementById("thToggle"),ttm=document.getElementById("thToggleMob");
if(tt)tt.addEventListener("click",toggleTheme);
if(ttm)ttm.addEventListener("click",toggleTheme);

/* ============================================
   CURSOR
============================================ */
if(window.matchMedia("(pointer:fine)").matches){
  var cd=document.getElementById("cD"),cr=document.getElementById("cR");
  var mx=-99,my=-99,rx=-99,ry=-99;
  document.addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;cd.style.left=mx+"px";cd.style.top=my+"px";});
  (function l(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;cr.style.left=rx+"px";cr.style.top=ry+"px";requestAnimationFrame(l);})();
  document.querySelectorAll("a,button,[tabindex='0']").forEach(function(el){
    el.addEventListener("mouseenter",function(){cr.style.width="54px";cr.style.height="54px";cr.style.borderColor="rgba(59,130,246,.8)";});
    el.addEventListener("mouseleave",function(){cr.style.width="36px";cr.style.height="36px";cr.style.borderColor="rgba(59,130,246,.5)";});
  });
}

/* ============================================
   NAVBAR SCROLL
============================================ */
var nb=document.getElementById("nb");
window.addEventListener("scroll",function(){nb.classList.toggle("sc",window.scrollY>40);},{passive:true});

/* ============================================
   HAMBURGER MENU
   Mobile navigation toggle.
   Features:
     • Locks body scroll when open (iOS fix)
     • Closes on link click
     • Closes on Escape key (keyboard nav)
     • Closes on outside tap (touch support)
     • aria-expanded for screen readers
============================================ */
var hb = document.getElementById("hbtn"),
    mm = document.getElementById("mmenu"),
    mopen = false;

/* Open / close the mobile menu */
function toggleM(o) {
  mopen = o;
  hb.classList.toggle("op", o);
  hb.setAttribute("aria-expanded", o ? "true" : "false");
  if (o) {
    mm.classList.add("op");
    /* Lock body scroll — prevents iOS rubber-band scroll behind menu */
    document.body.style.overflow = "hidden";
  } else {
    mm.classList.remove("op");
    document.body.style.overflow = "";
  }
}

/* Toggle on hamburger click */
hb.addEventListener("click", function() { toggleM(!mopen); });

/* Close on any menu link click */
document.querySelectorAll("#mmenu a").forEach(function(a) {
  a.addEventListener("click", function() { toggleM(false); });
});

/* Close on Escape key — accessibility */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && mopen) toggleM(false);
});

/* Close on outside tap — mobile usability */
document.addEventListener("click", function(e) {
  if (mopen && !mm.contains(e.target) && !hb.contains(e.target)) {
    toggleM(false);
  }
});

/* ============================================
   SMOOTH SCROLL
============================================ */
document.addEventListener("click",function(e){
  var el=e.target.closest("a[href^='#']");if(!el)return;
  var id=el.getAttribute("href");if(id==="#")return;
  var t=document.querySelector(id);if(!t)return;
  e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-76,behavior:"smooth"});
});

/* ============================================
   MOUSE LIGHT IN HERO
============================================ */
if(window.matchMedia("(pointer:fine)").matches){
  var hr=document.querySelector(".hero"),ml=document.getElementById("mlt");
  if(hr&&ml){hr.addEventListener("mousemove",function(e){
    var r=hr.getBoundingClientRect();
    var ox=((e.clientX-r.left)/r.width-.5)*100;
    var oy=((e.clientY-r.top)/r.height-.5)*100;
    ml.style.transform="translate(calc(-50% + "+ox+"px), calc(-50% + "+oy+"px))";
  });}
}

/* ============================================
   PARTICLE CANVAS
   Performance tiered by screen width:
     • Desktop (>900px)  → 120 particles
     • Tablet (600-900px) →  60 particles
     • Mobile (<600px)   →  30 particles
   Uses passive resize listener for mobile perf
============================================ */
var can = document.getElementById("hcan");
if (can) {
  var cx = can.getContext("2d"),
      ps = [],
      cs = ["rgba(59,130,246,", "rgba(59,130,246,", "rgba(240,208,96,"];

  /* Resize canvas to fill container */
  function rsz() {
    can.width  = can.offsetWidth;
    can.height = can.offsetHeight;
  }
  rsz();
  window.addEventListener("resize", rsz, { passive: true });

  /* Particle count — lower on mobile saves battery & CPU */
  var w = window.innerWidth;
  var n = w < 600 ? 30 : w < 900 ? 60 : 120;

  for (var i = 0; i < n; i++) {
    ps.push({
      x:  Math.random() * can.width,
      y:  Math.random() * can.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r:  Math.random() * 1.5 + .3,
      a:  Math.random() * .5 + .1,
      c:  cs[Math.floor(Math.random() * cs.length)]
    });
  }

  /* Animation loop */
  (function dp() {
    cx.clearRect(0, 0, can.width, can.height);
    ps.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0)         p.x = can.width;
      else if (p.x > can.width)  p.x = 0;
      if (p.y < 0)         p.y = can.height;
      else if (p.y > can.height) p.y = 0;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = p.c + p.a + ")";
      cx.fill();
    });
    requestAnimationFrame(dp);
  })();
}

/* ============================================
   SCROLL REVEAL
============================================ */
var fus=document.querySelectorAll(".fu");
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target);}});},{threshold:.07});
fus.forEach(function(el){io.observe(el);});
setTimeout(function(){document.querySelectorAll(".hero .fu").forEach(function(el,i){setTimeout(function(){el.classList.add("vis");},250+i*130);});},100);

/* ============================================
   ANIMATED COUNTERS
============================================ */
var ctrs=document.querySelectorAll("[data-count]");
var io2=new IntersectionObserver(function(en){en.forEach(function(e){
  if(!e.isIntersecting)return;
  var el=e.target,end=parseInt(el.getAttribute("data-count")),suf=el.getAttribute("data-suffix")||"",st=null;
  function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/2400,1),ea=1-Math.pow(1-p,3);el.textContent=Math.floor(ea*end)+suf;if(p<1)requestAnimationFrame(step);}
  requestAnimationFrame(step);io2.unobserve(el);
});},{threshold:.5});
ctrs.forEach(function(el){io2.observe(el);});

/* ============================================
   SERVICE CARDS INTERACTION
============================================ */
document.querySelectorAll(".scard").forEach(function(c){
  var g=c.getAttribute("data-glow")||"rgba(59,130,246,.22)";
  c.addEventListener("mouseenter",function(){c.style.boxShadow="0 20px 60px "+g+", 0 0 0 1px "+g;});
  c.addEventListener("mouseleave",function(){if(!c.classList.contains("tc"))c.style.boxShadow="";});
  c.addEventListener("touchstart",function(){c.classList.add("tc");c.style.boxShadow="0 20px 60px "+g;},{passive:true});
  c.addEventListener("touchend",function(){setTimeout(function(){c.classList.remove("tc");c.style.boxShadow="";},600);},{passive:true});
  c.addEventListener("keypress",function(e){if(e.key==="Enter")c.classList.toggle("tc");});
});

/* ============================================
   WORK CARDS INTERACTION
============================================ */
document.querySelectorAll(".wkcard").forEach(function(c){
  var bc=c.getAttribute("data-bc"),bs=c.getAttribute("data-bs");
  c.addEventListener("mouseenter",function(){c.style.borderColor=bc;c.style.boxShadow="0 20px 60px "+bs;});
  c.addEventListener("mouseleave",function(){if(!c.classList.contains("tc")){c.style.borderColor="";c.style.boxShadow="";}});
  c.addEventListener("touchstart",function(){c.classList.add("tc");c.style.borderColor=bc;c.style.boxShadow="0 20px 60px "+bs;},{passive:true});
  c.addEventListener("touchend",function(){setTimeout(function(){c.classList.remove("tc");c.style.borderColor="";c.style.boxShadow="";},700);},{passive:true});
});

/* ============================================
   TESTIMONIALS CAROUSEL
============================================ */
var tdata=[
  {t:'"Orasal built us an incredible website and ran our Meta ad campaigns. In just 2 months, our monthly revenue jumped from ₹2L to ₹18L. The best business decision we have ever made — bar none."',n:"Rahul Khanna",ti:"Owner, FashionHub India",av:"RK"},
  {t:'"Website delivered in just 6 days! It works flawlessly on mobile and is already ranking on Google. The Orasal team is incredibly professional and genuinely cares about your success."',n:"Priya Sharma",ti:"Director, NextGen Academy",av:"PS"},
  {t:'"Orasal transformed our real estate business with a stunning website and hyper-targeted ads. We received 180 qualified leads in 2 months and closed ₹3.5Cr in sales. Truly exceptional."',n:"Amit Verma",ti:"Co-Founder, GreenVilla Homes",av:"AV"},
  {t:'"They built our online ordering website and now manage our social media too. Our orders tripled in 3 months. Having everything handled by one dedicated team is incredibly convenient."',n:"Meera Nair",ti:"Owner, SpiceCraft Kitchen",av:"MN"},
  {t:'"From branding to website to performance marketing — Orasal handled everything. Our brand looks incredibly professional and our Google ad ROI increased 5x. Absolutely outstanding team."',n:"Sanjay Patel",ti:"CEO, TechGrow Solutions",av:"SP"}
];
var cur=0,atm;
var tCt=document.getElementById("tCt"),tTx=document.getElementById("tTx"),tAv=document.getElementById("tAv"),tNm=document.getElementById("tNm"),tTi=document.getElementById("tTi"),tDts=document.getElementById("tDts");
function rdots(){
  tDts.innerHTML="";
  tdata.forEach(function(_,i){
    var b=document.createElement("button");b.className="tdot"+(i===cur?" on":"");
    b.setAttribute("aria-label","Review "+(i+1));
    b.addEventListener("click",function(){go(i);});
    tDts.appendChild(b);
  });
}
function upd(idx){
  tCt.style.opacity="0";tCt.style.transform="translateY(10px)";
  setTimeout(function(){
    var d=tdata[idx];tTx.textContent=d.t;tAv.textContent=d.av;tNm.textContent=d.n;tTi.textContent=d.ti;
    tCt.style.transition="opacity .4s,transform .4s";tCt.style.opacity="1";tCt.style.transform="translateY(0)";
    rdots();
  },260);
}
function go(idx){
  cur=(idx+tdata.length)%tdata.length;upd(cur);
  clearInterval(atm);atm=setInterval(function(){go(cur+1);},5500);
}
document.getElementById("tPv").addEventListener("click",function(){go(cur-1);});
document.getElementById("tNx").addEventListener("click",function(){go(cur+1);});
rdots();atm=setInterval(function(){go(cur+1);},5500);
var tc=document.getElementById("tC"),swX=0;
tc.addEventListener("touchstart",function(e){swX=e.touches[0].clientX;},{passive:true});
tc.addEventListener("touchend",function(e){var dx=e.changedTouches[0].clientX-swX;if(Math.abs(dx)>50)go(dx<0?cur+1:cur-1);},{passive:true});

/* ============================================
   SELECT FLOATING LABEL
============================================ */
var fsel=document.getElementById("fsel"),sLbl=document.getElementById("sLbl");
if(fsel&&sLbl){
  function updS(){
    if(fsel.value){sLbl.style.top="8px";sLbl.style.transform="none";sLbl.style.fontSize=".68rem";sLbl.style.color="#d4af37";fsel.classList.add("chosen");}
    else{sLbl.style.top="50%";sLbl.style.transform="translateY(-50%)";sLbl.style.fontSize=".875rem";sLbl.style.color="";fsel.classList.remove("chosen");}
  }
  fsel.addEventListener("change",updS);
  fsel.addEventListener("focus",function(){sLbl.style.top="8px";sLbl.style.transform="none";sLbl.style.fontSize=".68rem";sLbl.style.color="#d4af37";});
  fsel.addEventListener("blur",function(){if(!fsel.value)updS();});
}

/* ============================================
   CONTACT FORM — VALIDATION ENGINE
   ─────────────────────────────────────────
   Features:
     • Required-field checks (name, email,
       service, message)
     • Email format validation (RFC-style regex)
     • Message minimum length check (10 chars)
     • Real-time validation on blur + input
     • Inline error messages (animated slide-in)
     • Green ✓ border on valid fields
     • Submit button disabled while invalid
     • Sending state with spinner text
     • Success screen on valid submission
   ─────────────────────────────────────────
   All styling lives in style.css under
   "FORM VALIDATION STYLES" section
============================================ */
(function () {

  /* ── Element references ──────────────────── */
  var form     = document.getElementById('cForm');
  var succDiv  = document.getElementById('succDiv');
  if (!form) return;

  var fieldName    = document.getElementById('fn');
  var fieldEmail   = document.getElementById('fe');
  var fieldCompany = document.getElementById('fc');
  var fieldService = document.getElementById('fsel');
  var fieldMsg     = document.getElementById('fm');
  var submitBtn    = form.querySelector('button[type="submit"]');

  /* ── Original button label (restore on reset) */
  var originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

  /* ─────────────────────────────────────────
     VALIDATION RULES
     Each entry defines:
       el       — DOM input element
       required — must not be empty
       minLen   — minimum character length
       type     — 'email' triggers format check
       label    — friendly name for messages
  ───────────────────────────────────────── */
  var rules = [
    { el: fieldName,    required: true,  minLen: 2,  type: 'text',  label: 'Your Name'     },
    { el: fieldEmail,   required: true,  minLen: 0,  type: 'email', label: 'Email Address' },
    { el: fieldService, required: true,  minLen: 0,  type: 'select',label: 'Service'       },
    { el: fieldMsg,     required: true,  minLen: 10, type: 'text',  label: 'Message'       }
    /* Company field is optional — not in rules */
  ];

  /* ─────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────── */

  /* Email regex — standard RFC 5322 simplified */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  /* Show an error message below a field.
     Creates or reuses a <span class="fld-err-msg"> */
  function showError(el, msg) {
    var wrap = el.closest('.fld');
    if (!wrap) return;

    /* Add visual error state */
    el.classList.add('fld-error');
    el.classList.remove('fld-ok');
    wrap.classList.add('has-error');

    /* Find or create the error span */
    var span = wrap.querySelector('.fld-err-msg');
    if (!span) {
      span = document.createElement('span');
      span.className = 'fld-err-msg';
      /* Insert after the element (or after selarro for select) */
      var ref = wrap.querySelector('.selarro') || el;
      ref.insertAdjacentElement('afterend', span);
    }
    span.textContent = msg;
  }

  /* Clear the error state from a field */
  function clearError(el) {
    var wrap = el.closest('.fld');
    if (!wrap) return;

    el.classList.remove('fld-error');
    wrap.classList.remove('has-error');

    var span = wrap.querySelector('.fld-err-msg');
    if (span) span.remove();
  }

  /* Mark a field as valid (green border) */
  function markOk(el) {
    clearError(el);
    el.classList.add('fld-ok');
  }

  /* ─────────────────────────────────────────
     VALIDATE A SINGLE FIELD
     Returns true if the field passes all its rules
  ───────────────────────────────────────── */
  function validateField(rule) {
    var el  = rule.el;
    if (!el) return true;                     /* Element doesn't exist — skip */

    var val = el.value.trim();

    /* 1. Required check */
    if (rule.required && val === '') {
      showError(el, 'This field is required');
      return false;
    }

    /* 2. Email format check */
    if (rule.type === 'email' && val !== '' && !isValidEmail(val)) {
      showError(el, 'Please enter a valid email address');
      return false;
    }

    /* 3. Minimum length check */
    if (rule.minLen && val.length < rule.minLen) {
      showError(el, 'Please enter at least ' + rule.minLen + ' characters');
      return false;
    }

    /* All checks passed */
    markOk(el);
    return true;
  }

  /* ─────────────────────────────────────────
     VALIDATE ENTIRE FORM
     Returns true only if ALL rules pass
  ───────────────────────────────────────── */
  function validateAll() {
    var allValid = true;
    rules.forEach(function (rule) {
      /* Run each rule — do NOT short-circuit so all errors show at once */
      if (!validateField(rule)) allValid = false;
    });
    return allValid;
  }

  /* ─────────────────────────────────────────
     UPDATE SUBMIT BUTTON STATE
     Disabled when any required field is empty
     (lightweight pre-check, full validation on submit)
  ───────────────────────────────────────── */
  function updateSubmitBtn() {
    if (!submitBtn) return;
    var allFilled = rules.every(function (rule) {
      if (!rule.required || !rule.el) return true;
      return rule.el.value.trim() !== '';
    });
    submitBtn.disabled = !allFilled;
  }

  /* ─────────────────────────────────────────
     REAL-TIME VALIDATION — BLUR EVENT
     Full validation fires when user leaves a field
  ───────────────────────────────────────── */
  rules.forEach(function (rule) {
    if (!rule.el) return;

    /* Validate on blur (user leaves the field) */
    rule.el.addEventListener('blur', function () {
      validateField(rule);
      updateSubmitBtn();
    });

    /* Clear error while user is actively typing */
    rule.el.addEventListener('input', function () {
      var val = rule.el.value.trim();
      /* Clear the error as soon as field is non-empty */
      if (val !== '') {
        clearError(rule.el);
      }
      updateSubmitBtn();
    });

    /* Select elements fire 'change', not 'input' */
    if (rule.type === 'select') {
      rule.el.addEventListener('change', function () {
        validateField(rule);
        updateSubmitBtn();
      });
    }
  });

  /* ─────────────────────────────────────────
     INITIAL STATE — disable submit button
     until user starts filling the form
  ───────────────────────────────────────── */
  updateSubmitBtn();

  /* ─────────────────────────────────────────
     FORM SUBMIT HANDLER
     1. Prevent default always
     2. Run full validation
     3. If invalid — show all errors, focus first
     4. If valid   — show sending state, then success
  ───────────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();  /* Always block native submission */

    /* Run full validation */
    var valid = validateAll();

    if (!valid) {
      /* Focus the first field with an error */
      var firstErr = form.querySelector('.fld-error');
      if (firstErr) firstErr.focus();
      return;  /* Stop — do not proceed */
    }

    /* ── All valid — enter "sending" state ── */
    if (submitBtn) {
      submitBtn.textContent = 'Sending…';
      submitBtn.classList.add('sending');
      submitBtn.disabled = true;
    }

    /* Simulate API delay (replace with real fetch() if needed) */
    setTimeout(function () {
      /* Hide form, show success screen */
      form.classList.add('hd');
      if (succDiv) succDiv.classList.add('show');

      /* Reset for future use (if user navigates back) */
      setTimeout(function () {
        form.reset();
        rules.forEach(function (r) {
          if (r.el) { r.el.classList.remove('fld-ok', 'fld-error'); }
        });
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.classList.remove('sending');
          submitBtn.disabled = true;   /* Re-disable until filled again */
        }
      }, 600);
    }, 900);
  });

})(); /* end contact form IIFE */

/* ============================================
   WHY ORASAL COUNTERS
============================================ */
setTimeout(function(){
  document.querySelectorAll(".fu").forEach(function(el){
    var io3=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io3.unobserve(e.target);}});},{threshold:.07});
    io3.observe(el);
  });
},100);

})();


/* ============================================
   VISITOR COUNTER
============================================ */
(function(){
  var key = 'orasal_visits';
  var count = parseInt(localStorage.getItem(key) || '0') + 1;
  localStorage.setItem(key, count);
  var el = document.getElementById('visitorCount');
  if (el) {
    // Animate count up
    var start = Math.max(0, count - Math.floor(Math.random()*8+3));
    var current = start;
    var timer = setInterval(function(){
      current++;
      el.textContent = current.toLocaleString();
      if (current >= count) clearInterval(timer);
    }, 80);
  }
})();

/* ============================================
   AI CHAT WIDGET
   - Knowledge base with keyword detection
   - Dynamic responses for common questions
   - Falls back to API for unknown questions
============================================ */
(function(){

  /* ------------------------------------------
     KNOWLEDGE BASE
     Each entry has:
       keywords : array of words to match
       response : the reply to send
  ------------------------------------------ */
  var KB = [

    /* Contact / Phone / WhatsApp */
    {
      keywords: ['contact','phone','number','call','whatsapp','reach','touch','mobile','email','address','mail'],
      response: '📞 You can reach us anytime!\n\n• WhatsApp / Call: +91 9761852005\n• Link: https://wa.me/919761852005\n\nWe typically reply within a few minutes during business hours. 😊'
    },

    /* Location */
    {
      keywords: ['location','where','city','india','office','based','address','country'],
      response: '📍 Orasal is based in India and serves clients across the country and worldwide. We work fully online, so we can help your business no matter where you are!'
    },

    /* Services overview */
    {
      keywords: ['service','offer','provide','do','work','help','speciali','what do'],
      response: '🚀 Orasal offers a full range of digital growth services:\n\n1. 🌐 Website Development\n2. 📣 Performance Marketing\n3. 📱 Social Media Management\n4. 💰 Paid Ads (Google & Meta)\n5. 🔍 SEO Optimization\n6. 🎨 Branding & Creative\n7. 🤖 Funnel & Automation\n\nAsk about any of these for more details!'
    },

    /* Website development */
    {
      keywords: ['website','web','site','develop','build','design','landing','page','ecommerce','e-commerce'],
      response: '🌐 Our Website Development packages:\n\n• Basic — ₹4,999 (5 pages, mobile-friendly)\n• Pro — ₹12,999 (10 pages + SEO + blog)\n• Premium — ₹24,999 (full custom + e-commerce)\n\n⚡ We deliver every website in just 7 days!\n\nWant to get started? WhatsApp us: +91 9761852005'
    },

    /* Pricing / Cost */
    {
      keywords: ['price','cost','charge','fee','rate','budget','affordable','cheap','package','plan','how much','₹','rupee'],
      response: '💰 Our pricing is designed to fit every business:\n\n• Website Basic: ₹4,999\n• Website Pro: ₹12,999\n• Website Premium: ₹24,999\n• Marketing campaigns start from ₹5,000/month\n\nAll packages include free consultation. WhatsApp us for a custom quote: +91 9761852005'
    },

    /* SEO */
    {
      keywords: ['seo','search','google rank','organic','ranking','keyword','optimiz'],
      response: '🔍 Our SEO service helps you rank higher on Google organically:\n\n• On-page & Off-page SEO\n• Keyword research & targeting\n• Technical SEO audits\n• Monthly performance reports\n\nResults typically visible within 3–6 months. Want to know more? WhatsApp: +91 9761852005'
    },

    /* Social Media */
    {
      keywords: ['social','instagram','facebook','twitter','linkedin','content','post','reels','reel','youtube'],
      response: '📱 Our Social Media Management includes:\n\n• Content creation & posting\n• Reels & video production\n• Community management\n• Growth strategy\n• Monthly analytics reports\n\nWe manage all major platforms. Chat with us: +91 9761852005'
    },

    /* Paid Ads */
    {
      keywords: ['ads','ad','paid','meta','google ads','campaign','ppc','facebook ads','instagram ads','advertising'],
      response: '💰 Our Paid Ads service covers:\n\n• Google Search & Display Ads\n• Meta (Facebook & Instagram) Ads\n• Retargeting campaigns\n• A/B testing & optimization\n• Detailed ROI reporting\n\nOur clients average 5x ROI on ad spend! Get started: +91 9761852005'
    },

    /* Branding */
    {
      keywords: ['brand','logo','identity','design','creative','graphic','color','visual','style'],
      response: '🎨 Our Branding & Creative service includes:\n\n• Logo & brand identity design\n• Brand guidelines & style guide\n• Business card & stationery\n• Marketing materials\n• Social media graphics pack\n\nLet us build a brand that stands out! WhatsApp: +91 9761852005'
    },

    /* Automation / Funnel */
    {
      keywords: ['automation','funnel','crm','email','whatsapp automation','bot','flow','workflow','lead'],
      response: '🤖 Our Funnel & Automation service:\n\n• Sales funnel design & build\n• WhatsApp & email automation\n• CRM setup & integration\n• Lead nurturing sequences\n• Conversion rate optimization\n\nAutomate your sales 24/7! Talk to us: +91 9761852005'
    },

    /* Delivery / Timeline */
    {
      keywords: ['time','day','week','deliver','deadline','fast','quick','how long','timeline','when'],
      response: '⚡ We are known for fast delivery!\n\n• Websites: delivered in just 7 days\n• Ad campaigns: live within 48 hours\n• Branding packages: 5–7 business days\n• SEO setup: within 1 week\n\nWe never compromise on quality either. Questions? +91 9761852005'
    },

    /* Results / Proof */
    {
      keywords: ['result','proof','portfolio','client','case','success','review','testimonial','work','example'],
      response: '📈 Our results speak for themselves:\n\n• 120+ projects delivered\n• ₹5M+ in client revenue generated\n• 95% client retention rate\n• Clients see avg 5x ROI on ads\n\nCheck our case studies on the website or WhatsApp us for references: +91 9761852005'
    },

    /* About Orasal */
    {
      keywords: ['about','orasal','who','company','team','story','founded','overview'],
      response: '🏢 About Orasal:\n\nOrasal is a premium business services company helping ambitious Indian brands scale through intelligent digital strategies. We combine website development, marketing, branding, and automation under one roof.\n\n• 120+ happy clients\n• Pan-India & worldwide service\n• 7-day website delivery guarantee\n\nWant to work with us? +91 9761852005'
    },

    /* Greeting */
    {
      keywords: ['hi','hello','hey','helo','hii','namaste','good morning','good afternoon','good evening','howdy','greet'],
      response: '👋 Hello! Welcome to Orasal!\n\nI\'m your AI assistant. I can help you with:\n\n• Our services & pricing\n• How to get started\n• Contact information\n• Delivery timelines\n\nWhat would you like to know? 😊'
    },

    /* Thank you */
    {
      keywords: ['thank','thanks','thx','thnk','appreciate','great','awesome','perfect','nice'],
      response: '😊 You\'re welcome! We\'re always happy to help.\n\nIf you\'re ready to grow your business, just WhatsApp us: +91 9761852005\n\nWe look forward to working with you! 🚀'
    },

    /* Getting started */
    {
      keywords: ['start','begin','get started','consult','consultation','discuss','quote','enquir','inquir','interest'],
      response: '🚀 Getting started with Orasal is easy!\n\n1. WhatsApp us: +91 9761852005\n2. Tell us about your business & goals\n3. We\'ll send you a free proposal\n4. Work begins after confirmation!\n\nFree consultation — no obligation. Reach out now: https://wa.me/919761852005'
    }

  ];

  /* ------------------------------------------
     KEYWORD MATCHING FUNCTION
     Converts query to lowercase, checks if
     any KB entry keyword is found in it.
     Returns the matching response or null.
  ------------------------------------------ */
  function findLocalAnswer(query) {
    var q = query.toLowerCase().trim();

    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (q.indexOf(entry.keywords[j]) !== -1) {
          /* Found a keyword match — return this response */
          return entry.response;
        }
      }
    }

    /* No keyword matched */
    return null;
  }

  /* ------------------------------------------
     DOM ELEMENT REFERENCES
  ------------------------------------------ */
  var btn     = document.getElementById('ai-chat-btn');
  var win     = document.getElementById('ai-chat-window');
  var closeBtn = document.getElementById('ai-chat-close');
  var input   = document.getElementById('ai-chat-input');
  var sendBtn = document.getElementById('ai-chat-send');
  var msgs    = document.getElementById('ai-chat-messages');
  if (!btn || !win) return;

  /* ------------------------------------------
     OPEN / CLOSE CHAT WINDOW
  ------------------------------------------ */
  var isOpen = false;
  btn.addEventListener('click', function(){
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    if (isOpen && input) setTimeout(function(){ input.focus(); }, 300);
  });
  if (closeBtn) closeBtn.addEventListener('click', function(){
    isOpen = false;
    win.classList.remove('open');
  });

  /* ------------------------------------------
     ADD A MESSAGE BUBBLE TO THE CHAT
     role = 'bot' | 'user' | 'bot typing'
  ------------------------------------------ */
  function addMsg(text, role) {
    var d = document.createElement('div');
    d.className = 'ai-msg ' + role;
    /* Preserve newlines in bot messages */
    if (role === 'bot') {
      d.style.whiteSpace = 'pre-line';
    }
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  /* ------------------------------------------
     SEND MESSAGE — MAIN HANDLER
     Flow:
       1. Try local KB keyword match (instant)
       2. If no match, call Claude API
       3. If API fails, show friendly fallback
  ------------------------------------------ */
  async function sendMessage() {
    var q = input.value.trim();
    if (!q) return;

    input.value = '';
    sendBtn.disabled = true;
    addMsg(q, 'user');

    /* --- Step 1: Check local knowledge base first --- */
    var localAnswer = findLocalAnswer(q);

    if (localAnswer) {
      /* Simulate a short typing delay for realism */
      var typing = addMsg('Typing…', 'bot typing');
      setTimeout(function(){
        typing.remove();
        addMsg(localAnswer, 'bot');
        sendBtn.disabled = false;
      }, 600);
      return;
    }

    /* --- Step 2: No local match — call Claude API --- */
    var typing = addMsg('Typing…', 'bot typing');
    try {
      var res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: [
            'You are a helpful AI assistant for Orasal, a premium business services company in India.',
            'Services: Website Development (₹4,999–₹24,999, 7-day delivery), Performance Marketing,',
            'Social Media Management, Paid Ads (Google & Meta), SEO, Branding & Creative, Funnel Automation.',
            'Stats: 120+ clients, ₹5M+ revenue generated, 95% retention, 7-day delivery.',
            'Contact: WhatsApp +91 9761852005 | https://wa.me/919761852005',
            'Keep replies short (under 80 words), friendly, and end with the WhatsApp number if relevant.',
            'Do NOT use markdown bold (**text**). Use plain text and emojis instead.'
          ].join(' '),
          messages: [{ role: 'user', content: q }]
        })
      });
      var data = await res.json();
      var answer = (data.content && data.content[0] && data.content[0].text)
        ? data.content[0].text
        : null;
      typing.remove();

      if (answer) {
        addMsg(answer, 'bot');
      } else {
        /* API returned unexpected format */
        addMsg('I\'m not sure about that, but our team can help!\n\n📞 WhatsApp: +91 9761852005', 'bot');
      }

    } catch(e) {
      /* --- Step 3: Network / API error fallback --- */
      typing.remove();
      addMsg('I\'m having trouble connecting right now.\n\nPlease reach us directly:\n📞 WhatsApp: +91 9761852005\n🔗 https://wa.me/919761852005', 'bot');
    }

    sendBtn.disabled = false;
  }

  /* ------------------------------------------
     EVENT LISTENERS
  ------------------------------------------ */
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e){
    if (e.key === 'Enter') sendMessage();
  });

})();