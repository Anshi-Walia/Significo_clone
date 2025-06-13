function homeAnimation(){
   gsap.set(".marqueetext",{scale:5})

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home", // Add a trigger element
    start:"top top",
    end:"bottom top",
    scrub:1
  }
})

tl.to(".vdosec", {
  "--clip": "0%",
  ease: "power2", // Correct format for ease
},"a")
.to(".marqueetext",{
  scale:1,
  ease: Power2
},"a")
.to(".lft",{
  xPercent:-10,
  stagger:0.3,
  ease: Power4
},"a")
.to(".rgt",{
  xPercent:30,
  stagger:0.3,
  ease: Power4
},"a")
}
function realSecAnimation(){
    gsap.to(".slide",{
    scrollTrigger: {
    trigger: ".real", // Add a trigger element
    start:"top top",
    end:"bottom bottom",
    scrub:1,
  },
  xPercent:-300,
  ease:Power4
})
}
function realBtnAnimation(){
  const ctnr = document.querySelector(".ctnr");
  const realBtn = document.querySelector(".real_btn");

  ScrollTrigger.create({
    trigger: ctnr,
    start: "top top",
    end: "bottom top",
    pin: realBtn,
    pinSpacing: true, // ✅ spacing allow karo
    scrub: true,
  });
}

function teamAnimation(){
    document.querySelectorAll(".listitem").forEach(function(el) {
    el.addEventListener("mousemove", function(dets) {
        // Calculate the mapped x position
        let mappedX = gsap.utils.mapRange(0, window.innerWidth, -200, 200, dets.clientX);
        console.log(mappedX); // For debugging

        gsap.to(this.querySelector(".picture"), {
            opacity: 1,
            ease: Power4.easeOut,
            duration: 0.5,
            x: mappedX
        });
    });

    el.addEventListener("mouseleave", function(dets) {
        gsap.to(this.querySelector(".picture"), {
            opacity: 0,
            ease: Power4.easeOut,
            duration: 0.5
        });
    });
});


}
function gridAnimation(){
    let paras = document.querySelectorAll(".textPara");

paras.forEach((para) => {
  let finalHTML = "";

  // Split into words
  para.textContent.split(" ").forEach((word) => {
    let wrappedWord = "";

    // Wrap each letter in span
    word.split("").forEach((char) => {
      wrappedWord += `<span class="inline-block">${char}</span>`;
    });

    // Add space after word
    finalHTML += `<span class="inline-block mr-1">${wrappedWord}</span>`;
  });

  para.innerHTML = finalHTML;
});

// Animate
gsap.set(".textPara span", { opacity:.5});

gsap.to(".textPara span", {
  scrollTrigger: {
    trigger: ".grid",
    start: "top 40%",
    end: "bottom 50%",
    scrub: 0.1
  },
  opacity: 1,
  stagger: 0.03,
  ease: "power4.out",
});


}
function loco(){
    (function () {
        const locomotiveScroll = new LocomotiveScroll();
    })();
}
function bodyColorChange() {
  document.querySelectorAll(".sec").forEach(function(e) {
    ScrollTrigger.create({
      trigger: e,
      start: "top 20%",
      end: "bottom 50%",
      onEnter: function() {
        document.body.setAttribute("theme", e.dataset.color);
      },
      onEnterBack: function() {
        document.body.setAttribute("theme", e.dataset.color);
      }
    });
  });
}
function letterAnimation(){
  // Select sabhi nav links + contact button (jo ki div.flex direct child 'a' hai)
const links = document.querySelectorAll('ul li a.group, div.flex > a');

// 1. Remove duplicate spans jo tumhare original HTML me side me hain (agar hain toh)
links.forEach(link => {
  const children = Array.from(link.children);
  children.forEach((child, idx) => {
    if (idx > 0) {  // first child chhod do, baaki hatao
      child.remove();
    }
  });
});

// 2. Letters ko wrap karo original visible span me
links.forEach(link => {
  const mainSpan = link.querySelector('span');
  if (!mainSpan) return;

  const text = mainSpan.textContent.trim();
  const wrapped = text.split('').map(letter => `<span class="letter inline-block relative">${letter}</span>`).join('');
  mainSpan.innerHTML = wrapped;
});

// 3. Har link ke andar ek duplicate span create karo jo letters ko hold karega (niche se aane wale letters ke liye)
links.forEach(link => {
  const mainSpan = link.querySelector('span');
  if (!mainSpan) return;

  // Duplicate letters wrapped in a span with class 'letters-duplicate'
  const text = mainSpan.textContent.trim();
  const duplicateSpan = document.createElement('span');
  duplicateSpan.classList.add('letters-duplicate');
  duplicateSpan.style.position = 'absolute';
  duplicateSpan.style.top = '0';
  duplicateSpan.style.left = '0';
  duplicateSpan.style.width = '100%';
  duplicateSpan.style.height = '100%';
  duplicateSpan.style.overflow = 'hidden';
  duplicateSpan.style.pointerEvents = 'none';

  // Wrap letters again
  duplicateSpan.innerHTML = text.split('').map(letter => `<span class="letter inline-block relative">${letter}</span>`).join('');
  
  // Position main span relative parent (already relative should be)
  mainSpan.style.position = 'relative';
  mainSpan.style.display = 'inline-block';

  // Append duplicateSpan inside link
  link.style.position = 'relative';
  link.appendChild(duplicateSpan);
});

// 4. GSAP animation on hover
links.forEach(link => {
  const originalLetters = link.querySelectorAll('span:not(.letters-duplicate) .letter');
  const duplicateLetters = link.querySelectorAll('.letters-duplicate .letter');

  // Duplicate letters ko initial position 30px niche aur opacity 0 pe set karo
  gsap.set(duplicateLetters, { y: 30, opacity: 0 });

  link.addEventListener('mouseenter', () => {
    const tl = gsap.timeline();

    // Original letters upar jaayein fade out ke sath
    tl.to(originalLetters, {
      y: -30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    // Duplicate letters niche se upar aayein fade in ke sath, original letters ke sath simultaneously start karen
    tl.to(duplicateLetters, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  });

  link.addEventListener('mouseleave', () => {
    const tl = gsap.timeline();

    // Original letters wapas apni jagah aayein
    tl.to(originalLetters, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    // Duplicate letters fade out and niche chale jaayein
    tl.to(duplicateLetters, {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  });
});

}
function homeBtmTextAnimation(){
  let btmtext = document.querySelectorAll(".btmtext");

  btmtext.forEach((para) => {
    let finalHTML = "";

    // Split by <br> to maintain line breaks
    const lines = para.innerHTML.split("<br>");

    lines.forEach((line, lineIndex) => {
      // Word wrapping within each line
      line.trim().split(" ").forEach((word) => {
        let wrappedWord = "";

        word.split("").forEach((char) => {
          wrappedWord += `<span class="inline-block">${char}</span>`;
        });

        finalHTML += `<span class="word inline-block mr-1">${wrappedWord}</span> `;
      });

      // Maintain <br> after each line except last
      if (lineIndex < lines.length - 1) {
        finalHTML += "<br>";
      }
    });

    para.innerHTML = finalHTML;
  });

  // Animate
  gsap.set(".btmtext .word", { opacity: 0, y: 20 });

  gsap.to(".btmtext .word", {
    opacity: 1,
    y: 0,
    stagger: 0.07, // faster stagger
    duration: 0.4,  // quicker duration
    ease: "power2.out"
  });
}
function scrollAnimation(){
  const scrollBtn = document.querySelector('.scroll-down');
  const scrollContainer = document.getElementById('scrollContainer');
  const arrow1 = document.getElementById('arrow1');
  const arrow2 = document.getElementById('arrow2');

  // Color change at 50% of second container
  ScrollTrigger.create({
    trigger: ".craft", // replace with your actual 2nd container class
    start: "top 20%",     // when second section hits 50% viewport
    end: "bottom 70%",    // till it's out
    onEnter: () => updateColor("black"),
    onLeaveBack: () => updateColor("white"),
    onLeave: () => scrollBtn.style.display = 'none',
    onEnterBack: () => {
      scrollBtn.style.display = 'flex';
      updateColor("black");
    }
  });

  function updateColor(color) {
    const add = color === "black" ? "border-black" : "border-white";
    const remove = color === "black" ? "border-white" : "border-black";

    scrollContainer.classList.remove(remove);
    scrollContainer.classList.add(add);
    arrow1.classList.remove(remove);
    arrow1.classList.add(add);
    arrow2.classList.remove(remove);
    arrow2.classList.add(add);
  }

  // Click scroll to bottom
  scrollContainer.addEventListener("click", function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  });
}
function btnAnimation(){
 const before = document.querySelector('.before_hover');
  const after = document.querySelector('.after_hover');
  const wrapper = before.parentElement;

  wrapper.addEventListener('mouseenter', () => {
    // Animate old text out
    gsap.to(before, {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // Animate new text in
    gsap.to(after, {
      y: "-100%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    // Animate new text out
    gsap.to(after, {
      y: "0%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // Animate old text in
    gsap.to(before, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut"
    });
  });
}
function cardAnimation() {
            const cards = gsap.utils.toArray(".card");
            const cardsWrapper = document.querySelector(".cards");

            // Calculate total height needed for sticky behavior
            const cardHeight = cards[0].offsetHeight;
            const gap = 10; // Matches gap-2.5 in Tailwind (10px)
            const totalCardsHeight = cards.length * (cardHeight + gap) - gap;

            // Set wrapper height to ensure sticky behavior covers all cards
            gsap.set(cardsWrapper, {
                height: totalCardsHeight
            });

            cards.forEach((card, index) => {
                const isLastCard = index === cards.length - 1;

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 50,
                        width: "65%",
                        backgroundColor: "transparent",
                        color: "#ffffff",
                        borderColor: "#ffffff"
                    },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%", // Card top hits 80% of viewport
                            end: "top 20%", // Card top hits 20% of viewport
                            scrub: 1,
                            toggleActions: "play reverse play reverse",
                            markers: false,
                            // Keep container sticky until last card is fully revealed
                            pin: isLastCard ? cardsWrapper : false,
                            pinSpacing: isLastCard
                        },
                        opacity: 1,
                        y: 0,
                        width: "85%",
                        backgroundColor: "#000000",
                        color: "#AEDEE0",
                        borderColor: "#AEDEE0",
                        ease: "power4.inOut",
                        duration: 0.5,
                        delay: index * 0.2 // Stagger each card's animation
                    }
                );

                // Ensure next card's bottom half is visible by adjusting opacity
                if (index < cards.length - 1) {
                    gsap.set(cards[index + 1], {
                        opacity: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 1,
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            });
        }
//  document.addEventListener("DOMContentLoaded", cardAnimation);

function feviconAnimation(){
      const sections = [
    { class: '.home', color: '#000000' },
    { class: '.craft', color: '#AEDEE0' },
    { class: '.real', color: '#EF9D71' },
    { class: '.grid', color: '#ffffff' },
    { class: '.team', color: '#ffffff' },
    { class: '.capsules', color: '#ffffff' },
    // { class: '.discover', color: '#f5f19c' }
  ];

  function createFavicon(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  function updateFavicon(color) {
    const link = document.getElementById('dynamic-favicon');
    link.href = createFavicon(color);
  }

  function getVisibleSection() {
    for (const section of sections) {
      const el = document.querySelector(section.class);
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        return section.color;
      }
    }
    return null;
  }

  window.addEventListener('scroll', () => {
    const color = getVisibleSection();
    if (color) updateFavicon(color);
  });

  // Initial check
  window.addEventListener('DOMContentLoaded', () => {
    const color = getVisibleSection();
    if (color) updateFavicon(color);
  });
}
function circlularAnimation(){
  // Rotate only the image
  gsap.to(".rotating-circle", {
    rotate: 360,
    duration: 10,
    ease: "linear",
    repeat: -1
  });
}

// ✅ Define scrollToTop globally
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
homeAnimation()
realSecAnimation() 
realBtnAnimation()
teamAnimation()
gridAnimation()
loco()
bodyColorChange()
letterAnimation()
homeBtmTextAnimation() 
scrollAnimation()
btnAnimation()
cardAnimation()
feviconAnimation()
circlularAnimation()
