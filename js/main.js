// 1. Изменение шапки при скролле
window.addEventListener('scroll', () => {
    // Ищем шапку прямо во время скролла
    const navbar = document.getElementById('navbar'); 
    
    // Если шапка нашлась (уже загрузилась), применяем эффект
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 2. Универсальная анимация появления и счетчики
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Анимация появления снизу
            if (entry.target.classList.contains('hidden-anim')) {
                entry.target.classList.add('show-anim');
            } 
            // Анимация появления сбоку (для главной страницы)
            else if (entry.target.classList.contains('hidden-anim-left') || entry.target.classList.contains('hidden-anim-right')) {
                entry.target.classList.add('show-anim-side');
            }
            
            // Логика бегущих счетчиков (для страницы велоуслуг)
            if(entry.target.classList.contains('stats') && !entry.target.classList.contains('counted')) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText.replace('+', '');
                        const inc = target / 50; 

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCount();
                });
                entry.target.classList.add('counted');
            }
            
            observer.unobserve(entry.target); // Анимируем только один раз
        }
    });
}, observerOptions);

// Находим ВСЕ скрытые элементы со всех страниц сайта и следим за ними
document.querySelectorAll('.hidden-anim, .hidden-anim-left, .hidden-anim-right').forEach((el) => {
    observer.observe(el);
});

        document.querySelectorAll('.hidden-anim').forEach((el) => {
            observer.observe(el);
        });

        // 3. Логика Модального окна
        const modal = document.getElementById('bookingModal');
        const serviceSelect = document.getElementById('modalServiceSelect');

        function openModal(serviceType) {
            if(serviceType) {
                for(let i=0; i < serviceSelect.options.length; i++) {
                    if(serviceSelect.options[i].value === serviceType) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        