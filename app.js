/* ============================================
   NavegaSeguro — app.js
   Navegação, progresso, quizzes, XP e persistência
   ============================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "navegaseguro_state_v1";
  const READ_THRESHOLD = 0.8; // 80%
  const XP_PER_CORRECT = 10;

  /* ---------- ESTADO ---------- */
  function defaultState() {
    return {
      unlockedModules: [MODULES[0].id],
      completedModules: [],
      moduleReadPct: {},        // { moduleId: 0-1 }
      quizScores: {},           // { moduleId: { correct, total } }
      xp: 0,
      finalChallengeDone: false,
      finalChallengeScore: null,
      feedbackSent: false
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* localStorage indisponível — a experiência continua, sem persistência */
    }
  }

  /* ---------- HELPERS ---------- */
  function moduleById(id) { return MODULES.find((m) => m.id === id); }
  function isUnlocked(id) { return state.unlockedModules.includes(id); }
  function isComplete(id) { return state.completedModules.includes(id); }
  function totalQuizQuestions() {
    return MODULES.reduce((sum, m) => sum + m.quiz.questions.length, 0);
  }
  function totalQuizCorrect() {
    return Object.values(state.quizScores).reduce((sum, s) => sum + s.correct, 0);
  }

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* ---------- ROTEAMENTO ---------- */
  let currentModuleId = null;

  function parseHash() {
    const hash = (location.hash || "#home").slice(1);
    const parts = hash.split("/");
    return { view: parts[0] || "home", param: parts[1] || null };
  }

  function goto(view, param) {
    location.hash = param ? `${view}/${param}` : view;
  }

  window.addEventListener("hashchange", render);

  document.addEventListener("click", (e) => {
    const gotoEl = e.target.closest("[data-goto]");
    if (gotoEl) {
      e.preventDefault();
      goto(gotoEl.getAttribute("data-goto"));
    }
  });

  function render() {
    const { view, param } = parseHash();
    const validViews = ["home", "path", "module", "quiz", "final", "summary", "feedback", "progress"];
    const activeView = validViews.includes(view) ? view : "home";

    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const target = document.getElementById(`view-${activeView}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".primary-nav a").forEach((a) => a.classList.remove("active"));
    const navMap = { home: "home", path: "path", module: "path", quiz: "path", final: "path", progress: "progress" };
    const navKey = navMap[activeView];
    if (navKey) {
      const navLink = document.querySelector(`.primary-nav a[data-nav="${navKey}"]`);
      if (navLink) navLink.classList.add("active");
    }

    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    if (activeView === "home") renderHome();
    if (activeView === "path") renderPath();
    if (activeView === "module") renderModule(param);
    if (activeView === "quiz") renderQuiz(param);
    if (activeView === "final") renderFinalChallenge();
    if (activeView === "summary") renderSummary();
    if (activeView === "progress") renderProgressView();
    // feedback view has static markup, nothing to render dynamically on load
  }

  /* ---------- MENU MOBILE ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  menuToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  function closeMobileMenu() {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  /* ---------- CARDS DE MÓDULO ---------- */
  function moduleCardHTML(mod) {
    const complete = isComplete(mod.id);
    const unlocked = isUnlocked(mod.id);
    const statusClass = complete ? "complete" : unlocked ? "available" : "locked";
    const statusLabel = complete
      ? '<span aria-hidden="true">✓</span> Concluído'
      : unlocked
      ? "Disponível"
      : '<span aria-hidden="true">🔒</span> Bloqueado';
    const cardStateClass = [complete ? "complete" : "", unlocked ? "" : "locked"].filter(Boolean).join(" ");
    const numStr = String(mod.num).padStart(2, "0");

    return `
      <button class="module-card ${cardStateClass}" data-module-open="${mod.id}" ${unlocked ? "" : "disabled"} aria-label="Módulo ${numStr}: ${mod.title}${complete ? " (concluído)" : unlocked ? "" : " (bloqueado)"}">
        <div class="mc-top">
          <span class="mc-num">${numStr}</span>
          <span class="mc-status ${statusClass}">${statusLabel}</span>
        </div>
        <h3 class="mc-title">${escapeHTML(mod.title.split(":")[0])}</h3>
        <p class="mc-desc">${escapeHTML(mod.shortDesc)}</p>
      </button>
    `;
  }

  function bindModuleCardClicks(container) {
    container.querySelectorAll("[data-module-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-module-open");
        if (isUnlocked(id)) goto("module", id);
      });
    });
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- HOME ---------- */
  function renderHome() {
    const grid = document.getElementById("homeModuleGrid");
    grid.innerHTML = MODULES.slice(0, 3).map(moduleCardHTML).join("");
    bindModuleCardClicks(grid);
  }

  /* ---------- SEU CAMINHO ---------- */
  function renderPath() {
    const grid = document.getElementById("pathModuleGrid");
    grid.innerHTML = MODULES.map(moduleCardHTML).join("");
    bindModuleCardClicks(grid);

    const allDone = state.completedModules.length >= MODULES.length;
    const card = document.getElementById("finalChallengeCard");
    const desc = document.getElementById("finalChallengeDesc");
    const btn = document.getElementById("finalChallengeBtn");

    if (state.finalChallengeDone) {
      card.classList.remove("locked");
      desc.textContent = "Você já concluiu o desafio final. Reveja seu resultado quando quiser.";
      btn.disabled = false;
      btn.textContent = "Ver resultado →";
      btn.onclick = () => goto("summary");
    } else if (allDone) {
      card.classList.remove("locked");
      desc.textContent = "Todos os módulos concluídos! Teste tudo o que você aprendeu.";
      btn.disabled = false;
      btn.textContent = "Começar desafio →";
      btn.onclick = () => goto("final");
    } else {
      card.classList.add("locked");
      const remaining = MODULES.length - state.completedModules.length;
      desc.textContent = `Complete todos os 7 módulos para desbloquear o desafio final. Faltam ${remaining}.`;
      btn.disabled = true;
      btn.textContent = "Bloqueado";
      btn.onclick = null;
    }
  }

  /* ---------- LEITURA DO MÓDULO ---------- */
  let scrollHandler = null;

  function renderModule(moduleId) {
    const mod = moduleById(moduleId) || MODULES[0];
    if (!isUnlocked(mod.id)) {
      goto("path");
      return;
    }
    currentModuleId = mod.id;

    document.getElementById("modNum").textContent = String(mod.num).padStart(2, "0");
    document.getElementById("modEyebrow").textContent = `Módulo ${mod.num} de ${MODULES.length}`;
    document.getElementById("modTitle").textContent = mod.title;
    document.getElementById("moduleContent").innerHTML = mod.content;

    const savedPct = state.moduleReadPct[mod.id] || 0;
    updateReadingUI(savedPct, mod.id);

    const contentEl = document.getElementById("moduleContent");

    if (scrollHandler) window.removeEventListener("scroll", scrollHandler);

    if (savedPct >= READ_THRESHOLD) {
      // já leu o suficiente antes; nada a rastrear, mas mantém possibilidade de melhorar
    }

    scrollHandler = throttle(() => {
      const pct = computeReadPct(contentEl);
      if (pct > (state.moduleReadPct[mod.id] || 0)) {
        state.moduleReadPct[mod.id] = pct;
        saveState();
        updateReadingUI(pct, mod.id);
      }
    }, 120);

    window.addEventListener("scroll", scrollHandler);
    // avalia posição inicial (conteúdo curto que já cabe na tela deve contar como lido)
    setTimeout(() => {
      const pct = computeReadPct(contentEl);
      if (pct > (state.moduleReadPct[mod.id] || 0)) {
        state.moduleReadPct[mod.id] = pct;
        saveState();
      }
      updateReadingUI(state.moduleReadPct[mod.id] || 0, mod.id);
    }, 50);
  }

  function computeReadPct(contentEl) {
    const rect = contentEl.getBoundingClientRect();
    const contentTop = rect.top + window.scrollY;
    const contentHeight = contentEl.offsetHeight;
    const viewportBottom = window.scrollY + window.innerHeight;

    if (contentHeight <= window.innerHeight * 0.9) {
      // conteúdo curto: considerar lido se o fim já apareceu na tela
      const contentBottom = contentTop + contentHeight;
      if (viewportBottom >= contentBottom - 40) return 1;
    }

    const seen = viewportBottom - contentTop;
    const pct = seen / contentHeight;
    return Math.max(0, Math.min(1, pct));
  }

  function throttle(fn, wait) {
    let last = 0;
    let timeout = null;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          last = Date.now();
          fn.apply(this, args);
        }, wait - (now - last));
      }
    };
  }

  function updateReadingUI(pct, moduleId) {
    const pctInt = Math.round(pct * 100);
    document.getElementById("readPercentLabel").textContent = `${pctInt}%`;
    document.getElementById("readPercentFill").style.width = `${pctInt}%`;

    const gate = document.getElementById("quizGate");
    const gateIcon = document.getElementById("quizGateIcon");
    const gateTitle = document.getElementById("quizGateTitle");
    const gateMsg = document.getElementById("quizGateMsg");
    const gateBtn = document.getElementById("quizGateBtn");

    const alreadyCompleted = isComplete(moduleId);

    if (pct >= READ_THRESHOLD) {
      gate.classList.add("unlocked");
      gateIcon.textContent = "✓";
      gateTitle.textContent = alreadyCompleted ? "Quiz já concluído" : "Conteúdo concluído! Você desbloqueou o quiz.";
      gateMsg.textContent = alreadyCompleted
        ? "Você pode refazer o quiz quando quiser para revisar o conteúdo."
        : "Parabéns, você leu o suficiente desta aula. Vamos testar o que aprendeu?";
      gateBtn.disabled = false;
      gateBtn.textContent = alreadyCompleted ? "Refazer quiz →" : "Ir para o quiz →";
      gateBtn.onclick = () => goto("quiz", moduleId);
    } else {
      gate.classList.remove("unlocked");
      gateIcon.textContent = "🔒";
      gateTitle.textContent = "Quiz bloqueado";
      gateMsg.textContent = "Leia pelo menos 80% desta aula para desbloquear o quiz.";
      gateBtn.disabled = true;
      gateBtn.textContent = "Ir para o quiz →";
      gateBtn.onclick = null;
    }
  }

  /* ---------- QUIZ ---------- */
  let quizState = null; // { moduleId, answers: {}, correctCount }

  function renderQuiz(moduleId) {
    const mod = moduleById(moduleId);
    if (!mod || (state.moduleReadPct[mod.id] || 0) < READ_THRESHOLD) {
      goto("module", moduleId || MODULES[0].id);
      return;
    }

    document.getElementById("quizTitle").textContent = mod.quiz.title;
    document.getElementById("quizResult").classList.add("hidden");

    quizState = { moduleId: mod.id, answers: {}, correctCount: 0 };

    renderQuizProgress(mod.quiz.questions.length, 0);

    const body = document.getElementById("quizBody");
    body.innerHTML = mod.quiz.questions
      .map((q, idx) => quizQuestionHTML(q, idx, `q_${mod.id}_${idx}`))
      .join("");

    mod.quiz.questions.forEach((q, idx) => bindQuizQuestion(mod, q, idx));
  }

  function quizQuestionHTML(q, idx, groupName) {
    const letters = "abcdefgh";
    const isMulti = q.type === "multi";
    const optionsHTML = q.options
      .map((opt, i) => `
        <button type="button" class="quiz-option" data-qidx="${idx}" data-opt="${opt.id}" role="${isMulti ? "checkbox" : "radio"}" aria-checked="false">
          <span class="qo-letter">${isMulti ? "☐" : letters[i].toUpperCase()}</span>
          <span>${escapeHTML(opt.text)}</span>
        </button>
      `)
      .join("");

    return `
      <div class="quiz-question" id="quiz-q-${idx}" data-qtype="${q.type}">
        <h3>${idx + 1}. ${escapeHTML(q.prompt)}</h3>
        ${isMulti ? '<p class="quiz-multiselect-note">Selecione todas as alternativas corretas e depois confirme.</p>' : ""}
        <div class="quiz-options">${optionsHTML}</div>
        ${isMulti ? '<div class="quiz-submit-row"><button type="button" class="btn btn-primary" data-confirm-multi="' + idx + '">Confirmar resposta</button></div>' : ""}
        <div class="quiz-feedback" id="quiz-feedback-${idx}"></div>
      </div>
    `;
  }

  function bindQuizQuestion(mod, q, idx) {
    const qEl = document.getElementById(`quiz-q-${idx}`);
    const optionButtons = qEl.querySelectorAll(".quiz-option");

    if (q.type === "multi") {
      const selected = new Set();
      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          const optId = btn.getAttribute("data-opt");
          if (selected.has(optId)) {
            selected.delete(optId);
            btn.setAttribute("aria-checked", "false");
            btn.querySelector(".qo-letter").textContent = "☐";
          } else {
            selected.add(optId);
            btn.setAttribute("aria-checked", "true");
            btn.querySelector(".qo-letter").textContent = "☑";
          }
        });
      });
      const confirmBtn = qEl.querySelector("[data-confirm-multi]");
      confirmBtn.addEventListener("click", () => {
        if (selected.size === 0) {
          showToast("Selecione ao menos uma opção.");
          return;
        }
        gradeMultiQuestion(mod, q, idx, selected, optionButtons, confirmBtn);
      });
    } else {
      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          gradeSingleQuestion(mod, q, idx, btn.getAttribute("data-opt"), optionButtons);
        });
      });
    }
  }

  function gradeSingleQuestion(mod, q, idx, chosenId, optionButtons) {
    const correct = chosenId === q.correct;
    optionButtons.forEach((btn) => {
      btn.disabled = true;
      const optId = btn.getAttribute("data-opt");
      if (optId === q.correct) btn.classList.add("correct");
      if (optId === chosenId && !correct) btn.classList.add("incorrect");
    });
    showQuestionFeedback(idx, correct, q.explanation);
    finalizeQuestionScore(idx, correct);
    maybeAutoAdvance(mod, idx);
  }

  function gradeMultiQuestion(mod, q, idx, selectedSet, optionButtons, confirmBtn) {
    const correctSet = new Set(q.correctSet);
    const correct =
      selectedSet.size === correctSet.size &&
      [...selectedSet].every((id) => correctSet.has(id));

    optionButtons.forEach((btn) => {
      btn.disabled = true;
      const optId = btn.getAttribute("data-opt");
      if (correctSet.has(optId)) btn.classList.add("correct");
      else if (selectedSet.has(optId)) btn.classList.add("incorrect");
    });
    confirmBtn.disabled = true;

    showQuestionFeedback(idx, correct, q.explanation);
    finalizeQuestionScore(idx, correct);
    maybeAutoAdvance(mod, idx);
  }

  function showQuestionFeedback(idx, correct, explanation) {
    const fb = document.getElementById(`quiz-feedback-${idx}`);
    fb.classList.add("show", correct ? "correct" : "incorrect");
    fb.innerHTML = `
      <div class="qf-label">${correct ? "✓ Resposta correta" : "✕ Resposta incorreta"}</div>
      <p style="margin:0">${escapeHTML(explanation)}</p>
    `;
  }

  function finalizeQuestionScore(idx, correct) {
    if (quizState.answers[idx] !== undefined) return; // já contabilizada
    quizState.answers[idx] = correct;
    if (correct) {
      quizState.correctCount++;
      state.xp += XP_PER_CORRECT;
      saveState();
    }
    const answeredCount = Object.keys(quizState.answers).length;
    renderQuizProgress(currentTotalQuestions(), answeredCount);
  }

  function currentTotalQuestions() {
    const mod = moduleById(quizState.moduleId);
    return mod.quiz.questions.length;
  }

  function renderQuizProgress(total, answered) {
    const wrap = document.getElementById("quizProgress");
    let dots = "";
    for (let i = 0; i < total; i++) {
      dots += `<div class="qp-dot ${i < answered ? "done" : ""}"></div>`;
    }
    wrap.innerHTML = dots;
  }

  function maybeAutoAdvance(mod, idx) {
    const total = mod.quiz.questions.length;
    const answeredCount = Object.keys(quizState.answers).length;
    if (answeredCount >= total) {
      setTimeout(() => finishQuiz(mod), 500);
    }
  }

  function finishQuiz(mod) {
    const total = mod.quiz.questions.length;
    const correct = quizState.correctCount;

    state.quizScores[mod.id] = { correct, total };

    const wasAlreadyComplete = isComplete(mod.id);
    if (!wasAlreadyComplete) {
      state.completedModules.push(mod.id);
    }

    // desbloqueia o próximo módulo
    const idxInList = MODULES.findIndex((m) => m.id === mod.id);
    const nextMod = MODULES[idxInList + 1];
    let unlockedNext = false;
    if (nextMod && !isUnlocked(nextMod.id)) {
      state.unlockedModules.push(nextMod.id);
      unlockedNext = true;
    }

    saveState();
    checkAchievements();

    const result = document.getElementById("quizResult");
    const icon = document.getElementById("qrIcon");
    const title = document.getElementById("qrTitle");
    const msg = document.getElementById("qrMsg");
    const score = document.getElementById("qrScore");
    const nextBtn = document.getElementById("qrNextBtn");

    if (unlockedNext) {
      icon.textContent = "🎉";
      title.textContent = "Novo módulo desbloqueado!";
      msg.textContent = "Você concluiu esta etapa. Continue sua jornada.";
    } else if (nextMod) {
      icon.textContent = "✓";
      title.textContent = "Módulo revisado!";
      msg.textContent = "Você já tinha concluído este módulo antes.";
    } else {
      icon.textContent = "🏆";
      title.textContent = "Último módulo concluído!";
      msg.textContent = state.completedModules.length >= MODULES.length
        ? "Você concluiu todos os módulos. O desafio final já está disponível."
        : "Você concluiu esta etapa.";
    }
    score.textContent = `Você acertou ${correct} de ${total} perguntas.`;

    if (nextMod) {
      nextBtn.textContent = "Próximo módulo →";
      nextBtn.onclick = () => goto("module", nextMod.id);
      nextBtn.style.display = "";
    } else if (state.completedModules.length >= MODULES.length) {
      nextBtn.textContent = "Ir para o desafio final →";
      nextBtn.onclick = () => goto("final");
      nextBtn.style.display = "";
    } else {
      nextBtn.style.display = "none";
    }

    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- CONQUISTAS ---------- */
  let newlyUnlocked = [];
  function checkAchievements() {
    ACHIEVEMENTS.forEach((a) => {
      const already = getUnlockedAchievementIds().includes(a.id);
      if (!already && a.condition(state)) {
        addUnlockedAchievement(a.id);
        showToast(`${a.icon} Conquista desbloqueada: ${a.name}`);
      }
    });
  }
  function getUnlockedAchievementIds() {
    return state.unlockedAchievements || [];
  }
  function addUnlockedAchievement(id) {
    if (!state.unlockedAchievements) state.unlockedAchievements = [];
    state.unlockedAchievements.push(id);
    saveState();
  }

  /* ---------- DESAFIO FINAL ---------- */
  let finalState = null;

  function renderFinalChallenge() {
    if (state.completedModules.length < MODULES.length) {
      goto("path");
      return;
    }
    document.getElementById("finalResult").classList.add("hidden");
    finalState = { answers: {}, correctCount: 0 };

    const body = document.getElementById("finalBody");
    body.innerHTML = FINAL_CHALLENGE.questions
      .map((q, idx) => quizQuestionHTML(q, idx, `final_${idx}`))
      .join("");

    FINAL_CHALLENGE.questions.forEach((q, idx) => bindFinalQuestion(q, idx));
  }

  function bindFinalQuestion(q, idx) {
    const qEl = document.getElementById(`quiz-q-${idx}`);
    const optionButtons = qEl.querySelectorAll(".quiz-option");

    if (q.type === "multi") {
      const selected = new Set();
      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          const optId = btn.getAttribute("data-opt");
          if (selected.has(optId)) {
            selected.delete(optId);
            btn.setAttribute("aria-checked", "false");
            btn.querySelector(".qo-letter").textContent = "☐";
          } else {
            selected.add(optId);
            btn.setAttribute("aria-checked", "true");
            btn.querySelector(".qo-letter").textContent = "☑";
          }
        });
      });
      const confirmBtn = qEl.querySelector("[data-confirm-multi]");
      confirmBtn.addEventListener("click", () => {
        if (selected.size === 0) {
          showToast("Selecione ao menos uma opção.");
          return;
        }
        const correctSet = new Set(q.correctSet);
        const correct =
          selected.size === correctSet.size && [...selected].every((id) => correctSet.has(id));
        optionButtons.forEach((btn) => {
          btn.disabled = true;
          const optId = btn.getAttribute("data-opt");
          if (correctSet.has(optId)) btn.classList.add("correct");
          else if (selected.has(optId)) btn.classList.add("incorrect");
        });
        confirmBtn.disabled = true;
        showQuestionFeedback(idx, correct, q.explanation);
        finalizeFinalScore(idx, correct);
      });
    } else {
      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          const chosenId = btn.getAttribute("data-opt");
          const correct = chosenId === q.correct;
          optionButtons.forEach((b) => {
            b.disabled = true;
            const optId = b.getAttribute("data-opt");
            if (optId === q.correct) b.classList.add("correct");
            if (optId === chosenId && !correct) b.classList.add("incorrect");
          });
          showQuestionFeedback(idx, correct, q.explanation);
          finalizeFinalScore(idx, correct);
        });
      });
    }
  }

  function finalizeFinalScore(idx, correct) {
    if (finalState.answers[idx] !== undefined) return;
    finalState.answers[idx] = correct;
    if (correct) {
      finalState.correctCount++;
      state.xp += XP_PER_CORRECT;
      saveState();
    }
    const answeredCount = Object.keys(finalState.answers).length;
    if (answeredCount >= FINAL_CHALLENGE.questions.length) {
      setTimeout(finishFinalChallenge, 500);
    }
  }

  function finishFinalChallenge() {
    const total = FINAL_CHALLENGE.questions.length;
    const correct = finalState.correctCount;

    state.finalChallengeDone = true;
    state.finalChallengeScore = { correct, total };
    saveState();
    checkAchievements();

    document.getElementById("finalScore").textContent = `Você acertou ${correct} de ${total} perguntas.`;
    const result = document.getElementById("finalResult");
    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- RESUMO / TELA FINAL ---------- */
  function renderSummary() {
    document.getElementById("statXp").textContent = state.xp;
    document.getElementById("statModules").textContent = `${state.completedModules.length}/${MODULES.length}`;

    const totalQ = totalQuizQuestions() + (state.finalChallengeDone ? FINAL_CHALLENGE.questions.length : 0);
    const totalCorrect = totalQuizCorrect() + (state.finalChallengeScore ? state.finalChallengeScore.correct : 0);
    document.getElementById("statQuiz").textContent = `${totalCorrect}/${totalQ}`;
    const pct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
    document.getElementById("statPct").textContent = `${pct}%`;

    const row = document.getElementById("achievementsRow");
    const unlockedIds = getUnlockedAchievementIds();
    const unlocked = ACHIEVEMENTS.filter((a) => unlockedIds.includes(a.id));
    row.innerHTML = unlocked
      .map((a) => `<span class="achievement-chip">${a.icon} ${escapeHTML(a.name)}</span>`)
      .join("") || `<span class="achievement-chip" style="background:var(--surface-muted)">Continue avançando para desbloquear conquistas</span>`;
  }

  /* ---------- MEU PROGRESSO ---------- */
  function renderProgressView() {
    const overallPct = Math.round((state.completedModules.length / MODULES.length) * 100);
    document.getElementById("overallPercentLabel").textContent = `${overallPct}%`;
    document.getElementById("overallPercentFill").style.width = `${overallPct}%`;

    document.getElementById("progXp").textContent = state.xp;
    document.getElementById("progModules").textContent = `${state.completedModules.length}/${MODULES.length}`;

    const grid = document.getElementById("progressModuleGrid");
    grid.innerHTML = MODULES.map(moduleCardHTML).join("");
    bindModuleCardClicks(grid);
  }

  document.getElementById("resetProgressBtn").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja reiniciar todo o seu progresso? Isso não pode ser desfeito.")) {
      state = defaultState();
      saveState();
      showToast("Progresso reiniciado.");
      goto("home");
      render();
    }
  });

  /* ---------- FEEDBACK ---------- */
  let selectedStars = 0;
  const starButtons = document.querySelectorAll(".star");
  const starCaption = document.getElementById("starCaption");
  const captions = {
    1: "Não ajudou",
    2: "Ajudou pouco",
    3: "Ajudou razoavelmente",
    4: "Ajudou bastante",
    5: "Ajudou muito"
  };

  starButtons.forEach((star) => {
    star.addEventListener("click", () => {
      selectedStars = Number(star.getAttribute("data-value"));
      paintStars(selectedStars);
      starCaption.textContent = captions[selectedStars];
      starButtons.forEach((s) => s.setAttribute("aria-checked", String(Number(s.getAttribute("data-value")) === selectedStars)));
    });
    star.addEventListener("mouseenter", () => paintStars(Number(star.getAttribute("data-value")), true));
    star.addEventListener("mouseleave", () => paintStars(selectedStars));
  });

  function paintStars(count, isPreview) {
    starButtons.forEach((s) => {
      const val = Number(s.getAttribute("data-value"));
      s.classList.toggle("filled", val <= count);
      s.classList.toggle("top", isPreview && val <= count);
    });
  }

  document.getElementById("feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("feedbackText").value.trim();
    // Sem backend neste projeto acadêmico: guardamos localmente para fins de demonstração.
    state.feedbackSent = true;
    state.lastFeedback = { stars: selectedStars, text, date: new Date().toISOString() };
    saveState();

    document.getElementById("feedbackForm").classList.add("hidden");
    document.getElementById("starRating").classList.add("hidden");
    document.getElementById("starCaption").classList.add("hidden");
    document.getElementById("feedbackThanks").classList.remove("hidden");
  });

  /* ---------- INICIALIZAÇÃO ---------- */
  render();
})();
