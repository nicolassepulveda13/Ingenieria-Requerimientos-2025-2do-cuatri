// Funcionalidad de filtrado por categoría y sidebar
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    const sidebar = document.getElementById('sidebar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navItems = document.querySelectorAll('.nav-item[data-category]');

    // Toggle sidebar en móvil
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // Navegación desde sidebar - activar filtro
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const category = this.getAttribute('data-category');
            if (category) {
                // Activar el filtro correspondiente
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-category') === category) {
                        btn.click();
                    }
                });
            }
            // Cerrar sidebar en móvil después de hacer clic
            if (window.innerWidth <= 1024) {
                toggleSidebar();
            }
        });
    });

    // Manejar clic en botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar tarjetas
            workCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // Scroll suave hacia la sección de trabajos
            document.getElementById('trabajos').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Smooth scroll para enlaces internos (índice y otros)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                // Si es una tarjeta del índice, también activar el filtro correspondiente
                const category = this.getAttribute('data-category');
                if (category) {
                    // Activar el filtro correspondiente
                    filterButtons.forEach(btn => {
                        if (btn.getAttribute('data-category') === category) {
                            btn.click();
                        }
                    });
                }
                
                // Scroll suave
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, category ? 100 : 0);
            }
        });
    });

    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    workCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

