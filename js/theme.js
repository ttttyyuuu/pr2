// Объект для управления темой приложения
const ThemeManager = {
    // Название ключа в localStorage для сохранения состояния тёмного режима
    DARK_MODE_KEY: 'darkMode',
    
    // Класс которые добавляется к body при включении тёмного режима
    DARK_MODE_CLASS: 'dark-mode',

    //Инициализация менеджера темы (должна быть вызвана при загрузке страницы)
    init() {
        // Применяем сохраненную тему при загрузке страницы
        this.applyThemeFromStorage();
        
        // Добавляем стили для тёмного режима в документ
        this.injectDarkModeStyles();
        
        // Подключаем обработчик для кнопки переключения темы
        this.attachToggleButton();
    },

    // Применяет тёмный режим если он был сохранен в localStorage
    applyThemeFromStorage() {
        // Получаем состояние тёмного режима из localStorage
        const isDarkMode = localStorage.getItem(this.DARK_MODE_KEY) === 'true';
        
        // Если тёмный режим был включен, добавляем класс к body
        if (isDarkMode) {
            document.body.classList.add(this.DARK_MODE_CLASS);
        }
    },

    // Добавляет CSS стили для тёмного режима в документ
    injectDarkModeStyles() {
        // Проверяем не был ли уже добавлен стиль (чтобы избежать дублирования)
        if (document.getElementById('theme-manager-styles')) {
            return;
        }

        // Создаем элемент style с уникальным ID
        const styleElement = document.createElement('style');
        styleElement.id = 'theme-manager-styles';
        
        // CSS стили для тёмного режима
        styleElement.textContent = `
            /* Основные стили для тёмного режима */
            body.dark-mode {
                background-color: #1a1a1a;
                color: #e5e5e5;
            }

            body.dark-mode header {
                background-color: #0d0d0d;
            }

            body.dark-mode footer {
                background-color: #0d0d0d;
            }

            body.dark-mode .bg-white {
                background-color: #2a2a2a;
                color: #e5e5e5;
            }

            body.dark-mode .text-\\[\\#251725\\] {
                color: #e5e5e5;
            }

            body.dark-mode .shadow-lg {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.8);
            }

            body.dark-mode section {
                background-color: #1a1a1a;
            }

            body.dark-mode h1, 
            body.dark-mode h2, 
            body.dark-mode h3,
            body.dark-mode h4,
            body.dark-mode h5,
            body.dark-mode h6 {
                color: #e5e5e5;
            }

            body.dark-mode .bg-\\[\\#E5CBE6\\] {
                background-color: #3a3a3a;
                color: #e5e5e5;
            }

            body.dark-mode input, 
            body.dark-mode textarea,
            body.dark-mode select {
                background-color: #2a2a2a;
                color: #e5e5e5;
                border-color: #3a3a3a;
            }

            body.dark-mode option {
                background-color: #2a2a2a;
                color: #e5e5e5;
            }

            body.dark-mode .border-t-2 {
                border-color: #3a3a3a !important;
            }

            body.dark-mode .border-b-2 {
                border-color: #3a3a3a !important;
            }

            body.dark-mode .text-red-500 {
                color: #ff6b6b !important;
            }

            body.dark-mode .text-red-600 {
                color: #ff5252 !important;
            }
        `;
        
        // Добавляем стили в head документа
        document.head.appendChild(styleElement);
    },

    // Подключает обработчик к кнопке переключения темы, ищет кнопку по ID и добавляет event listener
    attachToggleButton() {
        // Получаем кнопку переключения темы из DOM
        const toggleButton = document.getElementById('darkModeToggle');
        
        // Если кнопка найдена, добавляем обработчик клика
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
            
            // Обновляем иконку при загрузке страницы
            this.updateToggleIcon();
        }
    },

    // Переключает тёмный режим (включает если выключен и наоборот)
    toggleTheme() {
        // Переключаем класс тёмного режима на body
        document.body.classList.toggle(this.DARK_MODE_CLASS);
        
        // Проверяем включен ли тёмный режим после переключения
        const isDarkMode = document.body.classList.contains(this.DARK_MODE_CLASS);
        
        // Сохраняем новое состояние в localStorage
        localStorage.setItem(this.DARK_MODE_KEY, isDarkMode);
        
        // Обновляем иконку кнопки
        this.updateToggleIcon();
    },

    // Обновляет иконку кнопки переключения темы, показывает луну если светлая тема и солнце если тёмная
    updateToggleIcon() {
        // Получаем кнопку переключения темы из DOM
        const toggleButton = document.getElementById('darkModeToggle');
        
        // Если кнопка найдена
        if (toggleButton) {
            // Проверяем включен ли тёмный режим
            const isDarkMode = document.body.classList.contains(this.DARK_MODE_CLASS);
            
            // Устанавливаем иконку в зависимости от состояния
            // Солнце для тёмного режима, луна для светлого
            const icon = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            toggleButton.innerHTML = icon;
        }
    },

    // Отключает тёмный режим (возвращает светлую тему)
    disableDarkMode() {
        // Удаляем класс тёмного режима
        document.body.classList.remove(this.DARK_MODE_CLASS);
        
        // Сохраняем состояние в localStorage
        localStorage.setItem(this.DARK_MODE_KEY, false);
        
        // Обновляем иконку кнопки
        this.updateToggleIcon();
    },

    // Включает тёмный режим
    enableDarkMode() {
        // Добавляем класс тёмного режима
        document.body.classList.add(this.DARK_MODE_CLASS);
        
        // Сохраняем состояние в localStorage
        localStorage.setItem(this.DARK_MODE_KEY, true);
        
        // Обновляем иконку кнопки
        this.updateToggleIcon();
    },

    // Проверяет включен ли тёмный режим @returns {boolean} true если тёмный режим включен, false иначе
    isDarkModeEnabled() {
        return document.body.classList.contains(this.DARK_MODE_CLASS);
    }
};

// Инициализируем ThemeManager при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
