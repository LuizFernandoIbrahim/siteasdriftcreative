(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav fixa + menu mobile ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");

  window.addEventListener("scroll", function(){
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  }, { passive:true });

  burger.addEventListener("click", function(){
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  document.querySelectorAll(".nav-links a").forEach(function(a){
    a.addEventListener("click", function(){
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded","false");
    });
  });

  /* ---------- link ativo conforme a seção ---------- */
  var sections = [].slice.call(document.querySelectorAll("section[id]"));
  var links = {};
  document.querySelectorAll(".nav-links a").forEach(function(a){
    links[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var link = links[e.target.id];
        if (!link) return;
        if (e.isIntersecting){
          Object.keys(links).forEach(function(k){ links[k].classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function(s){ spy.observe(s); });

    /* ---------- reveal na rolagem ---------- */
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: .16, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("is-in"); });
  }

  /* ---------- parallax leve na logo do hero ---------- */
  var logo = document.getElementById("heroLogo");
  if (logo && !reduce && window.matchMedia("(pointer:fine)").matches){
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    window.addEventListener("mousemove", function(ev){
      tx = (ev.clientX / window.innerWidth - .5) * 22;
      ty = (ev.clientY / window.innerHeight - .5) * 16;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive:true });
    function tick(){
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      logo.style.transform = "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0)";
      raf = (Math.abs(tx-cx) > .1 || Math.abs(ty-cy) > .1) ? requestAnimationFrame(tick) : null;
    }
  }

  /* ---------- Dúvidas ---------- */
  document.querySelectorAll("#faq .q").forEach(function(item){
    var btn = item.querySelector("button");
    var panel = item.querySelector(".a");
    btn.addEventListener("click", function(){
      var open = item.dataset.open === "true";
      document.querySelectorAll("#faq .q").forEach(function(other){
        if (other !== item && other.dataset.open === "true"){
          other.dataset.open = "false";
          other.querySelector("button").setAttribute("aria-expanded","false");
          other.querySelector(".a").style.height = "0px";
        }
      });
      item.dataset.open = open ? "false" : "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.height = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function(){
    document.querySelectorAll('#faq .q[data-open="true"] .a').forEach(function(p){
      p.style.height = p.scrollHeight + "px";
    });
  });

  /* ---------- botões de pacote preenchem o formulário ---------- */
  var select = document.getElementById("pacote");
  document.querySelectorAll("[data-plan]").forEach(function(b){
    b.addEventListener("click", function(){
      if (select) select.value = b.dataset.plan;
    });
  });

  /* ---------- formulário -> WhatsApp ---------- */
  var form = document.getElementById("leadForm");
  form.addEventListener("submit", function(ev){
    ev.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    var d = new FormData(form);
    var texto =
      "Olá, AS Drift Creative! Vim pelo site.\n\n" +
      "Nome: " + d.get("nome") + "\n" +
      "E-mail: " + d.get("email") + "\n" +
      "WhatsApp: " + d.get("zap") + "\n" +
      "Pacote de interesse: " + d.get("pacote") +
      (d.get("msg") ? "\n\nMensagem: " + d.get("msg") : "");
    window.open("https://wa.me/5521965746350?text=" + encodeURIComponent(texto), "_blank", "noopener");
    form.classList.add("is-sent");
  });

  /* ---------- Ano do Rodapé ---------- */
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
