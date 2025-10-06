package cryptoback.server.models.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "UserProfile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    @Id
    private Long userId;

    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "avatarUrl", length = 255)
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private Theme theme = Theme.Dark;

    // Навигационные свойства

    @OneToOne
    @MapsId
    @JoinColumn(name = "userId")
    @ToString.Exclude
    private UserData userData;
}
