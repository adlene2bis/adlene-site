document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup-overlay');
    const popupImage = document.querySelector('.popup-image');
    const closeButton = document.querySelector('.popup-close');
    if (!popup || !popupImage || !closeButton) return;
    let lastTrigger = null;

    document.querySelectorAll('.open-popup').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            lastTrigger = this;
            popupImage.src = this.getAttribute('data-img');
            popupImage.dataset.clickHome = this.dataset.clickHome || '';
            const sourceImage = this.querySelector('img');
            popupImage.alt = sourceImage && sourceImage.alt ? sourceImage.alt : (this.getAttribute('aria-label') || 'Image agrandie');
            popupImage.tabIndex = popupImage.dataset.clickHome === 'true' ? 0 : -1;
            if (popupImage.dataset.clickHome === 'true') {
                popupImage.setAttribute('role', 'button');
                popupImage.setAttribute('aria-label', 'Retour à l’accueil');
                popupImage.style.cursor = 'pointer';
            } else {
                popupImage.removeAttribute('role');
                popupImage.removeAttribute('aria-label');
                popupImage.style.cursor = 'zoom-in';
            }
            popup.setAttribute('aria-label', 'Aperçu agrandi : ' + popupImage.alt);
            popup.setAttribute('aria-hidden', 'false');
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        });
    });

    function closePopup() {
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
        popupImage.src = '';
        popupImage.alt = '';
        popupImage.tabIndex = -1;
        popupImage.removeAttribute('role');
        popupImage.removeAttribute('aria-label');
        popup.setAttribute('aria-label', 'Aperçu agrandi');
        document.body.style.overflow = '';
        if (lastTrigger) lastTrigger.focus();
    }

    function returnHome() { window.location.href = 'index.html#colorlib-hero'; }
    popup.addEventListener('click', function(event) {
        if (event.target === popup || event.target === closeButton) { closePopup(); return; }
        if (event.target === popupImage && popupImage.dataset.clickHome === 'true') returnHome();
    });
    popupImage.addEventListener('keydown', function(event) {
        if (popupImage.dataset.clickHome === 'true' && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            returnHome();
        }
    });
    popup.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') { closePopup(); return; }
        if (event.key !== 'Tab') return;
        const focusable = [closeButton];
        if (popupImage.tabIndex === 0) focusable.push(popupImage);
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    closeButton.addEventListener('click', closePopup);
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
