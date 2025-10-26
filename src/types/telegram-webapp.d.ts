/// <reference lib="dom" />

export {};

// ========================
// ОСНОВНЫЕ ОБЪЕКТЫ ПОЛЬЗОВАТЕЛЯ И ЧАТА
// ========================

/*
 * Этот объект содержит данные пользователя мини-приложения.
 */
export interface WebAppUser {
    /*
     * Уникальный идентификатор пользователя или бота. Это число может содержать более 32 значащих бит, и некоторые языки программирования могут испытывать трудности/скрытые дефекты при его интерпретации. Оно содержит не более 52 значащих бит, поэтому для хранения этого идентификатора можно использовать 64-битное целое число или тип с плавающей точкой двойной точности.
     */
    id: number;
    /*
     * *Необязательно*. True, если этот пользователь — бот. Возвращается только в поле ***получатель***.
     */
    is_bot?: boolean;
    /*
     * Имя пользователя или бота.
     */
    first_name: string;
    /*
     * *Необязательно*. Фамилия пользователя или бота.
     */
    last_name?: string;
    /*
     * *Необязательно*. Имя пользователя или бота.
     */
    username?: string;
    /*
     * *Необязательно*. Тег ***[IETF language](https://en.wikipedia.org/wiki/IETF_language_tag)*** языка пользователя. Возвращается только в поле пользователя.
     */
    language_code?: string;
    /*
     * *Необязательно*. True, если этот пользователь — пользователь Telegram Premium.
     */
    is_premium?: true;
    /*
     * *Необязательно*. True, если пользователь добавил бота в меню вложений.
     */
    added_to_attachment_menu?: true;
    /*
     * *Необязательно*. True, если пользователь разрешил боту отправлять ему сообщения.
     */
    allows_write_to_pm?: true;
    /*
     * *Необязательно*. URL-адрес фотографии профиля пользователя. Фотография может быть в формате .jpeg или .svg.
     */
    photo_url?: string;
}

/*
 * Этот объект представляет собой чат.
 */
interface WebAppChat {
    /*
     * Уникальный идентификатор этого чата. Это число может иметь более 32 значимых бит, и некоторые языки программирования могут испытывать трудности/скрытые дефекты при его интерпретации. Однако оно имеет не более 52 значимых бит, поэтому для хранения этого идентификатора можно использовать 64-битное целое число со знаком или число с плавающей точкой двойной точности.
     */
    id: number;
    /*
     * Тип чата: «группа (group)», «супергруппа (supergroup)» или «канал (channel)».
     */
    type: 'group' | 'supergroup' | 'channel';
    /*
     * Название чата
     */
    title: string;
    /*
     * *Необязательно*. Имя пользователя чата
     */
    username?: string;
    /*
     * *Необязательно*. URL-адрес фотографии чата. Фотография может быть в формате .jpeg или .svg. Возвращается только для мини-приложений, запущенных из меню вложений.
     */
    photo_url?: string;
}

/*
 * Этот объект содержит данные, передаваемые в мини-приложение при его открытии. Он пуст, если мини-приложение было запущено с помощью ***[кнопки клавиатуры (keyboard button)](https://core.telegram.org/bots/webapps#keyboard-button-mini-apps)*** или из ***[встроенного режима (inline mode)](https://core.telegram.org/bots/webapps#inline-mode-mini-apps)***.
 */
export interface WebAppInitData {
    /*
     * *Необязательно*. Уникальный идентификатор сеанса мини-приложения, необходимый для отправки сообщений через метод **answerWebAppQuery**.
     */
    query_id?: string;
    /*
     * *Необязательно*. Объект, содержащий данные о текущем пользователе.
     */
    user?: WebAppUser;
    /*
     * *Необязательно*. Объект, содержащий данные о собеседнике текущего пользователя в чате, где бот был запущен через меню вложений. Возвращается только для приватных чатов и только для мини-приложений, запущенных через меню вложений.
     */
    receiver?: WebAppUser;
    /*
     * *Необязательно*. Объект, содержащий данные о чате, где бот был запущен через меню вложений. Возвращается для супергрупп, каналов и групповых чатов – только для мини-приложений, запущенных через меню вложений.
     */
    chat?: WebAppChat;
    /*
     * *Необязательно*. Тип чата, из которого было открыто мини-приложение. Может быть «отправитель» для личного чата с пользователем, открывающим ссылку, «личный (private)», «группа (group)», «супергруппа (supergroup)» или «канал (channel)». Возвращается только для мини-приложений, запущенных по прямым ссылкам.
     */
    chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
    /*
     * *Необязательно*. Глобальный идентификатор, уникальный для чата, из которого было открыто мини-приложение. Возвращается только для мини-приложений, запущенных по прямой ссылке.
     */
    chat_instance?: string;
    /*
     * *Optional*. The value of the `startattach` parameter, passed ***[via link](https://core.telegram.org/bots/webapps#adding-bots-to-the-attachment-menu)***. Only returned for Mini Apps when launched from the attachment menu via link.
     *
     * Значение параметра `start_param` также будет передано в GET-параметр `tgWebAppStartParam`, поэтому мини-приложение сможет сразу загрузить правильный интерфейс.
     */
    start_param?: string;
    /*
     * *Необязательно*. Время в секундах, по истечении которого сообщение может быть отправлено через метод **answerWebAppQuery**.
     */
    can_send_after?: number;
    /*
     * Время Unix на момент открытия формы.
     */
    auth_date: number;
    /*
     * Хеш всех переданных параметров, который бот-сервер может использовать для ***[проверки их валидности](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)***.
     */
    hash: string;
    /*
     * Подпись всех переданных параметров (кроме *хеша*), которую третья сторона может использовать для ***[проверки их действительности](https://core.telegram.org/bots/webapps#validating-data-for-third-party-use)***.
     */
    signature?: string;
}

// ========================
// ТЕМА И БЕЗОПАСНЫЕ ОБЛАСТИ
// ========================

/*
 * Мини-приложения могут в режиме реального времени адаптировать внешний вид интерфейса к приложению пользователя Telegram. Этот объект содержит текущие настройки темы пользователя
 */
interface ThemeParams {
    /*
     * *Необязательно*. Цвет фона в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-bg-color)`.
     */
    bg_color?: string;
    /*
     * *Необязательно*. Цвет основного текста в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-text-color)`.
     */
    text_color?: string;
    /*
     * *Необязательно*. Цвет текста подсказки в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-hint-color)`.
     */
    hint_color?: string;
    /*
     * *Необязательно*. Цвет ссылки в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-link-color)`.
     */
    link_color?: string;
    /*
     * Необязательно. Цвет кнопки в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-button-color)`.
     */
    button_color?: string;
    /*
     * *Необязательно*. Цвет текста кнопки в формате `#RRGGBB`. Также доступен как CSS-переменная `var(--tg-theme-button-text-color)`.
     */
    button_text_color?: string;
    /*
     * *Необязательно*. `Bot API 6.1+` Вторичный цвет фона в формате `#RRGGBB`. Также доступен как CSS-переменная `v`ar(--tg-theme-secondary-bg-color)`.
     */
    secondary_bg_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет фона заголовка в формате `#RRGGBB`. Также доступно как переменная CSS `var(--tg-theme-header-bg-color)`.
     */
    header_bg_color?: string;
    /*
     * *Необязательно*. `Bot API 7.10+` Цвет фона нижней части в формате `#RRGGBB`. Также доступно как переменная CSS `var(--tg-theme-bottom-bar-bg-color)`.
     */
    bottom_bar_bg_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет акцентного текста в формате `#RRGGBB`. Также доступно как переменная CSS `var(--tg-theme-accent-text-color)`.
     */
    accent_text_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет фона раздела в формате `#RRGGBB`. Рекомендуется использовать вместе с *secondary_bg_color*. Также доступно как CSS-переменная `var(--tg-theme-section-bg-color)`.
     */
    section_bg_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет текста заголовка раздела в формате `#RRGGBB`. Также доступно как CSS-переменная `var(--tg-theme-section-header-text-color)`.
     */
    section_header_text_color?: string;
    /*
     * *Необязательно*. `Bot API 7.6+` Цвет разделителя разделов в формате `#RRGGBB`. Также доступно как CSS-переменная `var(--tg-theme-section-separator-color)`.
     */
    section_separator_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет текста субтитров в формате `#RRGGBB`. Также доступно как CSS-переменная `var(--tg-theme-subtitle-text-color)`.
     */
    subtitle_text_color?: string;
    /*
     * *Необязательно*. `Bot API 7.0+` Цвет текста для деструктивных действий в формате `#RRGGBB`. Также доступно как CSS-переменная `var(--tg-theme-destructive-text-color)`.
     */
    destructive_text_color?: string;
}

interface SafeAreaInset {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface ContentSafeAreaInset {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

// ========================
// КНОПКИ
// ========================

interface BackButton {
    isVisible: boolean;
    onClick(callback: () => void): BackButton;
    offClick(callback: () => void): BackButton;
    show(): BackButton;
    hide(): BackButton;
}

interface BottomButton {
    readonly type: 'main' | 'secondary';
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    hasShineEffect: boolean;
    position: 'left' | 'right' | 'top' | 'bottom' | undefined;
    readonly isProgressVisible: boolean;
    setText(text: string): BottomButton;
    onClick(callback: () => void): BottomButton;
    offClick(callback: () => void): BottomButton;
    show(): BottomButton;
    hide(): BottomButton;
    enable(): BottomButton;
    disable(): BottomButton;
    showProgress(leaveActive?: boolean): BottomButton;
    hideProgress(): BottomButton;
    setParams(params: {text?: string; color?: string; text_color?: string; has_shine_effect?: boolean; position?: 'left' | 'right' | 'top' | 'bottom'; is_active?: boolean; is_visible?: boolean;}): BottomButton;
}

interface SettingsButton {
    isVisible: boolean;
    onClick(callback: () => void): SettingsButton;
    offClick(callback: () => void): SettingsButton;
    show(): SettingsButton;
    hide(): SettingsButton;
}

// ========================
// ГАПТИКА
// ========================


interface HapticFeedback {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
    notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
    selectionChanged(): HapticFeedback;
}

// ========================
// ХРАНИЛИЩА
// ========================

interface CloudStorage {
    setItem(key: string, value: string, callback?: (error: string | null, success: boolean) => void): CloudStorage;
    getItem(key: string, callback: (error: string | null, value: string | null) => void): CloudStorage;
    getItems(keys: string[], callback: (error: string | null, values: (string | null)[]) => void): CloudStorage;
    removeItem(key: string, callback?: (error: string | null, success: boolean) => void): CloudStorage;
    removeItems(keys: string[], callback?: (error: string | null, success: boolean) => void): CloudStorage;
    getKeys(callback: (error: string | null, keys: string[]) => void): CloudStorage;
}

interface DeviceStorage {
    setItem(key: string, value: string, callback?: (error: string | null, success: boolean) => void): DeviceStorage;
    getItem(key: string, callback: (error: string | null, value: string | null) => void): DeviceStorage;
    removeItem(key: string, callback?: (error: string | null, success: boolean) => void): DeviceStorage;
    clear(callback?: (error: string | null, success: boolean) => void): DeviceStorage;
}

interface SecureStorage {
    setItem(key: string, value: string, callback?: (error: string | null, success: boolean) => void): SecureStorage;
    getItem(key: string, callback: (error: string | null, value: string | null, canRestore?: boolean) => void): SecureStorage;
    restoreItem(key: string, callback?: (error: string | null, value: string | null) => void): SecureStorage;
    removeItem(key: string, callback?: (error: string | null, success: boolean) => void): SecureStorage;
    clear(callback?: (error: string | null, success: boolean) => void): SecureStorage;
}

// ========================
// БИОМЕТРИЯ
// ========================

interface BiometricManager {
    readonly isInited: boolean;
    readonly isBiometricAvailable: boolean;
    readonly biometricType: 'finger' | 'face' | 'unknown' | undefined;
    readonly isAccessRequested: boolean;
    readonly isAccessGranted: boolean;
    readonly isBiometricTokenSaved: boolean;
    readonly deviceId: string | undefined;
    init(callback?: () => void): BiometricManager;
    requestAccess(params: { reason?: string }, callback?: (granted: boolean) => void): BiometricManager;
    authenticate(params: { reason?: string }, callback?: (success: boolean, token?: string) => void): BiometricManager;
    updateBiometricToken(token: string, callback?: (success: boolean) => void): BiometricManager;
    openSettings(): BiometricManager;
}

// ========================
// СЕНСОРЫ
// ========================

interface Accelerometer {
    readonly isStarted: boolean;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    start(params?: { refresh_rate?: number }, callback?: (success: boolean) => void): Accelerometer;
    stop(callback?: (success: boolean) => void): Accelerometer;
}

interface DeviceOrientation {
    readonly isStarted: boolean;
    readonly absolute: boolean;
    readonly alpha: number;
    readonly beta: number;
    readonly gamma: number;
    start(params?: { refresh_rate?: number; need_absolute?: boolean }, callback?: (success: boolean) => void): DeviceOrientation;
    stop(callback?: (success: boolean) => void): DeviceOrientation;
}

interface Gyroscope {
    readonly isStarted: boolean;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    start(params?: { refresh_rate?: number }, callback?: (success: boolean) => void): Gyroscope;
    stop(callback?: (success: boolean) => void): Gyroscope;
}

// ========================
// ГЕОЛОКАЦИЯ
// ========================

interface LocationData {
    latitude: number;
    longitude: number;
    altitude: number | null;
    course: number | null;
    speed: number | null;
    horizontal_accuracy: number | null;
    vertical_accuracy: number | null;
    course_accuracy: number | null;
    speed_accuracy: number | null;
}

interface LocationManager {
    readonly isInited: boolean;
    readonly isLocationAvailable: boolean;
    readonly isAccessRequested: boolean;
    readonly isAccessGranted: boolean;
    init(callback?: () => void): LocationManager;
    getLocation(callback: (location: LocationData | null) => void): LocationManager;
    openSettings(): LocationManager;
}

// ========================
// ПАРАМЕТРЫ ДЛЯ МЕТОДОВ
// ========================

interface StoryWidgetLink {
    url: string;
    name?: string;
}

interface StoryShareParams {
    text?: string;
    widget_link?: StoryWidgetLink;
}

interface ScanQrPopupParams {
    text?: string;
}

interface PopupButton {
    id?: string;
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    text?: string;
}

interface PopupParams {
    title?: string;
    message: string;
    buttons?: PopupButton[];
}

interface EmojiStatusParams {
    duration?: number;
}

interface DownloadFileParams {
    url: string;
    file_name: string;
}

// ========================
// ОСНОВНОЙ ИНТЕРФЕЙС WEBAPP
// ========================

interface TelegramWebApp {
    // --- Свойства ---
    /*
    * Строка с необработанными данными, передаваемыми в мини-приложение, удобна для ***[проверки данных](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)***.
    *
    * **ВНИМАНИЕ**: ***[Проверьте данные](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)*** из этого поля перед их использованием на сервере бота.
    */
    readonly initData: string;
    /*
     * Объект с входными данными, переданными в мини-приложение.
     *
     * **ВНИМАНИЕ**: Данным из этого поля не следует доверять. Используйте данные из initData только на сервере бота и только после их ***[проверки](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)***.
     */
    readonly initDataUnsafe?: WebAppInitData;
    /*
     * Версия API бота, доступная в приложении Telegram пользователя.
     */
    readonly version: string;
    /*
     * Название платформы приложения Telegram пользователя.
     */
    readonly platform: string;
    /*
     * Цветовая схема, используемая в настоящее время в приложении Telegram. «Светлая (light)» или «Тёмная (dark)».
     *
     * Также доступна как CSS-переменная `var(--tg-color-scheme)`.
     */
    readonly colorScheme: 'light' | 'dark';
    /*
     * Объект, содержащий текущие настройки темы, используемые в приложении Telegram.
     */
    readonly themeParams: ThemeParams;
    /*
     * `Bot API 8.0+`: *True*, если мини-приложение в данный момент активно. *False*, если мини-приложение свёрнуто.
     */
    readonly isActive: boolean;
    /*
     * *True*, если мини-приложение развернуто до максимально доступной высоты. *False*, если мини-приложение занимает часть экрана и может быть развернуто на всю высоту с помощью метода **expand()**.
     */
    readonly isExpanded: boolean;
    /*
     * Текущая высота видимой области мини-приложения. Также доступна в CSS как переменная `var(--tg-viewport-height)`.
     *
     * Приложение может отображать только верхнюю часть мини-приложения, оставляя нижнюю часть за пределами экрана. Из этого положения пользователь может «растянуть» мини-приложение на максимальную высоту, а бот может сделать то же самое, вызвав метод **expand()**. При изменении положения мини-приложения текущее значение высоты видимой области будет обновляться в режиме реального времени.
     *
     * Обратите внимание, что частота обновления этого значения недостаточна для плавного следования за нижней границей окна. Не следует использовать его для закрепления элементов интерфейса внизу видимой области. Для этой цели более целесообразно использовать значение поля `viewportStableHeight`.
     */
    readonly viewportHeight: number;
    /*
     * Высота видимой области мини-приложения в его последнем стабильном состоянии. Также доступна в CSS как переменная `var(--tg-viewport-stable-height)`.
     *
     * Приложение может отображать только верхнюю часть мини-приложения, оставляя нижнюю часть за пределами экрана. Из этого положения пользователь может «растянуть» мини-приложение на максимальную высоту, а бот может сделать то же самое, вызвав метод **expand()**. В отличие от значения viewportHeight, значение `viewportStableHeight` не изменяется при изменении положения мини-приложения при жестах пользователя или во время анимации. Значение `viewportStableHeight` будет обновлено после завершения всех жестов и анимации, когда мини-приложение достигнет своего конечного размера.
     *
     * *Обратите внимание на **[событие](https://core.telegram.org/bots/webapps#events-available-for-mini-apps)** `viewportChanged` с переданным параметром `isStateStable=true`, которое позволит отслеживать изменение стабильного состояния высоты видимой области.*
     */
    readonly viewportStableHeight: number;
    /*
     * Текущий цвет заголовка в формате #RRGGBB.
     */
    readonly headerColor: string;
    /*
     * Текущий цвет фона в формате #RRGGBB.
     */
    readonly backgroundColor: string;
    /*
     * Текущий цвет нижней панели в формате #RRGGBB.
     */
    readonly bottomBarColor: string;
    /*
     * *True*, если диалоговое окно подтверждения включено, когда пользователь пытается закрыть мини-приложение. *False*, если диалоговое окно подтверждения отключено.
     */
    readonly isClosingConfirmationEnabled: boolean;
    /*
     * *True*, если вертикальные свайпы для закрытия или сворачивания мини-приложения включены. *False*, если вертикальные свайпы для закрытия или сворачивания мини-приложения отключены. В любом случае пользователь по-прежнему сможет сворачивать и закрывать мини-приложение, проведя пальцем по его заголовку.
     */
    isVerticalSwipesEnabled: boolean;
    /*
     * *True*, если мини-приложение в данный момент отображается в полноэкранном режиме.
     */
    readonly isFullscreen: boolean;
    /*
     * *True*, если ориентация мини-приложения в данный момент заблокирована. *False*, если ориентация свободно меняется в зависимости от поворота устройства.
     */
    readonly isOrientationLocked: boolean;
    /*
     * Объект, представляющий вставки безопасной зоны устройства, учитывающие элементы пользовательского интерфейса системы, такие как выемки или панели навигации.
     */
    readonly safeAreaInset: SafeAreaInset;
    /*
     * Объект, представляющий безопасную область для отображения контента внутри приложения, свободную от перекрывающихся элементов пользовательского интерфейса Telegram.
     */
    readonly contentSafeAreaInset: ContentSafeAreaInset;

    // --- Объекты ---
    readonly BackButton: BackButton;
    readonly MainButton: BottomButton;
    readonly SecondaryButton: BottomButton;
    readonly SettingsButton: SettingsButton;
    readonly HapticFeedback: HapticFeedback;
    readonly CloudStorage: CloudStorage;
    readonly BiometricManager: BiometricManager;
    readonly Accelerometer?: Accelerometer;
    readonly DeviceOrientation?: DeviceOrientation;
    readonly Gyroscope?: Gyroscope;
    readonly LocationManager?: LocationManager;
    readonly DeviceStorage?: DeviceStorage;
    readonly SecureStorage?: SecureStorage;

    // --- Методы ---
    isVersionAtLeast(version: string): boolean;

    setHeaderColor(color: string): void;
    setBackgroundColor(color: string): void;
    setBottomBarColor(color: string): void;

    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;

    enableVerticalSwipes(): void;
    disableVerticalSwipes(): void;

    requestFullscreen(): void;
    exitFullscreen(): void;
    lockOrientation(): void;
    unlockOrientation(): void;
    addToHomeScreen(): void;
    checkHomeScreenStatus(callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void): void;

    onEvent(eventType: string, eventHandler: (...args: never[]) => void): void;
    offEvent(eventType: string, eventHandler: (...args: never[]) => void): void;

    sendData(data: string): void;
    switchInlineQuery(query: string, choose_chat_types?: ('users' | 'bots' | 'groups' | 'channels')[]): void;
    openLink(url: string, options?: { try_instant_view?: boolean }): void;
    openTelegramLink(url: string): void;
    openInvoice(url: string, callback?: (status: string) => void): void;
    shareToStory(media_url: string, params?: StoryShareParams): void;
    shareMessage(msg_id: string, callback?: (sent: boolean) => void): void;
    setEmojiStatus(custom_emoji_id: string, params?: EmojiStatusParams, callback?: (success: boolean) => void): void;
    requestEmojiStatusAccess(callback?: (granted: boolean) => void): void;
    downloadFile(params: DownloadFileParams, callback?: (accepted: boolean) => void): void;
    hideKeyboard(): void;

    showPopup(params: PopupParams, callback?: (buttonId: string) => void): void;
    showAlert(message: string, callback?: () => void): void;
    showConfirm(message: string, callback?: (ok: boolean) => void): void;
    showScanQrPopup(params: ScanQrPopupParams, callback?: (text: string) => boolean): void;
    closeScanQrPopup(): void;
    readTextFromClipboard(callback?: (text: string) => void): void;
    requestWriteAccess(callback?: (granted: boolean) => void): void;
    requestContact(callback?: (shared: boolean) => void): void;

    ready(): void;
    expand(): void;
    close(): void;
}

// ========================
// ГЛОБАЛЬНОЕ РАСШИРЕНИЕ
// ========================

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}