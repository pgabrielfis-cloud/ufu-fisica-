/* ============================================================
   Script principal
   - Abre/fecha menu mobile
   - Abre/fecha modal com detalhes de cada área
   - Filtra cartões conforme o campo de busca
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. MENU MOBILE ---------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav    = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        const aberto = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', aberto);
    });

    // Fecha o menu ao clicar em um link (melhor experiência no celular)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- 2. MODAL DE DETALHES ---------- */
    const modal         = document.getElementById('modal');
    const modalTitulo   = document.getElementById('modal-titulo');
    const modalCorpo    = document.getElementById('modal-corpo');
    const modalClose    = modal.querySelector('.modal-close');

    // Cada botão "Ver detalhes" abre o modal com o conteúdo do <template>
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const card      = btn.closest('.card');
            const titulo    = card.querySelector('h3').textContent;
            const template  = card.querySelector('template[data-detalhes]');

            modalTitulo.textContent = titulo;
            // Clona o conteúdo do <template> para não esvaziá-lo
            modalCorpo.innerHTML = '';
            modalCorpo.appendChild(template.content.cloneNode(true));

            modal.hidden = false;
            document.body.style.overflow = 'hidden'; // evita scroll do fundo
        });
    });

    // Função para fechar o modal
    function fecharModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal(); // clique fora do conteúdo
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) fecharModal();
    });

    /* ---------- 3. BUSCA/FILTRO DE ÁREAS ---------- */
    const buscaInput = document.getElementById('busca');
    const cards      = document.querySelectorAll('.card');

    buscaInput.addEventListener('input', () => {
        const termo = buscaInput.value.toLowerCase().trim();
        cards.forEach(card => {
            const texto = card.textContent.toLowerCase();
            const area  = (card.dataset.area || '').toLowerCase();
            const match = texto.includes(termo) || area.includes(termo);
            card.hidden = !match;
        });
    });

});