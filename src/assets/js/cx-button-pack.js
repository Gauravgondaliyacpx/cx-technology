let destroyCarousel = null;

export function initButtonPack({ container }) {
  initTabs();
  destroyCarousel = init3dSphereCarousel({ container });
}

export function cleanupButtonPack() {
  if (destroyCarousel) {
    destroyCarousel();
    destroyCarousel = null;
  }
}

function initTabs() {
  const elements = document.querySelectorAll("[data-tabs]");
  if (elements.length === 0) return;
  elements.forEach((element) => {
    const tabs = Array.from(element.querySelectorAll("[data-tabs-tab]"));
    const tabPanels = Array.from(element.querySelectorAll("[data-tabs-panel]"));
    const panels = [];
    let firstTab = null;
    let lastTab = null;
    let activeIndex = -1;

    const ACTIVE_CLASS = "is-active";
    const HIDDEN_CLASS = "is-hidden";
    const INVIEW_CLASS = "is-inview";

    if (tabs.length === 0) return;

    function initContainerTabs() {
      for (let i = 0; i < tabs.length; i += 1) {
        const $tab = tabs[i];

        $tab.tabIndex = -1;
        $tab.setAttribute("aria-selected", "false");

        let controls = $tab.getAttribute("aria-controls");
        let $tabpanel = null;

        if (controls) {
          $tabpanel = element.querySelector(`#${controls}`);
        }

        if (!$tabpanel) {
          $tabpanel = tabPanels[i] || null;

          if ($tabpanel) {
            if (!$tabpanel.id) {
              const randomId = `tabs-panel-${Math.random().toString(36).slice(2, 9)}`;
              $tabpanel.id = randomId;
            }

            $tab.setAttribute("aria-controls", $tabpanel.id);
          }
        }

        panels.push($tabpanel || null);
        if (!firstTab) {
          firstTab = $tab;
        }
        lastTab = $tab;
      }

      if (activeIndex === -1 && firstTab) {
        activeIndex = 0;
      }
    }

    function setSelectedTab($currentTab) {
      const DIR_CLASSES = ["is-entering-from-right", "is-entering-from-left", "is-leaving-to-right", "is-leaving-to-left"];
      const currentIndex = tabs.indexOf($currentTab);
      if (currentIndex === -1) return;
      
      const previousIndex = activeIndex;
      let direction = null;

      if (previousIndex !== -1 && previousIndex !== currentIndex) {
        direction = currentIndex > previousIndex ? "forward" : "backward";
      }

      for (let i = 0; i < tabs.length; i += 1) {
        const $tab = tabs[i];
        const $panel = panels[i];
        if (!$panel) continue;

        $panel.classList.remove(...DIR_CLASSES);

        if (i === currentIndex) {
          $tab.setAttribute("aria-selected", "true");
          $tab.classList.add(ACTIVE_CLASS);
          $tab.removeAttribute("tabindex");
          $panel.classList.remove("is-leaving-to-left", "is-leaving-to-right");
          $panel.classList.remove(HIDDEN_CLASS);
          $panel.hidden = false;
          $panel.tabIndex = 0;

          if (direction === "forward") {
            $panel.classList.add("is-entering-from-right");
          } else if (direction === "backward") {
            $panel.classList.add("is-entering-from-left");
          }

          requestAnimationFrame(() => {
            $panel.classList.add(ACTIVE_CLASS);
            requestAnimationFrame(() => {
              $panel.classList.add(INVIEW_CLASS);
            });
          });
        } else {
          $tab.setAttribute("aria-selected", "false");
          $tab.classList.remove(ACTIVE_CLASS);
          $tab.tabIndex = -1;

          if (i === previousIndex && direction) {
            const leaveClass = direction === "forward" ? "is-leaving-to-left" : "is-leaving-to-right";

            $panel.hidden = false;
            $panel.classList.remove(ACTIVE_CLASS, INVIEW_CLASS);
            $panel.classList.add(leaveClass);

            const onAnimEnd = (event) => {
              if (event.target !== $panel) return;

              if (!$panel.classList.contains(leaveClass)) {
                $panel.removeEventListener("animationend", onAnimEnd);
                return;
              }

              $panel.classList.add(HIDDEN_CLASS);
              $panel.hidden = true;
              $panel.tabIndex = -1;
              $panel.classList.remove(leaveClass);
              $panel.removeEventListener("animationend", onAnimEnd);
            };

            $panel.addEventListener("animationend", onAnimEnd);
          } else {
            $panel.classList.add(HIDDEN_CLASS);
            $panel.classList.remove(ACTIVE_CLASS, INVIEW_CLASS);
            $panel.hidden = true;
            $panel.tabIndex = -1;
          }
        }
      }

      activeIndex = currentIndex;
    }

    function moveFocusToTab($tab) {
      if ($tab) {
        $tab.focus();
      }
    }

    function moveFocusToPreviousTab($currentTab) {
      if ($currentTab === firstTab) {
        moveFocusToTab(lastTab);
      } else {
        const index = tabs.indexOf($currentTab);
        if (index > 0) {
          moveFocusToTab(tabs[index - 1]);
        }
      }
    }

    function moveFocusToNextTab($currentTab) {
      if ($currentTab === lastTab) {
        moveFocusToTab(firstTab);
      } else {
        const index = tabs.indexOf($currentTab);
        if (index > -1 && index < tabs.length - 1) {
          moveFocusToTab(tabs[index + 1]);
        }
      }
    }

    function onKeydown(event) {
      const $target = event.currentTarget;
      let flag = false;

      switch (event.key) {
        case "ArrowLeft":
          moveFocusToPreviousTab($target);
          flag = true;
          break;

        case "ArrowRight":
          moveFocusToNextTab($target);
          flag = true;
          break;

        case "Home":
          moveFocusToTab(firstTab);
          flag = true;
          break;

        case "End":
          moveFocusToTab(lastTab);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    function onClick(event) {
      setSelectedTab(event.currentTarget);
    }

    function bindEvents() {
      for (let i = 0; i < tabs.length; i += 1) {
        const $tab = tabs[i];
        $tab.addEventListener("keydown", onKeydown);
        $tab.addEventListener("click", onClick);
      }
    }

    initContainerTabs();
    if (firstTab) {
      setSelectedTab(firstTab);
    }
    bindEvents();
  });
}

function init3dSphereCarousel({ container } = {}) {
  let hRadius;
  let vRadius;
  let observerInstance;
  let spin;

  const root = container || document;
  const wrap = root.querySelector("[data-3d-carousel-wrap]");
  if (!wrap) return () => { };

  const list = wrap;
  const vAngles = [-50, -25, 0, 25, 50];

  const calcRadius = () => {
    const size = list.offsetWidth;
    const base = size * 0.6;

    hRadius = base;
    vRadius = base * 0.85;
  };

  const destroyGsapScene = () => {
    if (observerInstance) {
      observerInstance.kill();
      observerInstance = null;
    }

    if (spin) {
      spin.kill();
      spin = null;
    }

    const panels = wrap.querySelectorAll("[data-3d-carousel-panel]");
    gsap.set(panels, { clearProps: "transform" });

    const items = wrap.querySelectorAll("[data-3d-carousel-item]");
    gsap.set(items, { clearProps: "transform" });
  };

  const create = () => {
    calcRadius();

    const panels = wrap.querySelectorAll("[data-3d-carousel-panel]");
    panels.forEach((p) => {
      p.style.transformOrigin = `50% 50% ${-hRadius}px`;
    });

    const panelCache = [];

    panels.forEach((panel) => {
      const cached = [];

      panel.querySelectorAll("[data-3d-carousel-item]").forEach((item) => {
        const idx = parseInt(item.getAttribute("data-index"), 10);
        const vAngle = vAngles[idx];

        item.style.transformOrigin = `50% 50% ${-vRadius}px`;
        item.style.transform = `rotateX(${vAngle}deg)`;

        const content = item.querySelector("[data-3d-carousel-content]");
        if (content) {
          cached.push({
            content,
            vFactor: Math.cos((vAngle * Math.PI) / 180),
          });
        }
      });

      panelCache.push({ el: panel, items: cached });
    });

    const FADE_POWER = 1.6;

    function smoothstep(t) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }

    function updateDepthFade() {
      for (let i = 0; i < panelCache.length; i++) {
        const { el, items } = panelCache[i];
        const raw = gsap.getProperty(el, "rotationY");
        const rad = (((raw % 360) + 360) % 360) * (Math.PI / 180);
        const panelCos = Math.cos(rad);

        for (let j = 0; j < items.length; j++) {
          const { content, vFactor } = items[j];
          const combined = Math.max(0, panelCos * vFactor);
          const curved = smoothstep(
            smoothstep(Math.pow(combined, 1 / FADE_POWER))
          );

          const opacity = 0.15 + 0.85 * curved;

          content.style.opacity = opacity;
          content.style.pointerEvents =
            opacity < 0.5 ? "none" : "auto";
        }
      }
    }

    spin = gsap.fromTo(
      panels,
      { rotationY: (i) => (i * 360) / panels.length },
      {
        rotationY: "-=360",
        duration: 30,
        ease: "none",
        repeat: -1,
        onUpdate: updateDepthFade,
      }
    );

    spin.progress(1000);

    observerInstance = Observer.create({
      target: window,
      type: "wheel,scroll,touch",
      onChangeY: (self) => {
        const boost = Math.abs(self.velocityY * 0.005);
        const v = gsap.utils.clamp(1, 60, boost);
        spin.timeScale(v);

        gsap.to(spin, {
          timeScale: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      },
    });
  };

  create();

  const modalEl = document.querySelector("[data-modal-target]");

  let modalObserver;

  if (modalEl) {
    modalObserver = new MutationObserver(() => {
      const isActive = modalEl.getAttribute("data-modal-status") === "active";

      if (isActive) {
        observerInstance?.disable();
      } else {
        observerInstance?.enable();
      }
    });

    modalObserver.observe(modalEl, {
      attributes: true,
      attributeFilter: ["data-modal-status"],
    });
  }

  function setPaused(paused) {
    if (!spin) return;

    spin.paused(paused);

    if (observerInstance) {
      paused ? observerInstance.disable() : observerInstance.enable();
    }

    if (!paused) spin.timeScale(1);
  }

  const scrollHandler = ScrollTrigger.create({
    trigger: wrap,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => setPaused(false),
    onEnterBack: () => setPaused(false),
    onLeave: () => setPaused(true),
    onLeaveBack: () => setPaused(true),
    invalidateOnRefresh: true,
  });

  const debounce = (fn, ms) => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  };

  const onResize = debounce(() => {
    destroyGsapScene();
    create();
  }, 200);

  window.addEventListener("resize", onResize);

  return function destroyCarousel() {
    window.removeEventListener("resize", onResize);
    if (scrollHandler) scrollHandler.kill();
    if (modalObserver) modalObserver.disconnect();
    destroyGsapScene();
  };
}
