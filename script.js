document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Animação Cinética do Título no Hero ---
    const kineticTitle = document.querySelector('.hero-title.kinetic-title');
    if (kineticTitle) {
        const text = kineticTitle.textContent.trim();
        kineticTitle.textContent = ''; // Limpa o conteúdo original
        kineticTitle.style.opacity = '1'; // Torna o container H1 visível

        let delay = 0;
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char; // Preserva espaços
            if (char !== ' ') {
                // Aplica delay escalonado apenas a caracteres visíveis
                span.style.animationDelay = `${delay}s`;
                delay += 0.04; // Ajuste a velocidade da animação aqui
            }
            // Mesmo espaços podem precisar de um delay mínimo para manter o timing correto
            // Dependendo da animação, pode ser necessário adicionar o span de espaço também
            // Se a animação não envolver transform, o espaço em si não precisa do span animado
            // Para a animação atual (letter-reveal-3d), animar espaços não faz sentido visual.
            kineticTitle.appendChild(span);
        });
    }

    // --- 2. Animações ao Rolar (Intersection Observer) ---
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');

    const revealObserverOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px', // Margem extra ao redor do viewport (pode ser '100px' etc.)
        threshold: 0.15 // 15% do elemento visível para disparar (ajuste conforme necessário)
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Quando o elemento entra (ou está) na área visível
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Para de observar este elemento após ele se tornar visível
                // Comente a linha abaixo se quiser que a animação ocorra toda vez que ele entra na tela
                observer.unobserve(entry.target);
            }
            // Opcional: Se quiser que a animação reverta quando sai da tela
            // else {
            //     // Garante que só remova se já foi visível antes (evita remover no load inicial)
            //     if (entry.target.classList.contains('is-visible')) {
            //         entry.target.classList.remove('is-visible');
            //     }
            // }
        });
    };

    // Cria o observador
    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);

    // Observa cada elemento alvo
    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 3. Efeitos de Parallax Simples (Opcional - Descomente para usar) ---
    /*
    const parallaxElements = document.querySelectorAll('.floating-element, .hero-bg-layer.layer1, .hero-bg-layer.layer2');

    const handleScrollParallax = () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((el, index) => {
            let speed = 0;
            if (el.classList.contains('floating-element')) {
                speed = (index % 2 === 0 ? -0.08 : 0.05) * (index + 1) * 0.4; // Velocidade para elementos flutuantes
            } else if (el.classList.contains('layer1')) {
                speed = 0.1; // Velocidade mais lenta para fundo distante
            } else if (el.classList.contains('layer2')) {
                speed = 0.05; // Velocidade ainda mais lenta
            }

            const movementY = scrollY * speed;
            // Aplica APENAS o translateY via JS para não conflitar com animações CSS complexas
            el.style.setProperty('--parallax-y', `${movementY}px`);
            // Você precisaria adicionar `transform: translateY(var(--parallax-y, 0));`
            // aos estilos base desses elementos no CSS e garantir que não conflite
            // com outras transformações das animações @keyframes.
            // É mais seguro usar bibliotecas como GSAP ScrollTrigger para parallax complexo.

            // Exemplo direto (pode causar conflito):
            // el.style.transform = `translateY(${movementY}px)`;
        });
    };
    */

    // --- 4. Efeito de Brilho Seguindo o Mouse no Hero (Opcional - Descomente para usar) ---
    /*
    const hero = document.querySelector('.hero-spirit');
    if (hero && !('ontouchstart' in window || navigator.maxTouchPoints > 0)) { // Não ativa em touch
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--mouse-x', `${x}px`);
            hero.style.setProperty('--mouse-y', `${y}px`);
        });
         // Adicione este CSS ao seu arquivo .css:
        // .hero-spirit::after {
        //     content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        //     background: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 218, 119, 0.1), transparent 70%);
        //     pointer-events: none; z-index: 5; transition: background 0.15s linear;
        // }
    }
    */


    // --- Otimização do Scroll com requestAnimationFrame (Usado pelo Parallax se ativado) ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // handleScrollParallax(); // Chame a função de parallax aqui se ela estiver ativa
                ticking = false;
            });
            ticking = true;
        }
    });
    // handleScrollParallax(); // Posição inicial do parallax


    // --- Atualizar Ano no Rodapé ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // Fim do DOMContentLoaded

