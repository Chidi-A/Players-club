import './style.css'
import gsap from 'gsap';

// First GSAP Timeline for entrance animations
const tl = gsap.timeline();

// Nav animations
tl.from(".nav-line", {
  scaleX: 0,
  duration: 1,
  ease: "power3.out"
})
.from(".nav-left .mask a", {
  y: 100,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out"
}, "-=0.2")
.from(".nav-right .mask a", {
  y: 100,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out"
}, "<")

// Header animations
.from(".header-title .mask a", {
  y: 100,
  duration: 0.8,
  ease: "power3.out"
}, "-=0.2")
.from(".header-line", {
  scaleX: 0,
  duration: 1,
  ease: "power3.out"
}, "<")
.from(".header-controls .mask a", {
  y: 100,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out"
}, "<")
.from(".header-right .mask a", {
  y: 100,
  duration: 0.8,
  ease: "power3.out"
}, "-=0.2")

// Artist grid animations - only animate the images, not the info cards
.from(".artist-card img", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: {
    amount: 1.5,
    grid: "auto",
    from: "top",
  },
  ease: "power3.out"
}, "<");

// Separate hover functionality
document.querySelectorAll('.artist-card').forEach(card => {
  const info = card.querySelector('.artist-info');
  const texts = info.querySelectorAll('h3, p, .arrow');
  
  // Set initial states
  gsap.set(info, {
    display: 'none',
    position: 'fixed',
    scaleX: 0,
    transformOrigin: 'left center'
  });
  
  // Set initial state for texts
  gsap.set(texts, {
    y: 100
  });

  card.addEventListener('mousemove', (e) => {
    const rect = info.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Show the info card
    info.style.display = 'block';
    
    // Calculate position
    let left = e.clientX + 10;
    let top = e.clientY + 10;
    
    // Check edges
    if (left + rect.width > viewportWidth) {
      left = e.clientX - rect.width - 10;
      gsap.set(info, { transformOrigin: 'right center' });
    } else {
      gsap.set(info, { transformOrigin: 'left center' });
    }
    if (top + rect.height > viewportHeight) {
      top = e.clientY - rect.height - 10;
    }
    
    // Apply position
    info.style.left = `${left}px`;
    info.style.top = `${top}px`;

    // Create a timeline for the reveal
    const tl = gsap.timeline();
    
    // Animate the card reveal
    tl.to(info, {
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out"
    })
    // Animate the text elements
    .to(texts, {
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power3.out"
    }, "-=0.2");
  });

  card.addEventListener('mouseleave', () => {
    // Instant hide
    info.style.display = 'none';
    // Reset all animations
    gsap.set(info, { scaleX: 0 });
    gsap.set(texts, { y: 100 });
  });
});
