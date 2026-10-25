document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup-overlay');
    const popupImage = document.querySelector('.popup-image');
    const closeButton = document.querySelector('.popup-close');
    document.querySelectorAll('.open-popup').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            popupImage.src = this.getAttribute('data-img');
            popupImage.dataset.clickHome = this.dataset.clickHome || '';
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    function closePopup() {
        popup.style.display = 'none';
        popupImage.src = '';
        document.body.style.overflow = '';
    }
    popup.addEventListener('click', function(event) {
        if (event.target === popup || event.target === closeButton) {
            closePopup();
            return;
        }
        if (event.target === popupImage && popupImage.dataset.clickHome === 'true') {
            window.location.href = 'index.html#colorlib-hero';
        }
    });
    closeButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popup.style.display === 'block') closePopup();
    });
});
document.addEventListener('DOMContentLoaded', function() {
        const loadMoreBtn = document.getElementById('load-more');
        const additionalContent = document.getElementById('additional-content');

        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            additionalContent.classList.remove('hidden');
            loadMoreBtn.style.display = 'none';
        });
    });
document.addEventListener('DOMContentLoaded', function() {
    const genialLink = document.querySelector('.btn-hire');
    const countElement = document.getElementById('genial-count');
    if (!genialLink || !countElement) return;

    // A file:// preview cannot reach PHP; keep the local preview interactive.
    if (window.location.protocol === 'file:') {
        const countKey = 'adlene-site-local-preview-count';
        const votedKey = 'adlene-site-local-preview-voted';
        let count = 0;
        let voted = false;
        try {
            count = Number(localStorage.getItem(countKey)) || 0;
            voted = localStorage.getItem(votedKey) === 'true';
        } catch (error) {}
        countElement.textContent = count;
        genialLink.title = 'Apercu local : ce compteur nest pas partage.';
        genialLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (voted) return;
            voted = true;
            count += 1;
            countElement.textContent = count;
            try {
                localStorage.setItem(countKey, String(count));
                localStorage.setItem(votedKey, 'true');
            } catch (error) {}
        });
        return;
    }

    let voted = false;
    let sending = false;
    const endpoint = '/api/genial-counter';
    const ready = fetch(endpoint, { credentials: 'same-origin', cache: 'no-store' })
        .then(function(response) {
            if (!response.ok) throw new Error('Counter unavailable');
            return response.json();
        })
        .then(function(data) {
            countElement.textContent = Number(data.count) || 0;
            voted = Boolean(data.voted);
        })
        .catch(function(error) {
            console.error('Unable to load the shared counter.', error);
        });

    genialLink.addEventListener('click', async function(event) {
        event.preventDefault();
        await ready;
        if (voted || sending) return;
        sending = true;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'same-origin',
                cache: 'no-store',
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error('Counter update failed');
            const data = await response.json();
            countElement.textContent = Number(data.count) || 0;
            voted = Boolean(data.voted);
            if (voted) genialLink.title = 'Votre clic a deja ete compte.';
        } catch (error) {
            console.error('Unable to update the shared counter.', error);
        } finally {
            sending = false;
        }
    });
});
