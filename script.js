document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect();
    initializeMusic();
    ViewCount();
});

function initializeTypingEffect() {
    const element = document.querySelector('.subtitle');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    };

    setTimeout(typeWriter, 1000);
}

const playlist = [
    "music/clark.mp3",
    "music/dog.mp3",
    "music/mice-on-venus.mp3",
    "music/wet-hand.mp3"
];
function initializeMusic() {

    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");
    const iconShape = document.getElementById("icon-shape");
    const nowPlaying = document.getElementById("now-playing-music");
    let hasStarted = false;
    if (!music || !btn || !nowPlaying) return;

    music.volume = 0.2;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    let queue = [...playlist];
    shuffle(queue);

    let i = 0;

    function updateNowPlaying(isPlaying = true) {

    if (!hasStarted) {
        nowPlaying.innerHTML = `
            <span class="music-dot not-playing"></span>
            <span class="label">Not Playing Music</span>
        `;
        return;
    }
    let fileName = queue[i].split("/").pop().replace(".mp3", "");
    fileName = formatSongName(fileName);
    nowPlaying.innerHTML = `
        <span class="music-dot ${isPlaying ? "" : "not-playing"}"></span>
        <span class="label">Now Playing</span>
        <span>–</span>
        <span class="song">${fileName}</span>`;
    }
    function formatSongName(name) {
    return name
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, c => c.toUpperCase());
}

    function playCurrent() {

    music.src = queue[i];
    updateNowPlaying();

    music.play().then(() => {
        hasStarted = true;
        updateNowPlaying(true);
        iconShape.setAttribute("d","M6 5h4v14H6zm8 0h4v14h-4z");
        document.getElementById("music-player").classList.remove("paused");

    }).catch(() => {

        // autoplay bị chặn
        iconShape.setAttribute("d","M8 5v14l11-7z");
        document.getElementById("music-player").classList.add("paused");

    });
    }

    music.addEventListener("ended", () => {
        i++;
        if (i >= queue.length) {
            shuffle(queue);
            i = 0;
        }
        playCurrent();
    });

    btn.addEventListener("click", () => {

    if (music.paused) {

        music.play().then(() => {
            hasStarted = true
            updateNowPlaying(true);
            iconShape.setAttribute("d","M6 5h4v14H6zm8 0h4v14h-4z");
            document.getElementById("music-player").classList.remove("paused");
        });

    } else {

        music.pause();
            updateNowPlaying(false);
            iconShape.setAttribute("d","M8 5v14l11-7z");
        document.getElementById("music-player").classList.add("paused");

    }

    });

    playCurrent();
}

async function ViewCount() {

    const counterEl = document.getElementById("view-count");
    const counted = localStorage.getItem("firebaseCounted");

    const { doc, getDoc, updateDoc, setDoc, increment } = window.firebaseTools;
    const db = window.firebaseDB;

    const counterRef = doc(db, "stats", "views");

    const snapshot = await getDoc(counterRef);

    if (!snapshot.exists()) {
        await setDoc(counterRef, { count: 0 });
    }

    if (!counted) {

        await updateDoc(counterRef, {
            count: increment(1)
        });

        localStorage.setItem("firebaseCounted", "true");

        const newSnap = await getDoc(counterRef);
        const newValue = newSnap.data().count;

        animateCounter(counterEl, 0, newValue, 1200);
        counterEl.classList.add("new-view-glow");

        setTimeout(() => {
            counterEl.classList.remove("new-view-glow");
        }, 1500);

    } else {

        const data = snapshot.data();
        counterEl.textContent = data.count;

    }
}