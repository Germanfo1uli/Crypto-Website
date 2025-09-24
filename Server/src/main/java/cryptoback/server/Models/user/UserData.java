package cryptoback.server.models.user;

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

    public String getUsername() {
        return this.username;
    }

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