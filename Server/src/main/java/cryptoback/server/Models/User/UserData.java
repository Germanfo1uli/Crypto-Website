package cryptoback.server.Models.User;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "UserData")
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private UserLevel level = UserLevel.Basic;

    @Column(name = "phone", nullable = false, length = 20, unique = true)
    private String phone;

    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "passwordhash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "twoFaIsactive")
    private Boolean twoFAsActive = false;

    @Column(name = "emailVerified")
    private Boolean emailVerified = false;

    @Column(name = "createAt", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "avatarUrl", length = 255)
    private String avatarUrl;

    @Column(name = "isActive")
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private Theme theme = Theme.Dark;

    // get set адаптация
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public UserLevel getLevel() { return level; }
    public void setLevel(UserLevel level) { this.level = level; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Boolean getTwoFAsActive() { return twoFAsActive; }
    public void setTwoFAsActive(Boolean twoFAsActive) { this.twoFAsActive = twoFAsActive; }

    public Boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }

    public LocalDateTime getCreateAt() { return createAt; }
    public void setCreateAt(LocalDateTime createAt) { this.createAt = createAt; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Theme getTheme() { return theme; }
    public void setTheme(Theme theme) { this.theme = theme; }

    //🔗 Навигационные свойства

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Wallet> wallets = new ArrayList<>();
//
//    // 1:М - Транзакции пользователя
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Transaction> transactions = new ArrayList<>();


//    public List<Wallet> getWallets() { return wallets; }
//    public void setWallets(List<Wallet> wallets) { this.wallets = wallets; }
//
//    public List<Transaction> getTransactions() { return transactions; }
//    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
}