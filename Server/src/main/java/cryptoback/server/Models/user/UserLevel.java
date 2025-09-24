package cryptoback.server.models.user;

public enum UserLevel {
    Basic("Базовый"),      // Базовый уровень с лимитом $1000
    Business("Бизнес");   // Бизнес уровень с лимитом $10000

    private final String description;

    UserLevel(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}