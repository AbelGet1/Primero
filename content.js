document.addEventListener('DOMContentLoaded', function() {
    const tileContainer = document.getElementById('tiles');

    // Fetch contents from the server
    fetch('/content')
        .then(response => response.json())
        .then(data => {
            data.forEach(content => {
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                tile.innerHTML = `
                    <img src="path-to-image.jpg" alt="${content.title}">
                    <h3>${content.title}</h3>
                `;
                
                tile.addEventListener('click', () => {
                    window.location.href = `content.html?id=${content.id}`;
                });

                tileContainer.appendChild(tile);
            });
        })
        .catch(error => console.error('Error fetching content:', error));
});
