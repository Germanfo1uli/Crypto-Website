package cryptoback.server.models.user;

public enum Theme {
    Light("light"),
    Dark("dark" ),
    System("system" );

    private final String code;

    Theme(String code) {
        this.code = code;

    }

    public String getCode() {
        return code;
    }



}