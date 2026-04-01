document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    // We'll use the same API endpoint but format the UI as cards
    try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        
        const grid = document.getElementById('product-grid');
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
