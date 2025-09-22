import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaBitcoin, FaEthereum, FaUser, FaEnvelope, FaLock, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    // Схема валидации для регистрации
    const registerSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Имя пользователя должно содержать не менее 3 символов')
            .required('Обязательное поле'),
        email: Yup.string()
            .email('Неверный формат email')
            .required('Обязательное поле'),
        password: Yup.string()
            .min(8, 'Пароль должен содержать не менее 8 символов')
            .required('Обязательное поле'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Обязательное поле'),
    });

    // Схема валидации для входа
    const loginSchema = Yup.object({
        email: Yup.string()
            .email('Неверный формат email')
            .required('Обязательное поле'),
        password: Yup.string()
            .required('Обязательное поле'),
    });

    // Схема валидации для восстановления пароля
    const forgotPasswordSchema = Yup.object({
        email: Yup.string()
            .email('Неверный формат email')
            .required('Обязательное поле'),
    });

    // Обработчик отправки формы регистрации
    const handleRegister = async (values, { setSubmitting, resetForm }) => {
        setIsLoading(true);
        try {
            // Здесь обычно будет запрос к API
            console.log('Регистрация:', values);

            // Имитация задержки запроса
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert('Регистрация успешна!');
            resetForm();
            onClose();
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            alert('Ошибка при регистрации. Попробуйте еще раз.');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Обработчик отправки формы входа
    const handleLogin = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            // Здесь обычно будет запрос к API
            console.log('Вход:', values);

            // Имитация задержки запроса
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert('Вход выполнен успешно!');
            onClose();
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Неверный email или пароль.');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Обработчик отправки формы восстановления пароля
    const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
        setIsLoading(true);
        try {
            // Здесь обычно будет запрос к API
            console.log('Восстановление пароля для:', values.email);

            // Имитация задержки запроса
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Показываем уведомление
            setShowNotification(true);
            resetForm();

            // Скрываем уведомление через 5 секунд
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            // Возвращаемся на форму входа
            setTimeout(() => {
                setShowForgotPassword(false);
                setMode('login');
            }, 3000);
        } catch (error) {
            console.error('Ошибка восстановления пароля:', error);
            alert('Ошибка при отправке ссылки для восстановления пароля.');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Formik для формы регистрации
    const registerFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit: handleRegister,
    });

    // Formik для формы входа
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: handleLogin,
    });

    // Formik для формы восстановления пароля
    const forgotPasswordFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleForgotPassword,
    });

    // Если модальное окно закрыто, не рендерим его
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            {/* Декоративные элементы фона */}
            <div className={styles.cryptoBg}>
                <div className={styles.cryptoIcon}>
                    <FaBitcoin />
                </div>
                <div className={styles.cryptoIcon}>
                    <FaEthereum />
                </div>
                <div className={styles.cryptoIcon}>
                    <FaBitcoin />
                </div>
            </div>

            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <div className={styles.modalHeader}>
                    <div className={styles.modalIconContainer}>
                        {showForgotPassword ? (
                            <FaQuestionCircle className={styles.modalIcon} />
                        ) : mode === 'login' ? (
                            <FaUser className={styles.modalIcon} />
                        ) : (
                            <FaBitcoin className={styles.modalIcon} />
                        )}
                    </div>
                    <h2 className={styles.modalTitle}>
                        {showForgotPassword
                            ? 'Восстановление пароля'
                            : mode === 'login'
                                ? 'Вход в аккаунт'
                                : 'Регистрация'}
                    </h2>
                    <p className={styles.modalSubtitle}>
                        {showForgotPassword
                            ? 'Введите email для восстановления пароля'
                            : mode === 'login'
                                ? 'Войдите, чтобы получить доступ к вашему аккаунту'
                                : 'Создайте новый аккаунт, чтобы начать'}
                    </p>
                </div>

                {showForgotPassword ? (
                    <form onSubmit={forgotPasswordFormik.handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaEnvelope className={styles.inputIcon} />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Ваш email"
                                    onChange={forgotPasswordFormik.handleChange}
                                    onBlur={forgotPasswordFormik.handleBlur}
                                    value={forgotPasswordFormik.values.email}
                                    className={forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email ? styles.inputError : ''}
                                />
                            </div>
                            {forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email ? (
                                <div className={styles.errorText}>{forgotPasswordFormik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Загрузка...' : 'Отправить ссылку'} <FaArrowRight className={styles.btnIcon} />
                            </button>
                        </div>

                        <div className={styles.switchMode}>
                            <p>Вспомнили пароль? <button type="button" onClick={() => setShowForgotPassword(false)} className={styles.switchButton}>Вернуться ко входу</button></p>
                        </div>
                    </form>
                ) : mode === 'login' ? (
                    <form onSubmit={loginFormik.handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaEnvelope className={styles.inputIcon} />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Ваш email"
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    value={loginFormik.values.email}
                                    className={loginFormik.touched.email && loginFormik.errors.email ? styles.inputError : ''}
                                />
                            </div>
                            {loginFormik.touched.email && loginFormik.errors.email ? (
                                <div className={styles.errorText}>{loginFormik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Ваш пароль"
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    value={loginFormik.values.password}
                                    className={loginFormik.touched.password && loginFormik.errors.password ? styles.inputError : ''}
                                />
                            </div>
                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                <div className={styles.errorText}>{loginFormik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className={styles.forgotPassword}>
                            <button
                                type="button"
                                className={styles.forgotPasswordBtn}
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Забыли пароль?
                            </button>
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Загрузка...' : 'Войти'} <FaArrowRight className={styles.btnIcon} />
                            </button>
                        </div>

                        <div className={styles.switchMode}>
                            <p>Еще нет аккаунта? <button type="button" onClick={() => setMode('register')} className={styles.switchButton}>Зарегистрироваться</button></p>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={registerFormik.handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaUser className={styles.inputIcon} />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Имя пользователя"
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.username}
                                    className={registerFormik.touched.username && registerFormik.errors.username ? styles.inputError : ''}
                                />
                            </div>
                            {registerFormik.touched.username && registerFormik.errors.username ? (
                                <div className={styles.errorText}>{registerFormik.errors.username}</div>
                            ) : null}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaEnvelope className={styles.inputIcon} />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Ваш email"
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.email}
                                    className={registerFormik.touched.email && registerFormik.errors.email ? styles.inputError : ''}
                                />
                            </div>
                            {registerFormik.touched.email && registerFormik.errors.email ? (
                                <div className={styles.errorText}>{registerFormik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Ваш пароль"
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.password}
                                    className={registerFormik.touched.password && registerFormik.errors.password ? styles.inputError : ''}
                                />
                            </div>
                            {registerFormik.touched.password && registerFormik.errors.password ? (
                                <div className={styles.errorText}>{registerFormik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithIcon}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.confirmPassword}
                                    className={registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword ? styles.inputError : ''}
                                />
                            </div>
                            {registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword ? (
                                <div className={styles.errorText}>{registerFormik.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Загрузка...' : 'Зарегистрироваться'} <FaArrowRight className={styles.btnIcon} />
                            </button>
                        </div>

                        <div className={styles.switchMode}>
                            <p>Уже есть аккаунт? <button type="button" onClick={() => setMode('login')} className={styles.switchButton}>Войти</button></p>
                        </div>
                    </form>
                )}

                {/* Уведомление об отправке ссылки для восстановления пароля */}
                {showNotification && (
                    <div className={styles.notification}>
                        <div className={styles.notificationContent}>
                            <div className={styles.notificationIcon}>
                                <FaEnvelope />
                            </div>
                            <div className={styles.notificationText}>
                                <h4>Ссылка отправлена!</h4>
                                <p>На вашу почту отправлена ссылка для восстановления пароля</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Декоративный элемент внизу формы */}
                <div className={styles.modalDecoration}>
                    <div className={styles.decorationLine}></div>
                    <div className={styles.decorationCircle}></div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;