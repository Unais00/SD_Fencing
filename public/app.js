// ══════════════════════════════════════════════
// MODERN MOBILE MENU - OFF-CANVAS DRAWER (LEFT & RIGHT)
// ══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    fetchProducts();
});

// Initialize Mobile Menu (Left & Right)
function initMobileMenu() {
    // RIGHT MENU
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // LEFT MENU
    const hamburgerBtnLeft = document.getElementById('hamburgerBtnLeft');
    const menuCloseBtnLeft = document.getElementById('menuCloseBtnLeft');
    const sideMenuLeft = document.getElementById('sideMenuLeft');
    const menuOverlayLeft = document.getElementById('menuOverlayLeft');
    const navLinksLeft = document.querySelectorAll('.nav-link-left');

    // ═══════════════════════════════════
    // RIGHT MENU FUNCTIONS
    // ═══════════════════════════════════

    // Open Right Menu
    hamburgerBtn.addEventListener('click', () => {
        sideMenu.classList.add('open');
        menuOverlay.classList.add('active');
        hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close Right Menu
    function closeRightMenu() {
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button click (right)
    menuCloseBtn.addEventListener('click', closeRightMenu);

    // Click outside (on overlay) to close (right)
    menuOverlay.addEventListener('click', closeRightMenu);

    // Close menu when a nav link is clicked (right)
    navLinks.forEach(link => {
        link.addEventListener('click', closeRightMenu);
    });

    // ═══════════════════════════════════
    // LEFT MENU FUNCTIONS
    // ═══════════════════════════════════

    // Open Left Menu
    hamburgerBtnLeft.addEventListener('click', () => {
        sideMenuLeft.classList.add('open');
        menuOverlayLeft.classList.add('active');
        hamburgerBtnLeft.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close Left Menu
    function closeLeftMenu() {
        console.log('Closing left menu...');
        sideMenuLeft.classList.remove('open');
        menuOverlayLeft.classList.remove('active');
        hamburgerBtnLeft.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button click (left) - with null check
    if (menuCloseBtnLeft) {
        menuCloseBtnLeft.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLeftMenu();
        });
    } else {
        console.error('Close button not found!');
    }

    // Click outside (on overlay) to close (left)
    menuOverlayLeft.addEventListener('click', closeLeftMenu);

    // Close menu when a nav link is clicked (left)
    navLinksLeft.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = link.getAttribute('href');
            closeLeftMenu();
        });
    });

    // ═══════════════════════════════════
    // GLOBAL MENU FUNCTIONS
    // ═══════════════════════════════════

    // Close both menus on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideMenu.classList.contains('open')) {
                closeRightMenu();
            }
            if (sideMenuLeft.classList.contains('open')) {
                closeLeftMenu();
            }
        }
    });

    // Close menus on window resize (desktop view)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeRightMenu();
            closeLeftMenu();
        }
    });
}

// ══════════════════════════════════════════════
// PRODUCTS FETCH (EXISTING CODE)
// ══════════════════════════════════════════════

async function fetchProducts() {
    try {
        const response = await fetch('/api/inventory');
        const data = await response.json();

        const grid = document.getElementById('product-grid');
        if (!grid) return; // Grid might not exist on all pages

        grid.innerHTML = '';

        data.forEach(item => {
            if (item.type === 'Fencing') {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image">
                        <i class="fas fa-layer-group" style="font-size: 3rem; color: #eee;"></i>
                    </div>
                    <div class="product-title">${item.name}</div>
                `;
                grid.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

