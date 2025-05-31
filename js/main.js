// 競馬情報サイト - JavaScript

// DOMContentLoaded後に実行
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの初期化
    initMobileMenu();
    
    // スムーススクロールの初期化
    initSmoothScroll();
    
    // フェードインアニメーションの初期化
    initFadeInAnimation();
    
    // フォームバリデーションの初期化
    initFormValidation();
});

// モバイルメニューの制御
function initMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav ul');
    
    if (toggleButton && nav) {
        toggleButton.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // メニュー項目クリック時にメニューを閉じる
        const menuItems = nav.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }
}

// スムーススクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// フェードインアニメーション
function initFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    const animationTargets = document.querySelectorAll('.card, .section-title');
    animationTargets.forEach(target => {
        observer.observe(target);
    });
}

// フォームバリデーション
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'この項目は必須です');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // メールアドレスの検証
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, '正しいメールアドレスを入力してください');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e53e3e';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#e53e3e';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e2e8f0';
}

// レース情報の動的更新（サンプル）
function updateRaceInfo() {
    // 実際のAPIコールの代わりにサンプルデータを使用
    const sampleRaces = [
        {
            time: '13:30',
            race: '第1レース',
            course: '東京 芝1600m',
            horses: ['サンプルホース1', 'サンプルホース2', 'サンプルホース3']
        },
        {
            time: '14:05',
            race: '第2レース',
            course: '東京 ダート1400m',
            horses: ['サンプルホース4', 'サンプルホース5', 'サンプルホース6']
        }
    ];
    
    const raceContainer = document.getElementById('race-info');
    if (raceContainer) {
        raceContainer.innerHTML = sampleRaces.map(race => `
            <div class="race-item">
                <h3>${race.time} ${race.race}</h3>
                <p>${race.course}</p>
                <ul>${race.horses.map(horse => `<li>${horse}</li>`).join('')}</ul>
            </div>
        `).join('');
    }
}

// 結果表示の更新（サンプル）
function updateResults() {
    const sampleResults = [
        {
            race: '第1レース',
            first: 'サンプルホース1',
            second: 'サンプルホース2',
            third: 'サンプルホース3',
            payout: '3,420円'
        }
    ];
    
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
        resultsContainer.innerHTML = sampleResults.map(result => `
            <div class="result-item">
                <h3>${result.race}</h3>
                <p>1着: ${result.first}</p>
                <p>2着: ${result.second}</p>
                <p>3着: ${result.third}</p>
                <p>払戻: ${result.payout}</p>
            </div>
        `).join('');
    }
}

// 検索機能
function initSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        // 実際の検索処理をここに実装
        console.log('検索キーワード:', searchTerm);
        
        // サンプル: 結果表示
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-result">
                    <h3>検索結果: "${searchTerm}"</h3>
                    <p>検索機能は開発中です。</p>
                </div>
            `;
        }
    }
}

// お気に入り機能（ローカルストレージ使用）
function toggleFavorite(raceId) {
    const favorites = JSON.parse(localStorage.getItem('keiba-favorites') || '[]');
    const index = favorites.indexOf(raceId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(raceId);
    }
    
    localStorage.setItem('keiba-favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('keiba-favorites') || '[]');
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    
    favoriteButtons.forEach(button => {
        const raceId = button.dataset.raceId;
        if (favorites.includes(raceId)) {
            button.classList.add('active');
            button.textContent = '★';
        } else {
            button.classList.remove('active');
            button.textContent = '☆';
        }
    });
}

// ページ読み込み完了後の初期化
window.addEventListener('load', function() {
    updateFavoriteButtons();
    
    // 検索機能の初期化
    initSearch();
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// サービスワーカーの登録（PWA対応の準備）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}